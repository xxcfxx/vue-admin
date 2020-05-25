import service from "@/utils/request.js";
/**
 * 列表
 */
export function GetCategory(data) {
    console.log(data);
    return service.request({
        method: "POST",
        url: "/news/getCategory/",
        data
        // data: data, 左边的data是变量名（key）后台接收的。右边的Data是接收的参数。如果两者都是同名的情况下，可以写成单一个即可（ES6的写法）
    });
}
/**
 * 新增
 */
/**
 * 编辑
 */

export function EditCategory(data) {
    console.log(data);
    return service.request({
        method: "POST",
        url: "/news/editCategory/",
        data
        // data: data, 左边的data是变量名（key）后台接收的。右边的Data是接收的参数。如果两者都是同名的情况下，可以写成单一个即可（ES6的写法）
    });
}
/**
 * 删除
 */
export function DelCategory(data) {
    console.log(data);
    return service.request({
        method: "POST",
        url: "/news/deleteCategory/",
        data
        // data: data, 左边的data是变量名（key）后台接收的。右边的Data是接收的参数。如果两者都是同名的情况下，可以写成单一个即可（ES6的写法）
    });
}

/**一级分类添加 */
export function AddFirstCategory(data) {
    console.log(data);
    return service.request({
        method: "POST",
        url: "/news/addFirstCategory/",
        data
        // data: data, 左边的data是变量名（key）后台接收的。右边的Data是接收的参数。如果两者都是同名的情况下，可以写成单一个即可（ES6的写法）
    });
}

/**子级分类添加 */
export function AddChildrenCategory(data) {
    console.log(data);
    return service.request({
        method: "POST",
        url: "/news/addChildrenCategory/",
        data
        // data: data, 左边的data是变量名（key）后台接收的。右边的Data是接收的参数。如果两者都是同名的情况下，可以写成单一个即可（ES6的写法）
    });
}
