<template>
  <div>
    <SkeletonTable v-if="getResult?.data?.orders.length === 0 && loading"/>
    <Empty 
      v-else-if="getResult?.data?.orders.length === 0 && !loading" 
    />
    <DataTable 
      :value="getResult?.data?.orders" 
      tableStyle="width:100%;overflow-x:scroll;" 
      class="table centered-table unpricing-table"
      v-else
    >
      <Column field="id" :header="$t('pending_orders.order_num')" :style="{ minWidth: '120px' }"></Column>
      <Column field="user_name" :header="$t('pending_orders.name')" :style="{ minWidth: '120px' }"></Column>
      <Column field="order_date" :header="$t('pending_orders.date')" :style="{ minWidth: '120px' }"></Column>
      <Column field="order_time" :header="$t('pending_orders.time')" :style="{ minWidth: '120px' }"></Column>
      <Column  :header="$t('pending_orders.product_name')" :style="{ minWidth: '120px' }">
        <template  #body="slotProps">
          <span class="blue-column">
            {{ slotProps.data.product_name }}
          </span>
        </template>
      </Column>
      <Column :header="$t('pending_orders.quantity')" :style="{ minWidth: '120px' }">
        <template  #body="slotProps">
          <span class="blue-column">
            {{ slotProps.data.quantity }}
          </span>
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
          <RouterLink :to="'pending_order_details/' + slotProps.data.id" class="image blue-column">
            <span class="pi pi-angle-left"></span>
          </RouterLink>
        </template>
      </Column>
    </DataTable>
    <Pagination
      :data="getResult?.data?.pagination"
      @handlePagination="handlePaginationData"
    />
    <Toast 
      ref="toast"
      position="top-right"
    />
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import useApiMethods from '../../Composables/ApiMethods';
  import SkeletonTable from './SkeletonTable.vue';
  import Empty from '../Empty.vue';
  import Pagination from '../Pagination.vue';
  import usePagination from '../../Composables/Pagination';
  import Toast from 'primevue/toast';
  
  
  // define api methods
  const {
    toast ,
    loading
  } = useApiMethods()


  // define pagination methods
  const{
    handlePagination,
    getResult
  } = usePagination()


  // to handle pagination
  const pageNumber= ref(1)
  const handlePaginationData = (pageNum) => {
    pageNumber.value = pageNum
    handlePagination('provider/un-pricing-orders?page=', pageNum);
  };



  onMounted(()=>{
    handlePagination('provider/un-pricing-orders?page=' , pageNumber.value)
  })
</script>

<style lang="scss" scoped>
  .blue-column {
    color: #2367AA; /* Change the text color to blue */
  }
</style>
