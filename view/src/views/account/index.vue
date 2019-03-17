<template>
  <div class="meetfresh-container">
    <el-container>
      <el-main>
        <el-form ref="meetfreshForm" :model="meetfreshForm" label-position="top">
          <el-form-item label="名字:">
            <el-input v-model="meetfreshForm.name" clearable placeholder="请输入名字"></el-input>
          </el-form-item>
        </el-form>
        <el-button plain type="info" @click="count">总结</el-button>
        <el-input v-show="false" v-model="inputData" :rows="2" type="textarea" placeholder="请输入内容"></el-input>
        <el-button v-if="show" type="primary" icon="document" @click="handleCopy(inputData,$event)">复制</el-button>
        <el-button v-if="show" plain type="success" @click="saveToServer">提交到服务器</el-button>

        <transition name="el-fade-in-linear">
          <ul v-if="show" class="transition-box tl">
            <li v-for="(item, index) in showDetail" :key="index">
              {{ item.lable }}{{ item.value }}
            </li>
          </ul>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import clip from '@/utils/clipboard' // use clipboard directly
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive

export default {
  name: 'Account',
  directives: {
    clipboard
  },
  data () {
    return {
      nameOptions: [],
      meetfreshForm: {
        name: ''
      },
      showDetail: [],
      inputData: 'test',
      texttishi: '点我复制哦！！！',
      show: false
    }
  },
  mounted () {
  },
  methods: {
    handleCopy (text, event) {
      clip(text, event)
    },
    saveToServer () {
      this.$store.dispatch('AddAccount', this.meetfreshForm).then((res) => {
        this.$message({
          message: res.message,
          type: 'success'
        })
      }).catch(() => {
        // console.log(err)
        // this.$message({
        //   message: err,
        //   type: 'error'
        // })
      })
    },
    count () {
      var DataNow = new Date()
      this.texttishi = '点我复制哦！！！'
      /* 日期 */
      const dayFormat = {
        0: '星期天',
        1: '星期一',
        2: '星期二',
        3: '星期三',
        4: '星期四',
        5: '星期五',
        6: '星期六'
      }

      this.showDetail[0] = { lable: '店面：', value: this.meetfreshForm.name || '' }
      this.showDetail[1] = { lable: '日期：', value: DataNow.toLocaleDateString() }
      this.showDetail[2] = { lable: '', value: dayFormat[DataNow.getDay()] }
      this.show = true
      this.inputData = ''
      this.showDetail.forEach(element => {
        this.inputData += element.lable + element.value + '\n'
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.meetfresh {
  &-container {
    margin: 30px;
  }
}
</style>
