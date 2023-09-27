import { createRequestHandlerWithStaticFiles } from "@remix-run/deno";
import { serve } from "https://deno.land/std@0.128.0/http/server.ts";
// Import path interpreted by the Remix compiler
import * as build from "@remix-run/dev/server-build";
import { kv } from "./app/utils/kv.deno.ts";

const countUp = async () => {
  const c = await kv.get<number>(["count"]);
  console.log("[INFO] visit count:", c.value);
  await kv.set(["count"], (c.value ?? 0) + 1);
};

const remixHandler = createRequestHandlerWithStaticFiles({
  build,
  mode: Deno.env.get("NODE_ENV"),
  getLoadContext: () => ({ countUp }),
});

const handler = async (request: Request) => {
  const url = new URL(request.url);
  if (url.pathname === "/api") {
    await countUp();
    return new Response(JSON.stringify({ message: "hello" }), {
      headers: {
        "content-type": "application/json",
      },
    });
  }
  return remixHandler(request);
};

const port = Number(Deno.env.get("PORT")) || 3000;
console.log(`🦕 Listening on http://localhost:${port}`);
serve(handler, { port });
