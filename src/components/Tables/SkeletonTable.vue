<template>
  <Skeleton 
    v-for="i in 10" 
    :key="i" 
    class="table-skeleton" 
    shape="rectangle" 
    height="50px" 
    style="margin-bottom: 20px;"
  />
</template>

<script setup>
  import Skeleton from 'primevue/skeleton'
</script>

<style lang="scss" scoped>
  .table-skeleton{
    margin: 5px 0;
  }
</style>