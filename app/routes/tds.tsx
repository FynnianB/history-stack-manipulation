import { Link } from "react-router";
import type { Route } from "./+types/tds";
import { useDeepLinkHistoryStack } from "~/components/deeplink-stack-provider";
import { useLayoutEffect } from "react";

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
      <button onClick={() => console.log("Browser Interaction")}>
        Click for Browser Interaction
      </button>
      <br />
      <Link to="/input">Go to Input</Link>
    </>
  );
}
