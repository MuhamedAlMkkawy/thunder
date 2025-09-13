<template>
  <div>
    <div class="upper_text">
      {{ $t('orders.recieve_orders') }}
      <SwitchInput 
        :is_available_to_recieve_orders="store.is_available_to_recieve_orders"
        @updateStatus="handleSwitchAvailability"
      />
    </div>
    <OrderTypes 
      :orderType="orderType"
      @handleFetchOrders="handleFetchOrders"
    />
    <div class="page">
      <div class="head_title" :style="orderType === 'Finished' ? 'margin-bottom:25px' : ''">
        <h4>
          {{ 
            orderType === 'new' ? $t('orders.new_orders') :
            orderType === 'current' ? $t('orders.current_orders') :
            orderType === 'finished' ? $t('orders.finished_orders') :
            orderType === 'cancelled' ? $t('orders.cancelled_orders') :
            '' 
          }}
        </h4>
        <CompletedOrdersStatistics 
          v-show="orderType === 'finished'"
        />
      </div>
      <div class="content">
        <Empty 
          v-show="!loading && getResult?.data?.orders.length === 0"
        />
        <div class="orders" v-if="!loading && getResult?.data?.orders.length !== 0">
          <!-- show new orders -->
          <RouterLink 
            v-for="item in getResult?.data?.orders" 
            :to="'/order_details/' + item.id" 
            :key="item.id"
            class="order-tab" 
            v-show="timers[item?.id]?.timeRemaining && timers[item?.id]?.timeRemaining > 0" 
          >
            <div class="images" v-if="item.orders_items_images.length !== 0">
              <div  v-for="(image , index) in item.orders_items_images" :key="image.id">
                <div class="image" v-if="index < 4"><img :src="image.image" alt="image" loading="lazy"></div>
              </div>
            </div>
            <div class="head"> 
              <h3>{{$t('orders.order_num')}} {{item.order_number}}</h3>
              <p class="text">
                {{item.notes}}
              </p>
            </div>
            <div class="timer" v-if="orderType === 'new'">
              <div :class="['time' , timers[item?.id]?.timeRemaining <= 60 ? 'pulse' : '']">
                <h5>{{ formatTime(timers[item?.id]?.timeRemaining) }}</h5>
                <!-- {{ timers[item?.id]?.timeRemaining }} -->
                <p>{{ $t('orders.order_minutes') }}</p>
              </div>
              <h6>{{$t('orders.order_details')}}</h6>
            </div>

            <div class="order_text" v-else>
              <h5 :class="item.status.slug">{{item.status.text}}</h5>
              <p>{{$t('orders.order_details')}}</p>
            </div>
          </RouterLink>
          <!-- show rest types of orders -->
          <RouterLink 
            v-for="item in getResult?.data?.orders" 
            :to="'/order_details/' + item.id" 
            :key="item.id"
            class="order-tab" 
            v-if="orderType !== 'new'"
          >
            <div class="images" v-if="item.orders_items_images.length !== 0">
              <div  v-for="(image , index) in item.orders_items_images" :key="image.id">
                <div class="image" v-if="index < 4"><img :src="image.image" alt="image" loading="lazy"></div>
              </div>
            </div>
            <div class="head"> 
              <h3>{{$t('orders.order_num')}} {{item.order_number}}</h3>
              <p class="text">
                {{item.notes}}
              </p>
            </div>
            <div class="order_text">
              <h5 :class="item.status.slug">{{item.status.text}}</h5>
              <p>{{$t('orders.order_details')}}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
    <Pagination 
      @handlePagination = "handlePaginationData"
      :data="getResult?.data?.pagination"
    />
    <Toast 
      ref="toast"
      position="top-right"
    />
    <Loading v-if="loading" />
  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount, reactive , watch  } from 'vue';
  import SwitchInput from '../../../components/SwitchInput.vue';
  import useApiMethods from '../../../Composables/ApiMethods';
  import Toast from 'primevue/toast';
  import Loading from '../../../components/Loading.vue';
  import { useStore } from '../../../store/store';
  import OrderTypes from '../../../components/orderTypes.vue';
  import Pagination from '../../../components/Pagination.vue';
  import usePagination from '../../../Composables/Pagination';
  import Empty from '../../../components/Empty.vue';
  import { RouterLink } from 'vue-router';
  import CompletedOrdersStatistics from '../../../components/CompletedOrdersStatistics.vue';
  import { useI18n } from 'vue-i18n';


  const {t} = useI18n()
  // Define store
  const store = useStore();

  // Define API methods
  const { putMethod , putResult , handleToast , toast, loading } = useApiMethods();

  // Define pagination methods
  const { handlePagination, getResult } = usePagination();

  // To handle order type and fetch data based on it
  const orderType = ref('new');
  const timers = reactive({}); // Keep track of timers

  const handleFetchOrders = (newOrderType) => {
    orderType.value = newOrderType; // Update the active tab index
    handlePagination(`provider/orders/${newOrderType}?page=`, 1);
  };

  // Define pagination between pages
  const pageNumber = ref(1);
  const handlePaginationData = (pageNum) => {
    pageNumber.value = pageNum;
    handlePagination(`provider/orders/${orderType.value}?page=`, pageNum);
  };


  
  watch(()=> store.lang , (newValue)=>{
    if(newValue){
      handlePagination("provider/orders/new?page=", pageNumber.value);
    }
  })


  // Handle the switch toggle change and update the specific item
  const handleSwitchAvailability = () => {
    putMethod ('provider/profile/update-availability?_method=put', '' , true , '' );
  };


  watch(()=>putResult?.value , (newValue)=>{
    if(newValue){
      // handleToast('success' , newValue?.data?.msg)
      store.handleControlRecieveNotification(newValue?.data?.is_available_to_recieve_orders)
    }
  })



  // Initialize timers for orders
  const initializeTimers = () => {
    if (getResult.value?.data?.orders) {
      getResult.value.data.orders.forEach((order) => {
        if (!timers[order.id]) {
          // Get the expiration timestamp from the order
          const expireTime = new Date(order.expired_at).getTime(); // Expiration time in milliseconds
          const now = getSaudiTime(); // Current timestamp in milliseconds (Saudi timezone)

          // Calculate remaining time in seconds
          const timeRemaining = Math.floor((expireTime - now) / 1000); // Convert ms to seconds

          // console.log(`Expire Time (ms): ${expireTime}`);
          // console.log(`Current Time (ms): ${now}`);
          // console.log(`Time Remaining (seconds): ${timeRemaining}`);

          if (timeRemaining > 0) {
            // Store time remaining and set up the countdown
            timers[order.id] = {
              timeRemaining, // Initial remaining time in seconds
              intervalId: setInterval(() => {
                if (timers[order.id].timeRemaining > 0) {
                  timers[order.id].timeRemaining -= 1; // Decrement by 1 second
                  const formattedTime = formatTime(
                    timers[order.id].timeRemaining
                  );
                  // console.log(`Order ${order.id} Time Remaining: ${formattedTime}`);
                } else {
                  clearInterval(timers[order.id].intervalId); // Clear the interval
                  handleToast('error', `Order ${order.order_number} expired!`);
                }
              }, 1000),
            };
          } else {
            // console.log(`Order ${order.id} has already expired!`);
          }
        }
      });
    }
  };

  // Helper function to format seconds into "mm:ss"
  // Format seconds into "hh:mm:ss"
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600); // Calculate hours
    const minutes = Math.floor((seconds % 3600) / 60); // Calculate remaining minutes
    const remainingSeconds = seconds % 60; // Calculate remaining seconds

    // Format hours if present, else display only minutes and seconds
    if (hours > 0) {
      return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
        remainingSeconds < 10 ? "0" : ""
      }${remainingSeconds}`;
    } else {
      return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    }
  };


  // Get the current time in Saudi Arabia timezone
  const getSaudiTime = () => {
    const saudiTimeString = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Riyadh",
    });
    return new Date(saudiTimeString).getTime();
  };


  onMounted(() => {
    handlePagination("provider/orders/new?page=", 1);
    initializeTimers();
    store.handlePageName(t('sidebar.home'))
  });


  watch(
    () => getResult.value?.data?.orders,
    initializeTimers
  );

  onBeforeUnmount(() => {
    Object.keys(timers).forEach((timerId) => {
      clearInterval(timers[timerId].intervalId);
    });
  });
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/mixins";
  @import "../../../assets/scss/variables";
  @import "../../../assets/scss/pulse";


  .upper_text{
    @include displayFlex($justify:flex-end , $gap : 5px);
    margin-bottom: 5px;
    font-size: clamp(14px , 2.5vw , 20px);
  }

  .page{
    .head_title{
      @include displayFlex($justify : space-between , $wrap : wrap);
      // margin-bottom: 25px;
      @media (max-width : 567px){
        justify-content: center;
        gap: 8px;
        h4{
          margin-bottom: 0;
        }
      }
    }
    h4{
      margin-bottom: 14px;
    }
    .orders{
      @include displayFlex($wrap : wrap);
      width: 100%;
      .order-tab{
        @include displayFlex($justify : flex-start , $gap : 10px);
        width: 100%;
        box-shadow: -3px 3px 4px 0px #00000026;
        padding: 25px 20px;
        border-radius: 15px;
        border: 0.5px solid #7C9DC4;
        padding-inline-end: 40px;
        transition: 0.6s;
        &:hover{
          box-shadow: unset;
          background: rgba($mainColor,0.1)
        }
        .images{
          @include displayFlex($wrap : wrap , $gap : 5px);
          max-width: 82px;
          width: fit-content;
          flex-shrink: 0;
          .image{
            width: 38px;
            height: 38px;
            border-radius: 5px;
            border: 0.5px solid #7C9DC4;
            box-shadow: 2px 2px 4px 0px #0000000D;
            padding: 5px;
            img{
              object-fit: contain;
            }
          }
        }
        .head{
          max-width: 500px;
          h3{
            font-size: clamp(15px , 2.5vw , 20px);
            font-weight: 500;
            color: #000000;
          }
          p.text{
            font-size:14px;
            font-weight: 500;
            color: #00000080;
            line-height: 1.4;
            @include textTruncate(2);
          }
        }
        .timer{
          margin-inline-start: auto;
          .time{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 2px solid $secColor;
            @include displayFlex($direction : column , $gap : 0px);
            margin: 0 auto;
            h5{
              font-size: 22px;
              font-weight: 400;
              color: $secColor;
              line-height: 1;
            }
            p{
              font-size: 14px;
              font-weight: 500;
              color: $mainColor;
            }
            &.pulse{
              animation-name: pulse;
              animation-duration: 1s;
              animation-iteration-count: infinite;
              animation-direction: alternate-reverse;
              border:unset;
              h5,p{
                color: #990000;
              }
            }
          }
          h6{
            text-align: center;
            font-size: 16px;
            font-weight: 600;
            color: $mainColor;
          }
        }
        .order_text{
          text-align: end;
          margin-inline-start: auto;
          h5{
            font-size: clamp(12px , 2.5vw , 14px);
            font-weight: 500;
            &.New,
            &.Accepted,
            &.Current{
              color: $mainColor;
            }
            &.Preparing{
              color: $secColor;
            }
            &.Prepared{
              color: grey;
            }
            &.Delivered,
            &.Provider_delivered_to_client ,
            &.Client_delivered{
              color:green;
            }
            &.Finished , 
            &.Cancelled{
              color:red;
            }
          }
          p{
            font-size: clamp(12px , 2.5vw , 16px);
            color:grey;
            font-weight: 600;
          }
        }
        @media (max-width : 450px){
          flex-direction: column;
          flex-wrap: wrap;
          justify-content: center;
          text-align: center;
          // max-width: 250px;
          padding: 14px;
          flex-grow: 1;
          .timer{
            margin: 0 auto;
            text-align: center;
            .time{
              width: 75px;
              height: 75px;
              margin: 0 auto;
            }
          }
        }
      }
    }
  }
</style>