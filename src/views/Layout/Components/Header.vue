<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navStatus()">
      <svg-icon iconClass="menu" classN="menu" />
    </div>
    <div class="pull-right">
      <div class="user-info pull-left">
        <div class="pull-left">
          <img src="../../../img/logo.jpg" class="logo" />
        </div>
        {{username}}
      </div>
      <div class="pull-right header-icon" @click="logout()">
        <svg-icon iconClass="logout" classN="logout" />
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "@vue/composition-api";
export default {
  name: "layoutHeader",
  setup(props, { root }) {
    const username = computed(() => root.$store.state.app.username);
    const navStatus = () => {
      root.$store.commit("app/SET_isCollapse");
    };
    const logout = () => {
      root.$store.dispatch("app/exit").then(() => {
        root.$router.push("/login");
      });
    };

    return {
      username,
      navStatus,
      logout
    };
  }
};
</script>
<style lang="scss" scope>
@import "../../../styles/config.scss";
#header-wrap {
  position: fixed;
  left: $navWidth;
  top: 0;
  right: 0;
  height: $layoutHeader;
  line-height: 75px;
  background-color: #fff;
  @include webkit(transition, all 0.3s ease 0s);
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
}
.header-icon {
  padding: 0 32px;
  svg {
    font-size: 25px;
    margin-bottom: -8px;
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #ededed;
  + .header-icon {
    padding: 0 28px;
  }
}
.logo {
  width: 45px;
  height: 45px;
  padding: 15px 10px 0 0;
}
.open {
  #header-wrap {
    left: $navWidth;
  }
}
.close {
  #header-wrap {
    left: $navWidthMix;
  }
}
</style>