import constants from '../../utils/constants';

const defaultState = {
  processing: false,
  history: [],
};

export default function historyReducer(state = defaultState, action) {
  switch (action.type) {
    case constants.history.SET_HISTORY:
      return {
        ...state,
        history: action.payload.history,
      };
    case constants.history.TOGGLE_PROCESSING:
      return {
        ...state,
        processing: action.payload.processing,
      };
    case constants.history.CLEAR_HISTORY:
      return {
        ...state,
        processing: false,
        history: [],
      };

    default:
      return state;
  }
}
