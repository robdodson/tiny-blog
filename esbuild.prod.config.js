const { exec } = require("child_process");

require("esbuild")
  .build({
    logLevel: "info",
    entryPoints: ["app.tsx"],
    bundle: true,
    outfile: "out.js",
    platform: "node",
  })
  .then((result) => {
    exec("node out.js");
  })
  .catch(() => process.exit(1));
