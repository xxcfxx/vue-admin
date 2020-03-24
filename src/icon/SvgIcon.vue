<!--svg图标得配置-->
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
import { reactive, ref, computed, onMounted } from "@vue/composition-api";
export default {
  name: "svgIcon",
  props: {
    iconClass: {
      type: String,
      default: ""
    },
    classN: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const msg = ref("手把手撸前端");
    const count = ref(10);
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.classN) {
        return `svg-icon ${props.classN}`;
      } else {
        return `svg-icon`;
      }
    });
    return {
      msg,
      iconName,
      svgClass
    };
  }
};
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  margin-right: 10px;
  fill: currentColor;
}
</style>