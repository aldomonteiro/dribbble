import reducer from '../';
import { mockData } from '../../testUtils';

describe('REDUCERS', () => {
  it('should return the initial state', () =>
    expect(reducer(undefined, {})).toEqual({})
  )
  it('should handle "FETCH_SHOTS" action', () => {
    expect(reducer({}, { type: 'FETCH_SHOTS' })).toEqual({ loading_shots: true })
  })
  it('should handle "FETCH_SHOTS_SUCCEEDED" action', () => {
    expect(reducer({}, { type: 'FETCH_SHOTS_SUCCEEDED', shots: mockData }))
      .toEqual({ shots: mockData, loading_shots: false })
  })
  it('should handle "FETCH_SHOTS_FAILED" action', () => {
    expect(reducer({}, { type: 'FETCH_SHOTS_FAILED', error: "error message" }))
      .toEqual({ error_shots: "error message", loading_shots: false })
  })
  it('should handle "FETCH_SHOT" action', () => {
    expect(reducer({}, { type: 'FETCH_SHOT' })).toEqual({ loading_shot: true })
  })
  it('should handle "FETCH_SHOT_SUCCEEDED" action', () => {
    expect(reducer({}, { type: 'FETCH_SHOT_SUCCEEDED', shot: { any: 'data' } }))
      .toEqual({ shot: { any: 'data' }, loading_shot: false })
  })
  it('should handle "FETCH_SHOT_FAILED" action', () => {
    expect(reducer({}, { type: 'FETCH_SHOT_FAILED', error: "error message" }))
      .toEqual({ error_shot: "error message", loading_shot: false })
  })
})