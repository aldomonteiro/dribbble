import { put, takeLatest } from 'redux-saga/effects';
import { watchFetchShots, fetchShots, watchFetchShot, fetchShot } from '../'

describe('SAGAS', () => {
  it('should dispatch action "FETCH_SHOTS" ', () => {
    const generator = watchFetchShots();
    expect(generator.next().value)
      .toEqual(takeLatest('FETCH_SHOTS', fetchShots));
    expect(generator.next().done).toBeTruthy();
  })

  it('should dispatch action "FETCH_SHOTS_SUCCEEDED" with result from fetchShots API', () => {
    const mockResponse = {
      "mock_prop": "mock_content",
    };

    const generator = fetchShots();
    generator.next(); // invokes the "call" into fetchShots generator

    // passing the mockResponse as next parameter to set it as the value of the generator.
    // so, it isn't needed to check real results from the api.
    expect(generator.next(mockResponse).value)
      .toEqual(put({ type: 'FETCH_SHOTS_SUCCEEDED', shots: { "mock_prop": "mock_content" } }))
    expect(generator.next().done).toBeTruthy();
  })
})