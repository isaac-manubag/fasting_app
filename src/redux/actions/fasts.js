import constants from '../../utils/constants';

export const setActiveFast = (id, start, end) => ({
  type: constants.fast.SET_ACTIVE_FAST,
  payload: {
    id,
    start,
    end,
  },
});
