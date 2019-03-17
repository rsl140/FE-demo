<template>
  <div class="meetfresh-container">
    <el-container>
      <el-header style="height:40px;padding:0;">
        <el-select v-model="selectValue" placeholder="请选择" @change="selectValueChange">
          <el-option
            v-for="item in nameOptions"
            :key="item.id"
            :label="item.NAME"
            :value="item.id">
          </el-option>
        </el-select>
      </el-header>
      <el-main style="padding:0;">
        <!-- <table :tableData="tableData" :tableKey="tableKey"></table> -->
        <table-component :table-data="tableData" :table-key="tableKey">
          <template slot="option" slot-scope="scope">
            <!-- <el-button size="small" type="text" @click="tableRowEdit(scope.$index,scope.row)">编辑</el-button> -->
            <el-button size="small" type="text" @click="tableRowDel(scope.$index,scope.row)">删除</el-button>
          </template>
        </table-component>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import TableComponent from '@/components/Table'
export default {
  name: 'AccountTable',
  directives: {
  },
  components: {
    TableComponent
  },
  data () {
    return {
      selectValue: '',
      nameOptions: [],
      tableData: [],
      tableKey: [{
        operate: false,
        name: '门店名',
        value: 'name'
      }, {
        operate: true,
        name: '操作',
        value: 'option',
        isfixed: 'right',
        width: '150px'
      }]
    }
  },
  mounted () {
    this.getList()
    this.getShopName()
  },
  methods: {
    getList () {
      this.$store.dispatch('GetAcountList').then((res) => {
        this.tableData = res
      }).catch((err) => {
        console.log(err)
      })
    },
    getShopName () {
      this.$store.dispatch('GetShop').then((res) => {
        this.nameOptions = res
        this.nameOptions.unshift({ NAME: '全部', id: '' })
      }).catch((err) => {
        console.log(err)
      })
    },
    tableRowEdit (index, row) {

    },
    tableRowDel (index, row) {
      this.$store.dispatch('DelAccount', row.id).then((res) => {
        this.$message({
          message: res.message,
          type: 'success'
        })
        this.getList()
      }).catch((err) => {
        console.log(err)
      })
    },
    selectValueChange (val) {
      this.$store.dispatch('SearchAcountList', val).then((res) => {
        this.tableData = res
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.meetfresh {
  &-container {
    margin: 10px;
  }
}
</style>
