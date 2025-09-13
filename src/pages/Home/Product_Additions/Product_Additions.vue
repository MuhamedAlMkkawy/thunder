<template>
  <div> 
    <div class="button">
      <RouterLink to="/add_addition">
        <button class="main-btn">
          {{$t('products_additions.add_btn')}}
        </button>
      </RouterLink>
    </div>
    <div class="page">
      <h4>{{$t('products_additions.title')}}</h4>
      <div class="content">
        <Product_AdditionsTable  
          :loading="loading"
          :additions="getResult?.data?.addons"
          @handleShowDeleteProductAdditionPopup="handleShowDeleteProductAdditionPopup"
        />
      </div>
      <!-- Pagination -->
      <Pagination 
        :data="getResult?.data?.pagination" 
        @handlePagination="handlePaginationData"
      />
    </div>
    <!-- to handle delete product popup -->
    <DeleteProductAdditionPopup  
      v-if="showDeleteProductAdditionPopup"
      @handleDeleteProductAddition = "handleDeleteProductAddition"
      @handleShowDeleteProductAdditionPopup="handleShowDeleteProductAdditionPopup"
    /> 
    <Toast 
      ref="toast"
      position="top-right"
    /> 
  </div>
</template>

<script setup>
  import Product_AdditionsTable from '../../../components/Tables/Product_AdditionsTable.vue';
  import DeleteProductAdditionPopup from '../../../components/Popups/DeleteProductAdditionPopup.vue';
  import { onMounted, ref } from 'vue';
  import useApiMethods from '../../../Composables/ApiMethods';
  import Toast from 'primevue/toast';
  import Pagination from '../../../components/Pagination.vue';
  import usePagination from '../../../Composables/Pagination';
  import { useStore } from '../../../store/store';


  // define store
  const store = useStore()


  // define pagination
  const {
    getResult,
    handlePagination
  } = usePagination()


  // define api methods
  const {
    deleteMethod,
    toast,
    loading
  } = useApiMethods()




  // handle product addition popup
  const showDeleteProductAdditionPopup = ref(false)

  const handleShowDeleteProductAdditionPopup = () =>{
    showDeleteProductAdditionPopup.value = !showDeleteProductAdditionPopup.value;
  }
  
  const handleDeleteProductAddition = () => {
    handleShowDeleteProductAdditionPopup();
    deleteMethod(`provider/products-addons/destroy/${store.addition_id}` , true , '' , 'reload_page');
  }




  // handle pagination
  const handlePaginationData = (pageNum) => {
    handlePagination('provider/products-addons?page=', pageNum);
    
    // Add a smooth scroll effect to the top of the page after a slight delay
    setTimeout(() => {
      window.scrollTo({
        top: 100,
        behavior: 'smooth',
      });
    }, 300);
  }




  onMounted(()=> {
    handlePagination('provider/products-addons?page=', 1);
  })
</script>

<style lang="scss" scoped>

</style>