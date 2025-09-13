<template>
  <div>
    <SkeletonTable v-if="getResult?.data?.products.length === 0 && loading"/>
    <Empty 
      v-else-if="getResult?.data?.products.length === 0 && !loading" 
    />
    <DataTable 
      :value="getResult?.data?.products" 
      class="table products_table centered-table statistics-table"
      tableStyle="width:100%;overflow-x:scroll;" 
      v-else
    >
      <Column field="id" :header="$t('products.order_num')" :style="{ minWidth: '120px' }"></Column>
      <Column :header="$t('products.image')" :style="{ minWidth: '120px' }">
        <template #body="slotProps">
          <div class="image">
            <img :src="slotProps.data?.images[0]?.image" alt="image" loading="lazy">
          </div>
        </template>
      </Column>
      <Column field="name" :header="$t('products.order_name')" :style="{ minWidth: '120px' }"></Column>
      <Column :header="$t('products.type')" :style="{ minWidth: '120px' }">
        <template #body="slotProps">
          <span class="blue-column">
            {{ slotProps.data?.has_price_text }}
          </span>
        </template>
      </Column>
      <Column :style="{ minWidth: '120px' }">
        <template #body="slotProps">
          <div class="buttons">
            <RouterLink :to="'/edit_product/' + slotProps.data.id">
              <button class="edit_btn">
                <i class="pi pi-cog"></i>
              </button>
            </RouterLink>
            <button class="delete_btn" @click="handleDeleteProduct(slotProps.data.id)">
              <i class="pi pi-trash"></i>
            </button>
          </div>
        </template>
      </Column>
    </DataTable>
    <!-- Pagination -->
    <Pagination 
      :data="getResult?.data?.pagination" 
      @handlePagination="handlePaginationData"
    />
  </div>
</template>

<script setup>
  import { onMounted, watch } from 'vue';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import { RouterLink } from 'vue-router';
  import { useStore } from '../../store/store';
  import usePagination from '../../Composables/Pagination';
  import Pagination from '../Pagination.vue';
  import Empty from '../Empty.vue';
  import SkeletonTable from './SkeletonTable.vue';

  
  // to handle store
  const store = useStore();


  // to handle pagination
  const {
    handlePagination,
    getResult 
  } = usePagination();


  // define emits
  const emit = defineEmits(['handleShowDeleteProductPopup', 'handlePagination']);


  // define props
  const props = defineProps({
    loading : {
      type: Boolean,
      default : false
    }
  })

  // to handle delete product popup
  const handleDeleteProduct = (productID) => {
    store.handleStoreProductId(productID);
    emit('handleShowDeleteProductPopup', productID);
  };


  // to handle pagination
  const handlePaginationData = (pageNum) => {
    store.storeProductsPageNum(pageNum);
    handlePagination('provider/products?page=', pageNum);
  };


  // When the component is mounted, fetch the initial page of data
  onMounted(() => {
    handlePagination('provider/products?page=', 1);
  });
  
  watch(()=> store.lang , (newValue) => {
    if(newValue){
      handlePagination('provider/products?page=', 1);
    }
  })

</script>

<style lang="scss" scoped>
  @import "../../assets/scss/mixins";
  .image {
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.0509803922);
    background: #fff;
    width: 60px;
    height: 60px;
    border-radius: 4px;
    overflow: hidden;
    img {
      object-fit: contain;
    }
  }
  .blue-column {
    color: #2367AA; /* Change the text color to blue */
  }
</style>
