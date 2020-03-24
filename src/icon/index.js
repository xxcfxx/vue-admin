import Vue from "vue";
import svg from './SvgIcon'
Vue.component('svg-icon', svg);

/**require.context读取指定目录得所有文件
 * 第一个参数：遍历目录
 * 第二个：是否遍历子目录
 * 第三个：定义遍历文件规则
 */
const req = require.context('./svg', false, /\.svg$/)//正则表示表达式表示读取结尾为svg得文件
const requireAll = requireContext => {
    //console.log(requireContext.keys().map(requireContext))
    return requireContext.keys().map(requireContext)
}
requireAll(req)
