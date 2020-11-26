import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from './types';
import axiosStreams from '../apis/streams';
import history from '../history';

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const { data } = await axiosStreams.post('/streams', {
    ...formValues,
    userId,
  });
  history.push('/');
  dispatch({
    type: CREATE_STREAM,
    payload: data,
  });
};

export const fetchStreams = () => async dispatch => {
  const { data } = await axiosStreams.get('/streams');

  dispatch({
    type: FETCH_STREAMS,
    payload: data,
  });
};

export const fetchStream = id => async dispatch => {
  const { data } = await axiosStreams.get(`/streams/${id}`);

  dispatch({
    type: FETCH_STREAM,
    payload: data,
  });
};

export const deleteStream = id => async dispatch => {
  await axiosStreams.delete(`/streams/${id}`);
  history.push('/');
  dispatch({
    type: DELETE_STREAM,
    payload: id,
  });
};

export const editStream = (id, formValues = {}) => async dispatch => {
  const { data } = await axiosStreams.patch(`/streams/${id}`, formValues);
  history.push('/');
  dispatch({
    type: EDIT_STREAM,
    payload: data,
  });
};
