# myapp

## Project setup
```
npm install
```
### run the json-server
```
npm run mock
```
### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

本项目是基于vue3+ts实现，功能有用户的登录和注册，邮箱和密码有简单的表单验证，格式并不算严谨，账号通过json-server实现伪后台，密码也有简单的hook加密，结合element-plus快速构建页面，配合vue-router实现路由管理，各个路由都用vuex实现分模块的状态管理，有构建对生产环境和开发环境的管理，使用axios和部分fetch实现前后端交互，用户可以先注册管理员账号，然后登录系统，进入主页，在住户信息里可以查询修改删除住户信息，在缴费管理页，有根据数据金额生成二维码功能，无实际效果，在数据展示页，把人数，车位，访客，保修等数据通过echarts实现包括横向柱状图、堆叠折线图、玫瑰饼图和堆叠柱状图等图表可视化。
