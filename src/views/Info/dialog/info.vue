<template>
  <!--信息弹框-->
  <el-dialog
    title="新增"
    :visible.sync="data.dialogVisible"
    @close="close"
    @opened="openDialog"
    width="580px"
  >
    <el-form :model="data.form">
      <el-form-item label="类型:" :label-width="data.formLabelWidth" ref="InfoForm">
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
import { AddInfo, GetInfoList } from "@/api/news";
import { ref, reactive, watch } from "@vue/composition-api";
export default {
  name: "DialogInfo",
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
    pageNumber: {
      type: Number,
      default: 10
    },
    pageSize: {
      type: Number,
      default: 1
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
      categoryOptions: [],
      page: {
        pageNumber: 10,
        pageSize: 1
      }
    });
    // const dialogVisible = ref(false);
    // const formLabelWidth = ref("70px");
    // const submit_loading = ref(false);
    // const form = reactive({
    //   category: "",
    //   title: "",
    //   content: ""
    // });
    // const categoryOptions = reactive({
    //   item: ""
    // });
    /**监听dialog的变化 */
    watch(() => {
      data.dialogVisible = props.flag;
      data.page.pageNumber = props.pageNumber;
      data.page.pageSize = props.pageSize;
    });
    const close = () => {
      data.dialogVisible = false;
      resetForm("InfoForm");
      emit("update:flag", false);
    };
    const openDialog = () => {
      data.categoryOptions = props.category;
    };
    const submit = () => {
      const requestData = {
        category: data.form.category,
        title: data.form.title,
        content: data.form.content
      };
      data.submit_loading = true;
      /**添加新闻 */
      AddInfo(requestData)
        .then(response => {
          console.log(response);
          root.$message({
            message: response.data.message,
            type: "success"
          });
          data.submit_loading = false;
          const requestData = data.page;
          resetForm("InfoForm");
          GetInfoList(requestData);
        })
        .catch(error => {
          data.submit_loading = false;
        });
    };
    /**清空表单 */
    const resetForm = formName => {
      data.form.category = "";
      data.form.title = "";
      data.form.content = "";
      // refs[formName].resetFields();
    };
    return {
      //ref
      // dialogVisible,
      // formLabelWidth,
      // submit_loading,
      // //reactive
      // categoryOptions,
      // form,
      //method
      data,
      close,
      openDialog,
      submit,
      resetForm
    };
  }

  //vue 2.0写法
  // data() {
  //   return {
  //     dialogVisible: true,
  //     form: {
  //       name: "",
  //       region: "",
  //       date1: "",
  //       date2: "",
  //       delivery: false,
  //       type: [],
  //       resource: "",
  //       desc: ""
  //     },
  //     formLabelWidth: "70px"
  //   };
  // },
  // methods: {
  //   close() {
  //     this.dialogVisible = false;
  //     //this.$emit("close", false);//要用回调来处理逻辑时，使用这个方法
  //     this.$emit("update:flag", false);
  //   }
  // },
  // //监听flag的变化
  // watch: {
  //   flag: {
  //     handler(newValue, oldValue) {
  //       this.dialogVisible = newValue;
  //     }
  //   }
  // }
};
</script>
<style lang="scss" scoped>
</style>