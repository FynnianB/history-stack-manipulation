import { createContext, useContext, useCallback, useRef } from "react";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { z } from "zod";

const log = (text: string) =>
  console.log(`[DeepLinkHistoryStackHandler] ${text}`);

const DeepLinkStackSchema = z.array(
  z.object({
    pathname: z.string(),
    state: z.record(z.unknown()).optional(),
  })
);

type DeepLinkStack = z.infer<typeof DeepLinkStackSchema>;

interface DeepLinkHistoryStackContextType {
  handleDeeplinkStack: (stack: DeepLinkStack) => void;
}

const DeepLinkHistoryStackContext =
  createContext<DeepLinkHistoryStackContextType | null>(null);

const buildHistoryStack = async (
  stack: DeepLinkStack,
  navigate: NavigateFunction
) => {
  for (const [index, entry] of stack.entries()) {
    log(`Appending ${entry.pathname} to history stack on index ${index}`);
    await navigate(entry.pathname, {
      state: entry.state,
      replace: index === 0,
    });
  }
};

export const DeepLinkHistoryStackHandler = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const stackBuildingRef = useRef<boolean>(false); // Prevent multiple stack building in react strict mode

  const handleDeeplinkStack = useCallback(
    (stack: DeepLinkStack) => {
      if (history.state.idx === 0 && !stackBuildingRef.current) {
        log("Building stack...");
        stackBuildingRef.current = true;
        buildHistoryStack(stack, navigate).finally(() => {
          stackBuildingRef.current = false;
        });
      }
    },
    [navigate]
  );

  return (
    <DeepLinkHistoryStackContext.Provider value={{ handleDeeplinkStack }}>
      <p>
        <button
          onClick={() => console.log("a")}
          className="border border-[#fff]"
        >
          click me for some interaction for chrome
        </button>
      </p>
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
