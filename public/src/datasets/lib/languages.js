import { createLanguageMapper } from 'clownface/lib/languageTag'

const language = [document.documentElement.lang, 'de', 'fr', 'it', '*']
export default language

export function filterTaggedLiterals({ terms }) {
    const languages = (typeof language === 'string' ? [language] : language)
    const getLiteralsForLanguage = createLanguageMapper(terms)

    return languages.map(getLiteralsForLanguage).find(Boolean) || []
}
