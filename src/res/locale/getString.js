import languages from "./index";

export default function (lang, category, string) {
	const currentLang = languages[lang];
	const fallbackLang = languages.en;

	if (currentLang[category]) {
		if (currentLang[category][string]) {
			return currentLang[category][string];
		} else {
			return fallbackLang[category][string];
		}
	} else {
		return fallbackLang[category][string];
	}
}
