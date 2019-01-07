<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: ' Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  padding:0;
  margin:0;

}
a{
    text-decoration: none;
  }
a,
button,
input {
    -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
}
</style>
