<template>
  <div>
    <Empty v-if="getResult?.data?.orders?.length === 0" />
    <div class="due_transactions" v-else>
      <div class="page">
        <h4>{{ $t('financial_transaction.due.total_values') }}</h4>
        <hr>
        <div class="content">
          <div class="tab" v-if="statistics?.total">
            <h5>{{ $t('financial_transaction.due.total_requests') }}</h5>
            <p>{{statistics?.total}} {{$t('currency')}}</p>
          </div>
          <div class="tab" v-if="statistics?.admin_commission_value">
            <h5>{{ $t('financial_transaction.due.total_app_tax') }}</h5>
            <p>{{statistics?.admin_commission_value}} {{$t('currency')}}</p>
          </div>
          <!-- <div class="tab" v-if="statistics?.vat_amount">
            <h5>{{ $t('financial_transaction.due.vat_amount') }}</h5>
            <p>{{statistics?.vat_amount}} {{$t('currency')}}</p>
          </div> -->
          <div class="tab" v-if="statistics?.total_due_amount">
            <h5>{{ $t('financial_transaction.due.dues') }}</h5>
            <p>{{statistics?.total_due_amount}} {{$t('currency')}}</p>
          </div>
        </div>
      </div>
      <div class="orders">
        <div class="page order_details" v-for="item in orders" :key="item.id">
          <div class="top">
            <h4>{{ $t('financial_transaction.due.order_num') }} : {{item.order_num}}</h4>
            <div class="time">
              <i class="pi pi-clock"></i>
              <p>{{item.created_at}}</p>
            </div>
          </div>
          <hr>
          <div class="content">
            <div class="tab" v-if="item.total">
              <h5>{{ $t('financial_transaction.due.order_value') }}</h5>
              <p>{{item.total}} {{item.currency}}</p>
            </div>
            <div class="tab" v-if="item.admin_commission_value">
              <h5>{{ $t('financial_transaction.due.comission') }}</h5>
              <p>{{item.admin_commission_value}} {{item.currency}}</p>
            </div>
            <div class="tab" v-if="item.pay_type_text">
              <h5>{{ $t('financial_transaction.due.pay_way') }}</h5>
              <p>{{item.pay_type_text }}</p>
            </div>
            <div class="tab" v-if="item.vat_amount">
              <h5>{{ $t('financial_transaction.due.total_value_added') }}</h5>
              <p>{{item.vat_amount}} {{item.currency}}</p>
            </div>
            <div class="tab" v-if="item.provider_due_amount">
              <h5>{{ $t('financial_transaction.due.dues') }}</h5>
              <p>{{item.provider_due_amount}} {{item.currency}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="button">
        <button class="main-btn" @click="handleSubmit">
          {{ $t('financial_transaction.due.settlement_request') }}
        </button>
      </div>
    </div>
    <Toast 
      ref="toast"
      position="top-right"
    />
    <Loading 
      v-if="loading"
    />
  </div>
</template>

<script setup>
  import useApiMethods from '../../../../Composables/ApiMethods';
  import { useStore } from '../../../../store/store';
  import { onMounted, ref, watch } from 'vue';
  import Toast from 'primevue/toast'
  import Loading from '../../../../components/Loading.vue'
  import Empty from '../../../../components/Empty.vue'

  // define data fetched
  const statistics = ref(null)
  const orders = ref(null)


  // define api methods
  const {
    getMethod,
    postMethod,
    getResult,
    toast,
    loading
  } = useApiMethods()



  // define store
  const store = useStore()

  // to watch changes in language stored 
  watch(()=> store.lang , (newValue)=>{
    if(newValue){
      getMethod('provider/financial-transactions' , true)
    }
  })


  // watch changes in fetched data (getResult)
  watch(() => getResult.value?.data , (newValue) => {
    if(newValue){
      statistics.value = newValue?.statistics
      orders.value = newValue?.orders
    }
  })


  // handle ask for setllement
  const handleSubmit = () =>{
    postMethod('provider/financial-transactions/settlments/store' , '' , true , '/financial_transactions/current-settlement' , 'toast')
  }


  onMounted(()=>{
    getMethod('provider/financial-transactions' , true)
  })
</script>

<style lang="scss" scoped>
  @import "/src/assets/scss/mixins";
  @import "/src/assets/scss/variables";
  .page{
    border-radius: 20px;
    padding-block: 15px 30px;
    margin-bottom: 30px;
    h4{
      margin-bottom: 10px
    }
    .content{
      // @include displayFlex($justify:space-between, $wrap :wrap , $gap : 20px 30px);
      @include displayGrid($gap : 20px 30px);
      padding-block-start: 20px;
      .tab{
        flex-grow: 1;
        h5{
          font-size: clamp(14px , 2.5vw , 18px);
          font-weight: 500;
          color: #696969;
        }
        p{
          font-size: clamp(16px , 2.5vw , 20px);
          font-weight: 500;
          color: #000000;
        }
        &:last-of-type{
          // text-align: center;
          h5 ,
          p{
            color: $mainColor;
          }
        }
      }
    }
    &.order_details{
      .top{
        position: relative;
        .time{
          @include displayFlex($gap :4px);
          position: absolute;
          inset-inline-end: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #989898;
        }
      }
      .content{
        .tab{
          min-width: 100px;
          &:last-of-type{
            text-align: start;
          }
          @media  screen and (max-width : 991px) {
            min-width: 170px;
          }
          @media  screen and (max-width : 400px) {
            min-width: unset;
          }
        }
      }
    }
  }
  .orders{
    @include displayFlex($align:stretch , $wrap : wrap);
    .page{
      margin-bottom: 0;
      flex-grow: 1;
      width: 48%;
      @media(max-width : 700px){
        width: 100%;
      }
    }
  }
  .button{
    text-align: center;
    margin-block-start: 70px;
    .main-btn{
      max-width: 500px;
      margin: 0 auto;
    }
  }
</style>