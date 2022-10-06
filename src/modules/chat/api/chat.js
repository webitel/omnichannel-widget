import axios from 'axios';

const sendFileInstance = axios.create({
  withCredentials: true,
});

const sendFile = async ({
                          uri,
                          file,
                          onUploadProgress,
                          cancelToken,
                        }) => {
  const url = `${uri.replace('ws', 'http')}?filename=${file.name}`;
  const headers = {
    'Content-Type': file.type,
  };
  const response = await sendFileInstance.post(url, file, {
    headers,
    onUploadProgress,
    cancelToken: cancelToken.token,
  });
  return response.data;
};

export default {
  sendFile,
};
