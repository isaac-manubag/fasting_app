import constants from '../../utils/constants';

export const startFast = item => ({
  type: constants.fast.START_FAST,
  payload: {
    item,
  },
});

export const setActiveFast = (id, title, start, end) => ({
  type: constants.fast.SET_ACTIVE_FAST,
  payload: {
    id,
    title,
    start,
    end,
  },
});

export const removeActiveFast = () => ({
  type: constants.fast.REMOVE_ACTIVE_FAST,
});
