<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{'current':item.current}"
          v-for="item in menuTab"
          :key="item.id"
          @click="toggleMenu(item)"
        >{{item.txt}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      menuTab: [
        {
          txt: "登录",
          current: true
        },
        { txt: "注册", current: false }
      ],
      isActive: 0
    };
  },
  created() {},
  mounted() {},
  methods: {
    toggleMenu(data) {
      console.log(data.txt);
      this.menuTab.forEach(elem => {
        elem.current = false;
      });
      data.current = true;
    }
  }
};
</script>
<style lang="scss" scope>
#login {
  height: 100vh;
  background-color: #344a5f;
  font-size: 0px;
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
</style>