import type { AppLoadContext, EntryContext } from "@remix-run/deno";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToReadableStream } from "react-dom/server";

const ABORT_DELAY = 5_000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext,
) {
  const stream = await renderToReadableStream(
    <RemixServer
      context={remixContext}
      url={request.url}
      abortDelay={ABORT_DELAY}
    />,
    {
      signal: AbortSignal.timeout(ABORT_DELAY),
      onError(error: unknown) {
        if (
          error instanceof TypeError &&
          error.message === "Closed already requested."
        ) {
          console.log("Closed already requested.");
        } else {
          console.error("+++++ERROR++++++", error);
        }
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get("user-agent"))) {
    await stream.allReady;
  }

  responseHeaders.set("content-type", "text/html");

  return new Response(stream, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
