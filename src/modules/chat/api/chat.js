import axios from 'axios';
// import instance from '../../../app/api/instance.axios';

/*
* WE DO NOT USE INSTANCE HERE CAUSE INSTANCE HAS CAMEL-SNAKE CONVERTERS
* ON POST REQUEST WHICH ARE INVALIDATING SENT FILE
* */

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
  const response = await axios.post(url, file, {
    withCredentials: true,
    headers,
    onUploadProgress,
    cancelToken: cancelToken.token,
  });

  return response.data;
};

export default {
  sendFile,
};
