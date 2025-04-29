import { createContext, useContext, useCallback } from "react";

const log = (text: string) => console.log(`[DeepLinkStackProvider] ${text}`);

type DeepLinkStackEntry = {
  pathname: string;
  state?: Record<string, unknown>;
};

type DeepLinkStack = DeepLinkStackEntry[];

interface DeepLinkHistoryStackContextType {
  handleDeeplinkStack: (stack: DeepLinkStack) => void;
}

const DeepLinkHistoryStackContext =
  createContext<DeepLinkHistoryStackContextType | null>(null);

const buildHistoryStack = (stack: DeepLinkStack) => {
  for (const [index, entry] of stack.entries()) {
    const pathname = entry.pathname;
    const state = { ...entry.state, idx: index };

    log(`Appending ${pathname} to history stack on index ${index}`);
    if (index === 0) {
      history.replaceState(state, "", pathname);
    } else {
      history.pushState(state, "", pathname);
    }
  }
};

export const DeepLinkHistoryStackHandler = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const handleDeeplinkStack = useCallback((stack: DeepLinkStack) => {
    if (!sessionStorage.getItem("deeplink-stack")) {
      sessionStorage.setItem("deeplink-stack", JSON.stringify(stack));

      log("Building stack...");
      buildHistoryStack(stack);
    }
  }, []);

  return (
    <DeepLinkHistoryStackContext.Provider value={{ handleDeeplinkStack }}>
      {children}
    </DeepLinkHistoryStackContext.Provider>
  );
};

export const useDeepLinkHistoryStack = () => {
  const context = useContext(DeepLinkHistoryStackContext);
  if (!context) {
    throw new Error(
      "useDeepLinkHistoryStack must be used within a DeepLinkHistoryStackHandler"
    );
  }
  return context;
};

export default DeepLinkHistoryStackHandler;
