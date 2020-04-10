const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require('sequelize');
moment = require('moment');
const Op = Sequelize.Op;

const app = express();
const port = 3000;

// body-parser配置。切记：body-parser的配置的顺序一定要在路由的前边执行，否则后端一直在加载请求，并没有数据。
app.use(express.json());
// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded());
// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// 引入路由
const personRouter = require('./router/person');
// 注册路由
app.use('/person', personRouter);

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

const models = require("../db/models");

/**
* @api {GET} /list/:status/:page  查询任务列表
* @apiDescription 获取任务列表信息
* @apiVersion 1.0.0
* @apiName list
* @apiGroup 任务列表
*
* @apiParam {String} status 任务状态(必填) {-1代表全部状态,1为待办，2为完成}  @mock=-1
* @apiParam {String} page 页码(必填) @mock=1
*
* @apiSuccessExample {json} 获取任务列表信息成功 return:
*    HTTP/1.1 200 OK
*    {
*        "list": {
*            "count": 32,
*            "rows": [
*                {
*                    "id": 1,
*                    "name": "湖人球员已经结束14天隔离期 没有球员出现新冠症状",
*                    "deadline": "2020-04-05T16:00:00.000Z",
*                    "content": "新型冠状病毒波及NBA，爵士、篮网、活塞等球队都有球员感染。北京时间的3月18日，湖人官方决定对球员们进行新型冠状病毒的检测，同时开始为期14天的自我隔离。当时，湖人对于球队的大部分球员都进行了检测，他们开汽车抵达球队的训练馆，直接坐在车上完成了检测，整个过程都没有下车。",
*                    "status": 1
*                },
*                {
*                    "id": 2,
*                    "name": "数据印证詹皇真联盟门面担当：社媒相关内容三倍于字母哥",
*                    "deadline": "2020-04-09T16:00:00.000Z",
*                    "content": "北京时间4月1日，针对网上很多球迷戏称他们是“勒布朗体育”、“锡安体育”，《露天看台体育》今天对2019-20赛季他们在社交媒体Instagram官方账号所发布的所有内容进行了统计，并把与联盟各队以及主要明星球员的相关内容数量进行了一个大排行。",
*                    "status": 1
*                },
*                ...                   
*            ]
*        },
*        "errcode": 110,
*        "errmsg": "列表获取成功"
*    }
*
*/
app.get('/list/:status/:page', async (req, res, next) => {
    // next(new Error("自定义异常"));
    let { status, page } = req.params;
    let limit = 10; // 当前页显示条数
    let offset = (page - 1) * limit;  // 偏移量
    /**
     * 1. 状态（1:待办/2:完成/3:删除/-1:全部）
     * 2. 分页
     */
    let where = {};
    if(status != -1) {
        where.status = status;
    }
    let list = await models.User.findAndCountAll({
        where,
        limit,
        offset
    })
    res.json({
        list,
        errcode: 110,
        errmsg: "列表获取成功"
    })
})

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
app.post('/create', async (req, res, next) => {
    try {
        let { name, deadline, content, status } = req.body;   // 使用req.body前必须安装中间件body-parser
        // 数据持久化到数据库
        let todo = await models.User.create({
            name,
            deadline: moment(deadline).format('YYYY-MM-DD'),
            content,
            status
        })
    
        res.json({
            todo,
            errcode: 110,
            errmsg: "任务创建成功"
        })
    } catch (error) {
        next(error)
    }
})

/**
* @api {POST} /update  修改/更新任务
* @apiDescription 修改、更新任务接口
* @apiVersion 1.0.0
* @apiName update
* @apiGroup 任务列表
*
* @apiParam {String} [name] 任务标题 @mock=我已经不是那个少年
* @apiParam {Date} [deadline] 任务截止时间 @mock=2020-06-08
* @apiParam {String} [content] 任务内容 @mock=我还是从前那个少年，没有一丝丝改变，时间只不过是考验，种在心中信念丝毫未减。可惜，我已经不是那个少年了
* @apiParam {String} [status] 任务状态 {1为待办，2为完成} @mock=2
*
* @apiSuccessExample {json} 修改任务成功 return:
*     HTTP/1.1 200 OK
*     {
*       "todo":{
*           "id":50,
*           "name":"我已经不是那个少年",
*           "deadline":"2020-04-30",
*           "content":"我还是从前那个少年，没有一丝丝改变，时间只不过是考验，种在心中信念丝毫未减。可惜，我已经不是那个少年了",
*            "status":"2"
*       },
*       "errcode":110,
*       "errmsg":"任务已更新"
*     }
*/
app.post('/update', async (req, res, next) => {
    try {
        let {name, deadline, content, status, id} = req.body;
        let todo = await models.User.findOne({
            where: {
                id
            }
        })
        if(todo) {
            // 如果id不为null，那么执行更新语句
            todo = await todo.update({
                name, 
                deadline: moment(deadline).format('YYYY-MM-DD'),
                content,
                status
            })
        }
        res.json({
            todo,
            errcode: 110,
            errmsg: "任务已更新"
        })
    } catch (error) {
        next(error)
    }
})

