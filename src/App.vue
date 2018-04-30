<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import VHeader from 'components/header/header';
import { urlParse } from 'common/js/util';

const ERR_OK = 0;
export default {
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }
    };
  },
  created() {
    this.$http.get('api/seller?id=' + this.seller.id).then(
      res => {
        if (res.data.errno === ERR_OK) {
          // this.seller = res.data.data;
          this.seller = Object.assign({}, this.seller, res.data.data);
          // console.log(this.seller);
        }
      },
      error => {
        console.log(error);
      }
    );
  },
  components: {
    VHeader
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "common/less/index.less";

.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  .border-px(bottom, rgba(7, 17, 27, 0.1),1px);
  .tab-item {
    flex: 1;
    text-align: center;
    a {
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93);
      &.active {
        color: rgb(240, 0, 0);
      }
    }
  }
}
</style>
