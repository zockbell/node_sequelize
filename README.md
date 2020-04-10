# 使用express+sequelize+mysql实现任务管理项目

> 本项目分为前端（client_app文件）和后端（express_task文件）

## 1. 技术栈

* node--> http,异常
* web框架，express, koa, hapi, egg......（本项目使用express）
* 参数校验
* mysql的操作，CURD
* ORM框架，sequelize使用

## 2. 技术关键点

* 后台接口api
* 流程：web-->webserver--> router --> hander --> orm --> db

## 3. 注意事项

* 需要做详细的 模型设计，需要把模型之间的关系梳理好
* api的使用文档，api文档的使用工具
* 测试用例

## 4. 实例展示 

> 具体的功能为：项目任务整体管理，包括增加，删除，编辑，状态。

* 注册 / 登录

![登录注册](https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/14.png)

* 任务列表首页

![任务列表首页](https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/15.png)

* 新增

![新增](https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/16.png)

* 编辑

![编辑](https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/17.png)

* 搜索

![搜索](https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/18.png)

## 5. 需求说明

### 5.1 需求说明，API说明

1. 根据客户端传递过来不同的参数（状态/页码）查询任务的列表
2. 新增一个任务功能（名称/截止日期/内容）
3. 编辑功能：对已经存在的数据进行编辑（名称/截止日期/内容/ID）
4. 修改任务的状态：（ID/已修改的任务状态值--待办，完成）
5. 删除一个任务功能：（ID）
6. 注册功能：新用户注册（用户名，密码）
7. 登录功能：用户登录（用户名，密码）

### 5.2 接口文档生成（APIDOC）

