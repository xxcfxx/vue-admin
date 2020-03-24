<template>
  <div id="nav-wrap">
    <h1 class="nav-logo">
      <img src="../../../assets/logo.png" alt />
    </h1>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(item,index) in routers">
        <!--v-for里的index是number类型-->
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index+''">
          <!--一级菜单-->
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :classN="item.meta.icon" />
            <span slot="title">{{item.meta.name}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="subItem in item.children"
              :key="subItem.id"
              :index="subItem.path"
            >{{subItem.meta.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { reactive, ref, onMounted, computed } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    const routers = reactive(root.$router.options.routes);
    const isCollapse = computed(
      () => root.$store.state.app.isCollapse //改变isCollapse 的值
    );
    //console.log(routers);
    return {
      isCollapse,
      routers
    };
  }
};
</script>
<style lang="scss" scope>
@import "../../../styles/config.scss";
#nav-wrap {
  position: fixed;
  width: $navWidth;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #344a5f;
  @include webkit(transition, all 0.3s ease 0s);
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
}
.nav-logo {
  text-align: center;
  width: 100%;
  img {
    margin: 28px auto 28px auto;
    width: 50px;
    display: block;
  }
}

.open {
  #nav-wrap {
    width: $navWidth;
  }
}
.close {
  #nav-wrap {
    width: $navWidthMix;
  }
}
</style>