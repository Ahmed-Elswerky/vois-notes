import { createContext, useState } from "react";

const Wrapper = ({ children }) => {
  const [state, setState1] = useState({ lastActivity: Date.now() });
  const setState = (val) => setState1({ ...state, ...val });

  const updateUserActivity = () => {
    setState({ ...state, lastActivity: Date.now() });
  };

  return (
    <Context.Provider value={{ state, setState, updateUserActivity }}>
      {children}
    </Context.Provider>
  );
};

export const Context = createContext();
export default Wrapper;
