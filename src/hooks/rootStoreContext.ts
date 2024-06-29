import { createContext, useContext } from "react";
import RootStore from "stores/RootStore";

export const RootStoreContext = createContext<RootStore | null>(null);

export const useStores = () => {
  const context = useContext(RootStoreContext);

  if (context === null) {
    throw new Error("Приложение не обёрнуто в контекст!")
  }

  return context;
}