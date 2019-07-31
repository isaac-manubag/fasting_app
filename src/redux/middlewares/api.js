import axios from "axios";
import constants from "../../utils/constants";

axios.defaults.timeout = 30000;

export default ({ dispatch }) => next => action => {
  /* eslint-disable no-console */
  console.log(action.type);

  if (action.type === constants.app.API_REQUEST) {
    const { method, url, headers, onSuccess, onError, etc } = action.meta;
    const requestBody = action.payload;

    console.log("requestBody", requestBody);
    console.log("method", method);
    console.log("url", url);
    console.log("headers", headers);

    if (method.toLowerCase() === "post") {
      axios
        .post(url, requestBody, {
          headers
        })
        .then(res =>
          dispatch({
            type: onSuccess,
            payload: res.data,
            etc
          })
        )
        .catch(err => {
          dispatch({
            type: onError,
            payload: err.response,
            etc
          });
        });
    } else if (method.toLowerCase() === "get") {
      axios
        .get(url, {
          params: requestBody,
          headers
        })
        .then(res =>
          dispatch({
            type: onSuccess,
            payload: res.data,
            etc
          })
        )
        .catch(err => {
          dispatch({
            type: onError,
            payload: err.response,
            etc
          });
        });
    }
  }

  return next(action);
};
