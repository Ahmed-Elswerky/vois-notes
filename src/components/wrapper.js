import { createContext, useState } from "react";

const Wrapper = ({ children }) => {
  const [state, setState1] = useState({});
  const setState = (val) => setState1({ ...state, val });

  return (
    <Context.Provider value={{ state, setState }}>{children}</Context.Provider>
  );
};

export const Context = createContext();
export default Wrapper;
