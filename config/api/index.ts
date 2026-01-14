import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
interface CallAPIProps extends AxiosRequestConfig {
  data?: FormData;
  token?: boolean;
  serverToken?: string;
  contentType?: string;
}

export default async function callAPI({
  url,
  method,
  data,
  token,
  serverToken,
  contentType,
}: CallAPIProps) {
  let headers = {};
  if (serverToken) {
    headers = {
      Authorization: `Bearer ${serverToken}`,
    };
  } else if (token) {
    const tokenCookies = Cookies.get('token');
    if (tokenCookies) {
      const jwtToken = atob(tokenCookies);
      headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
    }
  }
  const isFormData = data instanceof FormData;
  const config: AxiosRequestConfig = {
    url,
    method,
    data,
    headers: {
      ...headers,
    },
  };

  if (!isFormData) {
    (config.headers as any)['Content-Type'] = contentType ? contentType : 'application/json';
  }

  const response = await axios(config).catch((err) => err.response);

  if (!response) {
    return {
      error: true,
      message: 'Network error or server unreachable',
      data: null,
    };
  }

  if (!response) {
    const res = {
      error: true,
      message: 'Error response not received',
      data: null,
    };
    return res;
  }

  if (response.status > 300) {
    const res = {
      error: true,
      message: response.data.message,
      data: null,
    };
    return res;
  }

  const res = {
    error: false,
    message: 'success',
    data: response.data.data !== undefined ? response.data.data : response.data,
  };

  return res;
}
