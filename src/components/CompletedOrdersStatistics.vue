<template>
  <div>
    <div class="finished_orders_details">
      <h4>{{$t('orders.total_orders')}} : {{getResult?.data?.completed_orders_today_count}}</h4>
      <h4>{{$t('orders.total_sold')}} : {{getResult?.data?.sum_final_total_today}}</h4>
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue';
  import useApiMethods from '../Composables/ApiMethods';

  const{
    getMethod,
    getResult
  } = useApiMethods()


  onMounted(()=>{
    getMethod('provider/orders/completed-orders-statistics' , true)
  })
</script>

<style lang="scss" scoped>
  @import '/src/assets/scss/variables';
  @import '/src/assets/scss/mixins';


  .finished_orders_details{
    @include displayFlex($wrap : wrap);
    margin-inline-end: clamp(8px, 2.5vw, 30px);
    position: relative;
    margin-bottom: 20px;
    &::after{
      content: "";
      position: absolute;
      top: 0px;
      left: 0;
      width: 100%;
      height: 5px;
      background: $secColor;
      border-radius: 50% 50% 0 0;
    }
    &::before{
      content: "";
      position: absolute;
      bottom: 0px;
      left: 0;
      width: 100%;
      height: 10px;
      border-radius: 0 0 100% 100%;
      background: $secColor;
    }
    h4{
      padding-inline: 0;
      text-wrap: nowrap;
    }
    @media (max-width : 560px){
      &::after , 
      &::before{
        display: none;
      }  
    }
  }
</style>