<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {}
  },
  watch: {
    chartData: {
      deep: true,
      handler (val) {
        this.setOptions(val)
      }
    }
  },
  mounted () {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.$chart) {
          this.$chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    }
  },
  beforeDestroy () {
    if (!this.$chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHanlder)
    }

    this.$chart.dispose()
    this.$chart = null
  },
  methods: {
    setOptions (val) {
      this.$chart.clear() // 清空画布
      this.$chart.setOption(val)
    },
    initChart () {
      this.$chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
