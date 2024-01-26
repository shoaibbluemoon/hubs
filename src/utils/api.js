// for asmetaverse
// export const BASE_URL = 'https://bluemoon-opensea.nw.r.appspot.com';

export const BASE_URL = 'http://localhost:2000';
// export const BASE_URL = 'https://vision.staging.bluemoon.io';
// for spaces
// export const BASE_URL = 'https://bluemoon-metaverse.nw.r.appspot.com';
export const URL = 'https://metaverse-api.quecko.com';
export const TESTNETS_API = 'https://testnets-api.opensea.io/api/v1';

const MAINNET = false;

// for asmetaverse
export const CAPTCHA_API_KEY = '6LcX7g8hAAAAALu89pr9Uz32fYX-DpDFlzYkWb_o';
// for spaces
// export const CAPTCHA_API_KEY = '6Ler4OsjAAAAAB1n-lMyRmpEnv7qykPfSsJFrSq_';

// for asmetaverse
// export const DOMAIN = 'https://asmetaverse.click/';
export const DOMAIN = 'https://bluemoonmeta.com/';
// for spaces
// export const DOMAIN = 'https://spaces.bluemoon.io/';

// URL for iframe
// export const iframeURL = 'https://d1oah3ppj6qtjj.cloudfront.net';
export const iframeURL = 'http://localhost:3000';
// for spaces
// export const iframeURL = 'https://d14lgw8vwp7afv.cloudfront.net';

export const API_ENDPOINTS = {
  LIST_ASSETS: '/listassets',
  GET_ASSET: '/getasset',
  TRANSACTION_HISTORY: '/transactionhistory',
  COMMIT_TRANSACTION: '/committransaction',
  GET_DETAILS: '/mydetails',
  CREATE_ROOM: '/createroom',
  ROOM_DETAILS: '/roomdetails',
  SCENE_DETAILS: '/scenedetails',
  SAVE_ASSET: '/saveasset',
  GET_ROOMS_LIST: '/roomslist',
  PLACE_ASSET: '/placeasset',
  PLACE_NON_NFT_ASSET: '/placenonenftasset',
  ROOM_ASSETS_LIST: '/roomassetslist',
  SET_ROOM_USERNAME: '/setroomusername',
  GET_ROOM_USERNAME_LIST: '/getroomusernamelist',
  GET_ROOM_USERNAME_WALLET: '/getroomusernamewallet',
  TOGGLE_BAN_USER: '/togglebanuser',
  TOGGLE_MESSAGE_BAN_USER: '/togglemessagebanuser',
  EXIT_ROOM: '/exitroom',
  ADD_FOLLOWER: '/user/addFollower',
  REMOVE_FOLLOWER: '/user/removeFollower',
  GET_USER: '/user/getUser',
  USER_ROOMS_SEARCH: '/userroomssearch',
  REMOVE_NFT_OWNER: '/removenftowner',
};

export const getAsset = async (modelurl) => {
  const url = `${BASE_URL}${API_ENDPOINTS.GET_ASSET}`;
  // const token = window.localStorage.getItem('token');
  const body = { modelurl };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const assetInfo = await res.json();

    return assetInfo.data;
  } catch (e) {
    console.error(e);
  }
};

export const placeAsset = async (asset) => {
  const url = `${BASE_URL}${API_ENDPOINTS.PLACE_ASSET}`;
  const token = window.localStorage.getItem('token');
  const body = asset;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const { success } = await res.json();

    if (success === 'NFT placed') {
      return true;
    } else if (success === 'NFT removed') {
      return false;
    } else {
      throw new Error('Something wrong with API');
    }
  } catch (e) {
    console.error(e);
  }
};

export const placeNonNFTAsset = async (asset) => {
  const url = `${BASE_URL}${API_ENDPOINTS.PLACE_NON_NFT_ASSET}`;
  const token = window.localStorage.getItem('token');
  const body = asset;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const success = await res.text();

    if (success === 'Asset placed') {
      return true;
    } else if (success === 'Asset removed') {
      return false;
    } else {
      throw new Error('Something wrong with API');
    }
  } catch (e) {
    console.error(e);
  }
};

export const removeNftOwner = async (modelUrl) => {
  try {
    const url = `${BASE_URL}${API_ENDPOINTS.REMOVE_NFT_OWNER}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ modelUrl }),
    });

    const data = await response.text();

    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

export const checkUserNft = async (user) => {
  try {
    const isMainnet = MAINNET;
    const API_URL = isMainnet
      ? 'https://api.etherscan.io/api?module=account&action=tokennfttx'
      : 'https://api-goerli.etherscan.io/api?module=account&action=tokennfttx';
    const API_KEY = 'I7JSZUN1YZ7PUWEC5XCQ7K5Y8V1686DQKY';
    const url = `${API_URL}&address=${user}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    return data.result;
  } catch (error) {
    console.log(error);
  }
};

