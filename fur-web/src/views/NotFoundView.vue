<template>
  <div class="container">
    <img src="../assets/img/hn.png" alt="">
    <div>
      <h1>{{ $t('app.notFoundView.title') }}</h1>
      <h4>{{ $t('app.notFoundView.message') }}</h4>
      <router-link to="/">{{ $t('app.notFoundView.action') }}</router-link>
    </div>
  </div>
</template>

<style scoped>
  .container {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
  }
</style>
