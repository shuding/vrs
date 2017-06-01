# VRS

TODO: 后端，前端逻辑层，NextJS 路由（？），聊天室（？？）

## 功能
- [x] 流量模型
- [x] 查看模型框架（geometry + vertex + material）
- [x] 控制器
- [x] 视角转换
- [x] VR 渲染
- [x] 移动设备朝向检测（deviceorientation）
- [x] Mesh face hover 检测
  - [ ] 组件 popup
  - [ ] 定制 material
- [ ] gallery
  - [ ] __thumbnail__
  - [ ] 像淘宝一样
- [ ] oneclick: 服务端模型接口 + chat 集成 +（待考虑）订单系统
- [ ] 用户系统
  - [ ] 用户后台界面

## Quickstart
开发环境：`yarn dev` / `npm run dev`
产品环境：`yarn start` / `npm start`

BE + production on port 3000
FE + development on port 8080

## 搭建环境
Node.js >= 6

## 设计

### BE

### Frontend
需求：react，isomorphic，hot-reload，漂亮的错误信息，bundle splitting, react-router

Tech keywords: boilerplate (-> zeit/next)

### Frontend routers
Next.js (not RESTful)

### UI
自定义风格，black，futurism，spring animation。

Tech keywords：Tachyons, Less

### API
主要基于 GraphQL。

Tech keywords: GraphQL, Apollo/Relay

### Collaboration
Websocket。

Tech keywords: socket.io

## Acknowledgement
### 3D models
### Image resources
### Libraries

## License, etc.
MIT licensed. By Shu Ding <ds303077135@gmail.com>.
