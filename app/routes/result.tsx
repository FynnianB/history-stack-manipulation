import { Link } from "react-router";
import type { Route } from "./+types/result";
import { useDeepLinkHistoryStack } from "~/components/deeplink-history-stack-handler";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "RESULT" }];
}
export default function Result() {
  const { handleDeeplinkStack } = useDeepLinkHistoryStack();

  useEffect(() => {
    handleDeeplinkStack([{ pathname: "/input" }, { pathname: "/result" }]);
  }, []);

  return (
    <>
      <h1>Result</h1>
      <Link to="/tds">Go to TDS</Link>
    </>
  );
}
