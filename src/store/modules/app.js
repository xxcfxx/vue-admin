import { Login } from '@/api/login';
import { setToken, setUserName, getUserName, removeToken, removeUserName } from "@/utils/app.js";
const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    //isCollapse: JSON.parse(Cookie.get('isCollapse')) || false,
    //isCollapse: JSON.parse(localStorage.getItem('isCollapse')) || false,
    token: '',
    username: getUserName() || ''
}

const getters = {

}
//使用store.commit调用
//mutations专注于修改state
const mutations = {  //同步  没有回调
    SET_isCollapse(state) {
        state.isCollapse = !state.isCollapse
        //html5使用session存储isCollapse
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))

        //cookie存储
        //Cookie.set('isCollapse', JSON.stringify(state.isCollapse))

        //html5本地存储isCollapse
        //localStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))

    },
    set_token(state, value) {
        state.token = value
    },
    set_username(state, value) {
        state.username = value
    }
}
//使用store.dispatch方法调用
//actions处理业务代码，异步请求
const actions = {
    login({ commit }, requestData) {
        return new Promise((resolve, reject) => {
            //接口
            Login(requestData).then(response => {
                let data = response.data.data;
                console.log(data)
                commit('set_token', data.token);
                commit('set_username', data.username);
                setToken(data.token);
                setUserName(data.username);
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        })
    },
    exit({ commit }) {
        return new Promise((resolve, reject) => {
            commit('set_token', '');
            commit('set_username', '');
            removeToken();
            removeUserName();
            resolve();
        })

    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
