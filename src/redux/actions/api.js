import constants from '../../utils/constants';

export default (method, url, body, headers, onSuccess, onError, ...rest) => ({
  type: constants.app.API_REQUEST,
  payload: body,
  meta: Object.assign(
    {
      method,
      url,
      headers,
      onSuccess,
      onError,
    },
    ...rest
  ),
});
