<template>
  <div id="category">
    <el-button type="danger" @click="addFirst({type:'category_add'})">添加一级分类</el-button>
    <hr class="hre9e9e9" />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category-wrap">
            <div class="category" v-for="item in category.data" :key="item.id">
              <h4>
                <svg-icon icon-class="minus" />
                {{item.category_name}}---{{item.id}}
                <div class="button-group">
                  <el-button
                    type="danger"
                    size="mini"
                    round
                    @click="openEdit({category:item,type:'category_edit'})"
                  >编辑</el-button>
                  <el-button
                    type="success"
                    size="mini"
                    round
                    @click="addChildren({category:item,type:'category_child_add'})"
                  >添加子级</el-button>
                  <el-button size="mini" round @click="confirmDelCategory(item.id)">删除</el-button>
                </div>
              </h4>
              <ul v-if="item.children">
                <li v-for="child in item.children" :key="child.id">
                  {{child.category_name}}
                  <div class="button-group">
                    <el-button type="danger" size="mini" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form label-width="142px" :model="form" ref="categoryForm" class="w410">
            <el-form-item label="一级分类ID:" style="display:none" prop="categoryId">
              <el-input v-model="form.categoryId"></el-input>
            </el-form-item>
            <el-form-item label="一级分类名称:" v-if="category_first" prop="categoryName">
              <el-input v-model="form.categoryName" :disabled="isFirst"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称:" v-if="category_children" prop="secCategoryName">
              <el-input v-model="form.secCategoryName" :disabled="isFirst"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                @click="submit"
                :loading="submit_loading"
                :disabled="isFirst"
              >确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { global } from "@/utils/global_V3.0";
import {
  AddFirstCategory,
  AddChildrenCategory,
  GetCategory,
  EditCategory,
  DelCategory
} from "@/api/news";
import { reactive, ref, onMounted } from "@vue/composition-api";
export default {
  name: "category",
  setup(props, { root, refs }) {
    const { confirm } = global(); //申明global_V3.0中的常量、方法
    const isFirst = ref(true);
    const category_first = ref(true);
    const category_children = ref(true);
    const submit_loading = ref(false);
    const submit_type = ref("");
    const form = reactive({
      categoryName: "",
      secCategoryName: "",
      categoryId: ""
    });
    const category = reactive({
      data: [],
      current: []
    });
    const submit = () => {
      if (!form.categoryName) {
        root.$message.error("分类名称不能为空!");
        return false;
      }
      /**添加一级分类 */
      if (submit_type.value == "category_add") {
        console.log(submit_type.value);
        //等待加载
        submit_loading.value = true;
        AddFirstCategory({ categoryName: form.categoryName })
          .then(response => {
            const data = response.data;
            if (data.resCode === 0) {
              root.$message({ message: data.message, type: "success" });
              getCategory();
            }
            submit_loading.value = false;
            resetForm("categoryForm");
          })
          .catch(error => {
            submit_loading.value = false;
          });
      } else if (submit_type.value == "category_edit") {
        console.log(submit_type.value);
        /**修改一级分类 */
        const requestData = {
          categoryName: form.categoryName,
          id: form.categoryId
        };
        EditCategory(requestData)
          .then(response => {
            const data = response.data;
            if (data.resCode === 0) {
              root.$message({ message: data.message, type: "success" });
              getCategory();
            }
            submit_loading.value = false;
            resetForm("categoryForm");
          })
          .catch(error => {
            submit_loading.value = false;
          });
      } else if (submit_type.value == "category_child_add") {
        console.log(submit_type.value);
        const requestData = {
          categoryName: form.categoryName,
          parentId: form.categoryId
        };
        AddChildrenCategory(requestData)
          .then(response => {
            const data = response.data;
            if (data.resCode === 0) {
              root.$message({ message: data.message, type: "success" });
              getCategory();
            }
            submit_loading.value = false;
            resetForm("categoryForm");
          })
          .catch(error => {
            submit_loading.value = false;
          });
      }
    };
    /**获取分类列表 */
    const getCategory = () => {
      GetCategory({})
        .then(response => {
          //console.log(response.data.data.data);
          category.data = response.data.data.data;
        })
        .catch(error => {});
    };
    /**确认删除分类 */
    const confirmDelCategory = categoryId => {
      confirm({
        content: "此操作将永久删除该文件, 是否继续?",
        tip: "警告",
        fn: deleteCategory,
        id: categoryId
      });
    };
    /**删除 */
    const deleteCategory = categoryId => {
      DelCategory({ categoryId: categoryId })
        .then(response => {
          const data = response.data;
          if (data.resCode === 0) {
            getCategory();
          }
        })
        .catch(error => {});
    };
    /**确认修改分类 */
    const confirmEditCategory = oldName => {
      confirm({
        content: "是否" + oldName + "修改为" + form.categoryName + "?",
        tip: "警告",
        fn: deleteCategory,
        id: categoryId
      });
    };
    /**清空表单 */
    const resetForm = formName => {
      refs[formName].resetFields();
    };
    /**打开添加一级分类 */
    const addFirst = params => {
      submit_type.value = params.type;
      category_children.value = false;
      isFirst.value = false;
      resetForm("categoryForm");
    };
    /**打开添加子级分类 */
    const addChildren = params => {
      submit_type.value = params.type;
      category_children.value = true;
      isFirst.value = false;
      category.current = params.category;
      form.categoryName = category.current.category_name;
      form.categoryId = category.current.id;
    };
    /**打开编辑 */
    const openEdit = params => {
      submit_type.value = params.type;
      category_children.value = false;
      isFirst.value = false;
      category.current = params.category;
      form.categoryName = category.current.category_name;
      form.categoryId = category.current.id;
    };
    /**
    生命周期
     */
    //挂载完成时执行（页面DOM元素完成时，实例完成）
    onMounted(() => {
      getCategory();
    });
    return {
      //ref
      isFirst,
      category_first,
      category_children,
      submit_loading,
      submit_type,
      //reactive
      form,
      category,
      //method
      submit,
      resetForm,
      addFirst,
      addChildren,
      confirmDelCategory,
      deleteCategory,
      openEdit,
      confirmEditCategory
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.category-wrap {
  div:first-child {
    &:before {
      top: 20px;
    }
  }
  div:last-child {
    &:before {
      bottom: 21px;
    }
  }
}
.menu-title {
  background-color: #f3f3f3;
  padding-left: 22px;
  line-height: 44px;
}
.category {
  line-height: 44px;
  position: relative;
  cursor: pointer;
  &:before {
    position: absolute;
    content: "";
    left: 22px;
    top: 0;
    bottom: 0;
    width: 32px;
    border-left: 1px dotted #000;
  }
  h4 {
    position: relative;
    padding-left: 40px;
  }
  svg {
    position: absolute;
    left: 14px;
    top: 14px;
    background-color: #fff;
    font-size: 17px;
  }
  li {
    position: relative;
    padding-left: 36px;
    margin-left: 24px;
    &:before {
      position: absolute;
      content: "";
      left: 0;
      top: 22px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }
  li,
  h4 {
    @include webkit(transition, all 0.5s ease 0s);
    &:hover {
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
}
.button-group {
  display: none;
  position: absolute;
  z-index: 2;
  right: 11px;
  top: -1px;
  .el-button {
    height: 28px;
    font-size: 12px;
  }
}
.w410 {
  width: 410px;
  padding-top: 10px;
}

.hre9e9e9 {
  background-color: #e9e9e9;
  height: 1px;
  border: 0;
  margin-left: -30px;
  margin-right: -30px;
}
</style>