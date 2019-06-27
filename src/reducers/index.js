import * as actions from '../actions';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case actions.FETCH_SHOTS:
      return { ...state, loading_shots: true };
    case actions.FETCH_SHOTS_SUCCEEDED:
      return { ...state, error_shots: undefined, error_shot: undefined, shots: action.shots, loading_shots: false }
    case actions.FETCH_SHOTS_FAILED:
      return { ...state, error_shots: action.error, loading_shots: false }
    case actions.FETCH_SHOT:
      return { ...state, loading_shot: true };
    case actions.FETCH_SHOT_SUCCEEDED:
      return { ...state, shot: action.shot, error_shot: undefined, loading_shot: false }
    case actions.FETCH_SHOT_FAILED:
      return { ...state, error_shot: action.error, loading_shot: false }
    case actions.RESET_ERRORS:
      return { ...state, error_shots: undefined, error_shot: undefined, loading_shots: false }
    default:
      return state;
  }
};

export default reducer;