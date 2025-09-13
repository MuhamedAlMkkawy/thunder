<template>
  <div>
    <div class="due_transactions">
      <div class="page">
        <h4>{{ $t('settlement_single_page.total_values') }}</h4>
        <hr>
        <div class="content">
          <div class="tab" v-if="getResult?.data?.total">
            <h5>{{ $t('settlement_single_page.total_requests') }}</h5>
            <p>{{getResult?.data?.total}}</p>
          </div>
          <div class="tab" v-if="getResult?.data?.admin_commission_value">
            <h5>{{ $t('settlement_single_page.total_app_tax') }}</h5>
            <p>{{getResult?.data?.admin_commission_value}}</p>
          </div>
          <div class="tab" v-if="getResult?.data?.total_due_amount">
            <h5>{{ $t('settlement_single_page.dues') }}</h5>
            <p>{{getResult?.data?.total_due_amount}}</p>
          </div>
        </div>
      </div>
      <div class="orders" v-for="item in getResult?.data?.items" :key="item.id"> 
        <div class="page order_details">
          <div class="top">
            <h4>{{ $t('settlement_single_page.order_num') }} : {{item?.order_num}}</h4>
            <div class="time">
              <i class="pi pi-clock"></i>
              <p>{{item?.created_at}}</p>
            </div>
          </div>
          <hr>
          <div class="content">
            <div class="tab" v-if="item?.final_total">
              <h5>{{ $t('settlement_single_page.order_value') }}</h5>
              <p>{{item?.total}} {{ $t('currency') }}</p>
            </div>
            <div class="tab" v-if="item?.admin_commission_value">
              <h5>{{ $t('settlement_single_page.comission') }}</h5>
              <p>{{item?.admin_commission_value}} {{ $t('currency') }}</p>
            </div>
            <div class="tab" v-if="item?.vat_amount">
              <h5>{{ $t('settlement_single_page.total_value_added') }}</h5>
              <p>{{item?.vat_amount}} {{ $t('currency') }}</p>
            </div>
            <div class="tab" v-if="item?.provider_due_amount">
              <h5>{{ $t('settlement_single_page.dues') }}</h5>
              <p>{{item?.provider_due_amount}} {{ $t('currency') }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="page order_details reciept_image" v-if="getResult?.data?.image && getResult?.data?.status.slug != 'rejected' && getResult?.data?.status.slug != 'pending'">
        <h4>{{ $t('settlement_single_page.receipt_image') }}</h4>
        <hr>
        <div class="content">
          <div class="image">
            <img :src="getResult?.data?.image" alt="image" loading="lazy" />
          </div>
        </div>
      </div>
      <div class="page order_details refused"  v-if="getResult?.data?.status.slug === 'rejected'">
          <h4>{{ $t('settlement_single_page.refused') }}</h4>
        <hr>
        <div class="content">
          <p>
            {{getResult?.data?.cancel_reason}} 
          </p>
        </div>
      </div>
      <div class="settlement_status" v-if="getResult?.data?.status">
        {{getResult?.data?.status?.message}}
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref , watch , onMounted } from 'vue';
  import { useStore } from '../../../../store/store';
  import useApiMethods from '../../../../Composables/ApiMethods';
  import { useRoute } from 'vue-router';


  // define route
  const route = useRoute()

  // define param of order
  const settlementID = route.params.id

  // define api methods
  const{
    getMethod,
    getResult,
    toast,
    loading
  } = useApiMethods()

  // define store
  const store = useStore()

  // to watch changes in language stored 
  watch(()=> store.lang , (newValue)=>{
    if(newValue){
      getMethod(`provider/financial-transactions/settlments/show/${settlementID}` , true)
    }
  })


  onMounted(()=>{
    getMethod(`provider/financial-transactions/settlments/show/${settlementID}` , true)
  })
</script>

<style lang="scss" scoped>
  @import "/src/assets/scss/mixins";
  @import "/src/assets/scss/variables";
  .page{
    border-radius: 20px;
    padding-block: 15px 30px;
    margin-bottom: 30px;
    flex-grow: 1;
    &.reciept_image , &.refused{
      // flex-grow: 0;
      width: 100%;
      max-width: 500px;
    }
    h4{
      margin-bottom: 10px
    }
    .content{
      @include displayFlex($justify:space-between, $wrap :wrap , $gap : 20px 30px);
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
          text-align: center;
          h5 ,
          p{
            color: $mainColor;
          }
        }
      }
      .image{
        width: 450px;
        height: 220px;
        object-fit: cover;
      }
      p{
        max-width: 450px;
        font-size: 14px;
        font-weight: 500;
        color: #989898;
      }
    }
    &.order_details{
      .top{
        position: relative;
        .time{
          @include displayFlex($gap :8px);
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
    }
    &:not(:last-of-type){
      margin-bottom: 20px;
    }
  }

  .settlement_status{
    max-width: 500px;
    margin: 60px 0 0;
    width: 100%;
    text-align: center;
    background: #fff;
    box-shadow: -3px 0px 4px 0px #00000026;
    padding-block: 14px;
    border-radius: 50px;
    color: $mainColor;
    font-size: clamp(14px , 4vw , 20px);
    font-weight: 600;
  }


  .reciept_image, .refused{
    margin-inline-end: auto;
    margin-top: 30px;
  }
</style>