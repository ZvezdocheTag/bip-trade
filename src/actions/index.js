export const SOCKET_BITTREX_MARKET = 'SOCKET_BITTREX_MARKET'
export const SET_CURRENT_PAIR = 'SET_CURRENT_PAIR'
export const SET_ALARM_PAIR = 'SET_ALARM_PAIR'
export const PUSH_PAIR_NOTIFICATION = 'PUSH_PAIR_NOTIFICATION' 




















export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

export const selectReddit = reddit => ({
  type: SELECT_REDDIT,
  reddit
})

export const invalidateReddit = reddit => ({
  type: INVALIDATE_REDDIT,
  reddit
})

export const requestPosts = reddit => ({
  type: REQUEST_POSTS,
  reddit
})

export const receivePosts = (reddit, json) => ({
  type: RECEIVE_POSTS,
  reddit,
  posts: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})

const fetchPosts = reddit => dispatch => {
  dispatch(requestPosts(reddit))
  return fetch(`https://www.reddit.com/r/${reddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(reddit, json)))
}

const shouldFetchPosts = (state, reddit) => {
  const posts = state.postsByReddit[reddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded = reddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), reddit)) {
    return dispatch(fetchPosts(reddit))
  }
}
