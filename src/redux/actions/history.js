import constants from '../../utils/constants';

export const toggleProcessing = processing => ({
  type: constants.history.TOGGLE_PROCESSING,
  payload: {
    processing,
  },
});

export const getHistory = () => ({
  type: constants.history.GET_HISTORY,
});

export const clearHistory = () => ({
  type: constants.history.CLEAR_HISTORY,
});

export const setHistory = history => ({
  type: constants.history.SET_HISTORY,
  payload: {
    history,
  },
});
