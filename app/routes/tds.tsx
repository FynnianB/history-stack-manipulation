import { Link } from "react-router";
import type { Route } from "./+types/tds";
import { useDeepLinkHandler } from "~/components/deeplink-stack-provider";
import { useLayoutEffect } from 'react';

export function meta({}: Route.MetaArgs) {
  return [{ title: "TDS" }];
}
export default function TDS() {
  const deepLinkContext = useDeepLinkHandler();

  useLayoutEffect(() => {
    deepLinkContext.overrideStack([
      { pathname: "/input" },
      { pathname: "/result" },
      { pathname: "/tds" },
    ]);
  }, [deepLinkContext]);

  return (
    <>
      <h1>TDS</h1>
      <Link to="/input">Go to Input</Link>
    </>
  );
}
