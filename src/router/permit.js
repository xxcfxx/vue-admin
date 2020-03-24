import router from "./index";
import { getToken, removeToken, removeUserName } from "@/utils/app"


const whiteRouter = ['/login'];//用indexOf 来判断数组中是否存在指定某个对象，如果不存在，则返回-1
//路由守卫
router.beforeEach((to, from, next) => {
    //进行路由跳转的时候，就会触发beforeEach
    if (getToken()) {
        //路由动态添加，分配菜单，每个角色分配不同的菜单
        console.log('存在');
        if (to.path == "/login") {
            removeToken();
            removeUserName();
            next();
        } else {
            //获取用户角色，分配权限
            next();
        }
    } else {
        console.log('不存在');
        //当判断to.path在白名单中时，直接执行next(),因为没有参数，所以不会再次触发beforeEach
        if (whiteRouter.indexOf(to.path) !== -1) {
            console.log('不跳转到login')
            next();
        } else {
            console.log('跳转到login')
            next('/login');
        }
    }
    // console.log(to) //进入的页面
    // console.log(from)//离开之前的页面（上一个页面）
    // console.log(next)
    // next()
})