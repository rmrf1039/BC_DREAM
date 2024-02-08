/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useMemo, useEffect, useReducer } from 'react';
import { useAccount, useNetwork, useSignMessage, useDisconnect } from 'wagmi'
import { getWalletClient, watchAccount } from '@wagmi/core'
import { useCookies } from 'react-cookie';
import { SiweMessage } from 'siwe'
import axios from 'axios';

const BaseUrl = "http://140.117.71.159:8000"

// Global Setup
axios.defaults.baseURL = BaseUrl;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const AxiosContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'get_nonce': {
      return {
        ...state,
        isNonced: true,
        nonce: action.nonce,
      };
    }

    case 'get_access_token': {
      localStorage.setItem('access_token', action.access_token)

      return {
        ...state,
        isAccessTokenExist: true,
        access_token: action.access_token,
      };
    }

    case 'remove_access_token': {
      return {
        ...state,
        isAccessTokenExist: false,
        access_token: null,
      };
    }

    case 'get_refresh_token': {
      return {
        ...state,
        isRefreshTokenExist: true,
      };
    }

    case 'not_registered': {
      return {
        ...state,
        isRegistered: false,
      };
    }

    case 'get_login': {
      return {
        ...state,
        isLogged: true,
        isRegistered: true,
      };
    }

    case 'logout': {
      return {
        isNonced: false,
        nonce: null,
        isAccessTokenExist: false,
        access_token: null,
        isRefreshTokenExist: false,
        isRegistered: true,
        isLogged: false,
      };
    }

    default: {
      throw Error('Unknown action.');
    }
  }
}