export const roomAssetsList = async (roomid) => {
  const url = `${BASE_URL}${API_ENDPOINTS.ROOM_ASSETS_LIST}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ roomid }),
    });

    const { data } = await res.json();

    // data.push({
    //   ASSET_TYPE: 'nft',
    //   NAME: '',
    //   ASSETSTORAGEREF: 'https://image.png',
    //   ITEM_ADDRESS: 'ETHEREUM:0xd8560c88d1dc85f9ed05b25878e366c49b68bef9:2',
    // });

    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const postRoomUsername = async (roomid, username) => {
  const url = `${BASE_URL}${API_ENDPOINTS.SET_ROOM_USERNAME}`;
  const token = window.localStorage.getItem('token');
  const body = {
    roomid,
    username,
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const { success } = await res.json();

    return !!success;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getRoomUsernameWallet = async (roomid, username) => {
  const url = `${BASE_URL}${API_ENDPOINTS.GET_ROOM_USERNAME_WALLET}`;
  const token = window.localStorage.getItem('token');
  const body = {
    roomid,
    username,
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const { data } = await res.json();

    return data.WALLETID;
  } catch (e) {
    console.log(e);
    return '';
  }
};

export const toggleBanUser = async (walletid, banreason) => {
  const url = `${BASE_URL}${API_ENDPOINTS.TOGGLE_BAN_USER}`;
  const token = window.localStorage.getItem('token-admin');
  const body = {
    walletid,
    banreason,
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const { success } = await res.json();

    if (success === 'User active bool set to 1') {
      // Not banned user
      return false;
    } else if (success === 'User active bool set to 0') {
      // Banned user
      return true;
    } else {
      throw Error('Something wrong!');
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const toggleMessageBanUser = async (walletid) => {
  const url = `${BASE_URL}${API_ENDPOINTS.TOGGLE_MESSAGE_BAN_USER}`;
  const token = window.localStorage.getItem('token-admin');
  const body = {
    walletid,
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const { success } = await res.json();

    if (success === 'User can-message bool set to 1') {
      // not banned
      return false;
    } else if (success === 'User can-message bool set to 0') {
      // banned messaging
      return true;
    } else {
      throw Error('Something wrong!');
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const exitRoom = async (roomid) => {
  const url = `${BASE_URL}${API_ENDPOINTS.EXIT_ROOM}`;
  const token = window.localStorage.getItem('token');
  const body = {
    roomid,
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      'keep-alive': true,
      body: JSON.stringify(body),
    });
  } catch (e) {
    console.log(e);
  }
};

export const followUser = async (myWalletAddress, userWalletAddress) => {
  const token = window.localStorage.getItem('metaverse-token');

  const url = `${URL}${API_ENDPOINTS.ADD_FOLLOWER}`;
  const body = {
    walletAddress: myWalletAddress,
    toFollow: userWalletAddress,
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(res.statusText);

    return await res.json();
  } catch (e) {
    console.log(e);
    return { error: e.message };
  }
};

export const unfollowUser = async (myWalletAddress, userWalletAddress) => {
  const token = window.localStorage.getItem('metaverse-token');

  const url = `${URL}${API_ENDPOINTS.REMOVE_FOLLOWER}`;
  const body = {
    walletAddress: myWalletAddress,
    toFollow: userWalletAddress,
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(res.statusText);

    return await res.json();
  } catch (e) {
    console.log(e);
    return { error: e.message };
  }
};

export const getUserRooms = async (walletId) => {
  const token = window.localStorage.getItem('token');

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      pagenum: '1',
      param: walletId,
    }),
  };

  const res = await fetch(`${BASE_URL}${API_ENDPOINTS.USER_ROOMS_SEARCH}`, requestOptions);
  return await res.json();
};

export const getUserWallet = async (roomid, username) => {
  const token = window.localStorage.getItem('token');

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ roomid, username }),
  };

  const res = await fetch(`${BASE_URL}${API_ENDPOINTS.GET_ROOM_USERNAME_WALLET}`, requestOptions);
  return await res.json();
};

export const getUser = async (walletAddress) => {
  const token = window.localStorage.getItem('token');

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ walletAddress }),
  };

  const res = await fetch(`${URL}${API_ENDPOINTS.GET_USER}`, requestOptions);
  return await res.json();
};

// export const testEnd = async () => {
//     const url = "http://localhost:3000/posts";
//     const body = { "title": "test2", "author": "test1" }
//
//     try {
//         await fetch(url, {
//             method: "POST",
//             headers: {
//                 "Content-type": "application/json"
//             },
//             "keep-alive": true,
//             body: JSON.stringify(body)
//         });
//     } catch (e) {
//     }
// }
