import instance from '../../../app/api/instance.axios';

let sitekey = null;

export const initializeReCAPTCHA = async (_sitekey) => {
  sitekey = _sitekey;

  const script = document.createElement('script');
  script.src = `https://www.google.com/recaptcha/api.js?render=${sitekey}`;
  script.async = true;
  document.head.appendChild(script);
};

const executeReCAPTCHA = ({ action }) => window.grecaptcha.execute(sitekey, { action });

const verifyReCAPTCHA = (token) => {
  const url = 'https://dev.webitel.com/api/recaptcha'; // FIXME
  // if throws error, then isn't verified
  return instance.post(url, {
    response: token,
    version: '3',
  });
};

const reCAPTCHA = {
  executeReCAPTCHA,
  verifyReCAPTCHA,
};

export default reCAPTCHA;
