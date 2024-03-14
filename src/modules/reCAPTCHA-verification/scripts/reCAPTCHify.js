import store from '../../../app/store';
import reCAPTCHA from '../api/reCAPTCHA';

const reCAPTCHify = async (callback, {
  action = 'default_action',
} = {}) => {
  try {
    if (!store.state.config.captcha) return callback();

    const token = await reCAPTCHA.executeReCAPTCHA({ action });
    const response = await reCAPTCHA.verifyReCAPTCHA(token);
    return callback(response);
  } catch (err) {
    throw err || new Error('unknown reCAPTCHA error');
  }
};

export default reCAPTCHify;
