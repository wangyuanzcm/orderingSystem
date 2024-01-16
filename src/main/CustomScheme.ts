//src\main\CustomScheme.ts
import fs from 'fs';
import path from 'path';
import { protocol } from 'electron';
import axios from 'axios';
//为自定义的app协议提供特权
const schemeConfig = {
  standard: true,
  supportFetchAPI: true,
  bypassCSP: true,
  corsEnabled: true,
  stream: true,
};
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: schemeConfig }]);

const proxyHost = 'http://127.0.0.1:7001';
export class CustomScheme {
  //根据文件扩展名获取mime-type
  private static getMimeType(extension: string) {
    let mimeType = '';
    if (extension === '.js') {
      mimeType = 'text/javascript';
    } else if (extension === '.html') {
      mimeType = 'text/html';
    } else if (extension === '.css') {
      mimeType = 'text/css';
    } else if (extension === '.svg') {
      mimeType = 'image/svg+xml';
    } else if (extension === '.json') {
      mimeType = 'application/json';
    }
    return mimeType;
  }
  //注册自定义app协议
  static registerScheme() {
    protocol.registerStreamProtocol('app', (request, callback) => {
      let pathName = new URL(request.url).pathname;

      let extension = path.extname(pathName).toLowerCase();

      // 如果有接口请求，则使用代理转接
      if (pathName.startsWith('/api')) {
        console.log(`${proxyHost}${pathName}`, '`${proxyHost}${pathName}`');
        axios.get(`${proxyHost}${pathName}`).then((response) => {
          const { data, headers } = response;

          // 构造 Electron 的响应对象
          const responseHeaders = {
            'content-type': headers['content-type'],
            // 其他需要的响应头
          };

          const buffer = Buffer.from(data, 'utf-8');
          const mime = headers['content-type'];

          callback({
            statusCode: 200,
            headers: responseHeaders,
            data: buffer,
            mimeType: mime,
          });
        });
        return;
      }

      if (extension == '') {
        pathName = 'index.html';
        extension = '.html';
      }
      const tarFile = path.join(__dirname, pathName);
      callback({
        statusCode: 200,
        headers: { 'content-type': this.getMimeType(extension) },
        data: fs.createReadStream(tarFile),
      });
    });
  }
}
