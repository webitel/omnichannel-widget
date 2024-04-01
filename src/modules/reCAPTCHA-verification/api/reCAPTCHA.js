import instance from '../../../app/api/instance.axios';

let sitekey = null;
let verifyUrl = null;

export const initializeReCAPTCHA = async ({ sitekey: _sitekey, verifyUrl: _verifyUrl }) => {
  sitekey = _sitekey;
  verifyUrl = _verifyUrl;

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${sitekey}`;
    // script.async = true;
    document.head.appendChild(script);

    script.onload = () => resolve();
  });
};

const executeReCAPTCHA = ({ action }) => window.grecaptcha.execute(sitekey, { action });

const verifyReCAPTCHA = async (token) => {
  const url = `${verifyUrl}?response=${token}`;
  // if throws error, then isn't verified
  const result = await instance.get(url);
  if (!result.success) {
    throw new Error('reCAPTCHA verification failed');
  }
  return result;
};

const reCAPTCHA = {
  executeReCAPTCHA,
  verifyReCAPTCHA,
};

export default reCAPTCHA;
