<template>
  <div>
    <div class="order_items">
      <div class="order_item page_content">
        <h4>{{ $t('order_details.info_title') }}</h4>
        <hr>
        <div class="content">
          <div class="image">
            <img :src="getResult?.data?.user?.image" alt="image" loading="lazy">
          </div>
          <div class="info">
            <div class="row">
              <h3>{{getResult?.data?.user?.name}}</h3>
              <h5>{{getResult?.data?.order_time}}</h5>
            </div>
            <div class="row">
              <h3>{{ $t('order_details.order_num') }} : {{getResult?.data?.order_num}}</h3>
              <h5>
                <i class="pi pi-star-fill"></i>
                {{getResult?.data?.user?.avg_rates}}
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div class="order_item page_content" v-if="getResult?.data?.delegate">
        <h4>{{ $t('order_details.delivery_title') }}</h4>
        <hr>
        <div class="content">
          <div class="image">
            <img :src="getResult?.data?.delegate?.image" alt="image" loading="lazy">
          </div>
          <div class="info">
            <div class="row">
              <h3>{{getResult?.data?.delegate?.name}}</h3>
            </div>
            <div class="row">
              <h3>{{ $t('order_details.car_plat_number') }} : {{getResult?.data?.delegate?.car_plat_number}}</h3>
              <h5>
                <i class="pi pi-mobile"></i>
                {{getResult?.data?.delegate?.full_phone}}
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div class="order_item page_content product_info">
        <div class="image">
          <img :src="getResult?.data?.product?.image" alt="image" loading="lazy" />
        </div>
        <div class="info">
          <h2>{{getResult?.data?.product?.name}}</h2>
          <p>{{getResult?.data?.product?.description}}</p>
          <ul>
            <li class="row" v-if="getResult?.data?.product?.price">
              <h3>{{ $t('order_details.price') }} : <span>{{getResult?.data?.product?.price}} ر.س</span></h3>
            </li>
            <li class="row" v-if="getResult?.data?.product?.quantity">
              <h3>{{ $t('order_details.quantity') }} :</h3>
              <span>{{getResult?.data?.product?.quantity}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="order_item order_info page_content" v-if="orderInfo">
        <h4>{{ $t('order_details.order_title') }}</h4>
        <hr>
        <div class="content">
          <div class="tab" v-if="orderInfo?.car_color">
            <h5>{{ $t('order_details.car_color') }}</h5>
            <h6>{{ orderInfo?.car_color }}</h6>
          </div>

          <div class="tab" v-if="orderInfo?.car_model">
            <h5>{{ $t('order_details.car_model') }}</h5>
            <h6>{{ orderInfo?.car_model }}</h6>
          </div>

          <div class="tab" v-if="orderInfo?.car_plat_number">
            <h5>{{ $t('order_details.car_plat_number') }}</h5>
            <h6>{{ orderInfo?.car_plat_number }}</h6>
          </div>

          <div class="tab" v-if="orderInfo?.receiving_method?.text">
            <h5>{{ $t('order_details.order_delivery') }}</h5>
            <h6>{{orderInfo?.receiving_method?.text}}</h6>
          </div>
          <div class="tab" v-if="getResult?.data?.map_desc">
            <h5>{{ $t('order_details.order_delivery') }}</h5>
            <h6>{{getResult?.data?.map_desc}}</h6>
          </div>
          <div class="tab" v-if="orderInfo?.order_type">
            <h5>{{ $t('order_details.order_type') }}</h5>
            <h6>{{ orderInfo?.order_type?.text }}</h6>
          </div>
          <div class="tab" v-if="orderStatus?.text">
            <h5>{{ $t('order_details.order_status') }}</h5>
            <h6>{{ orderStatus?.text }}</h6>
          </div>

          <div class="tab" v-if="orderInfo?.order_type?.slug && (orderInfo?.created_at || orderInfo?.schedule_execution_date)">
            <h5>{{ $t('order_details.order_date') }}</h5>
            <h6>{{ orderInfo?.order_type?.slug === 'immediately' ? orderInfo?.created_at : orderInfo?.schedule_execution_date }}</h6>
          </div>

          <div class="tab" v-if="orderInfo?.order_type?.slug && (orderInfo?.created_at_time || orderInfo?.schedule_execution_time)">
            <h5>{{ $t('order_details.order_time') }}</h5>
            <h6>{{ orderInfo?.order_type?.slug === 'immediately' ? orderInfo?.created_at_time : orderInfo?.schedule_execution_time }}</h6>
          </div>

          <div class="tab full_width" v-if="orderInfo?.receiving_in_store_notes ">
            <h5>{{ $t('order_details.recieve_details') }}</h5>
            <h6>{{ orderInfo?.receiving_in_store_notes }}</h6>
          </div>

          <div class="tab full_width" v-if="orderInfo?.notes">
            <h5>{{ $t('order_details.notes') }}</h5>
            <h6>{{ orderInfo?.notes }}</h6>
          </div>

        </div>
      </div>
      <!-- v-if="!getResult?.data?.invoice && getResult?.data?.status?.value != 0" -->
      <div class="order_item page_content fatoorah_info" v-if="getResult?.data?.invoice && getResult?.data?.invoice?.status?.value == 0">
        <h4>{{ $t('order_details.fatoorah_title') }}</h4>
        <hr>
        <div class="content">
          <div class="row" v-if="getResult?.data?.invoice?.total">
            <h3>{{ $t('order_details.order_value') }}</h3>
            <h5>{{ getResult?.data?.invoice?.total }}</h5>
          </div>
          <div class="row" v-if="getResult?.data?.order_info?.receiving_method?.value == 2 && getResult?.data?.invoice?.delivery_price">
            <h3>{{ $t('order_details.delivery_fee') }}</h3>
            <h5>{{ getResult?.data?.invoice?.delivery_price }}</h5>
          </div>
          <div class="row" v-if="getResult?.data?.invoice?.vat_amount">
            <h3>{{ $t('order_details.vat_amount') }}</h3>
            <h5>{{ getResult?.data?.invoice?.vat_amount }}</h5>
          </div>
          <div class="row" v-if="getResult?.data?.invoice?.final_total">
            <h3>{{ $t('order_details.total_amount') }}</h3>
            <h5>{{ getResult?.data?.invoice?.final_total }}</h5>
          </div>
        </div>
      </div>
    </div>
    <!-- {{ orderInfo.status.value }} -->
    <h6 v-if="getResult?.data?.invoice?.status?.value == 0" class="fatorah_text">{{ $t('order_details.receipt_text') }}</h6>
    <div class="submit_buttons">
      <!-- <button 
        class="main-btn refuse_btn" 
        @click="handleSubmit" 
        v-if="orderStatus?.slug !== 'Provider_delivered_to_client' &&
              orderStatus?.slug !== 'Client_delivered' &&
              orderStatus?.slug !== 'Cancelled'
            ">
        {{ 
          orderStatus?.slug === 'New' ? $t('order_details.accept') :
          orderStatus?.slug === 'Accepted' ? $t('order_details.preparing') : 
          orderStatus?.slug === 'Preparing' ? $t('order_details.prepared') :
          orderStatus?.slug === 'Prepared' && deliveryMethod === 1 ?
          $t('order_details.store_method') : 
          orderStatus?.slug === 'Prepared' && deliveryMethod === 2 ?
          $t('order_details.delivery_method') : $t('order_details.finish')
        }}
      </button> -->
      <button class="main-btn">
        <RouterLink :to="'/chats?id=' + getResult?.data?.room_id + '&order_num=' + getResult?.data?.id">
          {{ $t('order_details.chat') }}
        </RouterLink>
      </button>
    </div>
    <Loading
      v-if="loading"
    />
    <Toast 
      ref="toast"
      position="top-right"
    />
  </div>
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue';
  import useApiMethods from '../../../Composables/ApiMethods';
  import { RouterLink, useRoute } from 'vue-router';
  import Loading from '../../../components/Loading.vue';
  import Toast from 'primevue/toast';


  // define route
  const route = useRoute()

  // define order id from params
  const orderId = route.params.id;


  // define api methods
  const {
    getMethod,
    postMethod,
    getResult,
    loading,
    toast
  } = useApiMethods()


  // define fetched order info from get result
  const orderInfo = ref()

  // define fetched order status from get result
  const orderStatus = ref()

  // define deliveryMethod  from get result
  const deliveryMethod = ref()

  // define invoice status 
  // const invoiceStatus = ref()


  watch(()=>getResult?.value?.data , (newValue)=>{
    if(newValue){
      orderInfo.value = newValue?.order_info
      orderStatus.value = newValue?.order_info?.status
      deliveryMethod.value = newValue?.receiving_method?.value
      // invoiceStatus.value = newValue?.status
    }
  })


  // // handle change order status
  // const handleSubmit = () =>{
  //   if(orderStatus.value.slug === 'New'){
  //     // postMethod(`provider/orders/preparing/${orderId}` , '' , true , 'reload_page' , 'success')
  //     getMethod(`provider/orders/accept/${orderId}`, true)
  //   }else if(orderStatus.value.slug === 'Accepted'){
  //     getMethod(`provider/orders/preparing/${orderId}`, true)
  //   }else if(orderStatus.value.slug === 'Preparing'){
  //     getMethod(`provider/orders/prepared/${orderId}`, true)
  //   }else if(orderStatus.value.slug === 'Prepared'){
  //     getMethod(`provider/orders/finish/${orderId}`, true)
  //   }
  //   setTimeout(() => {
  //     location.reload()
  //   }, 800);
  // }

  // handle refuse order
  // const handleRefuseOrder = () => {
  //   postMethod(`provider/orders/cancel/${orderId}` , '', true , '' , 'success')
  // }

  onMounted(()=>{
    getMethod(`provider/un-pricing-orders/details/${route.params.id}` , true)
  })
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/mixins";

  .main-btn{
    a{
      @include displayFlex();
    }
  }

</style>