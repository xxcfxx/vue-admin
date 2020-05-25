<template>
  <!--信息弹框-->
  <el-dialog title="新增" :visible.sync="dialogVisible" @close="close" width="580px">
    <el-form :model="form">
      <el-form-item label="类型:" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题:" :label-width="formLabelWidth">
        <el-input placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="概况:" :label-width="formLabelWidth">
        <el-input type="textarea" placeholder="请输入概况"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="danger" @click="close">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { ref, reactive, watch } from "@vue/composition-api";
export default {
  name: "DialogInfo",
  //从父组件接收到子组件
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
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
  setup(props, { root, emit }) {
    const dialogVisible = ref(false);
    const formLabelWidth = ref("70px");
    const form = reactive({
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: ""
    });
    watch(() => {
      dialogVisible.value = props.flag;
    });
    const close = () => {
      dialogVisible.value = false;
      emit("update:flag", false);
    };
    return {
      dialogVisible,
      formLabelWidth,
      form,
      close
    };
  }
};
</script>
<style lang="scss" scoped>
</style>