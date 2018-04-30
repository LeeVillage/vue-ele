<template>
  <span class="icon" :class="classMap[mapCount]"></span>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    mapCount: {
      type: Number
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "../../common/less/base";
.icon {
  display: inline-block;
  @bgSize: 16px;
  width: @bgSize;
  height: @bgSize;
  vertical-align: top;
  margin-right: 16px;
  // &.decrease {
  //   .bg-img("../../components/spanIcon/decrease_1");
  //   background-size: @bgSize @bgSize;
  // }
  // &.discount {
  //   .bg-img("../../components/spanIcon/discount_1");
  //   background-size: @bgSize @bgSize;
  // }
  // &.guarantee {
  //   .bg-img("../../components/spanIcon/guarantee_1");
  //   background-size: @bgSize @bgSize;
  // }
  // &.invoice {
  //   .bg-img("../../components/spanIcon/invoice_1");
  //   background-size: @bgSize @bgSize;
  // }
  // &.special {
  //   .bg-img("../../components/spanIcon/special_1");
  //   background-size: @bgSize @bgSize;
  // }
}
</style>
