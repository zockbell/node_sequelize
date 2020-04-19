import qs from "qs"
import axios from "axios"

/**
 * 获取任务列表
 * @param { 状态（1:待办/2:完成/3:删除/-1:全部）} status 
 * @param {*} page 
 */
export async function getList(status, page) {
    const res = await axios.get('list/' + status + '/' + page);
    return res.data;
}

/**
 * 创建任务
 * @param {name} 标题
 * @param {deadline} 截止日期
 * @param {content} 内容
 * @param {status} 状态
 */
export async function createList(data) {
    const res = await axios.post("create/", qs.stringify(data));
    return res.data;
}

/**
 * 编辑任务
 * @param {name} 标题
 * @param {deadline} 截止日期
 * @param {content} 内容
 * @param {id} 任务id
 */
export async function update(data) {
    const res = await axios.post("update/", qs.stringify(data));
    return res.data;
}

/**
 * 修改任务状态
 * @param {id} 任务id
 * @param {status} 已修改的任务状态值--1待办，2完成，3删除
 */
export async function updateStatus(data) {
    const res = await axios.post("update_status/", qs.stringify(data));
    return res.data;
}

/**
 * 搜索
 * @param {keyword} 关键字
 */
export async function Search(data, page) {
    const res = await axios.post("search/" + page, qs.stringify(data));
    return res.data;
}

/**
 * 删除
 * @param {id} 要删除的记录id
 */
export async function Delete(data) {
    const res = await axios.post("delete/", qs.stringify(data));
    return res.data;
}

/**
 * 注册
 * @param {username} 用户名
 * @param {password} 密码
 */
export async function Reg(data) {
    const res = await axios.post("person/register/", qs.stringify(data));
    return res.data;
}

/**
 * 登录
 * @param {username} 用户名
 * @param {password} 密码
 */
export async function Login(data) {
    const res = await axios.post("person/login/", qs.stringify(data));
    return res.data;
}
