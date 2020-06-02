import { reactive } from "@vue/composition-api";
import { GetCategory } from "@/api/news";
export function common() {
    const categoryData = reactive({
        item: []
    })
    const getCategoryInfo = () => {
        GetCategory({}).then(response => {
            //console.log(response.data.data.data);
            categoryData.item = response.data.data.data;
        }).catch(error => {

        })
    }
    return {
        categoryData,
        getCategoryInfo
    }
}