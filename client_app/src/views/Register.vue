<template>
    <div class="regwrap" :style="backgroundDiv">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
            <FormItem align="center">
                <img src="../assets/images/logo.png" alt="">
            </FormItem>
            <FormItem label="用户名" prop="username">
                <Input type="text" v-model="formCustom.username" />
            </FormItem>
            <FormItem label="密码" prop="passwd">
                <Input type="password" v-model="formCustom.passwd" />
            </FormItem>
            <FormItem label="确认密码" prop="passwdCheck">
                <Input type="password" v-model="formCustom.passwdCheck" @keyup.enter.native="handleSubmit('formCustom')" />
            </FormItem>
            <FormItem align="center">
                <Button type="primary" @click="handleSubmit('formCustom')">注册</Button>
                <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
            </FormItem>
            <FormItem align="center">
                <router-link :to="{'name': 'Login'}">
                    <p>已有账号，返回登录</p>
                </router-link>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import * as http from "@/api/http";

export default {
    data () {
        const validateUsername = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名不能为空！'));
            }
            // 模拟异步验证效果
            setTimeout(() => {
                callback();
            }, 10);
        };
        
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码！'));
            } else if (value.length < 6) {
                callback(new Error('密码不能小于6位！'));
            } else {
                if (this.formCustom.passwdCheck !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formCustom.validateField('passwdCheck');
                }
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码！'));
            } else if (value !== this.formCustom.passwd) {
                callback(new Error('两次密码不一致！'));
            } else {
                callback();
            }
        };
        
        return {
            backgroundDiv: {
                backgroundImage: 'url(' + require('../assets/images/bg3.jpeg') + ')',
            },
            formCustom: {
                username: '',
                passwd: '',
                passwdCheck: ''
            },
            ruleCustom: {
                username: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                passwd: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                passwdCheck: [
                    { validator: validatePassCheck, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    const data = {
                        username: this.formCustom.username,
                        password: this.formCustom.passwd
                    }
                    http.Reg(data)
                    .then(res => {
                        console.log(res);
                        if(res.errcode == 110) {
                            this.$Message.success('恭喜你，注册成功!');
                            this.$router.push({ name: 'Login'});
                        }else if(res.errcode == 112) {
                            this.$Message.success('用户名已存在!');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        this.$Message.error(err);
                    })
                } else {
                    this.$Message.error('注册失败!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/register";
</style>