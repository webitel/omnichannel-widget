import reCAPTCHA from '../api/reCAPTCHA';

const reCAPTCHify = async (callback, {
  action = 'default_action',
} = {}) => {
  try {
    const token = await reCAPTCHA.executeReCAPTCHA({ action });
    const response = await reCAPTCHA.verifyReCAPTCHA(token);
    return callback(response);
  } catch (err) {
    throw err || new Error('unknown reCAPTCHA error');
  }
};

export default reCAPTCHify;
