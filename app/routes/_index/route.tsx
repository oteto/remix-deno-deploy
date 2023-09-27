import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Deno" },
    { name: "description", content: "Welcome to Remix Deno!" },
  ];
};

export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
      <Link to="/about">about</Link>
    </main>
  );
}
