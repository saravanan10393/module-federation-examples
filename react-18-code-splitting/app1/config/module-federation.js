const deps = require('../package.json').dependencies;
const {ModuleFederationPlugin} = require('@module-federation/enhanced/rspack');

module.exports = {
  client: new ModuleFederationPlugin({
    dts: false,
    name: 'app1',
    filename: 'remoteEntry.js',
    remotes: {
      app2: 'app2@http://localhost:3001/static/remoteEntry.js',
    },
    shared: [{react: deps.react, 'react-dom': deps['react-dom']}],
  }),
  server: [
    new ModuleFederationPlugin(
      {
        remoteType: 'script',
        runtimePlugins: [require.resolve('@module-federation/node/runtimePlugin')],
        name: 'app1',
        library: {type: 'commonjs-module'},
        filename: 'remoteEntry.js',
        remotes: {
          app2: 'app2@http://localhost:3001/server/remoteEntry.js',
        },
        shared: [{react: deps.react, 'react-dom': deps['react-dom']}],
      }),
  ],
};
