<template>
  <div class="page_content">
    <!-- Show skeleton loader if loading is true -->
    <div v-if="loading && fetchedData?.data?.length === 0" class="skeleton-loader">
      <div v-for="n in 5" :key="n" class="skeleton-tab">
        <div class="skeleton-image"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-button"></div>
      </div>
    </div>
    <Empty v-else-if="!loading && fetchedData?.data?.length === 0" />
    <div v-else class="notifications">
      <button @click="handleDeleteAllNotifications">{{ $t('notifications.title') }}</button>
      <div class="tab" v-for="item in fetchedData?.data" :key="item.id">
        <div class="image">
          <img v-if="item?.type != 'admin_notify' && item?.type != 'admin_accept_request_for_edit' && item?.type != 'admin_decline_request_for_edit'" src="../../../assets/images/notification.png" alt="image" loading="lazy">
          <img v-else src="../../../assets/images/admin.png" alt="image" loading="lazy">
        </div>
        <RouterLink 
          :to="item?.data?.type == 'invoice_paid_negotiation_order' || item?.data?.type == 'invoice_declined_negotiation_order'
          || item?.data?.type == 'pending_negotiation_order' || item?.data?.type == 'generated_invoice_negotiation_order'
            ? '/pending_order_details/' + item?.data?.order_id 
            : '/order_details/' + item?.data?.order_id" 
          class="text" 
          v-if="!['admin_notify', 'admin_accept_request_for_edit', 'admin_decline_request_for_edit'].includes(item?.type)">
          <p>{{item?.title}}</p>
          <p>{{item?.body}}</p>
        </RouterLink>
        <div class="text" v-else>
          <p>{{item?.title}}</p>
          <p>{{item?.body}}</p>
        </div>
        <button @click="handleDeleteNotification(item?.id)">
          <i class="pi pi-times"></i>
        </button>
      </div>
    </div>
    <Pagination 
      :data="fetchedData?.pagination"
      @handlePagination="handlePaginationData"
    />
    <Toast 
      ref="toast"
      position="top-right"
    />
  </div>
</template>

<script setup>
  import { onMounted, ref ,watch } from 'vue';
  import useApiMethods from '../../../Composables/ApiMethods';
  import Toast from 'primevue/toast';
  import Empty from '../../../components/Empty.vue';
  import { useStore } from '../../../store/store';
  import Pagination from '../../../components/Pagination.vue';
  import usePagination from '../../../Composables/Pagination';
import { RouterLink } from 'vue-router';


  // to store notifications of fetched data
  const fetchedData = ref()

  // define pagination methods
  const{
    getResult,
    handlePagination
  } = usePagination()


  // define store
  const store = useStore()

    // Define pagination between pages
  const pageNumber = ref(1);
  const handlePaginationData = (pageNum) => {
    pageNumber.value = pageNum;
    handlePagination(`general/notifications?page=`, pageNum);
  };


  // define api methods
  const {
    deleteMethod,
    toast,
    loading
  } = useApiMethods()

  const countDeletedNotification = ref(0)

  // to handle delete notification
  const handleDeleteNotification = (id) =>{
    countDeletedNotification.value++
    deleteMethod(`general/delete-notification/${id}` , true , '' , '')
  }


  // to handle delete all ni=otifications
  const handleDeleteAllNotifications = () => {
    countDeletedNotification.value++
    deleteMethod('general/delete-notifications' , true , '' , '')
  }


  watch(()=> store.lang , (newValue) => {
    if(newValue){
      handlePagination(`general/notifications?page=`, pageNumber.value);
    }
  })


  watch(()=> getResult?.value?.data?.notifications , (newValue) => {
    if(newValue){
      fetchedData.value = newValue
    }
  })


  watch(() => countDeletedNotification.value , (newValue) => {
    if(newValue){
      // console.log(newValue)
      handlePagination(`general/notifications?page=`, pageNumber.value);
    }
  })


  onMounted(()=>{
    handlePagination(`general/notifications?page=`, 1);
  })
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/mixins";
  @import "../../../assets/scss/variables";
  
  .page_content{
    padding: 20px 0;
    .tab{
      @include displayFlex($gap : 10px , $justify:flex-start , $align : flex-start);
      padding-inline: clamp(8px , 2.5vw , 70px);
      padding-block: 18px 12px;
      .image{
        max-width: 30px;
      }
      button{
        margin-inline-start: auto;
        transform: translateY(12px);
      }
      &:not(:last-of-type){
        border-bottom: 0.5px solid #D9D9D9CC
      }
      &:first-of-type{
        padding-block-start: 0;
      }
      &:last-of-type{
        padding-block-end: 0;
      }
    }
    .notifications{
      padding-block-start: 60px;
      position: relative;
      > button{
        position: absolute;
        inset-inline-end: 20px;
        top: 0px;
        font-size: clamp(14px , 2.5vw , 18px);
        font-weight: 400;
        color: #A40303;
        font-family: $fontFamily;
      }
    }
  }
</style>