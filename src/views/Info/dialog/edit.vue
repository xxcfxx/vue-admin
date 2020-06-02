<template>
  <!--信息弹框-->
  <el-dialog
    title="修改"
    :visible.sync="data.dialogVisible"
    @close="close"
    @opened="openDialog"
    width="580px"
  >
    <el-form :model="data.form" ref="InfoForm">
      <el-form-item label="类型:" :label-width="data.formLabelWidth">
        <el-select v-model="data.form.category" placeholder="请选择" prop="category">
          <el-option
            v-for="item in data.categoryOptions"
            :key="item.id"
            :value="item.id"
            :label="item.category_name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题:" :label-width="data.formLabelWidth" prop="title">
        <el-input placeholder="请输入标题" v-model="data.form.title"></el-input>
      </el-form-item>
      <el-form-item label="概况:" :label-width="data.formLabelWidth" prop="content">
        <el-input type="textarea" placeholder="请输入概况" v-model="data.form.content"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="danger" :loading="data.submit_loading" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { EditInfo, GetInfoList } from "@/api/news";
import { ref, reactive, watch } from "@vue/composition-api";
export default {
  name: "DialogEditInfo",
  //从父组件接收到子组件
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    category: {
      type: Array,
      default: () => []
    },
    infoId: {
      type: String,
      default: ""
    }
  },

  setup(props, { root, emit, refs }) {
    const data = reactive({
      dialogVisible: false,
      formLabelWidth: "70px",
      submit_loading: false,
      form: {
        category: "",
        title: "",
        content: ""
      },
      categoryOptions: []
    });
    /**监听dialog的变化 */
    watch(() => {
      data.dialogVisible = props.flag;
    });
    const close = () => {
      data.dialogVisible = false;
      resetForm("InfoForm");
      emit("update:flag", false); //更新父组件dialog的状态
    };
    const openDialog = () => {
      data.categoryOptions = props.category;
      let requestData = {
        id: props.infoId,
        pageNumber: 1,
        pageSize: 10
      };
      getInfo(requestData);
    };
    const getInfo = requestData => {
      GetInfoList(requestData)
        .then(response => {
          let infoData = response.data.data.data[0];
          data.form = {
            category: infoData.categoryId,
            title: infoData.title,
            content: infoData.content
          };
        })
        .catch(error => {});
    };
    const submit = () => {
      const requestData = {
        id: props.infoId,
        categoryId: data.form.category,
        title: data.form.title,
        content: data.form.content,
        imgUrl: ""
      };
      data.submit_loading = true;
      /**修改信息 */
      EditInfo(requestData)
        .then(response => {
          root.$message({
            message: response.data.message,
            type: "success"
          });
          data.submit_loading = false;
          emit("getList"); //回调  重新调用获取信息列表函数
        })
        .catch(error => {
          data.submit_loading = false;
        });
    };
    /**清空表单 */
    const resetForm = formName => {
      refs[formName].resetFields();
    };
    return {
      data,
      close,
      openDialog,
      submit,
      resetForm
    };
  }
};
</script>
<style lang="scss" scoped>
</style>