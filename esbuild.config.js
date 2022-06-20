const { exec } = require("child_process");

require("esbuild")
  .build({
    logLevel: "info",
    entryPoints: ["app.tsx"],
    bundle: true,
    outfile: "out.js",
    platform: "node",
    watch: {
      onRebuild(error, result) {
        if (error) {
          return console.error("watch build failed:", error);
        }
        console.log("watch build succeeded:", result);
        exec("node out.js");
      },
    },
  })
  .then((result) => {
    if (process.env.ESBUILD_ENV_WATCH == "false") {
      exec("node out.js");
      result.stop();
    }
  })
  .catch(() => process.exit(1));
