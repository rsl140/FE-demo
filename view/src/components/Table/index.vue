<!--
@param:
  tableData: 表格数据列表
  tableKey: 表格对应名称和关键字
  isExpand: 是否显示展开行(true or false)
  isExpandOne: 展开行是否只显示一行(true of false)
  isSelect: 是否显示勾选框(true or false)
  isIndex: 是否显示索引列(true or false)
  fixedHeight: 固定高度
  @sub param
    operate: 是否使用template模板(true or false)
    name: 对应列名
    value: 对应列的关键字
    width: 宽度
    minWidth: 最小宽度
    fixed: 是否固定列(left or right)
    sortable: 是否启用排序(tur or false or 'custom'=>服务器排序)
@method:
  CellClick: 表格点击
  sortChange: 排序
  SelectChange: 勾选变化
  handleExpandRow: 展开行
@example
<sl-table :tableData="tableData" :tableKey="tableKey">
  <template slot="option" slot-scope="scope">
    <el-button size="small" type="text" @click="handleRowEdit(scope.$index,scope.row)">编辑</el-button>
  </template>
</sl-table>
tableKey: [{
  operate:false,
  name: 'ID',
  value: 'Id'
},{
  operate: false,
  name: '名称',
  value: 'name'
},{
  operate: false,
  name: '排序',
  value: 'sort'
},{
  operate: true,
  name: '操作',
  value: 'option'
}]
 -->

<template>
  <div class="sl-table">
    <el-table
      ref="raw_table"
      :data="tableData"
      :border="borderShow"
      :stripe="stripeShow"
      :show-header="showHeader"
      :header-row-style="{border: '1px #ddd solid'}"
      :header-cell-style="{ backgroundColor: '#e9e9e9',fontSize: '12px', fontWeight: '700', color: '#444', borderRight: '1px #ddd solid'}"
      :height="fixedHeight"
      size="mini"
      @cell-click="CellClick"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
      @expand-change="handleExpandRow">
      <!-- expand -->
      <el-table-column v-if="isExpand" :show-overflow-tooltip="true" type="expand">
        <template slot-scope="scope">
          <slot :$index="scope.$index" :row="scope.row" name="expand"></slot>
        </template>
      </el-table-column>

      <!-- selection -->
      <el-table-column v-if="isSelect" :show-overflow-tooltip="true" type="selection" width="60" align="center"></el-table-column>

      <!-- index -->
      <el-table-column v-if="isIndex" :show-overflow-tooltip="true" type="index" width="50" align="center"></el-table-column>

      <!-- table head -->
      <el-table-column
        v-for="(data,key) in tableKey"
        :key="key"
        :align="data.align ? data.align : 'center'"
        :prop="data.value"
        v-if="!data.operate"
        :label="data.name"
        :width="data.width"
        :min-width="data.minWidth"
        :fixed="data.isfixed"
        :sortable="data.sortable"
        :show-overflow-tooltip="true"></el-table-column>

      <!-- oparation -->
      <el-table-column
        v-else
        :label="data.name"
        :prop="data.value"
        :align="data.align ? data.align : 'center'"
        :width="data.width"
        :min-width="data.minWidth"
        :fixed="data.isfixed"
        :sortable="data.sortable"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <slot :name="data.value" :$index="scope.$index" :row="scope.row"></slot><!-- 对应slot name -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'TableCommponent',
  props: {
    tableData: {
      type: [Array, Object],
      required: true
    },
    tableKey: {
      type: Array,
      required: true
    },
    isSelect: {
      type: Boolean,
      required: false,
      default: false
    },
    isExpand: {
      type: Boolean,
      required: false,
      default: false
    },
    isExpandOne: {
      type: Boolean,
      required: false,
      default: false
    },
    isIndex: {
      type: Boolean,
      required: false,
      default: false
    },
    fixedHeight: {
      type: [Number, String],
      required: false
    },
    borderShow: {
      type: Boolean,
      required: false,
      default: true
    },
    stripeShow: {
      type: Boolean,
      required: false,
      default: true
    },
    showHeader: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {}
  },
  methods: {
    sortChange (argu) {
      this.$emit('sortChange', argu)
    },
    CellClick (row, col, cell) {
      // console.log(row,col,cell)
      this.$emit('CellClick', { row, col, cell })
    },
    handleSelectionChange (list) {
      this.$emit('SelectChange', list)
    },
    handleExpandRow (row, expandRows) {
      // console.log(row,expandRows)
      if (this.isExpandOne) {
        this.$refs.raw_table.store.states.expandRows =
          expandRows.length !== 0 ? [row] : []
      }
      //   if(this.isExpand && this.isExpandOne){
      //  this.$refs.raw_table.store.states.expandRows = expanded ? [row] : []
      // }
    }
  }
}
</script>

<style>
.sl-table .cell {
  padding: 0;
}
.sl-table .cell > span {
  word-break: normal;
  margin: 0 !important;
}

</style>
