<template>
  <div>
    <div class="popup invoice">
      <div class="content">
        <button class="close_btn" @click="emit('handleShowInvoicePopup')">
          <i class="pi pi-times"></i>
        </button>
        <h4>{{$t('invoice_popup.title')}}</h4>
        <div class="input">
          <label for="invoice">{{$t('invoice_popup.label')}}</label>
          <input 
            id="invoice"
            type="text"
            :placeholder="$t('invoice_popup.placeholder')"
            v-model="body.order_total"
          >
        </div>
        <button class="main-btn" @click="handleSubmit">{{$t('invoice_popup.button')}}</button>
      </div>
    </div>
    <Toast 
      ref="toast"
      position="top-right"
    />
  </div>
</template>

<script setup>
  import { ref, watchEffect } from 'vue';
  import useApiMethods from '../../Composables/ApiMethods';
  import { useRoute } from 'vue-router';
  import Toast from 'primevue/toast';
  import { useStore } from '../../store/store';

  // define route
  const route = useRoute()

  // define store 
  const store = useStore()

  // define api methods
  const {
    postMethod,
    postResult,
    toast,
    handleToast
  } = useApiMethods()

  // define body
  const body =ref({
    order_total: ''
  })

  // define emits 
  const emit = defineEmits(['handleShowInvoicePopup'])

  // define submit function
  const handleSubmit = () =>{
    if(body.value.order_total.length ===0){
      handleToast('error' , store.lang === 'ar' ?
        'يجب تحديد قيمة الطلب' : 
        store.lang === 'en' ?
        'You must specify the order value' : 'آپ کو آرڈر کی قیمت مشخص کرنی ہوگی' 
      )
    }else{
      postMethod(`provider/un-pricing-orders/${route.query.order_num}/create-invoice` , body.value , true , `/chats?id=${route.query.id}&order_num=${route.query.order_num}` , 'toast')
      console.log(route.query.id)
      console.log(route.query.order_num)
    }
  }
  
  
  watchEffect(()=>{
    if(postResult?.value?.key === 'success'){
      emit('handleShowInvoicePopup')
    }
  })
</script>

<style lang="scss" scoped>
  .popup{
    .content{
      padding-inline: 20px;
      .input{
        margin-block: 20px;
        label{
          display: flex;
          width: 100%;
        }
        button.main-btn{
          @extend .main-btn;
        }
      }
    }
  }
</style>