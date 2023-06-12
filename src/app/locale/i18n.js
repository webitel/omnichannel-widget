import { createI18n } from 'vue-i18n';
import en from './en/en';
import ua from './ua/ua';
import ru from './ru/ru';
import datetimeFormats from './dateTimeFormats';

const messages = {
  en,
  ua,
  ru,
};

export default createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  datetimeFormats,
  messages,
});
