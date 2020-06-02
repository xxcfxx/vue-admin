import { MessageBox } from 'element-ui';
import { Message } from 'element-ui';
import { reactive, ref } from "@vue/composition-api";
export function global() {
    const str = ref('');
    const arr = reactive({})
    const confirm = (params) => {
        MessageBox.confirm(params.content, params.tip || "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: params.type || "warning"
        })
            .then(() => {
                str.value = ""
                if (params.fn) {
                    params.fn(params.id)
                }
                // Message({
                //     type: "success",
                //     message: "删除成功!"
                // });
                Message.success("删除成功")
            })
            .catch(() => {
                Message({
                    type: "info",
                    message: "已取消删除"
                });
            });
    }

    return {
        str, confirm
    }
}