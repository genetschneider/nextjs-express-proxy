const express = require("express");
const next = require("next");
const { i18n } = require("./next.config");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const htmlCache = {};

async function renderAndCache(req, res) {
  const n = performance.now();
  const pathPieces = req.path.split("/");
  const locale =
    i18n.locales.find((l) => l === pathPieces[1]) || i18n.defaultLocale;

  const cleanPath = req.path.replace(`/${locale}`, "") || "/";

  //console.info({
  //  rawPath: req.path,
  //  pathSentToNextjs: cleanPath,
  //  locale,
  //});

  const cacheK = `${locale}~${cleanPath}`;

  if (htmlCache[cacheK]) {
    res.send(htmlCache[cacheK]);
    console.log(cacheK, "(cached) handle took", performance.now() - n);

    return;
  }

  const html = await app.renderToHTML(req, res, cleanPath, {
    ...req.query,
    // Pass locale data from a custom server
    __nextLocale: locale,
    __nextDefaultLocale: i18n.defaultLocale,
  });

  // cache html if you want

  if (res.headersSent) {
    return;
  }

  if (res.statusCode === 200) {
    htmlCache[cacheK] = html;
  }

  console.log(cacheK, "(NOT-cached) handle took", performance.now() - n);

  res.send(html);
}

(async () => {
  await app.prepare();

  const server = express();

  server.get('/favicon.ico', (req, res) => res.status(404).send(''));
  server.all("/api*", handle);
  server.get("/_next/data/:bundleId/:locale/:path", (req, res) => {
    // redirect configuration
    const redirects = {
      "/not-about": "/about",
    };

    // get path from request
    const path = `/${req.params.path.split(".json")[0]}`;

    // check if this path should redirect
    const redirectPath = redirects[path];

    if (redirectPath) {
      console.log("Sending redirect in express", `${path} to ${redirectPath}`);

      // return redirect configuration and make nextjs redirect!
      return res.json({
        pageProps: {
          __N_REDIRECT: redirectPath,
          __N_REDIRECT_STATUS: 307,
        },
      });
    }

    // no redirect rule, pass along to nextjs to handle
    handle(req, res);
  });

  // serve static content traffic straight to nextjs
  server.all("/_next/*", handle);
  server.get("*", renderAndCache);

  server.listen(port, () => console.log("running on", port));
})();
