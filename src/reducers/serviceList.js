import {
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_SUCCESS,
  REMOVE_SERVICE_REQUEST,
  REMOVE_SERVICE_FAILURE,
  REMOVE_SERVICE_SUCCESS,
} from "../actions/actionTypes";

const initial_state = {
  items: [],
  loading: false,
  error: null,
  deleting: [],
};

export default function ServiceListReducer(state = initial_state, action) {
  switch (action.type) {
    case FETCH_SERVICES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_SERVICES_FAILURE:
      const { error } = action.payload;
      return { ...state, loading: false, error };
    case FETCH_SERVICES_SUCCESS:
      const { items } = action.payload;
      return { ...state, items, loading: false, error: null };
    case REMOVE_SERVICE_REQUEST:
      const { id } = action.payload;
      const deleting = [...state.deleting, id];
      return { ...state, error: null, deleting };
    case REMOVE_SERVICE_FAILURE: {
      const { error, id } = action.payload;
      const deleting = state.deleting.filter((item) => item !== id);
      return { ...state, error, deleting };
    }
    case REMOVE_SERVICE_SUCCESS: {
      const { id } = action.payload;
      const deleting = state.deleting.filter((item) => item !== id);
      return { ...state, error: null, deleting };
    }
    default:
      return state;
  }
}
