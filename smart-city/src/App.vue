<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<style lang="scss">
  body {
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .highlight-color {
    color: aqua;
  }

  #app {
    font-family: 'Microsoft YaHei', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
    width: 2560px;
    height: 1080px;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  @font-face {
    font-family: PMZD;
    src: url("./assets/font/PMZD.woff");
  }

  @keyframes scale-point {
    50% {
      transform: scale(1.1);
    }
  }

  @keyframes wave-point {
    50% {
      transform: scale(1.3);
    }
  }

  .shining-point {
    transform-origin: center;
    animation-timing-function: ease-out;
    animation-duration: 1s;
    animation-name: scale-point;
    animation-iteration-count: infinite;
  }

  .wave-point {
    transform-origin: center;
    animation-timing-function: ease-in;
    animation-duration: 1s;
    animation-name: wave-point;
    animation-iteration-count: infinite;
  }
</style>
