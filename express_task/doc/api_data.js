define({ "api": [
  {
    "type": "POST",
    "url": "/create",
    "title": "创建任务",
    "description": "<p>创建任务接口</p>",
    "version": "1.0.0",
    "name": "create",
    "group": "任务列表",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>任务标题(必填) @mock=我还是从前那个少年</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "deadline",
            "description": "<p>任务截止时间（必填) @mock=2020-06-08</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>任务内容（必填) @mock=我还是从前那个少年，没有一丝丝改变，时间只不过是考验，种在心中信念丝毫未减</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "status",
            "description": "<p>任务状态 {1为待办，2为完成} @mock=1</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "创建任务成功 return:",
          "content": "HTTP/1.1 200 OK\n{\n  \"todo\":{\n      \"id\":50,\n      \"name\":\"我还是从前那个少年\",\n      \"deadline\":\"2020-04-30\",\n      \"content\":\"我还是从前那个少年，没有一丝丝改变，时间只不过是考验，种在心中信念丝毫未减\",\n      \"status\":\"1\"\n  },\n  \"errcode\":110,\n  \"errmsg\":\"任务创建成功\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/app.js",
    "groupTitle": "任务列表"
  },
  {
    "type": "POST",
    "url": "/delete",
    "title": "删除任务",
    "description": "<p>删除一条任务记录</p>",
    "version": "1.0.0",
    "name": "delete",
    "group": "任务列表",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>任务id（必填） @mock=8</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "删除记录成功 return:",
          "content": "HTTP/1.1 200 OK\n{\n  \"list\":1,\n  \"errcode\":110,\n  \"errmsg\":\"删除成功\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/app.js",
    "groupTitle": "任务列表"
  },
  {
    "type": "GET",
    "url": "/list/:status/:page",
    "title": "查询任务列表",
    "description": "<p>获取任务列表信息</p>",
    "version": "1.0.0",
    "name": "list",
    "group": "任务列表",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>任务状态(必填) {-1代表全部状态,1为待办，2为完成}  @mock=-1</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page",
            "description": "<p>页码(必填) @mock=1</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "获取任务列表信息成功 return:",
          "content": "HTTP/1.1 200 OK\n{\n    \"list\": {\n        \"count\": 32,\n        \"rows\": [\n            {\n                \"id\": 1,\n                \"name\": \"湖人球员已经结束14天隔离期 没有球员出现新冠症状\",\n                \"deadline\": \"2020-04-05T16:00:00.000Z\",\n                \"content\": \"新型冠状病毒波及NBA，爵士、篮网、活塞等球队都有球员感染。北京时间的3月18日，湖人官方决定对球员们进行新型冠状病毒的检测，同时开始为期14天的自我隔离。当时，湖人对于球队的大部分球员都进行了检测，他们开汽车抵达球队的训练馆，直接坐在车上完成了检测，整个过程都没有下车。\",\n                \"status\": 1\n            },\n            {\n                \"id\": 2,\n                \"name\": \"数据印证詹皇真联盟门面担当：社媒相关内容三倍于字母哥\",\n                \"deadline\": \"2020-04-09T16:00:00.000Z\",\n                \"content\": \"北京时间4月1日，针对网上很多球迷戏称他们是“勒布朗体育”、“锡安体育”，《露天看台体育》今天对2019-20赛季他们在社交媒体Instagram官方账号所发布的所有内容进行了统计，并把与联盟各队以及主要明星球员的相关内容数量进行了一个大排行。\",\n                \"status\": 1\n            },\n            ...                   \n        ]\n    },\n    \"errcode\": 110,\n    \"errmsg\": \"列表获取成功\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/app.js",
    "groupTitle": "任务列表"
  },
  {
    "type": "POST",
    "url": "/search/:page",
    "title": "搜索关键字",
    "description": "<p>搜索关键字接口，带页码参数（默认为第1页）</p>",
    "version": "1.0.0",
    "name": "search",
    "group": "任务列表",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>搜索关键字（必填） @mock=湖人总冠军</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "搜索关键词成功 return:",
          "content": "HTTP/1.1 200 OK\n{\n  \"searchList\": {\n      \"count\":4,\n      \"rows\":[\n          {\n           \"id\":2,\n           \"name\":\"湖人球员已经结束14天隔离期 没有球员出现新冠症状\",\n           \"deadline\":\"2020-04-05T16:00:00.000Z\",\n           \"content\":\"新型冠状病毒波及NBA，爵士、篮网、活塞等球队都有球员感染。北京时间的3月18日，湖人官方决定对球员们进行新型冠状病毒的检测，同时开始为期14天的自我隔离。当时，湖人对于球队的大部分球员都进行了检测，他们开汽车抵达球队的训练馆，直接坐在车上完成了检测，整个过程都没有下车。\",\n           \"status\":1\n          },\n          {\n           \"id\":30,\n           \"name\":\"NBA球员也要上网课 湖人快船通过视频安排球员训练\",\n           \"deadline\":\"2020-04-28T16:00:00.000Z\",\n           \"content\":\"在联盟因疫情停摆后，球队纷纷关闭了体育馆和训练馆，这也让部分隔离在家的球员出现了无法训练的情况。比如库里，他在去年购置了一栋新的豪宅，家里只有健身房，却没有篮球场，因为没有篮筐，他一度连续16天没能进行投篮训练。\",\n           \"status\":2\n          },\n          ...\n      ]\n  },\n  \"errcode\":110,\n  \"errmsg\":\"查询成功\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/app.js",
    "groupTitle": "任务列表"
  },
  {
    "type": "POST",
    "url": "/update",
    "title": "修改/更新任务",
    "description": "<p>修改、更新任务接口</p>",
    "version": "1.0.0",
    "name": "update",
    "group": "任务列表",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>任务标题 @mock=我已经不是那个少年</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "deadline",
            "description": "<p>任务截止时间 @mock=2020-06-08</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "content",
            "description": "<p>任务内容 @mock=我还是从前那个少年，没有一丝丝改变，时间只不过是考验，种在心中信念丝毫未减。可惜，我已经不是那个少年了</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "status",
            "description": "<p>任务状态 {1为待办，2为完成} @mock=2</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "修改任务成功 return:",
          "content": "HTTP/1.1 200 OK\n{\n  \"todo\":{\n      \"id\":50,\n      \"name\":\"我已经不是那个少年\",\n      \"deadline\":\"2020-04-30\",\n      \"content\":\"我还是从前那个少年，没有一丝丝改变，时间只不过是考验，种在心中信念丝毫未减。可惜，我已经不是那个少年了\",\n       \"status\":\"2\"\n  },\n  \"errcode\":110,\n  \"errmsg\":\"任务已更新\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/app.js",
    "groupTitle": "任务列表"
  },
  {
    "type": "POST",
    "url": "/update_status",
    "title": "修改任务的状态",
    "description": "<p>修改任务的状态，此接口可与update接口用一个</p>",
    "version": "1.0.0",
    "name": "update_status",
    "group": "任务列表",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>任务id（必填） @mock=8</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "修改任务成功 return:",
          "content": "HTTP/1.1 200 OK\n{\n  \"todo\":{\n      \"id\":50,\n      \"name\":\"我已经不是那个少年\",\n      \"deadline\":\"2020-04-30\",\n      \"content\":\"我还是从前那个少年，没有一丝丝改变，时间只不过是考验，种在心中信念丝毫未减。可惜，我已经不是那个少年了\",\n      \"status\":\"1\"\n  },\n\"errcode\":110,\n\"errmsg\":\"任务状态更新成功\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/app.js",
    "groupTitle": "任务列表"
  },
  {
    "type": "POST",
    "url": "/person/login",
    "title": "用户登录",
    "description": "<p>根据用户名、密码登录({110}登录成功！/{113}用户名不存在！/{114}用户名或密码错误！)</p>",
    "version": "1.0.0",
    "name": "login",
    "group": "用户信息",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名(必填) @mock=zhangsan</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>登录密码(必填) @mock=123456</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "注册成功 return:",
          "content": "HTTP/1.1 200 OK\n{\n  \"errcode\": 110,\n  \"errmsg\": \"登录成功！\"\n}",
          "type": "json"
        },
        {
          "title": "注册成功 return:",
          "content": "HTTP/1.1 200 OK\n{\n  \"errcode\": 113,\n  \"errmsg\": \"用户名不存在！\"\n}",
          "type": "json"
        },
        {
          "title": "注册成功 return:",
          "content": "HTTP/1.1 200 OK\n{\n  \"errcode\": 114,\n  \"errmsg\": \"用户名或密码错误！\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/router/person.js",
    "groupTitle": "用户信息"
  },
  {
    "type": "POST",
    "url": "/person/register",
    "title": "用户注册",
    "description": "<p>用户输入用户名、密码、确认密码进行注册</p>",
    "version": "1.0.0",
    "name": "register",
    "group": "用户信息",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名(必填) @mock=zhangsan</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>登录密码，使用bcrypt加密上送(必填) @mock=123456</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "注册成功 return:",
          "content": "HTTP/1.1 200 OK\n{\n  \"errcode\": 110,\n  \"errmsg\": \"注册成功！\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "用户名已存在 return:",
          "content": "HTTP/1.1 200 OK\n{\n  \"errcode\": 112,\n  \"errmsg\": \"用户名已存在！\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/router/person.js",
    "groupTitle": "用户信息"
  }
] });
