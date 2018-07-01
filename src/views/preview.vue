<template>
<!-- 这个不可以是循环 -->
  <div>
    <div v-for="(previewData, index) in previewDatas" :key="index">
      {{previewData}}
    </div>
    <button @click="goBack">返回</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      previewDatas: []
    }
  },
  methods: {
    goBack () {
      this.$router.push('todolist')
    }
  },
  mounted () {
    this.previewDatas = this.$store.state.allPlanDatas
  }
}
</script>
