import {
  CHANGE_SERVICE_FIELD,
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_SUCCESS,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE_SUCCESS,
  REMOVE_SERVICE_REQUEST,
  REMOVE_SERVICE_FAILURE,
  REMOVE_SERVICE_SUCCESS,
  GET_SERVICE_REQUEST,
  GET_SERVICE_FAILURE,
  GET_SERVICE_SUCCESS,
  RESET_SERVICE_FIELDS,
} from "./actionTypes";

export function fetchServicesRequest() {
  return { type: FETCH_SERVICES_REQUEST };
}

export function fetchServicesFailure(error) {
  return { type: FETCH_SERVICES_FAILURE, payload: { error } };
}

export function fetchServicesSuccess(items) {
  return { type: FETCH_SERVICES_SUCCESS, payload: { items } };
}

export function addServiceRequest(name, price, content) {
  return { type: ADD_SERVICE_REQUEST, payload: { name, price, content } };
}

export function addServiceFailure(error) {
  return { type: ADD_SERVICE_FAILURE, payload: { error } };
}

export function addServiceSuccess() {
  return { type: ADD_SERVICE_SUCCESS };
}

export function removeServiceRequest(id) {
  return { type: REMOVE_SERVICE_REQUEST, payload: { id } };
}

export function removeServiceFailure(error, id) {
  return { type: REMOVE_SERVICE_FAILURE, payload: { error, id } };
}

export function removeServiceSuccess(id) {
  return { type: REMOVE_SERVICE_SUCCESS, payload: { id } };
}

export function getServiceRequest() {
  return { type: GET_SERVICE_REQUEST };
}

export function getServiceFailure(error) {
  return { type: GET_SERVICE_FAILURE, payload: { error } };
}

export function getServiceSuccess(item) {
  return { type: GET_SERVICE_SUCCESS, payload: { item } };
}

export function changeServiceField(name, value) {
  return { type: CHANGE_SERVICE_FIELD, payload: { name, value } };
}

export function resetServiceFields() {
  return { type: RESET_SERVICE_FIELDS };
}

export const fetchServices = () => async (dispatch) => {
  dispatch(fetchServicesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchServicesSuccess(data));
  } catch (error) {
    dispatch(fetchServicesFailure(error.message));
  }
};

export const addService =
  (id = 0) =>
  async (dispatch, getState) => {
    dispatch(addServiceRequest());
    const {
      serviceAdd: {
        fields: { name, price, content },
      },
    } = getState();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, price: Number(price), content }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      dispatch(addServiceSuccess());
    } catch (error) {
      dispatch(addServiceFailure(error.message));
    }
  };

export const removeService = (id) => async (dispatch) => {
  dispatch(removeServiceRequest(id));
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (error) {
    dispatch(removeServiceFailure(error.message, id));
  }
  dispatch(removeServiceSuccess(id));
  dispatch(fetchServices());
};

export const getService = (id) => async (dispatch) => {
  dispatch(getServiceRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(getServiceSuccess(data));
  } catch (error) {
    dispatch(getServiceFailure(error.message));
  }
};