/**
* @api {POST} /update_status  修改任务的状态
* @apiDescription 修改任务的状态，此接口可与update接口用一个
* @apiVersion 1.0.0
* @apiName update_status
* @apiGroup 任务列表
*
* @apiParam {String} id 任务id（必填） @mock=8
*
* @apiSuccessExample {json} 修改任务成功 return:
*     HTTP/1.1 200 OK
*     {
*       "todo":{
*           "id":50,
*           "name":"我已经不是那个少年",
*           "deadline":"2020-04-30",
*           "content":"我还是从前那个少年，没有一丝丝改变，时间只不过是考验，种在心中信念丝毫未减。可惜，我已经不是那个少年了",
*           "status":"1"
*       },
*     "errcode":110,
*     "errmsg":"任务状态更新成功"
*     }
*/
app.post('/update_status', async (req, res, next) => {
    try {
        let { id, status } = req.body;
        let todo = await models.User.findOne({
            where: {
                id
            }
        })
        if(todo && status != todo.status) {
            // 如果id不为null，那么执行更新语句
            todo = await todo.update({
                status
            })
        }
        res.json({
            todo,
            errcode: 110,
            errmsg: "任务状态更新成功"
        })
    } catch (error) {
        next(error)
    }
})

/**
* @api {POST} /search/:page  搜索关键字
* @apiDescription 搜索关键字接口，带页码参数（默认为第1页）
* @apiVersion 1.0.0
* @apiName search
* @apiGroup 任务列表
*
* @apiParam {String} keyword 搜索关键字（必填） @mock=湖人总冠军
*
* @apiSuccessExample {json} 搜索关键词成功 return:
*     HTTP/1.1 200 OK
*     {
*       "searchList": {
*           "count":4,
*           "rows":[
*               {
*                "id":2,
*                "name":"湖人球员已经结束14天隔离期 没有球员出现新冠症状",
*                "deadline":"2020-04-05T16:00:00.000Z",
*                "content":"新型冠状病毒波及NBA，爵士、篮网、活塞等球队都有球员感染。北京时间的3月18日，湖人官方决定对球员们进行新型冠状病毒的检测，同时开始为期14天的自我隔离。当时，湖人对于球队的大部分球员都进行了检测，他们开汽车抵达球队的训练馆，直接坐在车上完成了检测，整个过程都没有下车。",
*                "status":1
*               },
*               {
*                "id":30,
*                "name":"NBA球员也要上网课 湖人快船通过视频安排球员训练",
*                "deadline":"2020-04-28T16:00:00.000Z",
*                "content":"在联盟因疫情停摆后，球队纷纷关闭了体育馆和训练馆，这也让部分隔离在家的球员出现了无法训练的情况。比如库里，他在去年购置了一栋新的豪宅，家里只有健身房，却没有篮球场，因为没有篮筐，他一度连续16天没能进行投篮训练。",
*                "status":2
*               },
*               ...
*           ]
*       },
*       "errcode":110,
*       "errmsg":"查询成功"
*     }
*
*/
app.post('/search/:page', async (req, res, next) => {
    try {
        let { page } = req.params;
        let { keyword } = req.body;
        
        let limit = 10; // 当前页显示条数
        let offset = (page - 1) * limit;  // 偏移量

        console.log(req.body);
        let searchList = await models.User.findAndCountAll({
            where: {
                name: {
                    [Op.like]: '%' + keyword + '%'
                }
            },
            limit,
            offset
        })
        res.json({
            searchList,
            errcode: 110,
            errmsg: "查询成功"
        })
    } catch (error) {
        next(error)
    }
})

/**
* @api {POST} /delete  删除任务
* @apiDescription 删除一条任务记录
* @apiVersion 1.0.0
* @apiName delete
* @apiGroup 任务列表
*
* @apiParam {String} id 任务id（必填） @mock=8
*
* @apiSuccessExample {json} 删除记录成功 return:
*     HTTP/1.1 200 OK
*     {
*       "list":1,
*       "errcode":110,
*       "errmsg":"删除成功"
*     }
*/
app.post('/delete', async (req, res, next) => {
    try {
        let { id } = req.body;
        let list = await models.User.destroy({
            where: {
                id
            }
        })
        res.json({
            list,
            errcode: 110,
            errmsg: "删除成功"
        })
    } catch (error) {
        next(error)
    }
})



// 所有的错误，http的status标记为500
app.use((err, req, res, next) => {
    if(err) {
        res.status(500).json({
            message: err.message
        })
    }
})

app.listen(port, () => {
    console.log("服务启动成功");
})