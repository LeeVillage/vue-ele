<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item"
            :class="{'current':currentIndex===index}"
            @click="selectMenu(index,$event)" :key="index">
          <span class="text border-px">
            <spanicon v-if="item.type>0" :mapCount="item.type"></spanicon>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" id="foodsWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="food-list food-list-hook" :key="index">
          <h1 class="title border-px">{{ item.name }}</h1>
          <ul>
            <li v-for="(food,index) in item.foods" class="food-item border-px" :key="index" @click="selectFood(food,$event)">
              <div class="icon">
                <img class="img-w" :src="food.icon" alt="商品图片">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{ food.sellCount
                    }}份</span><span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span>
                  <span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol @add="addFood" :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice"></shopcart>
    <food @add="addFood" :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
import spanicon from 'components/spanIcon/spanIcon';
import Bscroll from 'better-scroll';
import shopcart from 'components/shopcart/shopcart';
import cartcontrol from 'components/cartcontrol/cartcontrol';
import food from 'components/food/food';

const ERR_OK = 0;
export default {
  components: {
    spanicon,
    shopcart,
    cartcontrol,
    food
  },
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    };
  },
  mounted() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

    this.$http.get('/api/goods').then(
      res => {
        if (res.data.errno === ERR_OK) {
          this.goods = res.data.data;
          this.$nextTick(() => {
            this.initScroll();
            this._calculateHeight();
          });
        }
      },
      error => {
        console.log(error);
      }
    );
  },
  methods: {
    selectFood(food, event) {
      // 判断是不是浏览器默认的点击事件，如果是，就返回
      if (!event._constructed) {
        return;
      }
      this.selectedFood = food;
      this.$refs.food.show();
    },
    addFood(target) {
      // 优化用户体验，异步执行下落动画
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target);
      });
    },
    initScroll() {
      //        两种的方式第一个配合ref的属性第二个配合原生的操作
      this.menuScroll = new Bscroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodsScroll = new Bscroll(document.getElementById('foodsWrapper'), {
        click: true,
        probeType: 3
      });
      this.foodsScroll.on('scroll', pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      let foodList = document.getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (let x = 0; x < foodList.length; x++) {
        let item = foodList[x];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index, event) {
      // 判断是不是浏览器默认的点击事件，如果是，就返回
      if (!event._constructed) {
        return;
      }
      let foodList = document.getElementsByClassName('food-list-hook');
      let el = foodList[index];
      // better-scroll 接口scrollToElement()滚动到哪里
      this.foodsScroll.scrollToElement(el, 300);
    }
  },
  computed: {
    currentIndex() {
      for (let x = 0; x < this.listHeight.length; x++) {
        let height1 = this.listHeight[x];
        let height2 = this.listHeight[x + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          let foodList = document.getElementsByClassName('menu-item');
          let el = foodList[x];
          this.menuScroll.scrollToElement(el, 300);
          return x;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "../../common/less/base";

.goods {
  display: flex;
  position: absolute;
  width: 100%;
  top: 174px;
  bottom: 46px;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
    .menu-item {
      display: table;
      height: 54px;
      width: 80px;
      padding: 0 12px;
      line-height: 14px;
      &.current {
        position: relative;
        margin-top: -1px;
        z-index: 10;
        background-color: #ffffff;
        font-weight: 700;
        .text {
          .border-none;
        }
      }
      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        font-size: 12px;
        text-align: left;
        .border-px(bottom, rgba(7, 17, 27, 0.1), 1px);
        .icon {
          @bgSize: 14px;
          width: @bgSize;
          height: @bgSize;
          margin-right: 0px;
          &.decrease {
            .bg-img("../../components/spanIcon/decrease_3");
            background-size: @bgSize @bgSize;
          }
          &.discount {
            .bg-img("../../components/spanIcon/discount_3");
            background-size: @bgSize @bgSize;
          }
          &.guarantee {
            .bg-img("../../components/spanIcon/guarantee_3");
            background-size: @bgSize @bgSize;
          }
          &.invoice {
            .bg-img("../../components/spanIcon/invoice_3");
            background-size: @bgSize @bgSize;
          }
          &.special {
            .bg-img("../../components/spanIcon/special_3");
            background-size: @bgSize @bgSize;
          }
        }
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    .food-list {
      .title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        .border-px(left, #d9dde1, 2px);
        font-size: 12px;
        color: rgb(147, 153, 159);
        background-color: #f3f5f7;
      }
      .food-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        .border-px(bottom, #d9dde1, 1px);
        &:last-child {
          .border-none();
          margin-bottom: 0;
        }
        .icon {
          flex: 0 0 57px;
          margin-right: 10px;
          img {
            border-radius: 5px 5px;
          }
        }
        .content {
          flex: 1;
          .name {
            margin: 2px 0 8px 0;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .desc,
          .extra {
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .desc {
            line-height: 12px;
            margin-bottom: 8px;
          }
          .extra {
            .count {
              margin-right: 12px;
            }
          }
          .price {
            font-weight: 700;
            line-height: 24px;
            .now {
              margin-right: 8px;
              font-size: 14px;
              color: rgb(240, 0, 0);
            }
            .old {
              font-size: 10px;
              text-decoration: line-through;
              color: rgb(147, 153, 159);
            }
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }
      }
    }
  }
}
</style>
