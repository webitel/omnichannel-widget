import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './en/en';
import ua from './ua/ua';
import ru from './ru/ru';
import kz from './kz/kz';
import datetimeFormats from './dateTimeFormats';

Vue.use(VueI18n);

const messages = {
  en,
  ua,
  ru,
  kz
};

export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  datetimeFormats,
  messages,
});
