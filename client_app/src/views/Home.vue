<template>
  <div class="home">
    <Breadcrumb>
      <Breadcrumb-item href="/">首页</Breadcrumb-item>
      <Breadcrumb-item href="/">任务列表</Breadcrumb-item>
    </Breadcrumb>

    <!-- 用户头像信息 -->
    <div class="user">
      <img src="../assets/images/boy.jpg" :alt="username">
      <span class="name">{{username}}</span>
      <zock-button type="info" plain round @click="layoutLogin">退出登录</zock-button>
    </div>

    <!-- 关键词搜索 -->
      <i-form ref="formInline" :rules="ruleInline" inline>
        <Form-item prop="word">
            <i-input type="text" v-model="formInline.word" placeholder="请输入关键字" @keyup.enter.native="handleKeyWord('formInline', 1)"></i-input>
        </Form-item>
        <Form-item>
            <i-button type="primary" @click="handleKeyWord('formInline', 1)">搜索</i-button>
        </Form-item>
        <Form-item class="so" v-if="formInline.soShow">
          共找到 <span>{{formInline.count}}</span> 条 <span>"{{resultWord}}"</span> 相关内容
        </Form-item>
      </i-form>
      
    <Card>

      <p slot="title" style="cursor: pointer;" @click="refresh">
        <Icon type="ios-paper-outline"></Icon>任务列表
      </p>
      
      <Button @click="createButton()" type="primary" slot="extra">
        <Icon type="ios-cog"></Icon>新增
      </Button>
    </Card>
    <Table :context="self" border :columns="columns" :data="data" stripe></Table>
    <Page :current="current" :total="total" @on-change="pageChange" show-elevator></Page>

    <!-- 右侧抽屉 -->
    <Drawer title="新增列表" width="580" :closable="true" v-model="drawerValue" draggable>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="标题" prop="name">
          <Input v-model="formValidate.name" placeholder="请输入标题" />
        </Form-item>
        <Form-item label="状态" prop="status">
          <Select v-model="formValidate.status" placeholder="请选择状态">
            <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            <!-- <Option value="1">待办</Option>
            <Option value="2">完成</Option>
            <Option value="3">删除</Option> -->
          </Select>
        </Form-item>
        <Form-item label="选择日期">
          <Form-item prop="date">
            <Date-picker type="date" placeholder="选择日期" v-model="formValidate.date"></Date-picker>
          </Form-item>
        </Form-item>
        <Form-item label="内容" prop="desc">
          <Input
            v-model="formValidate.desc"
            type="textarea"
            :autosize="{minRows: 8,maxRows: 15}"
            placeholder="请输入..."
          />
        </Form-item>
        <Form-item>
          <Button type="primary" @click="createOrEditor()">提交</Button>
          <Button type="default" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </Form-item>
      </Form>
    </Drawer>
  </div>
</template>

<script>
import * as http from "@/api/http";
import moment from 'moment';

