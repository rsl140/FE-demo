<template>
  <!-- 新建标准页面格式 -->
  <div class="model-container">
  </div>
</template>

<script>
export default {
  name: 'Model',
  components: {
  },
  data () {
    return {
      Option: {}
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.model {
  &-container {
    margin: 10px;
  }
}
</style>
