<template>
  <mt-popup v-if="showPopUp" v-model="popupVisible">
          <input type="text" v-model="data.text">
          <button @click="save">保存</button>
          <button @click="cancel">取消</button>
      </mt-popup>
</template>

<script>
export default {
  data () {
    return {
      popupVisible: true,
      showPopUp: false,
      data: null
    }
  },

  methods: {
    show (data) {
      this.showPopUp = true
      this.data = data
    },
    save () {
      this.$emit('saveList', this.data)
      this.showPopUp = false
    },

    cancel () {
      this.showPopUp = false
    }
  }
}
</script>

<style lang="scss">

</style>
