<template>
  <div class="statistics-container">
    <el-row>
      <el-col class="mb10">
        <div>
          <el-select v-model="meetfreshSelect.name" class="w" placeholder="请选择">
            <el-option
              v-for="item in nameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="24" class="mb10">
        <div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>利润</span>
            </div>
            <div>
              <charts :chart-data="Option"></charts>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="24" class="mb10">
        <div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>销量</span>
            </div>
            <div>
              <charts :chart-data="Option"></charts>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Charts from '@/components/Charts'

export default {
  name: 'Statistics',
  components: {
    Charts
  },
  data () {
    return {
      Option: {},
      meetfreshSelect: {
        name: ''
      },
      nameOptions: [{
        value: '资阳万达鲜芋仙',
        label: '资阳万达鲜芋仙'
      }, {
        value: '泸州万达鲜芋仙',
        label: '泸州万达鲜芋仙'
      }, {
        value: '眉山万达鲜芋仙',
        label: '眉山万达鲜芋仙'
      }, {
        value: '遂宁万达鲜芋仙',
        label: '遂宁万达鲜芋仙'
      }, {
        value: '雅安万达鲜芋仙',
        label: '雅安万达鲜芋仙'
      }]
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.Option = {
        xAxis: {
          data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['实际', '预期']
        },
        series: [{
          name: '实际', itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: [58, 1212, 222, 555, 65, 322, 87],
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '预期',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: [28, 321, 42, 12, 42, 12, 827],
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.statistics {
  &-container {
    margin: 10px;
  }
}
</style>
