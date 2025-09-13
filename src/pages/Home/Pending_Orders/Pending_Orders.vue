<template>
  <div class="page_content">
    <Pending_OrdersTable />
  </div>
</template>

<script setup>

import Pending_OrdersTable from '../../../components/Tables/Pending_OrdersTable.vue';

</script>

<style lang="scss" scoped>
  .page_content{
    padding-inline: clamp(8px , 2.5vw , 20px);
  }
</style>