import en from '@/i18n/translations/en';
import es from '@/i18n/translations/es';
import hi from '@/i18n/translations/hi';
import ar from '@/i18n/translations/ar';
import pt from '@/i18n/translations/pt';
import ru from '@/i18n/translations/ru';
import ja from '@/i18n/translations/ja';
import fr from '@/i18n/translations/fr';
import sv from '@/i18n/translations/sv';
import de from '@/i18n/translations/de';
import zh from '@/i18n/translations/zh';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', translation: en },
  { code: 'es', name: 'Español', translation: es },
  { code: 'hi', name: 'हिंदी', translation: hi },
  { code: 'ar', name: 'العربية', translation: ar },
  { code: 'pt', name: 'Português', translation: pt },
  { code: 'ru', name: 'Русский', translation: ru },
  { code: 'ja', name: '日本語', translation: ja },
  { code: 'fr', name: 'Français', translation: fr },
  { code: 'sv', name: 'Svenska', translation: sv },
  { code: 'de', name: 'Deutsch', translation: de },
  { code: 'zh', name: '中文', translation: zh }
] as const;

export const LANGUAGES = SUPPORTED_LANGUAGES.reduce((acc, lang) => {
  acc[lang.code] = { translation: lang.translation };
  return acc;
}, {} as { [key: string]: { translation: any } });

export const LANG_CODES = SUPPORTED_LANGUAGES.map(lang => lang.code); 