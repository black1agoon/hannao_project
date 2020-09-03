<template>
  <div id="app">
    <keep-alive>
      <router-view>
      </router-view>
    </keep-alive>
  </div>
</template>

<style lang="stylus">
  @import './assets/fonts/fonts.css'
  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
  body
    padding: 0
    margin: 0
</style>