export default {
  name: "Home",
  components: {},
  data() {
    return {
      commonPage: true,
      soPage: false,
      // 搜索
      resultWord: '',
      formInline: {
          soShow: false,
          count: 0,
          word: ''
      },
      ruleInline: {
        word: [
          { required: false, message: '请输入关键词', trigger: 'blur' }
        ]
      },
      username: localStorage.getItem('username'),
      self: this,
      taskId: '',         // 任务id
      drawerValue: false, // 控制抽屉
      createFlag: false,  // 是否为新建任务
      current: 1,         // 当前页
      total: 10,         // 任务总条数
      statusList: [       // 状态
        {
          label: "待办",
          value: "1"
        },
        {
          label: "完成",
          value: "2"
        },
        // {
        //   label: "删除",
        //   value: "3"
        // }
      ],
      formValidate: {
        name: "",
        status: "",
        date: "",
        desc: ""
      },
      ruleValidate: {
        name: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        date: [
          {
            required: true,
            type: "date",
            message: "请选择日期",
            trigger: "change"
          }
        ],
        desc: [
          { required: true, message: "请输入内容", trigger: "blur" },
          {
            type: "string",
            min: 20,
            message: "内容不能少于20字",
            trigger: "blur"
          }
        ]
      },
      columns: [
        {
          title: "id",
          key: "id",
          width: 65
        },
        {
          title: "标题",
          key: "name",
          width: 320,
          render: (h,params) => {
            // 关键字搜索高亮
            if(this.resultWord) {
              return h(
                "div", 
                {
                  domProps: {
                    // innerHTML: params.row.name.split(this.resultWord).join(`<em>${this.resultWord}</em>`)
                    innerHTML:`<a href="https://sports.qq.com/nba/" target='_blank'>` + params.row.name.split(this.resultWord).join(`<em>${this.resultWord}</em>`) + `</a>`
                  }
                }
              )
            }else {
              return h(
                "div", 
                {
                  domProps: {
                    innerHTML:`<a href="https://sports.qq.com/nba/" target='_blank'>` + params.row.name + `</a>`
                    // innerHTML: params.row.name
                  }
                }
              )
            }
          }
        },
        {
          title: "截止日期",
          key: "deadline",
          width: 120,
          render: (h, params) => {
              let deadline = moment(params.row.deadline).format('YYYY-MM-DD');
              return h('span', deadline);
          }
        },
        {
          title: "内容",
          key: "content"
        },
        {
          title: "状态",
          key: "status",
          width: 80,
          render: (h, params) => {
            // console.log(params)
            let status = params.row.status; // 状态（1:待办/2:完成/3:删除/-1:全部）
            if (status === -1) {
              return h("Button", "");
            }
            if (status === 1) {
              return h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  }
                },
                "待办"
              );
            }
            if (status === 2) {
              return h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  }
                },
                "完成"
              );
            }
            if (status === 3) {
              return h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  }
                },
                "删除"
              );
            }
          }
        },
        {
          title: "操作",
          key: "action",
          width: 240,
          align: "center",
          filters: [
            {
              label: "全部",
              value: "-1"
            },
            {
              label: "待办",
              value: "1"
            },
            {
              label: "完成",
              value: "2"
            },
            {
              label: "删除",
              value: "3"
            }
          ],
          filterMethod(value, row) {
            return row.status == value;
          },
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.update_status(params, 1);
                    }
                  }
                },
                "待办"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.update_status(params, 2);
                    }
                  }
                },
                "完成"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      // this.update_status(params, 3);  // 只改变状态，不删除数据库中的记录
                      this.deleteRecord(params);
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "default",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.taskId = params.row.id;
                      this.drawerValue = true;
                      this.createFlag = false;
                      this.editorShow(params);
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      data: []
    };
  },
  created() {
    // 接口--获取任务列表
    this.getTodos("-1", this.current);
  },
  methods: {
    refresh() {
      this.$router.go(0);
    },

    // 分页点击
    pageChange(page){
      this.current = page;
      if(this.commonPage && !this.soPage) {
        // console.log('正常分页');
        this.getTodos("-1", this.current);
      }else{
        // console.log('搜索分页');
        this.handleKeyWord('formInline', page);
      }
    },

    /**
     * 接口--获取任务列表
     * 接口参数为：状态/页码
     * 状态（1:待办/2:完成/3:删除/-1:全部）
     */
    getTodos(status, page) {
      http
        .getList(status, page)
        .then(res => {
          // console.log(res);
          this.total = res.list.count;
          this.data = res.list.rows;
        })
        .catch(err => {
          console.log(err);
        });
    },

    /**
     * 接口--更新任务状态
     * {id} 任务id
     * @param {status} 已修改的任务状态值--1待办，2完成，3删除
     */
    update_status(params, status) {
      const data = {
        id: params.row.id,
        status
      };
      http
        .updateStatus(data)
        .then(res => {
          console.log(res);
          if (res.errcode == 110) {
            this.getTodos("-1", this.current);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    /**
     * 接口--新增任务
     * @param {name} 标题
     * @param {deadline} 截止日期
     * @param {content} 内容
     * @param {status} 状态
     */
    createTask(name, deadline, content, status) {
      const data = {
        name,
        deadline,
        content,
        status
      };
      http
        .createList(data)
        .then(res => {
          console.log(res);
          if(res.errcode == 110) {
            this.getTodos("-1", this.current);  // 刷新页面
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 新增提交
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(this.formValidate);
          this.createTask(
            this.formValidate.name,
            this.formValidate.date,
            this.formValidate.desc,
            this.formValidate.status
          );
          this.$Message.success("提交成功!");
          this.closeDrawer();  // 关闭抽屉
        } else {
          this.$Message.error("表单验证失败!");
        }
      });
    },

    /**
     * 接口--编辑修改任务--回显
     * @param {id} 任务id
     */
    editorShow(params) {
      // console.log(params.row.id);
      const data = {
        id: params.row.id
      }
      http.updateStatus(data)
      .then(res => {
        if(res.errcode == 110) {
          this.formValidate.name = res.todo.name;
          this.formValidate.date = res.todo.deadline;
          this.formValidate.desc = res.todo.content;
          this.formValidate.status = res.todo.status.toString();
        }
        // console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    },

    /**
     * 接口--编辑修改任务--点击确定按钮
     * @param {name} 标题
     * @param {deadline} 截止日期
     * @param {content} 内容
     * @param {id} 任务id
     */
    editorTask() {
      const data = {
        id: this.taskId,
        name: this.formValidate.name,
        deadline: this.formValidate.date,
        content: this.formValidate.desc,
        status: this.formValidate.status * 1
      }
      console.log(data);
      http.update(data)
      .then(res => {
        if(res.errcode == 110) {
          this.closeDrawer();     // 编辑后关闭抽屉
          this.getTodos("-1", this.current); // 编辑后刷新任务
        }
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    },

    // 新增任务按钮
    createButton() {
      this.formValidate.name = "";
      this.formValidate.date = "";
      this.formValidate.desc = "";
      this.formValidate.status = "";
      this.drawerValue = true;
      this.createFlag = true;
    },

    // 点击提交按钮是新增还是编辑
    createOrEditor() {
      if(this.createFlag) {
        this.handleSubmit('formValidate');    //新增任务
      } else {
        this.editorTask();  // 修改编辑任务
      }
    },

    // 新增重置
    handleReset(name) {
      this.$refs[name].resetFields();
    },

    //关闭抽屉时触发
    closeDrawer() {
      this.drawerValue = false;
    },

    // 关键字--搜索
    handleKeyWord(name, page) {
      this.$refs[name].validate((valid) => {
        if (valid && this.formInline.word) {
          // this.$Message.success('提交成功!');
          const data = {
            keyword: this.formInline.word
          }
          // 搜索带分页（默认页码1）
          http.Search(data, page)
          .then(res => {
            console.log(res);
            if(res.errcode == 110) {
              this.formInline.soShow = true;
              this.formInline.count = res.searchList.count;
              this.data = res.searchList.rows;
              this.resultWord = this.formInline.word;
              // 分页
              this.total = res.searchList.count;
              this.soPage = true;

              // 搜索关键词高亮
              // this.data.map(item => {
              //   let arr = item.name.split(this.formInline.word);
              //   let str = arr.join('<i>' + this.formInline.word + '</i>');
              //   item.name = `${str}`;
              // })
            }
          })
          .catch(err => {
            console.log(err);
          })
        } else {
            this.$Message.error('请输入关键字!');
        }
      })
    },

    // 删除记录
    deleteRecord(params) {
      const data = {
        id: params.row.id
      };
      // console.log(data)
      http.Delete(data)
      .then(res => {
        console.log(res);
        if(res.errcode == 110) {
          this.$Message.success('删除记录成功!');
          this.getTodos("-1", this.current);
        }
      })
      .catch(err => {
        console.log(err);
      })
    },

    // 退出登录
    layoutLogin() {
      localStorage.removeItem("username");
      this.$router.push({ name: "Login" });
    }
      
  }
};
</script>

<style lang="scss">
@import "../assets/styles/home";
</style>