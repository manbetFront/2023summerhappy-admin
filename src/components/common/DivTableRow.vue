<template>
  <div class="div__table">
    <div class="div_table__container">
      <div class="div__table__body">
        <template 
          v-for="(item, ind) in rowDatas"
        >
          <div           
            :key="ind"
            class="div__table__row div__table__row__order"
          >
            <div             
              v-for="(attr, i_ind) in item" 
              :key="i_ind"
              class="div__table__cell"
            >
              {{ attr.order }}
            </div>
          </div>
      
          <div           
            :key="ind"
            class="div__table__row div__table__row__value"
          >
            <div             
              v-for="(attr, i_ind) in item" 
              :key="i_ind"
              class="div__table__cell"
              :class="{
                input__cell : attr.type ==='input' && attr.prop
              }"
            >
              <template v-if="attr.type ==='input' && attr.prop">
                <el-input 
                  v-model="attr.value"
                  :disabled="viewerMode"                  
                  placeholder="请输入内容"
                />
              </template>
              <template v-else>
                {{ attr.value }}
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"DivTableRows",
  props: { 
    label:{
      type: String,
      default: () => ''
    },
    source:{
      type: Array,
      default: ()=>[]
    }
  },
  data(){
    return{
      rowDatas:[]
    }
  },
  mounted(){
    this.rowDatas = [...this.source]
  }
}
</script>

<style lang="scss" scoped>
.div__table{
  display: block;
  width: 100%;
  overflow: auto;
}
/* DivTable.com */
.div__table__container{
	display: table;
	width: 100%;
}
.div__table__row {
	display: table-row;
}
.divTableHeading {
	background-color: #EEE;
	display: table-header-group;
}

.div__table__cell{
  border: 1px solid #999999;
  display: table-cell;
  padding: 3px 10px;
  min-width: 120px;
  height: 40px;
  text-align: center;
  vertical-align: middle;
  border-bottom: none;
  border-right: none;
  &:last-child{
    border-right: 1px solid #999999;
  }
  &.input__cell{
    padding: 3px;
  }
}
.div__table__row:last-child .div__table__cell{
  border-bottom: 1px solid #999999;
}
.divTableHeading {
	background-color: #EEE;
	display: table-header-group;
	font-weight: bold;
}
.divTableFoot {
	background-color: #EEE;
	display: table-footer-group;
	font-weight: bold;
}
.div__table__body {
	display: table-row-group;
}

.div__table__row.div__table__row__order > .div__table__cell{
  background-color: #f8f8f9;
}

.div__table__row.div__table__row__value > .div__table__cell{
  background-color: #ffffff;
  transition: .16s ease-in;
}
.div__table__row.div__table__row__value:hover > .div__table__cell{
  background-color: #F5F7FA;
}
</style>
