import instance from '../../../app/api/instance.axios';

const getAppointment = async (url) => {
  const response = await instance.get(url);
  return response.data;
};

const AppointmentAPI = {
  getAppointment,
};

export default AppointmentAPI;
