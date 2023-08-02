import React, { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';
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

const AxiosProvider = ({ children }) => {
  const { isConnected, address } = useAccount()
  const { chain } = useNetwork()
  const { signMessageAsync } = useSignMessage()
  const { disconnect } = useDisconnect()

  const [cookies, setCookies, removeCookies] = useCookies(['access_token', 'refresh_token', 'profile']);

  const [isInit, setIsInit] = useState(false);
  const [nonce, setNonce] = useState(null);
  const profile = useMemo(() => {
    return cookies.profile ? cookies.profile : null;
  }, [cookies.profile]);

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
          statement: 'Sign in to DREAM APP.',
          uri: window.location.origin,
          version: '1',
          chainId,
          nonce: nonce.nonce,
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
          setCookies('access_token', res.data?.tokens?.access);
          setCookies('refresh_token', res.data?.tokens?.refresh);
          setCookies('profile', res.data?.user);
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
          setCookies('access_token', res.data?.tokens?.access);
          setCookies('refresh_token', res.data?.tokens?.refresh);
          setCookies('profile', res.data?.user);
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

  const logout = () => {
    if (cookies.access_token) axios.post('/user/logout/');

    disconnect();
    removeCookies('access_token');
    removeCookies('refresh_token');
    removeCookies('profile');
    setIsInit(false);
    setNonce(null);
  };

  watchAccount((account) => {
    if (isInit && ((!profile && account.address) || (profile && profile.address !== account.address))) {
      logout();
      window.location.reload();
    }
  })

  useEffect(() => {
    if (cookies.access_token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + cookies.access_token;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [cookies.access_token]);

  useEffect(() => {
    if (!isInit && nonce) {
      // Check register status
      if (nonce.redirect === '/signup') {
        // Nagivate to signup page
        setIsInit(true);
        return;
      }

      // Perform login
      signin()
      .then(() => {
        setIsInit(true);
      })
      .catch((e) => {
        console.log("login failed", e);
        logout();
      });
    }
  }, [nonce]);

  useEffect(() => {
    if (!isConnected) return
  
    // Check Access Token existence
    if (!cookies.access_token) {
      // Check Refresh Token existence
      if (cookies.refresh_token) {
        // Only retrive access token, no loggin need
        axios.post('api/token/refresh/', {
          refresh: cookies.refresh_token,
        })
        .then((res) => {
          setCookies('access_token', res.data?.access);
          setIsInit(true);
        });
      } else {
        // Check Wallet loggin status
        if (address) {
          axios.get(`user/nonce/?address=${address}`)
          .then((res) => {
            setNonce({...res.data});
          })
          .catch((error) => {
            console.log("nonce get error");
          });
        }
      }
    } else {
      if (!profile) {
        axios.get(`/user/${address}/`)
        .then((res) => {
          setCookies('profile', { ...res.data });
          setIsInit(true);
        });
      } else {
        setIsInit(true);
      }
    }
  }, [isConnected]);

  return (
    <AxiosContext.Provider value={{
      isInit,
      profile,
      signup,
      alterUser,
      deleteUser,
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