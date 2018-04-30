<template>
  <div class="star" :class="starType">
    <span v-for="(item, index) in itemClasses" :class="item" class="star-item" :key="index"></span>
  </div>
</template>

<script type="text/ecmascript-6">
const CLS_ON = 'on';
const CLS_OFF = 'off';
const CLS_HALF = 'half';
export default {
  props: {
    size: {
      type: Number,
      default: 48
    },
    score: {
      type: Number,
      default: 0
    },
    length: {
      type: Number,
      default: 5
    }
  },
  computed: {
    starType() {
      return 'star-' + this.size;
    },
    itemClasses() {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      let hasDecimal = score % 1 !== 0;
      let integer = Math.floor(this.score);
      for (let x = 0; x < integer; x++) {
        result.push(CLS_ON);
      }
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      while (result.length < this.length) {
        result.push(CLS_OFF);
      }
      return result;
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "../../common/less/base";

.star {
  font-size: 0;
  .star-item {
    display: inline-block;
  }
  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      &.on {
        .bg-img("../../components/star/star24_on");
        background-size: 10px 10px;
      }
      &.off {
        .bg-img("../../components/star/star24_off");
        background-size: 10px 10px;
      }
      &.half {
        .bg-img("../../components/star/star24_half");
        background-size: 10px 10px;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      &.on {
        .bg-img("../../components/star/star36_on");
        background-size: 15px 15px;
      }
      &.off {
        .bg-img("../../components/star/star36_off");
        background-size: 15px 15px;
      }
      &.half {
        .bg-img("../../components/star/star36_half");
        background-size: 15px 15px;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      &.on {
        .bg-img("../../components/star/star48_on");
        background-size: 20px 20px;
      }
      &.off {
        .bg-img("../../components/star/star48_off");
        background-size: 20px 20px;
      }
      &.half {
        .bg-img("../../components/star/star48_half");
        background-size: 20px 20px;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
