import instance from '../../../app/api/instance.axios';

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
  const response = await instance.post(url, file, {
    headers,
    onUploadProgress,
    cancelToken: cancelToken.token,
  });
  return response.data;
};

export default {
  sendFile,
};
