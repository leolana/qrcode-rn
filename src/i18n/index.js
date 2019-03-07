import english from './en';
import portuguese from './pt';

export const DEFAULT_LOCALE = 'en';

export const Translations = {
  en: english,
  pt: portuguese,
};

export function translate(message, locale = DEFAULT_LOCALE) {
  // We're actually asking for 'something' to be translated
  if (message) {
    // The translation exists AND the message exists in this translation
    if (Translations[locale] && Translations[locale][message]) {
      return Translations[locale][message];
    }

    // Otherwise try in the default translation
    if (Translations[DEFAULT_LOCALE] && Translations[DEFAULT_LOCALE][message]) {
      return Translations[DEFAULT_LOCALE][message];
    }
  }

  return '???';
}
