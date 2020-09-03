<template>
  <div class="camera-block">
    <div class="camera-box"></div>
    <div class="camera-box"></div>
    <div class="camera-box"></div>
    <div class="camera-box"></div>
  </div>
</template>

<script>
  export default {
    name: 'CameraBlock',
  }
</script>

<style scoped>
  .camera-block {
    left: 994px;
    top: 887px;
    display: flex;
  }

  .camera-box {
    width: 236px;
    height: 138px;
    background: url("../../assets/img/home/group 356.png") no-repeat center;
    margin: 0 4px;
  }
</style>
