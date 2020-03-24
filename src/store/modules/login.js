const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    //isCollapse: JSON.parse(Cookie.get('isCollapse')) || false,
    //isCollapse: JSON.parse(localStorage.getItem('isCollapse')) || false,
    count: 10
}

const getters = {
    count: state => state.count + 10
}
//使用store.commit调用
//mutations专注于修改state
const mutations = {  //同步  没有回调
    SET_COUNT(state, value) {
        state.count = value
    },
    SET_isCollapse(state) {
        state.isCollapse = !state.isCollapse
        //html5使用session存储isCollapse
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))

        //cookie存储
        //Cookie.set('isCollapse', JSON.stringify(state.isCollapse))

        //html5本地存储isCollapse
        //localStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))


    }
}
//使用store.dispatch方法调用
//actions处理业务代码，异步请求
const actions = {
    login(content, requestData) {
        return new Promise((resolve, reject) => {
            //接口
            Login(requestData).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
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
