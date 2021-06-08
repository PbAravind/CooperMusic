import React from 'react';
import globalHook from 'use-global-hook';

import setUserInfo from '../actions'

const initialState = {
  userId: '',
  subscription: null,
  playlists: null,
  albums: null,
  loginDevice: ''
}

const useGlobal = globalHook(React, initialState, { setUserInfo });

export default useGlobal;