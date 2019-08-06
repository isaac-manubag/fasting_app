import constants from '../../utils/constants';

const defaultState = {
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

    default:
      return state;
  }
}
