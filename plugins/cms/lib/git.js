import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

/**
 * Execute a git command in the repository directory
 * @param {string} repoDir - The repository directory
 * @param {string} command - The git command to execute
 * @returns {Promise<string>} The command output
 */
async function gitExec(repoDir, command) {
  const { stdout, stderr } = await execAsync(`git ${command}`, {
    cwd: repoDir,
    encoding: 'utf-8',
    maxBuffer: 10 * 1024 * 1024 // 10MB buffer for large diffs
  })

  return stdout.trim()
}

/**
 * Get the git status of the repository
 * @param {string} repoDir - The repository directory
 * @returns {Promise<Object>} Status information
 */
export async function gitStatus(repoDir) {
  try {
    const status = await gitExec(repoDir, 'status --porcelain')
    const branch = await gitExec(repoDir, 'rev-parse --abbrev-ref HEAD')
    const lastCommit = await gitExec(repoDir, 'log -1 --format="%h %s" 2>/dev/null || echo "No commits"')

    const files = status.split('\n').filter(Boolean).map(line => {
      const statusCode = line.substring(0, 2)
      const filePath = line.substring(3)

      let status = 'unknown'
      if (statusCode.includes('M')) status = 'modified'
      else if (statusCode.includes('A')) status = 'added'
      else if (statusCode.includes('D')) status = 'deleted'
      else if (statusCode.includes('?')) status = 'untracked'
      else if (statusCode.includes('R')) status = 'renamed'

      return { path: filePath, status }
    })

    return {
      branch,
      lastCommit,
      hasChanges: files.length > 0,
      files
    }
  } catch (err) {
    return {
      error: err.message,
      branch: 'unknown',
      hasChanges: false,
      files: []
    }
  }
}

/**
 * Get the diff of current changes
 * @param {string} repoDir - The repository directory
 * @returns {Promise<string>} The diff output
 */
export async function gitDiff(repoDir) {
  try {
    // Get both staged and unstaged changes
    const stagedDiff = await gitExec(repoDir, 'diff --cached')
    const unstagedDiff = await gitExec(repoDir, 'diff')

    let result = ''

    if (stagedDiff) {
      result += '=== Staged Changes ===\n' + stagedDiff + '\n'
    }

    if (unstagedDiff) {
      result += '=== Unstaged Changes ===\n' + unstagedDiff + '\n'
    }

    if (!result) {
      // Check for untracked files
      const status = await gitExec(repoDir, 'status --porcelain')
      const untrackedFiles = status.split('\n')
        .filter(line => line.startsWith('??'))
        .map(line => line.substring(3))

      if (untrackedFiles.length > 0) {
        result = '=== Untracked Files ===\n' + untrackedFiles.join('\n')
      }
    }

    return result || 'No changes detected'
  } catch (err) {
    return `Error getting diff: ${err.message}`
  }
}

/**
 * Stage and commit changes
 * @param {string} repoDir - The repository directory
 * @param {string} message - The commit message
 * @param {string} authorName - The author name
 * @param {string} authorEmail - The author email
 * @returns {Promise<Object>} Commit result
 */
