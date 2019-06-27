import reducer from '../';

describe('REDUCER', () => {
  it('should return the initial state', () =>
    expect(reducer(undefined, {})).toEqual({})
  )
  it('should handle "FETCH_SHOTS" action', () => {
    expect(reducer({}, { type: 'FETCH_SHOTS' })).toEqual({ loading_shots: true })
  })
  it('should handle "FETCH_SHOTS_SUCCEEDED" action', () => {
    const mockData = [
      {
        "animated": false,
        "description": "Description",
        "height": 2345,
        "html_url": "https://dribbble.com/shots/6666726-Golden-Bitcoin-Currency",
        "id": 6666726,
        "images": {
          "hidpi": "https://cdn.dribbble.com/users/3741470/screenshots/6666726/andre-francois-mckenzie-518771-unsplash.jpg",
          "normal": "https://cdn.dribbble.com/users/3741470/screenshots/6666726/andre-francois-mckenzie-518771-unsplash_1x.jpg",
          "one_x": "https://cdn.dribbble.com/users/3741470/screenshots/6666726/andre-francois-mckenzie-518771-unsplash_1x.jpg",
          "two_x": "https://cdn.dribbble.com/users/3741470/screenshots/6666726/andre-francois-mckenzie-518771-unsplash_2x.jpg",
          "four_x": "https://cdn.dribbble.com/users/3741470/screenshots/6666726/andre-francois-mckenzie-518771-unsplash_4x.jpg",
          "six_x": "https://cdn.dribbble.com/users/3741470/screenshots/6666726/andre-francois-mckenzie-518771-unsplash_6x.jpg",
          "teaser": "https://cdn.dribbble.com/users/3741470/screenshots/6666726/andre-francois-mckenzie-518771-unsplash_teaser.jpg"
        },
        "low_profile": false,
        "tags": [
          "illustration",
          "photography",
          "photoshop"
        ],
        "title": "Golden Bitcoin Currency",
        "width": 3127,
        "published_at": "2019-06-21T16:06:34Z",
        "updated_at": "2019-06-21T16:06:34Z",
        "attachments": [],
        "projects": [],
        "video": null
      }
    ];
    expect(reducer({}, { type: 'FETCH_SHOTS_SUCCEEDED', shots: mockData }))
      .toEqual({ shots: mockData, loading_shots: false })
  })
})