<template>
  <div>
    <div class="order-types">
      <div 
        class="tab" 
        :class="{ active: orderType === 'new' }" 
        @click="emit('handleFetchOrders' , 'new')"
      >
        <div class="icon">
          <i class="pi pi-clipboard"></i>
        </div>
        <div class="head">
          <h5>{{ $t('orders.new_orders') }}</h5>
          <p>{{getResult?.data?.new_orders}}</p>
        </div>
      </div>
      <div 
        class="tab" 
        :class="{ active: orderType === 'current' }" 
        @click="emit('handleFetchOrders' , 'current')"
      >
        <div class="icon">
          <i class="pi pi-clipboard"></i>
        </div>
        <div class="head">
          <h5>{{ $t('orders.current_orders') }}</h5>
          <p>{{getResult?.data?.current_orders}}</p>
        </div>
      </div>
      <div 
        class="tab" 
        :class="{ active: orderType === 'finished' }" 
        @click="emit('handleFetchOrders' , 'finished')"
      >
        <div class="icon">
          <i class="pi pi-clipboard"></i>
        </div>
        <div class="head">
          <h5>{{ $t('orders.finished_orders') }}</h5>
          <p>{{getResult?.data?.finished_orders}}</p>
        </div>
      </div>
      <div 
        class="tab" 
        :class="{ active: orderType === 'cancelled' }" 
        @click="emit('handleFetchOrders' , 'cancelled')"
      >
        <div class="icon">
          <i class="pi pi-clipboard"></i>
        </div>
        <div class="head">
          <h5>{{ $t('orders.cancelled_orders') }}</h5>
          <p>{{getResult?.data?.cancelled_orders}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue';
  import useApiMethods from '../Composables/ApiMethods';

  // define api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()


  // define props
  const props = defineProps({
    orderType : {
      type : String,
      default : 'current'
    },
  })


  // define emits
  const emit = defineEmits(['handleFetchOrders'])



  onMounted(()=>{
    getMethod('provider/home' , true)
  })
</script>

<style lang="scss" scoped>
  @import '../assets/scss/mixins';
  @import '../assets/scss/variables';


  .order-types{
    @include displayFlex($align:stretch);
    width: 100%;
    margin-bottom: 15px;
    .tab{
      flex-grow: 1;
      border-radius: 10px;
      padding: 20px;
      @include displayFlex($align:flex-start , $gap : 8px);
      background: #fff;
      box-shadow: -3px 3px 4px 0px #00000026;
      transition: 1s;
      cursor: pointer;
      &:nth-of-type(1n),
      &:nth-of-type(2n){
        .icon{
          background: #FFBF264D;
          i.pi{
            color:#ffbe26;
          }
        }
      }
      &:nth-of-type(3n){
        .icon{
          background: #7C9DC44D;
          i.pi{
            color:#7c9dc4;
          }
        }
      }
      &:nth-of-type(4n){
        .icon{
          background: #FE02024D;
          i.pi{
            color:#fe0202;
          }
        }
      }
      .icon{
        width: 35px;
        height: 35px;
        border-radius: 6px;
        @include displayFlex();
        i.pi{
          font-size: 20px;
        }
      }
      .head{
        h5{
          font-size: 18px;
          font-weight: 400;
          color: #434343;
        }
        p{
          font-size: 24px;
          font-weight: 600;
          color: $textColor;
        }
      }
      &.active ,
      &:hover{
        box-shadow: none;
        background: $mainColor;
        .icon{
          background: #FFBF264D;
          i.pi{
            color: #fff;
          }
        }
        .head{
          h5 , p{
            color: #fff;
          }
        }
      }
    }
    @media (max-width : 1200px){
      @include displayGrid();
    }
  }
</style>