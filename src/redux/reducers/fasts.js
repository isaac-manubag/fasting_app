import constants from '../../utils/constants';

const defaultState = {
  activeFast: {
    id: null,
    start: null,
    end: null,
  },
  history: [],
};

export default function fastsReducer(state = defaultState, action) {
  switch (action.type) {
    case constants.fast.SET_ACTIVE_FAST:
      const { id, start, end } = action.payload;
      return {
        ...state,
        activeFast: {
          id,
          start,
          end,
        },
      };

    default:
      return state;
  }
}
