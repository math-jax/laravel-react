import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  getToken: () => {},
  removeToken: () => {}
});

// export default StateContext;

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Aashish Jha'
  });

  const [token, _setToken] = useState(null);

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const getToken = () => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token) {
      localStorage.removeItem("ACCESS_TOKEN");
    }
    return token;
  };

  const removeToken = () => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };


  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
        getToken,
        removeToken
      }}
    >
      {children}
    </StateContext.Provider>
  )
}


export const useStateContext = () => useContext(StateContext)