1. [APIDOC官网](https://apidocjs.com/)

2. 全局安装：`npm install apidoc -g`

3. 新建`apidoc.json`或者在`package.json`追加配置：

   ```json
   {
       "name": "zock任务管理系统API",
       "version": "1.0.0",
       "description": "相关后端接口文档说明",
       "title": "zock任务列表API",
       "url" : "http://127.0.0.1:3000",
       "template": {
           "?withCompare": "是否允许版本之间进行比较",
           "withCompare": false,
           "?withGenerator": "是否允许生成多个版本",
           "withGenerator": false
         }
   }
   ```

4. apidoc使用（具体参数可参考官网）以下为本例中的一条接口：

   ```js
   /**
   * @api {POST} /create  创建任务
   * @apiDescription 创建任务接口
   * @apiVersion 1.0.0
   * @apiName create
   * @apiGroup 任务列表
   *
   * @apiParam {String} name 任务标题(必填) @mock=我还是从前那个少年
   * @apiParam {Date} deadline 任务截止时间（必填) @mock=2020-06-08
   * @apiParam {String} content 任务内容（必填) @mock=我还是从前那个少年，没有一丝丝改变，时间只不过是考验，种在心中信念丝毫未减
   * @apiParam {String} [status] 任务状态 {1为待办，2为完成} @mock=1
   *
   * @apiSuccessExample {json} 创建任务成功 return:
   *     HTTP/1.1 200 OK
   *     {
   *       "todo":{
   *           "id":50,
   *           "name":"我还是从前那个少年",
   *           "deadline":"2020-04-30",
   *           "content":"我还是从前那个少年，没有一丝丝改变，时间只不过是考验，种在心中信念丝毫未减",
   *           "status":"1"
   *       },
   *       "errcode":110,
   *       "errmsg":"任务创建成功"
   *     }
   */
   ```

5. 生成apidoc接口文档。

   在controller控制器中也就是我们的接口路由中输出接口，本项目如下：

   ```node
   apidoc -i src/ -o doc
   ```

   ![](https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/27.png)

6. 本项目接口如下：

   ![](https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/26.png)



## 6. 代码实现

### 6.1 API 实现

1. 数据库的初始化

   * 创建数据库

     ![](https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/1.png)

   * 使用`sequelize cli`初始化项目的数据库配置信息，使用以下命令：

     `npx sequelize init`

     ![](https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/2.png)

   * 生成模型文件

     * migrate 文件

     * Model 文件

       [create a model named `User`.](https://sequelize.org/v5/manual/migrations.html)

       ```node
       npx sequelize-cli model:generate --name User --attributes name:string,deadline:date,content:string
       ```

       ![](https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/3.png)

     * 持久化，模型对应的【数据库表】

       ```node
       npx sequelize-cli db:migrate
       ```

       ![](https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/4.png)

       

2. API里面具体的使用ORM模型

   * app.js 中导入models

     ![](https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/5.png)

## 7. 项目发布和运维（PM2）

> 本项目利用PM2进行项目发布。
>
> PM2是node进程管理工具，可以利用它来简化很多node应用管理的繁琐任务，如性能监控、自动重启、负载均衡等，而且使用简单。
>
> 官网地址：https://pm2.keymetrics.io/docs/usage/quick-start/

* 全部安装：`npm install -g pm2` or `yarn global add pm2` 有的mac必须前边添加`sudo`

* 初始化配置文件：`pm2 init` 会生成一个`ecosystem.config.js`

  ![](https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/21.png)

* 启动命令：`pm2 start ecosystem.config.js`

  ![](https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/22.png)

* 查看日志：`pm2 log`

  ![](https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/23.png)

* 重启命令：`pm2 restart ecosystem.config.js`

* 停止项目：`pm2 stop {id}` 停止全部项目：`pm2 stop all`

  ![](https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/25.png)

  ![](https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/24.png)

## 8.跨域解决

node中设置：

```node
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
```

Router中的接口跨域设置：

![](https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/20.png)

## 9. sequelize 详细介绍

Sequelize 是一个 Node.js 平台基于 Promise 的ORM。用于操作管理 MySQL、Postgres、SQLite 等关系型数据库。Sequelize 官方文档：

> https://sequelize.org/
>
> https://github.com/demopark/sequelize-docs-Zh-CN/blob/v5/querying.md

开门见山，两句重要的命令：

```node
$ npx sequelize-cli model:generate --name Person --attributes username:string,password:string

$ npx sequelize-cli db:migrate
```



**主要来了解一下 Sequelize 提供的一个叫 Migrations（迁移） 的功能。**

1. 什么是迁移？

   > https://sequelize.org/v5/manual/migrations.html

   **Sequelize 中的迁移的功能类似于 Git 。**

   通过它，我们可以追踪数据库的状态以及变更记录，我们会把这些信息存储到指定的文件中。

   然后执行指定的命令来更新数据库或者恢复到某个原有状态，这个过程就叫做“迁移”。

   迁移工具 ： sequelize-cli

2. 关于安装：

   使用迁移工具，需要安装依赖 sequelize 和 mysql2。

   ```node
   npm i sequelize mysql2
   ```

   安装迁移工具 sequelize-cli（npm 方式）

   ```node
   npm install -D sequelize-cli
   ```

   使用：

   ```node
   ./node_modules/.bin/sequelize ...
   ```

   npx 方式：

   我们也可以通过 npx 来更便捷的使用迁移工具

   ```node
   npx sequelize-cli ...
   ```

   npx 为 npm 5.2 版本以后自带，如果不能使用，可以手动安装：npm install -g npx

3. **迁移的基本概念与使用方法**

   **初始化：**

   我们可以通过 init 初始化迁移项目：

   ```node
   npx sequelize-cli init
   ```

   它会在当前目录下创建下面几个文件夹（后面加备注的为 init 生成的文件夹 ）

   ```js
   .
   
   ├── config（配置文件目录）
   
   │   └── config.json（默认配置文件）
   
   ├── migrations（迁移脚本）
   
   ├── models（模型脚本）
   
   ├── node_modules
   
   ├── package-lock.json
   
   ├── package.json
   
   └── seeders（种子脚本）
   ```

   <img src="https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/13.png" style="zoom:50%;" />

   目录文件说明：

   **1、配置 - config**

   主要提供链接数据所需要的一些配置：

   <img src="https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/7.png" style="zoom:50%;" />

   

   正如我们看到的，配置文件中默认会有三个不同环境的配置：

   development、test、production，

   分别对应：

   开发环境、测试环境、生产环境（我们也可以根据具体情况增减）。

   同时配合当前系统环境变量 NODE_ENV 自动载入不同的配置。

   

   **2、迁移脚本 - migrations**

   这里的迁移脚本就是我们需要关注的重点

   因为数据库中的每一张表、字段的建立，以及后续的更新都是通过执行迁移脚本来完成的。

   这里先简单的提一下，后面我们会进行详细介绍。

   

   **3、模型脚本 - models**

   模型文件其实就是用对象/类（这里指JavaScript）来描述数据库表/字段的文件。

   主要思想就是让我们像对象一样操作数据库（也就是关系映射模型 - ORM），有点类似 DOM 的意思。

   这个主要用于项目实际的业务代码中使用，如果只是迁移或者后续的种子，可不需要模型。

   

   **4、种子脚本 - seeders**

   有的时候，我们需要为数据库写入一些测试数据，那么这个时候，我们就可以通过种子脚本来完成这个需求。

   做完一些准备工作，也介绍了一些基本概念，下面我们通过一个简单的案例需求进一步了解 sequelize-cli 的使用。

   **4.1 创建、销毁数据库**

   sequelize-cli 提供了许多的命令来帮助我们完成特定的需求。

   这时，我们可以通过 --help 查看帮助

   ```node
   npx sequelize-cli --help
   ```

   **数据库的创建**

   ```node
   npx sequelize-cli db:create
   ```

   要连接的数据库信息和要创建的数据库名称都在配置文件中

   

   **4.2 构建数据库表结构**

   有了数据库，下面就需要在数据库中创建我们应用所需要用到的各种表以及表结构（字段）。

   这个时候就轮到前面提到的迁移脚本上场了！

   我们以一个用户表（User）为例，我们需要记录用户的如下几个信息：

   ●用户名

   ●密码

   ●创建时间

   

   **4.2.1 创建迁移脚本 - User**

   一般情况下，我们会每一张表定义一个迁移文件，我们可以通过下面的命令来完成。

   npx sequelize-cli migration:create --name User

   它会在 migrations 目录下自动创建一个 时间-表名.js 的脚本文件。如图：

   <img src="https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/8.png" style="zoom:50%;" />

   

   **4.2.2 脚本解析**

   脚本其实就是一个 Node.js 代码，提供给 sequelize-cli 进行读取执行；

   每一个脚本通过 module.exports 导出一个包含了 down 和 up 方法的对象。

   up：执行迁移命令（db:migrate）的时候调用

   down：执行撤销/回滚命令

   **db:migrate:undo/db:migrate:undo:all**

   的时候调用

   在看具体的代码之前，先来了解一下 Sequelize 提供的对象和类别。

   

   **4.2.3 queryInterface**

   Sequelize 提供了一个 queryInterface 对象，该对象下又提供了许多操作数据库结构的各种方法（DDL）。

   例如：创建表、字段、索引等。

   

   **4.2.4 Sequelize**

   Sequelize 的核心类，提供了一些数据库相关的常量信息。

   比如数据类型，也可以进行实例化，用于对数据库中的数据进行操作（DQL、DML）。

   

   **4.2.5 脚本**

   在 up 方法中，我们主要编写的创建表结构，或者新增修改表结构的相关代码。

   down 方法中，本质就是 up 方法的一个反向操作。

   下面就是一个用户构建以及销毁 user 表的相关代码：

   ![](https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/9.png)

   ![](https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/10.png)

   

   **执行迁移脚本**

   有了 migrations 脚本，我们再通过 db:migrate 命令执行脚本

   ```node
   npx sequelize-cli db:migrate
   ```

   命令执行成功以后，我们就可以在数据库中看到对应的表以及字段信息了。

   ![](https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/11.png)

   我们需要的表创建成功了，但是大家也会发现在我们的数据库中会有一个叫做 SequelizeMeta 的表。

   这个表是干嘛的呢？

   其实，它是用来记录我们已经执行过的迁移脚本的。

   当我们执行迁移命令的时候，它就会把当前执行的迁移脚本记录到该表中。

   下次执行迁移命令的时候，就不会重复的去执行已经执行过的迁移脚本了。

   

4. **更新表&撤销/回滚**

   * **更新表**

     许多时候，因为项目需求的变更，数据库也需要修改更新。

     比如，当用户修改信息的时候，我们希望记录下来最后一次修改更新的时间，也就是需要给 user 表新增一个 updatedAt 字段。

     添加一个新的迁移脚本：

     ```node
     npx sequelize-cli migration:create --name User-AddUpdatedAt
     ```

     脚本代码如下：

     ![](https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/12.png)

     再次执行命令代码：

     ```node
     npx sequelize-cli db:migrate
     ```

     成功以后，数据库中的 user 表中，就会多出一个新的字段：updatedAt

     

   * **撤销/回滚：**

     我们还可以通过 db:undo 命令来执行撤销/回滚脚本。

     其实也就是执行对应脚本中的 down 方法。

     * 单次撤销（最近的一次）

       ```node
       npx sequelize-cli db:migrate:undo
       ```

     * 撤销所有

       ```node
       npx sequelize-cli db:migrate:all
       ```

5. **node中sequelize日志**

   所有对接口和数据库的操作，日志都会在node中显示

   ![](https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/19.png)

   

**注意：**如果sequelize中的migrations里的文件有所修改，则需要删除对应的数据库表，重新执行`npx sequelize-cli db:migrate`并且需要删除对应的SequelizeMeta

![](https://github.com/zockbell/node_sequelize/blob/master/client_app/src/assets/images/6.png)

* FindOrCreate() 本项目中用在用户注册功能。（如果用户存在则告诉用户，如果不存在则注册成功）

  > https://segmentfault.com/q/1010000013422504/a-1020000013425272

  ```js
  router.post('/register', async (req, res, next) => {
      console.log(req.body);
      try {
          let { username, password } = req.body;   // 使用req.body前必须安装中间件body-parser
          // 数据持久化到数据库
          let person = await models.Person.findOrCreate({
              where: {
                  username
              },
              defaults: { // 新建的数据
                  username,
                  password
              }
          })
      
          res.json({
              // person,
              errcode: 110,
              errmsg: "注册成功"
          })
      } catch (error) {
          // next(error)
      }
  })
  ```



这是本项目的文档，希望能帮助有用到的人，谢谢。
