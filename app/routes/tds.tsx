import { Link } from "react-router";
import type { Route } from "./+types/tds";
import { useDeepLinkHistoryStack } from "~/components/deeplink-history-stack-handler";
import { useLayoutEffect } from 'react';

export function meta({}: Route.MetaArgs) {
  return [{ title: "TDS" }];
}
export default function TDS() {
  const { handleDeeplinkStack } = useDeepLinkHistoryStack();

  useLayoutEffect(() => {
    handleDeeplinkStack([
      { pathname: "/input" },
      { pathname: "/result" },
      { pathname: "/tds" },
    ]);
  }, []);

  return (
    <>
      <h1>TDS</h1>
      <Link to="/input">Go to Input</Link>
    </>
  );
}
