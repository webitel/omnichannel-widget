import { config } from '@vue/test-utils';
import en from '../../src/app/locale/en/en';

// register global components
import '../../src/app/components/utils/index';

config.mocks.$i18n = {};
config.mocks.$t = (msg) => en[msg] || msg;
config.mocks.$tc = (msg) => en[msg] || msg;
