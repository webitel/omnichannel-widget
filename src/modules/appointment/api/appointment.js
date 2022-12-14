import qs from 'qs';
import instance from '../../../app/api/instance.axios';

const getAppointment = async (url) => instance.get(url);
const postAppointment = async (baseUrl, {
  destination,
  name,
  scheduleDate: date,
  scheduleTime: time,
  variables,
}) => {
  const data = {
    destination,
    name,
    date,
    time,
    email: variables.email,
    massage: variables.message,
  };
  const url = baseUrl.concat(`/create?${qs.stringify(data)}`);
  return instance.get(url);
};
const deleteAppointment = async (baseUrl) => {
  const url = baseUrl.concat('/cancel');
  return instance.delete(url);
};

const AppointmentAPI = {
  getAppointment,
  postAppointment,
  deleteAppointment,
};

export default AppointmentAPI;
