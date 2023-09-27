import { LoaderFunctionArgs } from "@remix-run/deno";
import { Link } from "@remix-run/react";
import { useState } from "react";

export async function loader(args: LoaderFunctionArgs) {
  await args.context.countUp();
  return null;
}

export default function AboutPage() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>About Page</h1>
      <div>
        <p>{count}</p>
        <button onClick={() => setCount((c) => c + 1)}>+1</button>
        <button onClick={() => setCount((c) => c - 1)}>-1</button>
      </div>
      <Link to="/">Home</Link>
    </main>
  );
}
