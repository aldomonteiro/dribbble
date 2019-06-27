import * as actions from '../';

describe('ACTIONS', () => {
  it('should create an action with correct type', () => {
    const expectedAction = {
      type: 'FETCH_SHOTS'
    }
    expect(actions.fetchShots()).toEqual(expectedAction);
  })
})