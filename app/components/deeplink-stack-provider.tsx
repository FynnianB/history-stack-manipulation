import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useRef,
  useLayoutEffect,
} from 'react';
import { useLocation, useMatches, useNavigationType } from 'react-router';

type DeepLinkStackEntry = {
  pathname: string;
  search?: string;
  data?: unknown;
};

type DeepLinkStack = {
  stack: DeepLinkStackEntry[];
  currentIndex: number;
};

type Context = {
  overrideStack: (
    newStack: { stack: DeepLinkStackEntry[]; currentIndex: number } | DeepLinkStackEntry[],
  ) => void;
  currentStack: () => DeepLinkStack | null;
};

const DeepLinkStackContext = createContext<Context | null>(null);

export function DeepLinkStackProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigationType = useNavigationType();
  const isInitialMount = useRef(true);
  const currentStackRef = useRef<DeepLinkStack | undefined>(undefined);

  // Core stack handling logic
  const handleStack = useCallback((stack: DeepLinkStack) => {
    console.log('Setting stack', stack, isInitialMount.current);
    if (stack.stack.length === 0) return;

    // Build new history stack
    stack.stack.forEach((entry, index) => {
      const state = {
        ...(entry.data ?? {}),
        idx: index,
      };

      if (index === 0) {
        history.replaceState(state, '', entry.pathname);
      } else {
        history.pushState(state, '', entry.pathname);
      }
    });

    updateStack(stack);
  }, []);

  const getDeepLinkStack = useCallback((): DeepLinkStack | null => {
    const stackState = sessionStorage.getItem('deepLinkStack');

    if (stackState) {
      return JSON.parse(stackState);
    }

    return null;
  }, []);

  const updateStack = (newStack: DeepLinkStack) => {
    sessionStorage.setItem('deepLinkStack', JSON.stringify(newStack));
  };

  // Handle back/forward navigation
  useLayoutEffect(() => {
    const currentStackState = getDeepLinkStack();
    const historyIndex = history.state?.idx ?? 0;

    if (history.length === 2 && currentStackRef.current !== undefined) {
      handleStack(currentStackRef.current);
    } else if (
      navigationType === 'POP'
      && currentStackState?.currentIndex
      && currentStackState.currentIndex > historyIndex
    ) {
      sessionStorage.setItem(
        'deepLinkStack',
        JSON.stringify({
          currentIndex: historyIndex,
          stack: currentStackState?.stack.slice(0, historyIndex + 1) ?? [],
        }),
      );
    } else if ((currentStackState?.currentIndex ?? -1) < historyIndex) {
      updateStack({
        currentIndex: historyIndex,
        stack: [
          ...(currentStackState?.stack ?? []),
          { pathname: location.pathname, search: location.search },
        ],
      });
    }
  }, [currentStackRef, handleStack, location.pathname, navigationType, getDeepLinkStack]);

  // Context value
  const contextValue = useMemo(
    () => ({
      overrideStack: (
        newStack: { stack: DeepLinkStackEntry[]; currentIndex?: number } | DeepLinkStackEntry[],
      ) => {
        if (Array.isArray(newStack)) {
          newStack = { stack: newStack, currentIndex: newStack.length - 1 };
        }
        return currentStackRef.current = {
          stack: newStack.stack,
          currentIndex: newStack.currentIndex ?? newStack.stack.length - 1,
        };
      },
      currentStack:
        currentStackRef.current !== undefined
          ? () => currentStackRef.current as DeepLinkStack
          : getDeepLinkStack,
    }),
    [handleStack],
  );

  return (
    <DeepLinkStackContext.Provider value={contextValue}>
      <p>
        <button onClick={() => console.log('a')} className='border border-[#fff]'>click me for some interaction for chrome</button>
      </p>
      {children}
    </DeepLinkStackContext.Provider>
  );
}

export const useDeepLinkHandler = () => {
  const context = useContext(DeepLinkStackContext);
  if (!context) {
    throw new Error('useDeepLinkStack must be used within a DeepLinkStackProvider');
  }
  return context;
};
