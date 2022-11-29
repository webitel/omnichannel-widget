import instance from '../../../app/api/instance.axios';

const getAppointment = async (url) => instance.get(url);
const postAppointment = async (url, form) => instance.post(url, form);
const deleteAppointment = async (url) => instance.delete(url);

const AppointmentAPI = {
  getAppointment,
  postAppointment,
  deleteAppointment,
};

export default AppointmentAPI;
