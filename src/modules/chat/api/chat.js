import axios from 'axios';

const sendFile = async ({
  uri,
  file,
  onUploadProgress,
}) => {
  const url = `${uri.replace('ws', 'http')}?filename=${file.name}`;
  const headers = {
    'Content-Type': file.type,
  };
  const response = await axios.post(url, file, { headers, onUploadProgress, withCredentials: true });
  return response.data;
};

export default {
  sendFile,
};
