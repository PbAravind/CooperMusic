const setUserInfo = (store, { userId, albums, playlists, subscription, loginDevice }) => {
  store.setState({ userId, albums, playlists, subscription, loginDevice })
}

export default setUserInfo;