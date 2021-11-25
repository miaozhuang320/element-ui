<!--
 * @Author: 滑块tab切换
 * @Date: 2021-06-22 15:19:34
 * @LastEditTime: 2021-11-18 13:57:29
 * @LastEditors: 17080013
 * @Description: In User Settings Edit
 * @FilePath: /meeting-web/src/components/plate_tab/plate_tab.vue
-->

<template>
<div>
  <div class="plate-type">
    <div class="plate-item" v-for="(item, index) in moduleArr" :key="index" :class="{ selected: checkClass(item), disabled: item.disabled }" @click="changePlate(item)">
      <span v-if="!item.hasChild"> {{ item.name }}</span>
      <span v-if="item.hasChild">
        <div class="input" @click="show=true">
          <span> {{checkClass(item)? findSelectName(item) : item.name }}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <div class="list" v-show="show">
          <ul>
            <li @click="getvalue(item,index,ele),show=false" v-for="(ele,index) in item.hasChild" :key="ele.index">
              <span> {{ele.name}}</span>
            </li>
          </ul>
        </div>
      </span>
    </div>
  </div>
</div>
  
</template>
<script>
// import Utils from '@/plugins/util'
export default {
  name: 'ElPlate',
  props: {
    // 传入的数组
    moduleArr: {
      type: Array,
      default: () => []
    },
    // 默认选中的
    defaultCheck: {
      type: Array,
      default: () => []
    },
    rotate: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'single'
    }
  },
  computed: {
    selectKeyList() {
      return this.checkPlate.map(item => item.key);
    }
  },
  data() {
    return {
      show: false,
      // 选中的对象
      checkObj: null,
      checkPlateList: null,
      checkPlate: []
    };
  },
  watch: {
    defaultCheck: {
      handler(curVal, oldVal) {
        this.checkPlate = [...curVal];
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    /**
    * 切换
    * @param {Object} 选中的数据
    */
    changePlate(item) {
      if (item.disabled || item.hasChild) return;
      if (this.type === 'single') {
        this.checkPlate = [item];
      } else {
        // 选中和取消。如果存在，就取消，如果不存在就选中
        if (this.selectKeyList.indexOf(item.key) >= 0) {
          let selectIndex = this.selectKeyList.length;
          this.checkPlate.forEach((ele, index) => {
            if (ele.key === item.key) selectIndex = index;
          });
          this.checkPlate.splice(selectIndex, 1);
        } else {
          this.checkPlate.push(item);
        }
      }
      this.$emit('plate-change', [...this.checkPlate]);
    },
    getvalue(parItem, index, ele) {
      // 需要将同级别的数据清空然后再push当前选中的数据
      parItem.hasChild.forEach((item, index) => {
        if (this.selectKeyList.indexOf(item.key) >= 0) {
          this.checkPlate.splice(index, 1);
        }
      });
      this.type === 'single' ? this.checkPlate = [ele] : this.checkPlate.push(ele);
      this.$emit('plate-change', [...this.checkPlate]);
    },
    checkClass(item) {
      if (item.hasChild) {
        const selectChild = item.hasChild.filter(ele => {
          return this.selectKeyList.indexOf(ele.key) >= 0;
        });
        return selectChild.length;
      } else {
        return !(this.selectKeyList.indexOf(item.key) < 0);
      }
    },
    findSelectName(item) {
      const selectChild = item.hasChild.filter(ele => {
        return this.selectKeyList.indexOf(ele.key) >= 0;
      });
      return selectChild.length ? selectChild[0].name : item.name;
    }
  }
};
</script>

<style lang="scss" scoped>
.plate-type {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  margin: 0px;
  height: 28px;
  background: #EEEEEE;
  border-radius: 5px;
  flex-shrink: 0;
  .el-icon-caret-bottom {
    font-size: 16px;
    color: #ccc;
    margin-left: 7px;
    transition: all 500ms;
    &.rotate {
      transform: rotate(180deg);
      transition: all 500ms;
    }   
  }   
}
  .plate-item {
    width: 50%;
    height: 100%;
    line-height: 28px;
    text-align: center;
    cursor: pointer;
    &:not(.selected):hover {
      height: 24px;
      line-height: 24px;
      background-color: #fff;
      border-radius: 5px;
    }
      
    &.disabled:hover {
      background: #EEEEEE;
    }
    &:first-child {
      margin-left: 2px;
    } 
    &:last-child {
      margin-right: 2px;
    }
  }
     
  .selected {
    height: 24px;
    line-height: 24px;
    background: #fff;
    box-shadow: 0 2px 4px 0px rgba(0, 0, 0, 0.08);
    border-radius: 5px;
  }
    
.disabled {
  cursor: not-allowed !important;
}
ul {
  position: relative;
  z-index: 9999;
  background: #fff;
  border-radius: 4px;
  margin-top: 3px;
  padding-left: 0;
}
  li {
    list-style:none;
    &:hover {
      background: rgb(235, 238, 245);
    }
  }
    
</style>
