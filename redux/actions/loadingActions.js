import { LOADING } from "../types";

export const setLoading = (id) => {
  return { type: LOADING, payload: id };
};
