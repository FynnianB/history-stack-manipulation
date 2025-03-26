import { createContext, useContext, useCallback, useRef } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import { z } from 'zod';

const DeepLinkStackSchema = z.array(
    z.object({
      pathname: z.string(),
      state: z.record(z.unknown()).optional(),
    }),
);

type DeepLinkStack = z.infer<typeof DeepLinkStackSchema>;

interface DeepLinkHistoryStackContextType {
  handleDeeplinkStack: (stack: DeepLinkStack) => void;
}

const DeepLinkHistoryStackContext = createContext<DeepLinkHistoryStackContextType | null>(null);

const buildHistoryStack = async (stack: DeepLinkStack, navigate: NavigateFunction) => {
  for (const [index, entry] of stack.entries()) {
    console.log('DeepLink HistoryStack Handler', 'prepending', entry, index);
    await navigate(entry.pathname, { state: entry.state, replace: index === 0 });
  }
};

export const DeepLinkHistoryStackHandler = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const stackBuildingRef = useRef<boolean>(false); // Prevent multiple stack building in react strict mode

  const handleDeeplinkStack = useCallback(
      (stack: DeepLinkStack) => {
        if (history.state.idx === 0 && !stackBuildingRef.current) {
          console.log('DeepLink HistoryStack Handler', 'building stack', stack);
          stackBuildingRef.current = true;
          buildHistoryStack(stack, navigate).finally(() => {
            stackBuildingRef.current = false;
          });
        }
      },
      [navigate],
  );

  return (
      <DeepLinkHistoryStackContext.Provider value={{ handleDeeplinkStack }}>
        {children}
      </DeepLinkHistoryStackContext.Provider>
  );
};

export const useDeepLinkHistoryStack = () => {
  const context = useContext(DeepLinkHistoryStackContext);
  if (!context) {
    throw new Error('useDeepLinkHistoryStack must be used within a DeepLinkHistoryStackHandler');
  }
  return context;
};

export default DeepLinkHistoryStackHandler;
