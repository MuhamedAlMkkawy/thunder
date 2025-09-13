<template>
  <div> 
    <div class="button">
      <RouterLink to="/add_products" @click="store.handlePageName($t('products.add_new'))">
        <button class="main-btn">
          {{$t('products.add_new')}}
        </button>
      </RouterLink>
    </div>
    <div class="page">
      <h4>{{$t('products.addedProducts')}}</h4>
      <div class="content">
        <ProductsTable  
          :loading="loading"
          @handleShowDeleteProductPopup="handleShowDeleteProductPopup"
        />
      </div>
    </div>
    <!-- to handle delete product popup -->
    <DeleteProductPopup  
      v-if="showDeleteProductPopup"
      @handleShowDeleteProductPopup="handleShowDeleteProductPopup"
      @handleDeleteProduct = "handleDeleteProduct"
    />  
    <!-- to handle toast -->
    <Toast 
      ref="toast"
      position="top-right"  
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import DeleteProductPopup from '../../../components/Popups/DeleteProductPopup.vue';
  import ProductsTable from '../../../components/Tables/ProductsTable.vue';
  import { RouterLink } from 'vue-router';
  import useApiMethods from '../../../Composables/ApiMethods';
  import Toast from 'primevue/toast'
  import { useStore } from '../../../store/store';

  // define store
  const store = useStore()

  // define api methods
  const {
    deleteMethod,
    toast,
    loading
  } = useApiMethods()


  // to handle delete product popup and its vision
  const showDeleteProductPopup = ref(false)

  const handleShowDeleteProductPopup = () =>{
    showDeleteProductPopup.value = !showDeleteProductPopup.value
  }
  
  
  const handleDeleteProduct = () =>{
    handleShowDeleteProductPopup()
    deleteMethod(`provider/products/destroy/${store.product_id}` , true , '' , 'reload_page')
  }

</script>

<style lang="scss" scoped>
  .page_content{
    padding: 20px  clamp(8px , 2.5vw , 20px);
  }
</style>