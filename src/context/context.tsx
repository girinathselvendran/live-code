import { createContext, useContext } from "react";

interface MyContextData {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

export const GlobalContext = createContext<MyContextData | undefined>(
  undefined
);

export const useGlobalContext = (): MyContextData => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
