const copy = require("esbuild-copy-static-files");
const { exec } = require("child_process");

require("esbuild")
  .build({
    logLevel: "info",
    entryPoints: ["app.tsx"],
    bundle: true,
    outfile: "out.js",
    platform: "node",
    plugins: [
      copy({
        src: "./public",
        dest: "./dist",
      }),
    ],
    watch: {
      onRebuild(error, result) {
        if (error) {
          return console.error("watch build failed:", error);
        }
        exec("node out.js");
      },
    },
  })
  .then((result) => {
    exec("node out.js");
  })
  .catch(() => process.exit(1));
