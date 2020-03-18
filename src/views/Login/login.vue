<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{ current: item.current }"
          v-for="item in menuTab"
          :key="item.id"
          @click="toggleMenu(item)"
        >{{ item.txt }}</li>
      </ul>
      <!--表单 start -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="item-block">
          <label for="username">邮箱</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-block">
          <label for="pwd">密码</label>
          <el-input
            id="pwd"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <!-- v-if 会删除元素v-show只是改变元素隐藏-->
        <el-form-item prop="repassword" class="item-block" v-if="model === 'register'">
          <label for="repwd">重复密码</label>
          <el-input
            id="repwd"
            type="password"
            v-model="ruleForm.repassword"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-block">
          <label for="code">验证码</label>
          <el-row :gutter="11">
            <el-col :span="15">
              <el-input id="code" v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                type="success"
                class="block"
                @click="getSms()"
                :disabled="codeButton.status"
              >{{codeButton.text}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            :disabled="loginButtonStatus"
            @click="submitForm('loginForm')"
            class="login-btn block"
          >{{model=='login'?"登录":"注册"}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
/**加密方式base64,md5,sha1 */
import sha1 from "js-sha1";
import {
  stripscript,
  validateEmail,
  validatePwd,
  validateVcode
} from "@/utils/validate";
import { reactive, ref, onMounted } from "@vue/composition-api";
import { GetSms, Submit } from "@/api/login.js";
export default {
  name: "login",
  // setup(props, context) {
  /**
    3.0               2.0
     root: (...) ==this.$root
     parent: (...)
     refs: (...)
     attrs: (...)
     listeners: (...)
     isServer: (...)
     ssrContext: (...)
     */
  setup(props, { refs, root }) {
    /**验证表单 */
    //验证用户名
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback();
      }
    };
    //验证密码
    let validatePassword = (rule, value, callback) => {
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePwd(value)) {
        callback(new Error("密码为6-20位数字+字母"));
      } else {
        callback();
      }
    };
    //验证密码
    let validateRePassword = (rule, value, callback) => {
      if (model.value == "login") {
        callback();
      }
      ruleForm.repassword = stripscript(value);
      value = ruleForm.repassword;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("重复密码错误"));
      } else {
        callback();
      }
    };
    //验证验证码
    let checkCode = (rule, value, callback) => {
      ruleForm.code = stripscript(value);
      value = ruleForm.code;
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (validateVcode(value)) {
        callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    //菜单数据
    const menuTab = reactive([
      {
        txt: "登录",
        current: true,
        type: "login"
      },
      { txt: "注册", current: false, type: "register" }
    ]);
    const model = ref("login");
    const loginButtonStatus = ref(true);
    const codeButton = reactive({
      status: false,
      text: "获取验证码"
    });
    const timer = ref(null);
    console.log(model.value);
    //表单数据
    const ruleForm = reactive({
      username: "",
      password: "",
      repassword: "",
      code: ""
    });
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      repassword: [{ validator: validateRePassword, trigger: "blur" }],
      code: [{ validator: checkCode, trigger: "blur" }]
    });
    /**表单切换 */
    const toggleMenu = data => {
      console.log(data.txt);
      menuTab.forEach(elem => {
        elem.current = false;
      });
      data.current = true;
      model.value = data.type;
      // this.$refs[formName].resetFields();2.0
      resetFormData();
      clearcountDown();
    };
    /**重置表单 */
    const resetFormData = () => {
      refs["loginForm"].resetFields();
    };
    const updateCodeButton = params => {
      codeButton.status = params.status;
      codeButton.text = params.text;
    };
    /**获取验证码
     */
    const getSms = () => {
      //提示用户名邮箱为空
      if (ruleForm.username == "") {
        root.$message.error("邮箱不能为空!");
        return false;
      }
      if (validateEmail(ruleForm.username)) {
        root.$message.error("邮箱格式有误，请重新输入!");
        return false;
      }
      const requestData = {
        username: ruleForm.username,
        module: model.value
      };
      updateCodeButton({
        status: true,
        text: "发送中"
      });
      GetSms(requestData)
        .then(response => {
          let data = response.data;
          console.log(response);
          root.$message({
            message: data.message,
            type: "success"
          });
          //定时器
          countDown(5);
          loginButtonStatus.value = false;
        })
        .catch(error => {
          console.log(error);
        });
    };
    /**倒计时
    
     */
    const countDown = number => {
      let time = number;
      timer.value = setInterval(() => {
        time--;
        console.log(time);
        if (time === 0) {
          updateCodeButton({
            status: false,
            text: "重新发送"
          });
          clearInterval(timer.value);
        } else {
          updateCodeButton({
            status: true,
            text: `倒计时${time}秒`
          });
        }
      }, 1000);
    };
    /**清除倒计时，还原默认获取验证码、*/
    const clearcountDown = () => {
      updateCodeButton({
        status: false,
        text: "获取验证码"
      });
      clearInterval(timer.value);
    };
    /**表单提交
     */
    const submitForm = formName => {
      // 为给定 ID 的 user 创建请求
      refs[formName].validate(valid => {
        if (valid) {
          let requestData = {
            username: ruleForm.username,
            password: ruleForm.password,
            code: ruleForm.code,
            module: model.value
          };
          if (model.value === "login") {
            register(requestData);
          } else {
            login(requestData);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    const register = requestData => {
      Submit(requestData)
        .then(response => {
          let data = response.data;
          root.$message({
            message: data.message,
            type: "success"
          });
          toggleMenu(menuTab[0]);
          clearcountDown();
        })
        .catch(error => {
          console.log(error);
        });
    };
    const login = requestData => {
      Submit(requestData)
        .then(response => {
          let data = response.data;
          root.$message({
            message: data.message,
            type: "success"
          });
        })
        .catch(error => {
          console.log(error);
          if (error.message == "当前注册的邮箱已存在！！") {
            toggleMenu(menuTab[0]);
            clearcountDown();
          }
        });
    };
    onMounted(() => {
      console.log("onMounted");
    });
    return {
      menuTab,
      model,
      loginButtonStatus,
      codeButton,
      ruleForm,
      rules,
      toggleMenu,
      submitForm,
      getSms
    };
  }
};
</script>
<style lang="scss" scope>
#login {
  height: 100vh;
  background-color: #344a5f;
  // font-size: 0px;
}
.login-wrap {
  width: 330px;
  // border: 1px solid;
  // border-color: transparent;
  // display: block;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    color: #fff;
    font-size: 14px;
    margin-bottom: 3px;
  }
  .item-block {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
