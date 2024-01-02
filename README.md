# vue3-antdv-admin

> 基于 vite4.x 重构整个前后端项目，完善后端权限控制细粒度，封装更多场景化组件...正在完善中

基于 vite4.x + vue3.x + antd-design-vue4.x + typescript5.x 的后台管理系统模板

- 账号：rootadmin，密码：123456
- 在线预览（ [gitee](http://buqiyuan.gitee.io/vue3-antdv-admin/) / [vercel](https://vue3-antdv-admin.vercel.app/) ）
- [swagger 文档](https://nest-api.buqiyuan.site/swagger-api/)
- [后台地址](https://github.com/buqiyuan/nest-admin)
- [vue-cli版](https://github.com/buqiyuan/vue3-antd-admin/tree/vue-cli)
- [gitee 地址](https://gitee.com/buqiyuan/vue3-antdv-admin)
- 根据 JSON 生成 typescript 的工具：[http://json2ts.com/](http://json2ts.com/)

部分设计参考了 [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin)

## 安装使用

- 获取项目代码

```bash
git clone --depth 1 https://github.com/buqiyuan/vue3-antdv-admin
```

- 安装依赖

```bash
cd vue3-antdv-admin

pnpm install

```

- 运行

```bash
pnpm dev
```

- 打包

```bash
pnpm build
```

## vscode 配置

安装项目根目录 `.vscode` 推荐的插件，再安装 `Volar`，并禁用 `Vetur`，重启 vscode 即可。

> 使用了 Vue3.x 全家桶、ant-design-vue3.x 和 typescript4.x，实践 vue3.x 的新特性以及玩法，不得不说 vue3.x 的 Composition API 相比于 vue2.x 的 Options API 灵活很多，让我们可以灵活地组合组件逻辑，我们可以很轻松的使用 hooks 的形式去代替以前 mixins 等的写法。更多 hooks 可以参考[vueuse](https://vueuse.org/functions.html)

## 项目简要说明

`rootadmin` 默认开放多点登录，其他新建的账号默认都是单点登录。建议自己拉后端代码到本地跑，避免多人同时操作时产生冲突和误解。

### todolist

- [x] 动态表格(完善中)
- [x] 动态表单(完善中)
- [ ] 电商 SKU 功能演示
- [ ] 纯前端导出 PDF 动态分页
- [ ] 其他...

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

## 更新日志

[CHANGELOG](./CHANGELOG.md)

# [React-admin](https://github.com/javaLuo/react-admin/) &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

标准后台管理系统解决方案<br/> 动态菜单配置，权限精确到按钮<br/>

## what's this?

react+redux 后台管理系统脚手架<br/> react+redux+vite+antd

<ul>
 <li>非服务端渲染</li>
 <li>仿antd-pro外观，但没有使用dva和roadhog</li>
</ul>

## 构建 Start

```javascript
pnpm install       // 安装依赖模块
pnpm run dev       // 运行开发环境
pnpm run build     // 正式打包，生成最终代码
pnpm run preview   // 本地运行正式打包后的最终代码
pnpm run prettier  // 一键格式化代码
```

## 最近更新

- 接入了vite打包，比自己配webpack要好多了

## 前后端分离，权限是怎么控制的

在数据库里存储着权限的信息，可以在页面里各种编辑。<br/> 但最终实现，仍然是在页面里写死的，前端写在页面里的权限信息跟数据库里的信息一一对应就实现了权限控制。<br/> 更好的方法除非是使用 SSR 服务端渲染，直接把权限注入到页面中，就像传统的 JSP 那样。

## 内置通用功能

用户管理 增删改查 分配角色<br/>   角色管理 增删改查 分配菜单和权限<br/>   权限管理 增删改查<br/>   菜单管理 增删改查<br/>

关系：权限 依附于 菜单 依附于 角色 依附于 用户

## 预览地址 Demo

https://isluo.com/work/admin/ <br/> 账号：admin / user<br/> 密码：123456 / 123456

## 参考

react-luo: https://github.com/javaLuo/react-luo <br/>  
nestjs配套的后台项目：https://github.com/buqiyuan/nest-admin  
yapi接口调试平台：https://github.com/YMFE/yapi  
智能识别地址并且复制粘贴：https://github.com/wzc570738205/smartParsePro  
中华人民共和国行政区划：省级（省份）、 地级（城市）、 县级（区县）、 乡级（乡镇街道）、 村级（村委会居委会） ，中国省市区镇村二级三级四级五级联动地址数据: https://github.com/modood/Administrative-divisions-of-China

技术方案：  
验证码：[react-vcode](https://github.com/javaLuo/react-vcode#readme)

为了方便调试，使用yapi作为前后端调试服务器，本地部署yapi之后，打开：  
yapi server

# [React-admin](https://github.com/javaLuo/react-admin/) &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

标准后台管理系统解决方案<br/> 动态菜单配置，权限精确到按钮<br/>

## what's this?

react+redux 后台管理系统脚手架<br/> react+redux+vite+antd

<ul>
 <li>非服务端渲染</li>
 <li>仿antd-pro外观，但没有使用dva和roadhog</li>
</ul>

## 构建 Start

```javascript
pnpm install       // 安装依赖模块
pnpm run dev       // 运行开发环境
pnpm run build     // 正式打包，生成最终代码
pnpm run preview   // 本地运行正式打包后的最终代码
pnpm run prettier  // 一键格式化代码
```

## 最近更新

- 接入了vite打包，比自己配webpack要好多了

## 前后端分离，权限是怎么控制的

在数据库里存储着权限的信息，可以在页面里各种编辑。<br/> 但最终实现，仍然是在页面里写死的，前端写在页面里的权限信息跟数据库里的信息一一对应就实现了权限控制。<br/> 更好的方法除非是使用 SSR 服务端渲染，直接把权限注入到页面中，就像传统的 JSP 那样。

## 内置通用功能

用户管理 增删改查 分配角色<br/>   角色管理 增删改查 分配菜单和权限<br/>   权限管理 增删改查<br/>   菜单管理 增删改查<br/>

关系：权限 依附于 菜单 依附于 角色 依附于 用户

## 预览地址 Demo

https://isluo.com/work/admin/ <br/> 账号：admin / user<br/> 密码：123456 / 123456

## 参考

react-luo: https://github.com/javaLuo/react-luo <br/>  
nestjs配套的后台项目：https://github.com/buqiyuan/nest-admin  
yapi接口调试平台：https://github.com/YMFE/yapi  
智能识别地址并且复制粘贴：https://github.com/wzc570738205/smartParsePro  
中华人民共和国行政区划：省级（省份）、 地级（城市）、 县级（区县）、 乡级（乡镇街道）、 村级（村委会居委会） ，中国省市区镇村二级三级四级五级联动地址数据: https://github.com/modood/Administrative-divisions-of-China  
本地部署chatgpt：https://docs.pandoranext.com/zh-CN 使用pont直接生成前端接口层代码：https://github.com/alibaba/pont

技术方案：  
验证码：[react-vcode](https://github.com/javaLuo/react-vcode#readme)

为了方便调试，使用yapi作为前后端调试服务器，本地部署yapi之后，打开：  
yapi server

https://quicktype.io/

最终生成代码采用 @openapitools/openapi-generator-cli，这个包运行需要本地有java环境，https://github.com/OpenAPITools/openapi-generator-cli https://openapi-generator.tech/docs/installation

尝试使用pont，但是他不支持nest的openapi3格式的文件，所以在查看swagger2与openapi3的区别之后决定使用openapi generator来生成代码

地址智能识别：https://github.com/ldwonday/zh-address-parse
