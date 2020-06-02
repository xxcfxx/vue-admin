import { reactive } from "@vue/composition-api";
import { GetCategory, GetCategoryAll } from "@/api/news";
export function common() {
    const categoryData = reactive({
        item: []
    })
    // 获取分类
    const getCategoryInfo = () => {
        GetCategory({}).then(response => {
            //console.log(response.data.data.data);
            categoryData.item = response.data.data.data;
        }).catch(error => {

        })
    }
    // 获取全部分类
    const getCategoryInfoAll = () => {
        GetCategoryAll({}).then(response => {
            console.log(response)
            //console.log(response.data.data.data);
            categoryData.item = response.data.data
        }).catch(error => {

        })
    }
    return {
        categoryData,
        getCategoryInfo,
        getCategoryInfoAll
    }
}