<template>
  <div id="app">
    <router-view></router-view>	
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';

// General style overrides and custom classes
*, h1, button{
  text-align: center;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>