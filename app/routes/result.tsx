import { Link } from "react-router";
import type { Route } from "./+types/result";

export function meta({}: Route.MetaArgs) {
  return [{ title: "RESULT" }];
}
export default function Result() {
  return (
    <>
      <h1>Result</h1>
      <Link to="/tds">Go to TDS</Link>
    </>
  );
}
