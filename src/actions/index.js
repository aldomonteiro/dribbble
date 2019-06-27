export const FETCH_SHOTS = 'FETCH_SHOTS';
export const FETCH_SHOTS_SUCCEEDED = 'FETCH_SHOTS_SUCCEEDED';
export const FETCH_SHOTS_FAILED = 'FETCH_SHOTS_FAILED';

export const FETCH_SHOT = 'FETCH_SHOT';
export const FETCH_SHOT_SUCCEEDED = 'FETCH_SHOT_SUCCEEDED';
export const FETCH_SHOT_FAILED = 'FETCH_SHOT_FAILED';

export const fetchShots = () => {
  return {
    type: FETCH_SHOTS,
  };
}

export const fetchShot = (shotId) => {
  return {
    type: FETCH_SHOT,
    payload: { shotId: shotId }
  };
}

