import { Link } from "react-router";
import type { Route } from "./+types/input";

export function meta({}: Route.MetaArgs) {
  return [{ title: "INPUT" }];
}

export default function Input() {
  return (
    <>
      <h1>Input</h1>
      <Link to="/result">Go to Result</Link>
    </>
  );
}
