//plugins\devPlugin.ts
//plugins\devPlugin.ts
import type { AddressInfo } from 'net';
import type { ViteDevServer } from 'vite';

// plugins\devPlugin.ts
/**
 * 将nodejs对象内置，便于本地调用
 * @returns
 */
export const getReplacer = () => {
  const externalModels = [
    'os',
    'fs',
    'path',
    'events',
    'child_process',
    'crypto',
    'http',
    'buffer',
    'url',
    'better-sqlite3',
    'knex',
  ];
  const result = {};
  for (const item of externalModels) {
    result[item] = () => ({
      find: new RegExp(`^${item}$`),
      code: `const ${item} = require('${item}');export { ${item} as default }`,
    });
  }
  result['electron'] = () => {
    const electronModules = ['clipboard', 'ipcRenderer', 'nativeImage', 'shell', 'webFrame'].join(
      ',',
    );
    return {
      find: new RegExp(`^electron$`),
      code: `const {${electronModules}} = require('electron');export {${electronModules}}`,
    };
  };
  return result;
};

// 设置插件当web服务启动的时候打开窗口
export const devPlugin = () => {
  return {
    name: 'dev-plugin',
    configureServer(server: ViteDevServer) {
      require('esbuild').buildSync({
        entryPoints: ['./src/main/mainEntry.ts'],
        bundle: true,
        platform: 'node',
        outfile: './dist/mainEntry.js',
        external: ['electron'],
      });
      const httpServer = server.httpServer;

      if (httpServer) {
        httpServer.once('listening', () => {
          const { spawn } = require('child_process');
          const addressInfo = httpServer.address() as AddressInfo;
          const httpAddress = `http://${addressInfo.address}:${addressInfo.port}`;
          const electronProcess = spawn(
            require('electron').toString(),
            ['./dist/mainEntry.js', httpAddress],
            {
              cwd: process.cwd(),
              stdio: 'inherit',
            },
          );
          electronProcess.on('close', () => {
            server.close();
            process.exit();
          });
        });
      }
    },
  };
};
