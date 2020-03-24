<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "layoutMain",
  setup(props, { root }) {
    return {};
  }
};
</script>
<style lang="scss" scope>
@import "../../../styles/config.scss";
#main-wrap {
  height: 100vh;
  // top: 75px;
  // left: $navWidth;
  // right: 0;
  // bottom: 0;
  // border: 30px solid #f7f7f7;
  // border-bottom: none;
  // -webkit-box-sizing: border;
}
.main-content {
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 30;
  padding-left: $navWidth + 30;
  padding-right: 30px;
  @include webkit(box-sizing, border-box);
  @include webkit(transition, all 0.3s ease 0s);
}
.content {
  width: 100%;
  height: 100%;
  padding: 30px 30px 0 30px;
  background-color: #fff;
  @include webkit(box-sizing, border-box);
}

.open {
  .main-content {
    padding-left: $navWidth + 30;
  }
}
.close {
  .main-content {
    padding-left: $navWidthMix + 30px;
  }
}
</style>