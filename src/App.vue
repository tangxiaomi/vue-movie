<template>
  <div id="app">
    <div id="nav">
      <router-link to="/todolist"></router-link>
      <!--<router-link to="/about">About</router-link>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/center">UserCenter</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import './styles/main.scss';
#app {
  font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<script>
export default {
  methods: {
    // clickBtn () {
    //   this.$router.push({
    //     name: 'index',
    //     query: {
    //       name: 'min',
    //       age: 18
    //     }
    //   })
    // }
  }
}
</script>
