import type { EntryContext, RouterContextProvider } from "react-router";
import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server.bun";

export const streamTimeout = 5_000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  // loadContext: AppLoadContext,
  // If you have middleware enabled:
  loadContext: RouterContextProvider
) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders,
    });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), streamTimeout + 1000);

  try {
    const stream = await renderToReadableStream(
      <ServerRouter context={routerContext} url={request.url} />,
      {
        signal: controller.signal,
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          console.error(error);
        },
      }
    );

    if (isbot(request.headers.get("user-agent") || "") || routerContext.isSpaMode) {
      await stream.allReady;
    }

    responseHeaders.set("Content-Type", "text/html");
    return new Response(stream, {
      headers: responseHeaders,
      status: responseStatusCode,
    });
  } catch (error) {
    console.error(error);
    return new Response("<!DOCTYPE html><html><body><h1>Internal Server Error</h1></body></html>", {
      status: 500,
      headers: { "Content-Type": "text/html" },
    });
  } finally {
    clearTimeout(timeoutId);
  }
}
