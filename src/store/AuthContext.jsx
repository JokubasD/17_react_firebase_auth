import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext({
  login(token, email) {},
  logout() {},
  isUserLoggedIn: false,
  token: '',
});

AuthContext.displayName = 'Auth-context';

const tokenName = 'firebaseToken';

function AuthContextProvider(props) {
  // localStorage yra sinchroninis
  const tokenFromStorage = localStorage.getItem(tokenName);
  const emailFromStorage = localStorage.getItem('email');
  const userIDFromStrorage = localStorage.getItem('userID');
  const [token, setToken] = useState(tokenFromStorage);
  const [emailValue, setEmailValue] = useState(emailFromStorage);
  const [userID, setUserID] = useState(userIDFromStrorage);
  const isUserLoggedIn = !!token;

  const login = ({ idToken, email, localId }) => {
    setToken(idToken);
    localStorage.setItem(tokenName, idToken);
    setEmailValue(email);
    localStorage.setItem('email', email);
    setUserID(localId);
    localStorage.setItem('userID', localId);
  };
  const logout = () => {
    setToken('');
    localStorage.removeItem(tokenName);
    localStorage.removeItem('email');
    localStorage.removeItem('userID');
  };

  const contextValue = {
    login,
    logout,
    isUserLoggedIn,
    token,
    email: emailValue,
    userID: userID,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;

// custon useAuthCtx hook 2 lvl burtas
export function useAuthCtx() {
  return useContext(AuthContext);
}