export async function gitCommit(repoDir, message, authorName, authorEmail) {
  try {
    // Stage all changes (content and locales)
    await gitExec(repoDir, 'add content/ locales/')

    // Check if there are any staged changes
    const status = await gitExec(repoDir, 'status --porcelain')
    const stagedFiles = status.split('\n').filter(line => {
      const statusCode = line.substring(0, 2)
      // Files with changes in the index (first column is not space or ?)
      return line && statusCode[0] !== ' ' && statusCode[0] !== '?'
    })

    if (stagedFiles.length === 0) {
      return {
        success: false,
        message: 'No changes to commit'
      }
    }

    // Commit with author information
    const sanitizedMessage = message.replace(/"/g, '\\"').replace(/\n/g, ' ')
    const sanitizedName = authorName.replace(/"/g, '\\"')
    const sanitizedEmail = authorEmail.replace(/"/g, '\\"')

    const commitCommand = `commit -m "${sanitizedMessage}" --author="${sanitizedName} <${sanitizedEmail}>"`
    const commitOutput = await gitExec(repoDir, commitCommand)

    // Get the commit hash
    const commitHash = await gitExec(repoDir, 'rev-parse --short HEAD')

    return {
      success: true,
      message: 'Changes committed successfully',
      commitHash,
      output: commitOutput,
      files: stagedFiles.map(line => line.substring(3))
    }
  } catch (err) {
    return {
      success: false,
      message: `Commit failed: ${err.message}`,
      error: err.message
    }
  }
}

/**
 * Get commit history
 * @param {string} repoDir - The repository directory
 * @param {number} count - Number of commits to retrieve
 * @returns {Promise<Array>} Array of commit objects
 */
export async function gitLog(repoDir, count = 10) {
  try {
    const log = await gitExec(repoDir, `log -${count} --format="%H|%h|%an|%ae|%s|%ci"`)

    return log.split('\n').filter(Boolean).map(line => {
      const [hash, shortHash, author, email, message, date] = line.split('|')
      return { hash, shortHash, author, email, message, date }
    })
  } catch (err) {
    return []
  }
}

/**
 * Discard changes to a specific file
 * @param {string} repoDir - The repository directory
 * @param {string} filePath - The file path to discard
 * @returns {Promise<Object>} Result of the operation
 */
export async function gitDiscardFile(repoDir, filePath) {
  try {
    // Sanitize the file path
    const sanitizedPath = filePath.replace(/"/g, '\\"')
    await gitExec(repoDir, `checkout -- "${sanitizedPath}"`)

    return { success: true, message: `Discarded changes to ${filePath}` }
  } catch (err) {
    return { success: false, message: err.message }
  }
}

/**
 * Discard all changes
 * @param {string} repoDir - The repository directory
 * @returns {Promise<Object>} Result of the operation
 */
export async function gitDiscardAll(repoDir) {
  try {
    await gitExec(repoDir, 'checkout -- .')
    await gitExec(repoDir, 'clean -fd')

    return { success: true, message: 'All changes discarded' }
  } catch (err) {
    return { success: false, message: err.message }
  }
}

/**
 * List all branches (local and remote)
 * @param {string} repoDir - The repository directory
 * @returns {Promise<Object>} Object with local and remote branches
 */
export async function gitListBranches(repoDir) {
  try {
    // Get current branch
    const currentBranch = await gitExec(repoDir, 'rev-parse --abbrev-ref HEAD')

    // Get local branches
    const localOutput = await gitExec(repoDir, 'branch --format="%(refname:short)"')
    const localBranches = localOutput.split('\n').filter(Boolean)

    // Get remote branches
    let remoteBranches = []
    try {
      const remoteOutput = await gitExec(repoDir, 'branch -r --format="%(refname:short)"')
      remoteBranches = remoteOutput.split('\n')
        .filter(Boolean)
        .filter(b => !b.includes('HEAD'))
        .map(b => b.replace(/^origin\//, ''))
    } catch {
      // No remotes configured
    }

    // Get remote URL if available
    let remoteUrl = null
    try {
      remoteUrl = await gitExec(repoDir, 'remote get-url origin')
    } catch {
      // No remote configured
    }

    return {
      current: currentBranch,
      local: localBranches,
      remote: remoteBranches,
      remoteUrl
    }
  } catch (err) {
    return {
      error: err.message,
      current: 'unknown',
      local: [],
      remote: [],
      remoteUrl: null
    }
  }
}

/**
 * Switch to a different branch
 * @param {string} repoDir - The repository directory
 * @param {string} branchName - The branch to switch to
 * @returns {Promise<Object>} Result of the operation
 */
export async function gitCheckoutBranch(repoDir, branchName) {
  try {
    // Sanitize branch name
    const sanitizedBranch = branchName.replace(/[^a-zA-Z0-9_\-\/\.]/g, '')

    // Check for uncommitted changes
    const status = await gitExec(repoDir, 'status --porcelain')
    if (status.trim()) {
      return {
        success: false,
        message: 'Cannot switch branches with uncommitted changes. Please commit or discard your changes first.'
      }
    }

    await gitExec(repoDir, `checkout ${sanitizedBranch}`)
    const currentBranch = await gitExec(repoDir, 'rev-parse --abbrev-ref HEAD')

    return {
      success: true,
      message: `Switched to branch '${currentBranch}'`,
      branch: currentBranch
    }
  } catch (err) {
    return { success: false, message: err.message }
  }
}

/**
 * Create a new branch
 * @param {string} repoDir - The repository directory
 * @param {string} branchName - The name for the new branch
 * @param {boolean} checkout - Whether to switch to the new branch
 * @returns {Promise<Object>} Result of the operation
 */
export async function gitCreateBranch(repoDir, branchName, checkout = true) {
  try {
    // Sanitize branch name
    const sanitizedBranch = branchName.replace(/[^a-zA-Z0-9_\-\/\.]/g, '')

    if (!sanitizedBranch) {
      return { success: false, message: 'Invalid branch name' }
    }

    if (checkout) {
      await gitExec(repoDir, `checkout -b ${sanitizedBranch}`)
    } else {
      await gitExec(repoDir, `branch ${sanitizedBranch}`)
    }

    return {
      success: true,
      message: `Created branch '${sanitizedBranch}'${checkout ? ' and switched to it' : ''}`,
      branch: sanitizedBranch
    }
  } catch (err) {
    return { success: false, message: err.message }
  }
}

/**
 * Delete a branch
 * @param {string} repoDir - The repository directory
 * @param {string} branchName - The branch to delete
 * @param {boolean} force - Force delete even if not merged
 * @returns {Promise<Object>} Result of the operation
 */
export async function gitDeleteBranch(repoDir, branchName, force = false) {
  try {
    // Sanitize branch name
    const sanitizedBranch = branchName.replace(/[^a-zA-Z0-9_\-\/\.]/g, '')

    // Don't allow deleting current branch
    const currentBranch = await gitExec(repoDir, 'rev-parse --abbrev-ref HEAD')
    if (currentBranch === sanitizedBranch) {
      return { success: false, message: 'Cannot delete the current branch' }
    }

    // Don't allow deleting main/master
    if (['main', 'master'].includes(sanitizedBranch)) {
      return { success: false, message: 'Cannot delete main/master branch' }
    }

    const flag = force ? '-D' : '-d'
    await gitExec(repoDir, `branch ${flag} ${sanitizedBranch}`)

    return {
      success: true,
      message: `Deleted branch '${sanitizedBranch}'`
    }
  } catch (err) {
    return { success: false, message: err.message }
  }
}

/**
 * Fetch from remote
 * @param {string} repoDir - The repository directory
 * @returns {Promise<Object>} Result of the operation
 */
export async function gitFetch(repoDir) {
  try {
    await gitExec(repoDir, 'fetch --all --prune')
    return { success: true, message: 'Fetched from remote' }
  } catch (err) {
    return { success: false, message: err.message }
  }
}

/**
 * Pull from remote
 * @param {string} repoDir - The repository directory
 * @returns {Promise<Object>} Result of the operation
 */
export async function gitPull(repoDir) {
  try {
    const output = await gitExec(repoDir, 'pull')
    return { success: true, message: output || 'Already up to date' }
  } catch (err) {
    return { success: false, message: err.message }
  }
}

/**
 * Push to remote
 * @param {string} repoDir - The repository directory
 * @param {boolean} setUpstream - Set upstream for new branches
 * @returns {Promise<Object>} Result of the operation
 */
export async function gitPush(repoDir, setUpstream = false) {
  try {
    const currentBranch = await gitExec(repoDir, 'rev-parse --abbrev-ref HEAD')
    const command = setUpstream ? `push -u origin ${currentBranch}` : 'push'
    const output = await gitExec(repoDir, command)
    return { success: true, message: output || 'Pushed successfully' }
  } catch (err) {
    return { success: false, message: err.message }
  }
}
