require('esbuild')
  .build({
    logLevel: 'info',
    entryPoints: ['app.jsx'],
    bundle: true,
    outfile: 'out.js',
    platform: 'node',
  })
  .catch(() => process.exit(1));
