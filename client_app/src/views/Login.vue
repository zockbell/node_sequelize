<template>
    <div class="loginwrap">
        <div :style="backgroundDiv" class="bg"></div>

        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="2">
            <FormItem align="center">
                <img src="../assets/images/logo.png" alt="emmet">
            </FormItem>
            <FormItem label="" prop="name">
                <Input v-model="formValidate.name" size="large" placeholder="请输入用户名" />
            </FormItem>
            <FormItem label="" prop="password">
                <Input type="password" v-model="formValidate.password" size="large" placeholder="请输入密码" @keyup.enter.native="handleSubmit('formValidate')" />
            </FormItem>
            <FormItem style="text-align: center;">
                <Button size="large" type="primary" @click="handleSubmit('formValidate')">登录</Button>
                <router-link :to="{ name: 'Register' }">
                    <Button size="large" style="margin-left: 10px">注册</Button>
                </router-link>
            </FormItem>
        </Form>

    </div>
</template>

<script>
import * as http from '../api/http';
export default {
    data () {
        return {
            showPopup: false,
            backgroundDiv: {
                backgroundImage: 'url(' + require('../assets/images/bg.jpeg') + ')',
            },
            formValidate: {
                name: '',
                password: '',
                activeText: '账号或密码错误!',
            },
            ruleValidate: {
                name: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ],
            },
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    const data = {
                        username: this.formValidate.name,
                        password: this.formValidate.password
                    }
                    http.Login(data)
                    .then(res => {
                        console.log(res);
                        if(res.errcode == 110) {
                            localStorage.setItem("username", this.formValidate.name);
                            this.$Message.success(res.errmsg);
                            this.$router.push({ 
                                name: 'Home'
                            });
                        }else if(res.errcode == 113) {
                            this.$Message.error(res.errmsg);
                        }else if(res.errcode == 114){
                            this.$Message.error(res.errmsg);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        this.$Message.error(err);
                    })
                } else {
                    this.$Message.error('登录失败，请检查输入是否正确!');
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/login";
</style>