import { LOADING } from "../types";

const INITIAL_STATE = {
  loading: [],
};

const loadingReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOADING:
      if (state.loading.includes(payload)) {
        return {
          ...state,
          loading: state.loading.filter((el) => el !== payload),
        };
      } else
        return {
          ...state,
          loading: [...state.loading, payload],
        };
    default:
      return state;
  }
};

export default loadingReducer;