const AxiosProvider = ({ children }) => {
  const { isConnected, address } = useAccount()
  const { chain } = useNetwork()
  const { signMessageAsync } = useSignMessage()
  const { disconnect } = useDisconnect()

  const [cookies, setCookies, removeCookies] = useCookies(['profile']);

  const [state, dispatch] = useReducer(reducer, {
    isNonced: false,
    nonce: null,
    isAccessTokenExist: false,
    access_token: null,
    isRefreshTokenExist: false,
    isRegistered: true,
    isLogged: false,
  });
  const profile = useMemo(() => (
    cookies.profile ? cookies.profile : null
  ), [cookies.profile]);

  const generateMessage = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const walletClient = await getWalletClient()
        const chainId = chain?.id
  
        if (!walletClient) throw Error('not walletClient found');
    
        if (!address || !chainId) reject("address or chain id is invalid")

        const message = new SiweMessage({
          domain: window.location.host,
          address,
          statement: 'Sign in to Gymboy APP.',
          uri: window.location.origin,
          version: '1',
          chainId,
          nonce: state.nonce,
        });

        signMessageAsync({
          message: message.prepareMessage(),
        })
        .then((signature) => {
          resolve({ message : message.prepareMessage(), signature });
        });
  
      } catch(e) {
        reject(e);
      }
    });
  }

  const signup = async (values) => {
    return new Promise((resolve, reject) => {
      const waitingSignature = generateMessage();

      waitingSignature.then(({ message, signature }) => {
        axios.post('/user/signup/', JSON.stringify({
          message,
          signature,
          user: {
          ...values,
          address: address
        }}))
        .then((res) => {
          dispatch({
            type: 'get_access_token',
            access_token: res.data?.tokens?.access,
          });

          localStorage.setItem('refresh_token', res.data?.tokens?.refresh)
          
          // Set in cookie, PWA removed then refetch again to update the newest version
          setCookies('profile', res.data?.user);
          dispatch({ type: 'get_login' });
          resolve();
        })
        .catch(() => {
          reject();
        });
      });
    });
  };

  const signin = async () => {
    return new Promise((resolve, reject) => {
      const waitingSignature = generateMessage();

      waitingSignature.then(({ message, signature }) => {
        axios.post('user/signin/', {
          message,
          signature,
        })
        .then((res) => {
          
          dispatch({
            type: 'get_access_token',
            access_token: res.data?.tokens?.access,
          });

          localStorage.setItem('refresh_token', res.data?.tokens?.refresh)

          setCookies('profile', res.data?.user);
          dispatch({ type: 'get_login' });
          resolve();
        })
        .catch((e) => {
          reject(e);
        });
      })
      .catch((e) => {
        reject(e);
      });
    });
  }

  const alterUser = async (values) => {
    return new Promise((resolve, reject) => {
      axios.put(`/user/${address}/`, {
        ...values,
      })
      .then((res) => {
        setCookies('profile', { ...res.data });
        resolve();
      })
      .catch(() => {
        reject();
      });
    });
  }

  const deleteUser = async () => {
    axios.delete(`/user/${address}/`)
    .then(() => {
      logout();
    })
    .catch(() => {
    });
  }

  const updateProfile = async () => (
    new Promise((resolve, reject) => {
      axios.get(`/user/${address}/`)
        .then((res) => {
          setCookies('profile', { ...res.data });
          resolve();
        })
        .catch(() => reject());
    })
  );

  const logout = () => {
    // Call server to logout
    if (state.isAccessTokenExist) axios.post('/user/logout/');

    // Disconnect wallet
    disconnect();

    // Remove tokens
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

    // Remove profile
    removeCookies('profile');

    // Update status
    dispatch({ type: 'logout' })
  };

  const refreshAccessToken = async () => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: 'remove_access_token',
      });

      axios.post('api/token/refresh/', {
        refresh: localStorage.getItem('refresh_token'),
      })
      .then((res) => {
        dispatch({
          type: 'get_access_token',
          access_token: res.data?.access,
        });

        resolve(res.data?.access);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };

  watchAccount((account) => {
    if (isConnected && ((!profile && account.address) || (profile && profile.address !== account.address))) {
      logout();
      window.location.reload();
    }
  })

  useEffect(() => {
    if (state.isNonced) {
      // Perform login
      /* signin()
      .then(() => {
        dispatch({ type: 'get_login' });
      })
      .catch((e) => {
        console.log("login failed", e);
        logout();
      }); */
    }
  }, [state.isNonced]);

  // Initial codes
  useEffect(() => {
    if (!isConnected) return

    if (localStorage.getItem('access_token')) dispatch({
      type: 'get_access_token',
      access_token: localStorage.getItem('access_token'),
    });
    if (localStorage.getItem('refresh_token')) dispatch({ type: 'get_refresh_token' });
    if (cookies.profile) dispatch({ type: 'get_login' });
  
    // Check Access Token existence
    if (!state.isAccessTokenExist) {
      // Check Refresh Token existence
      if (state.isRefreshTokenExist) {
        // Only retrive access token, no loggin need
        refreshAccessToken()
      } else {
        // Check Wallet loggin status
        if (address) {
          axios.get(`user/nonce/?address=${address}`)
          .then((res) => {
            if (res.data?.redirect === '/signup') {
              dispatch({ type: 'not_registered' });
            }

            dispatch({
              type: 'get_nonce',
              nonce: res.data.nonce
            });
          })
          .catch((error) => {
            console.log("nonce get error");
          });
        }
      }
    } else {
      // Fetch profile if not presented in 
      if (!state.isLogged) {
        updateProfile().then(() => dispatch({ type: 'get_login' }));
      }
    }
  }, [isConnected]);

  useEffect(() => {
    // Bind access token to every axios request
    const access_token = state.access_token;
    
    if (access_token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [state.isAccessTokenExist]);

  useEffect(() => {
    // Refreshing access token when its unavailable
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const config = error?.config;

        if (
          localStorage.getItem('refresh_token')
          && error?.response?.status === 401
          && !config?.sent
          && config?.url !== 'api/token/refresh/'
        ) {
          config.sent = true;
          localStorage.removeItem('access_token')

          return new Promise((resolve) => {
            refreshAccessToken()
            .then((access_token) => {
              config.headers['Authorization'] = `Bearer ${access_token}`;
              resolve(axios(config));
            })
            .catch(() => {});
          });
        }

        logout();

        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <AxiosContext.Provider value={{
      state,
      profile,
      signup,
      signin,
      alterUser,
      deleteUser,
      updateProfile,
      logout,
    }}>
      {}
      { children }
    </AxiosContext.Provider>
  );
};

const useAxios = () => {
  const axiosContextData = useContext(AxiosContext);

  if (axiosContextData === undefined) {
    throw new Error('useAxios must be used within a axiosProvider');
  }

  return axiosContextData;
}

export { AxiosProvider, useAxios }