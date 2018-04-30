<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="头像">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <spanicon :mapCount="seller.supports[0].type"></spanicon>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span>{{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span><span
      class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right" @click="showDetail"></i>
    </div>
    <div class="backgroundImg">
      <img class="img-w" :src="seller.avatar" alt="背景">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{ seller.name }}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="titles">
              <vtitle :titles="'优惠信息'"></vtitle>
            </div>
            <ul class="supports" v-if="seller.supports">
              <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
                <spanicon :mapCount="seller.supports[index].type"></spanicon>
                <span class="text">{{ seller.supports[index].description
                  }}</span>
              </li>
            </ul>
            <div class="titles">
              <vtitle :titles="'商家公告'"></vtitle>
            </div>
            <div class="bulletin">
              <p class="content">{{ seller.bulletin }}</p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="closeDetail"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import star from 'components/star/star';
import vtitle from 'components/title/title';
import spanicon from 'components/spanIcon/spanIcon';

export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star,
    vtitle,
    spanicon
  },
  data() {
    return {
      detailShow: false
    };
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    closeDetail() {
      this.detailShow = false;
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "../../common/less/base.less";

.header {
  color: #ffffff;
  background-color: rgba(7, 17, 27, 0.5);
  position: relative;
  overflow: hidden;
  .content-wrapper {
    margin: 24px 12px 18px 24px;
    font-size: 0;
    position: relative;
    .avatar {
      display: inline-block;
      vertical-align: top;
      img {
        width: 64px;
        height: 64px;
        border-radius: 2px;
      }
    }
    .content {
      display: inline-block;
      margin-left: 16px;
      .title {
        margin: 2px 0 8px 0;
        .brand {
          display: inline-block;
          vertical-align: top;
          width: 30px;
          height: 18px;
          margin-right: 6px;
          .bg-img("../../components/header/brand");
          background-size: 30px 18px;
        }
        .name {
          font-size: 16px;
          color: rgb(255, 255, 255);
          font-weight: bold;
          line-height: 18px;
        }
      }
      .description {
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
      }
      .support {
        .icon {
          @bgSize: 12px;
          width: @bgSize;
          height: @bgSize;
          margin-right: 4px;
          &.decrease {
            .bg-img("../../components/spanIcon/decrease_2");
            background-size: @bgSize @bgSize;
          }
          &.discount {
            .bg-img("../../components/spanIcon/discount_2");
            background-size: @bgSize @bgSize;
          }
          &.guarantee {
            .bg-img("../../components/spanIcon/guarantee_2");
            background-size: @bgSize @bgSize;
          }
          &.invoice {
            .bg-img("../../components/spanIcon/invoice_2");
            background-size: @bgSize @bgSize;
          }
          &.special {
            .bg-img("../../components/spanIcon/special_2");
            background-size: @bgSize @bgSize;
          }
        }
        .text {
          line-height: 12px;
          font-size: 10px;
        }
      }
    }
    .support-count {
      position: absolute;
      right: 12px;
      bottom: -4px;
      height: 24px;
      line-height: 24px;
      padding: 0 8px;
      text-align: center;
      font-size: 10px;
      border-radius: 14px;
      background-color: rgba(0, 0, 0, 0.2);
      span {
        font-size: 10px;
        vertical-align: top;
      }
      .icon-keyboard_arrow_right {
        margin-left: 2px;
        line-height: 24px;
        font-size: 10px;
      }
    }
  }
  .bulletin-wrapper {
    height: 28px;
    line-height: 28px;
    position: relative;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: rgba(7, 17, 27, 0.2);
    .bulletin-title {
      display: inline-block;
      vertical-align: top;
      width: 22px;
      height: 12px;
      margin-top: 8px;
      .bg-img("../../components/header/bulletin");
      background-size: 22px 12px;
    }
    .bulletin-text {
      vertical-align: top;
      margin: 0 4px;
      font-size: 10px;
    }
    .icon-keyboard_arrow_right {
      font-size: 10px;
      position: absolute;
      right: 12px;
      top: 8px;
    }
  }
  .backgroundImg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
  .detail {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(7, 17, 27, 0.8);
    transition: all 0.5s;
    backdrop-filter: blur(10px);
    &.fade-enter-active,
    &.fade-leave-active {
      opacity: 1;
    }
    &.fade-enter,
    &.fade-leave-to {
      opacity: 0;
      background-color: rgba(7, 17, 27, 0);
    }
    .detail-wrapper {
      min-height: 100%;
      width: 100%;
      .detail-main {
        margin-top: 64px;
        padding-bottom: 64px;
        .name {
          text-align: center;
          font-size: 16px;
          line-height: 16px;
          font-weight: 700;
        }
        .star-wrapper {
          margin-top: 18px;
          padding: 2px 0;
          text-align: center;
        }
        .titles {
          margin: 28px auto 24px auto;
        }
        .supports {
          width: 80%;
          margin: 0 auto;
          .support-item {
            padding: 0 12px;
            margin-bottom: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &:last-child {
              margin-bottom: 0;
            }
            .icon {
              @bgSize:16px;
              &.decrease {
                .bg-img("../../components/spanIcon/decrease_2");
                background-size: @bgSize @bgSize;
              }
              &.discount {
                .bg-img("../../components/spanIcon/discount_2");
                background-size: @bgSize @bgSize;
              }
              &.guarantee {
                .bg-img("../../components/spanIcon/guarantee_2");
                background-size: @bgSize @bgSize;
              }
              &.invoice {
                .bg-img("../../components/spanIcon/invoice_2");
                background-size: @bgSize @bgSize;
              }
              &.special {
                .bg-img("../../components/spanIcon/special_2");
                background-size: @bgSize @bgSize;
              }
            }
            .text {
              font-size: 12px;
              line-height: 16px;
              vertical-align: top;
            }
          }
        }
        .bulletin {
          width: 80%;
          margin: 0 auto;
          .content {
            padding: 0 12px;
            line-height: 24px;
            font-size: 12px;
            text-align: justify;
          }
        }
      }
    }
    .detail-close {
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0 auto;
      clear: both;
      font-size: 32px;
    }
  }
}
</style>
