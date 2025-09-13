<template>
  <div class="card loading-card flex justify-center">
    <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent"
    animationDuration=".5s" aria-label="Custom ProgressSpinner" />
  </div>
</template>

<script setup>

import ProgressSpinner from 'primevue/progressspinner';

</script>

<style lang="scss" scoped>
  .loading-card{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50% , -50%);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(#fff , 0.4);
    backdrop-filter: blur(4px);
    z-index: 999 !important;
  }
</style>
