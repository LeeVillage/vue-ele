<!-- 评价组件 -->
<template>
  <div class="ratingselect">
      <div class="rating-type">
          <span @click="select(2,$event)" class="block all" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
          <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
          <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
      </div>
      <div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
          <span class="icon-check_circle"></span>
          <span class="text">只看有内容的评价</span>
      </div>
  </div>
</template>

<script type='text/ecmascript-6'>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        };
      }
    }
  },
  data() {
    return {};
  },

  components: {},

  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      });
    }
  },

//   mounted: {},

  methods: {
    select(type, event) {
      if (!event._constructed) {
        return;
      }
      this.$emit('select', type);
    },
    toggleContent(event) {
      if (!event._constructed) {
        return;
      }
      this.$emit('toggle', this.onlyContent);
    }
  }
};
</script>
<style scoped lang='less' rel='stylesheet/less'>
@import "../../common/less/base.less";
.ratingselect {
  .rating-type {
    padding: 18px 0;
    margin: 0 18px;
    font-size: 0;
    .border-px(bottom, rgba(7,17,27,0.1));
    .block {
      display: inline-block;
      line-height: 16px;       
      padding: 8px 12px;
      border-radius: 2px;
      margin-right: 8px;
      font-size: 12px;
      color: rgb(77, 85, 93);
      .count {
        font-size: 8px;
        margin-left: 2px;
      }
      &.all {
        background-color: rgba(0, 160, 220, 0.2);
        &.active {
            background-color: rgb(0, 160, 220);
            color: #fff;
        }
      }
      &.positive {
        background-color: rgba(0, 160, 220, 0.2);
        &.active {
          background-color: rgb(0, 160, 220);
          color: #fff;
        }
      }
      &.negative {
        background-color: rgba(77, 85, 93, 0.2);
        &.active {
          background-color: rgb(77, 85, 93);
          color: #fff;
        }          
      }
    }
  }
  .switch {
      padding: 12px 18px;
      line-height: 24px;
      .border-px(bottom,rgba(7,17,27,0.1));
      color: rgb(147, 153, 159);
      font-size: 0;
      span {
        display: inline-block;
        vertical-align: top;
      }
      &.on {
          .icon-check_circle {
            color: #00c850
        }
      }
    .icon-check_circle {
        margin-right: 4px;
        font-size: 24px;
    }
    .text {
        font-size: 12px;
    }
  }
}
</style>