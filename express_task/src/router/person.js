const express = require("express");
const models = require("../../db/models");

const router = express.Router();

//设置跨域访问
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

/**
* @api {POST} /person/register  用户注册
* @apiDescription 用户输入用户名、密码、确认密码进行注册
* @apiVersion 1.0.0
* @apiName register
* @apiGroup 用户信息
*
* @apiParam {String} username 用户名(必填) @mock=zhangsan
* @apiParam {String} password 登录密码，使用bcrypt加密上送(必填) @mock=123456
*
* @apiSuccessExample {json} 注册成功 return:
*     HTTP/1.1 200 OK
*     {
*       "errcode": 110,
*       "errmsg": "注册成功！"
*     }
*
* @apiErrorExample 用户名已存在 return:
*     HTTP/1.1 200 OK
*     {
*       "errcode": 112,
*       "errmsg": "用户名已存在！"
*     }
*/
router.post('/register', async (req, res, next) => {
    // console.log(req.body);
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
        .spread((user, created) => {
            // console.log(created);
            if(created) {
                res.json({
                    // person,
                    errcode: 110,
                    errmsg: "注册成功！"
                })
            }else {
                res.json({
                    // person,
                    errcode: 112,
                    errmsg: "用户名已存在！"
                })
            }
        })
    
        // res.json({
        //     // person,
        //     errcode: 110,
        //     errmsg: "注册成功"
        // })
    } catch (error) {
        next(error)
    }
})



/**
* @api {POST} /person/login  用户登录
* @apiDescription 根据用户名、密码登录({110}登录成功！/{113}用户名不存在！/{114}用户名或密码错误！)
* @apiVersion 1.0.0
* @apiName login
* @apiGroup 用户信息
*
* @apiParam {String} username 用户名(必填) @mock=zhangsan
* @apiParam {String} password 登录密码(必填) @mock=123456
*
* @apiSuccessExample {json} 注册成功 return:
*     HTTP/1.1 200 OK
*     {
*       "errcode": 110,
*       "errmsg": "登录成功！"
*     }
*
* @apiSuccessExample {json} 注册成功 return:
*     HTTP/1.1 200 OK
*     {
*       "errcode": 113,
*       "errmsg": "用户名不存在！"
*     }
*
* @apiSuccessExample {json} 注册成功 return:
*     HTTP/1.1 200 OK
*     {
*       "errcode": 114,
*       "errmsg": "用户名或密码错误！"
*     }
*/
router.post('/login', async (req, res, next) => {
    // console.log(req.body);
    try {
        let { username, password } = req.body;   // 使用req.body前必须安装中间件body-parser
        // 数据持久化到数据库
        let person = await models.Person.findOne({
            where: {
                username
            }
        })
        // 如果用户名不存在
        if(!person) {
            res.json({
                errcode: 113,
                errmsg: "用户名不存在！"
            })
        }

        // 用户名存在，并去查询数据库作密码比对
        let personPass = await models.Person.findOne({
            where: {
                username,
                password
            }
        })

        // console.log(personPass)

        if(!personPass) {
            res.json({
                errcode: 114,
                errmsg: "用户名或密码错误！"
            })
        } else {
            res.json({
                errcode: 110,
                errmsg: "登录成功！"
            })
        }
    
    } catch (error) {
        next(error)
    }
})

module.exports = router;