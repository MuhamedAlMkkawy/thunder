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
              <h5>{{getResult?.data?.order_info?.created_at_time}}</h5>
            </div>
            <div class="row">
              <h3>{{ $t('order_details.order_num') }} : {{getResult?.data?.order_number}}</h3>
              <h5>
                <i class="pi pi-star-fill rate"></i>
                {{getResult?.data?.user?.avg_rate}}
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
              <a :href="'tel:' + getResult?.data?.delegate?.full_phone">
                <h5>
                  <i class="pi pi-mobile"></i>
                  {{getResult?.data?.delegate?.full_phone}}
                </h5>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="order_item page_content product_info" v-for="item in getResult?.data?.order_items" :key="item?.product?.id">
        <div class="image ">
          <img :src="item?.product?.images[0]?.image" alt="image" loading="lazy" />
        </div>
        <div class="info">
          <h2>{{item?.product?.name}}</h2>
          <p class="product_infoText">{{item?.product?.description}}</p>
          <ul>
            <li class="row" v-if="item?.total">
              <h3>{{ $t('order_details.price') }} : <span>{{item?.total}} ر.س</span></h3>
            </li>
            <li class="row" v-if="item?.quantity">
              <h3>{{ $t('order_details.quantity') }} :</h3>
              <span>{{item?.quantity}}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="order_item order_info page_content">
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
            <h6>{{ orderInfo?.order_type?.slug == 'immediately' ? orderInfo?.created_at : orderInfo?.schedule_execution_date }}</h6>
          </div>

          <div class="tab" v-if="orderInfo?.order_type?.slug && (orderInfo?.created_at_time || orderInfo?.schedule_execution_time)">
            <h5>{{ $t('order_details.order_time') }}</h5>
            <h6>{{ orderInfo?.order_type?.slug == 'immediately' ? orderInfo?.created_at_time : orderInfo?.schedule_execution_time }}</h6>
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
      </div> -->
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
          <div class="tab" v-if="orderInfo?.order_type">
            <h5>{{ $t('order_details.order_type') }}</h5>
            <h6>{{ orderInfo?.order_type?.text }}</h6>
          </div>
          <div class="tab" v-if="getResult?.data?.map_desc">
            <h5>{{ $t('order_details.order_location') }}</h5>
            <h6>{{getResult?.data?.map_desc}}</h6>
          </div>
          <div class="tab" v-if="orderStatus?.text">
            <h5>{{ $t('order_details.order_status') }}</h5>
            <h6>{{ orderStatus?.text }}</h6>
          </div>

          <div class="tab" v-if="orderInfo?.order_type?.slug && (orderInfo?.created_at || orderInfo?.schedule_execution_date)">
            <h5>{{ $t('order_details.order_date') }}</h5>
            <h6>{{ orderInfo?.order_type?.slug == 'immediately' ? orderInfo?.created_at : orderInfo?.schedule_execution_date }}</h6>
          </div>

          <div class="tab" v-if="orderInfo?.order_type?.slug && (orderInfo?.created_at_time || orderInfo?.schedule_execution_time)">
            <h5>{{ $t('order_details.order_time') }}</h5>
            <h6>{{ orderInfo?.order_type?.slug == 'immediately' ? orderInfo?.created_at_time : orderInfo?.schedule_execution_time }}</h6>
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
      <div class="order_item page_content fatoorah_info" v-if="getResult?.data?.financial_transactions && getResult?.data?.financial_transactions.pay_status == 1">
        <h4>{{ $t('order_details.fatoorah_title') }}</h4>
        <hr>
        <div class="content">
          <div class="row" v-if="getResult?.data?.financial_transactions?.total_products">
            <h3>{{ $t('order_details.order_value') }}</h3>
            <h5>{{ getResult?.data?.financial_transactions?.total_products }} {{ $t('currency') }}</h5>
          </div>
          <div class="row" v-if="getResult?.data?.receiving_method?.value == 2 && getResult?.data?.financial_transactions?.delivery_price">
            <h3>{{ $t('order_details.delivery_fee') }}</h3>
            <h5>{{ getResult?.data?.financial_transactions?.delivery_price }}{{ $t('currency') }}</h5>
          </div>
          <div class="row" v-if="getResult?.data?.financial_transactions?.vat_amount">
            <h3>{{ $t('order_details.vat_amount') }}</h3>
            <h5>{{ getResult?.data?.financial_transactions?.vat_amount }}{{ $t('currency') }}</h5>
          </div>
          <div class="row" v-if="getResult?.data?.financial_transactions?.final_total">
            <h3>{{ $t('order_details.total_amount') }}</h3>
            <h5>{{ getResult?.data?.financial_transactions?.final_total }}{{ $t('currency') }}</h5>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="button">
      <h6>{{ $t('order_details.receipt_text') }}</h6>
      <button class="main-btn">
        {{ $t('order_details.chat') }}
      </button>
    </div> -->
    <div class="submit_buttons edit_buttons">
      <button class="main-btn" v-if="orderStatus?.value == 10 && deliveryMethod != 1 && !getResult?.data?.is_delegate_rated" @click="handleShowDelegateRatingPopup">
        {{ $t('order_details.delegate_rating') }}
      </button>
      <RouterLink 
        class="main-btn" 
        :to="'/chats?id=' + getResult?.data?.room_id + '&order_num=' + getResult?.data?.id"
        v-if="orderStatus?.slug != 'New' && orderStatus?.value != 10"
        >
        {{ $t('order_details.chat') }}
      </RouterLink>
      <!-- {{ deliveryMethod }}
      {{ orderStatus?.slug }} -->
      <button 
        :class="['main-btn ' ,  {variants_btn : orderStatus?.slug != 'New'}]" 
        @click="handleSubmit" 
        v-if="orderStatus?.slug != 'Provider_delivered_to_client' &&
              orderStatus?.slug != 'Client_delivered' &&
              orderStatus?.slug != 'Delivered_to_delegate' &&
              !(orderStatus?.slug == 'Prepared' && deliveryMethod == 2)  &&
              !(orderStatus?.slug == 'Accepted' && orderFinanical.pay_status == 0 && orderFinanical.pay_type != 1)  &&
              !(orderStatus?.slug == 'On_my_way_to_provider' && deliveryMethod == 2) &&
              orderStatus?.value != 6 && 
              orderStatus?.value != 7 && 
              orderStatus?.value != 8 &&
              orderStatus?.value != 9 &&
              orderStatus?.value != 10 && 
              orderStatus?.slug != 'Cancelled'
            ">
        {{ 
          orderStatus?.slug == 'New' ? $t('order_details.accept') :
          orderStatus?.slug == 'Accepted' ? $t('order_details.preparing') : 
          orderStatus?.slug == 'Preparing' ? $t('order_details.prepared') :
          orderStatus?.slug == 'Prepared' && deliveryMethod == 1 ?
          $t('order_details.store_method') : 
          (orderStatus?.slug == 'On_my_way_to_provider' && deliveryMethod == 2) ?
          $t('order_details.delivery_method') : $t('order_details.finish')
        }}
      </button>
      <button v-if="orderStatus?.slug == 'On_my_way_to_provider' && deliveryMethod == 2" class="main-btn variants_btn" @click="handleSubmit">
        {{$t('order_details.delivery_method')}}
      </button>
      <button class="main-btn refuse_btn" @click="handleRefuseOrder" v-if="orderStatus?.slug == 'New'">
        {{ $t('order_details.refuse') }}
      </button>
    </div>
    <Loading
      v-if="loading"
    />
    <Toast 
      ref="toast"
      position="top-right"
    />
    <DelegateRatingPopup 
      v-if="showDelegateRatingPopup"
      @handleShowDelegateRatingPopup="handleShowDelegateRatingPopup"
    />
  </div>
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue';
  import useApiMethods from '../../../Composables/ApiMethods';
  import { useRoute , useRouter } from 'vue-router';
  import Loading from '../../../components/Loading.vue';
  import Toast from 'primevue/toast';
  import DelegateRatingPopup from '../../../components/Popups/DelegateRatingPopup.vue';


  // define route
  const route = useRoute()

  // define order id from params
  const orderId = route.params.id;


  // handle delegate rating popup
  const showDelegateRatingPopup = ref(false)

  const handleShowDelegateRatingPopup = () =>{
    showDelegateRatingPopup.value = !showDelegateRatingPopup.value
  }

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

  // define finanicial transctions from get result
  const orderFinanical = ref()


  watch(()=>getResult?.value?.data , (newValue)=>{
    if(newValue){
      orderInfo.value = newValue?.order_info
      orderStatus.value = newValue?.order_info?.status
      deliveryMethod.value = newValue?.receiving_method?.value
      orderFinanical.value = newValue?.financial_transactions
    }
  })

  
  // handle change order status
  const handleSubmit = () =>{
    if(orderStatus.value.slug == 'New'){
      // postMethod(`provider/orders/preparing/${orderId}` , '' , true , 'reload_page' , 'success')
      getMethod(`provider/orders/accept/${orderId}`, true)
    }else if(orderStatus.value.slug == 'Accepted'){
      getMethod(`provider/orders/preparing/${orderId}`, true)
    }else if(orderStatus.value.slug == 'Preparing'){
      getMethod(`provider/orders/prepared/${orderId}`, true)
    }else if(orderStatus.value.slug == 'Prepared' || orderStatus.value.slug == 'On_my_way_to_provider'){
      getMethod(`provider/orders/finish/${orderId}`, true)
    }
  }
  

  // handle refuse order
  const handleRefuseOrder = () => {
    postMethod(`provider/orders/cancel/${orderId}` , ' ', true , 'reload_page' , 'toast')
  }

  onMounted(()=>{
    getMethod(`provider/orders/details/${orderId}` , true)
  })
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/mixins';
  p.product_infoText{
    // max-height: 60px;
    // overflow: overlay;
    +ul{
      @include displayFlex($justify:space-between);
      li{
        gap:5px !important;
      }
    }
  }
  a.main-btn{
    @include displayFlex();
    max-width: 350px !important;
  }

  @media (max-width : 767px){
    .order_items .order_item.product_info {
      // flex-direction: column;
      justify-content: flex-start;
      .image{
        margin-inline-end: unset !important;
      }
    }
  }
</style>