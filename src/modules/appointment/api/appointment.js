import instance from '../../../app/api/instance.axios';

const setKey = (key) => localStorage.setItem('wt-appoinment-key', key);
const getKey = () => localStorage.getItem('wt-appoinment-key');

const setExpire = (value) => localStorage.setItem('wt-appointment-key-expire', value);
const getExpire = () => localStorage.getItem('wt-appointment-key-expire');

const clearKey = () => {
  localStorage.removeItem('wt-appoinment-key');
  localStorage.removeItem('wt-appoinment-key-expire');
};

const checkKey = () => {
  if (getExpire() <= Date.now()) clearKey();
};

const generateHeaders = () => {
  checkKey();
  const key = getKey();
  return key ? { 'X-WBT-KEY': key } : {};
};

const getAppointment = async (url) => instance.get(url, { headers: generateHeaders() });
const postAppointment = async (url, form) => {
  const response = await instance.post(url, form);
  const { key, expireKey } = response.appointment;
  setKey(key);
  setExpire(expireKey);
  return response;
};
const deleteAppointment = async (url) => {
  await instance.delete(url, { headers: generateHeaders() });
  clearKey();
};

const AppointmentAPI = {
  getAppointment,
  postAppointment,
  deleteAppointment,
};

export default AppointmentAPI;
