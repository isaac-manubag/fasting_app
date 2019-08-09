import constants from '../../utils/constants';

const defaultState = {
  processing: false,
  activeFast: {
    id: null,
    title: null,
    start: null,
    end: null,
  },
  history: [],
};

export default function fastsReducer(state = defaultState, action) {
  switch (action.type) {
    case constants.fast.SET_ACTIVE_FAST:
      console.log(action.payload);
      const { id, start, end, title } = action.payload;
      return {
        ...state,
        activeFast: {
          id,
          title,
          start,
          end,
        },
      };
    case constants.fast.REMOVE_ACTIVE_FAST:
      return {
        ...state,
        activeFast: {
          id: null,
          title: null,
          start: null,
          end: null,
        },
      };

    case constants.fast.TOGGLE_PROCESSING:
      return {
        ...state,
        processing: action.payload.processing,
      };

    default:
      return state;
  }
}
