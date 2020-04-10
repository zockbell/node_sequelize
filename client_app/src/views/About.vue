<template>
    <div>
        <Table border :context="self" :columns="columns7" :data="data6"></Table>

        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <Form-item label="姓名" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入姓名" />
            </Form-item>
            <Form-item label="邮箱" prop="mail">
                <Input v-model="formValidate.mail" placeholder="请输入邮箱" />
            </Form-item>
            <Form-item label="城市" prop="city">
                <Select v-model="formValidate.city" placeholder="请选择所在地">
                    <Option value="beijing">北京市</Option>
                    <Option value="shanghai">上海市</Option>
                    <Option value="shenzhen">深圳市</Option>
                </Select>
            </Form-item>
            <Form-item label="性别" prop="gender">
                <Radio-group v-model="formValidate.gender">
                    <Radio label="male">男</Radio>
                    <Radio label="female">女</Radio>
                </Radio-group>
            </Form-item>
            <Form-item label="爱好" prop="interest">
                <Checkbox-group v-model="formValidate.interest">
                    <Checkbox label="吃饭"></Checkbox>
                    <Checkbox label="睡觉"></Checkbox>
                    <Checkbox label="跑步"></Checkbox>
                    <Checkbox label="看电影"></Checkbox>
                </Checkbox-group>
            </Form-item>
            <Form-item label="介绍" prop="desc">
                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..." />
            </Form-item>
            <Form-item>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button type="default" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </Form-item>
        </Form>

        <hr>
        <!-- 抽屉测试 -->
        <div>
            <Button @click="value3 = true" type="primary">Create</Button>
            <Drawer
                title="Create"
                v-model="value3"
                width="720"
                :mask-closable="false"
                :styles="styles"
            >
                <Form :model="formData">
                    <Row :gutter="32">
                        <Col span="12">
                            <FormItem label="Name" label-position="top">
                                <Input v-model="formData.name" placeholder="please enter user name" />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="Url" label-position="top">
                                <Input v-model="formData.url" placeholder="please enter url">
                                    <span slot="prepend">http://</span>
                                    <span slot="append">.com</span>
                                </Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="32">
                        <Col span="12">
                            <FormItem label="Owner" label-position="top">
                                <Select v-model="formData.owner" placeholder="please select an owner">
                                    <Option value="jobs">Steven Paul Jobs</Option>
                                    <Option value="ive">Sir Jonathan Paul Ive</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="Type" label-position="top">
                                <Select v-model="formData.type" placeholder="please choose the type">
                                    <Option value="private">Private</Option>
                                    <Option value="public">Public</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="32">
                        <Col span="12">
                            <FormItem label="Approver" label-position="top">
                                <Select v-model="formData.approver" placeholder="please choose the approver">
                                    <Option value="jobs">Steven Paul Jobs</Option>
                                    <Option value="ive">Sir Jonathan Paul Ive</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="DateTime" label-position="top">
                                <DatePicker v-model="formData.date" type="daterange" placeholder="please select the date" style="display: block" placement="bottom-end"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem label="Description" label-position="top">
                        <Input type="textarea" v-model="formData.desc" :rows="4" placeholder="please enter the description" />
                    </FormItem>
                </Form>
                <div class="demo-drawer-footer">
                    <Button style="margin-right: 8px" @click="value3 = false">Cancel</Button>
                    <Button type="primary" @click="value3 = false">Submit</Button>
                </div>
            </Drawer>    
        </div>

    </div>
</template>
<script>
    export default {
        data () {
            return {
                self: this,
                columns7: [
                    {
                        title: '姓名',
                        key: 'name',
                        render (row, column, index) {
                            return `<Icon type="person"></Icon> <strong>${row.name}</strong>`;
                        }
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="show(${index})">查看</i-button> <i-button type="error" size="small" @click="remove(${index})">删除</i-button>`;
                        }
                    }
                ],
                data6: [
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居'
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        address: '北京市海淀区西二旗'
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道'
                    }
                ],

                formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
                        { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                    ]
                },
                value3: false,
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                formData: {
                    name: '',
                    url: '',
                    owner: '',
                    type: '',
                    approver: '',
                    date: '',
                    desc: ''
                },
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: '用户信息',
                    content: `姓名：${this.data6[index].name}<br>年龄：${this.data6[index].age}<br>地址：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            },

            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },

        }
    }
</script>