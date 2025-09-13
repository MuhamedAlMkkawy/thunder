<template>
  <div>
    <SkeletonTable
      v-if="loading && !getResult?.data?.settlements"
    />
    <DataTable 
      :value="getResult?.data?.settlements" 
      class="table centered-table statistics-table"
      v-else-if="!loading && getResult?.data?.settlements.length !== 0" 
    >
      <Column field="order_num" :header="$t('financial_transaction.finished.order_num')" :style="{ minWidth: '120px' }"></Column>
      <Column field="user_name" :header="$t('financial_transaction.finished.name')" :style="{ minWidth: '120px' }"></Column>
      <Column field="created_at" :header="$t('financial_transaction.finished.order_date')" :style="{ minWidth: '120px' }"></Column>
      <Column 
        field="status" 
        :header="$t('financial_transaction.finished.order_status')" 
        :style="{ minWidth: '120px' }">
        <template #body="slotProps">
          <span :style="{ color: slotProps.data.status.slug === 'accepted' ? '#4C637F' : '#7E0606' }">
            {{ slotProps.data.status.text }}
          </span>
        </template>
      </Column>
      <Column :style="{ minWidth: '120px' }">
        <template #body="slotProps">
          <RouterLink :to="'/single-settlement/' + slotProps.data.id">
            <button class="edit_btn">
              <i class="pi pi-angle-left"></i>
            </button>
          </RouterLink>
        </template>
      </Column>
    </DataTable>
    <Empty v-else />
    <Pagination 
      :data="getResult?.data?.pagination"
      @handlePagination = "handlePaginationData"
    />
    <Toast 
      ref="toast"
      position="top-right"
    />
  </div>
</template>

<script setup>
  import { ref , watch , onMounted } from 'vue';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import { RouterLink } from 'vue-router';
  import useApiMethods from '../../Composables/ApiMethods';
  import usePagination from '../../Composables/Pagination';
  import Pagination from '../Pagination.vue';
  import Toast from 'primevue/toast';
  import SkeletonTable from '../../components/Tables/SkeletonTable.vue'
  import Empty from '../Empty.vue';
  import { useStore } from '../../store/store';



  // define store
  const store = useStore()



  // define api methods
  const {
    toast
  } = useApiMethods()
  
  
  // define Pagination methods
  const {
    handlePagination,
    loading,
    getResult
  } = usePagination()


  // handle pagination 
  const pageNumber = ref(1)
  const handlePaginationData = (pageNum) =>{
    pageNumber.value = pageNum
    handlePagination('provider/financial-transactions/settlments/completed?page=' , pageNumber.value)
  }


  watch(()=> store.lang , (newValue) => {
    if(newValue){
      handlePagination('provider/financial-transactions/settlments/completed?page=' , pageNumber.value)
    }
  })

  onMounted(()=>{
    handlePagination('provider/financial-transactions/settlments/completed?page=' , pageNumber.value)
  })
</script>

<style lang="scss" scoped>
  @import "/src/assets/scss/variables";
  .edit_btn {
    color: $mainColor;
    font-size: 20px;
    font-weight: 900; 
  }
</style>
