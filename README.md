# [Ordering-system](https://github.com/wangyuanzcm/orderingSystem) &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

标准后台管理系统解决方案<br/> 动态菜单配置，权限精确到按钮<br/>

## what's this?

基于 vite4.x + vue3.x + antd-design-vue4.x + typescript5.x 的后台管理系统

<ul>
 <li>非服务端渲染</li>
 <li>仿antd-pro外观，但没有使用dva和roadhog</li>
</ul>

## 构建 Start

```javascript
pnpm run bootstrap       // 安装依赖模块
pnpm run serve       // 运行开发环境
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

通过商品类型来区分价格

导出表格：

导出word格式 https://juejin.cn/post/7205181884589031485

通过Apollo进行表单线上配置 https://www.apolloconfig.com/#/zh/deployment/quick-start-docker

https://juejin.cn/post/6844903640990220302

https://antdv-x3.formilyjs.org/guide/space.html#markup-schema-%E6%A1%88%E4%BE%8B

使用formily的json表单功能，通过json配置生成表单，然后直接配置下发

开发方案变更：今天在有了配置下发的想法之后，越来越感觉这种方法的可行性。目前table的列配置和搜索配置都是直接可以通过json配置下发。增加，修改的表单直接通过formily的方式进行动态配置。配合formily的编辑器可以自动生成配置的UI和字段内容（https://designable-antd.formilyjs.org/）

需要配置的地方，目前有：

1. 商品的列表和新增/修改表单，查看详情
2. 购买的表单。
3. 优惠券配置
4. 订单列表，和编辑表单配置，查看详情
5. 权限点配置（待定）

formily 仅支持antd版本 <4.22.8

https://purefunction.xyz/runtime-js-bundling 如何在运行时编译 JavaScript 代码

table列设置必须是下面的格式，目前测试了select和imageList

````
"customRender": {
     "renderType":"Select",
     "renderKey":"universal",
     "renderOptions":[
       {
         "label":"是",
         "value":1
       },
       {
         "label":"否",
         "value":2
       }
     ]
   }
   ```

````

     "customRender": {
      "renderType":"ImageList",
      "renderKey":"image_list"
    }

```

```

    "formItemProps": {
      "formType":"Select",
      "formOptions": [
        {
          "label":"是",
          "value":1
        },
        {
          "label":"否",
          "value":2
        }
      ]
    },

```

```
