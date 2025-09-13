<template>
  <div class="page_content">
    <form action="" @submit.prevent="handleSubmit">
      <div class="input-wrap">
        <label for="phone">{{ $t('settings.phone.current_phone') }}</label>
        <div class="input">
          <input 
            type="text"
            id="phone"
            :placeholder="$t('settings.phone.current_phone_placeholder')"  
            :value="store.profile.full_phone"
            disabled
          >
        </div>
      </div>
      <button class="main-btn">
        {{$t('settings.submit_btn')}}
      </button>
    </form>
    <Toast 
      ref="toast"
      position="top-right"
    />
  </div>
</template>

<script setup>
  import useApiMethods from '../../../Composables/ApiMethods'
  import Toast from 'primevue/toast';
  import { useStore } from '../../../store/store';


  // define Store
  const store = useStore()

  const {
    postMethod,
    getResult,
    toast
  } = useApiMethods()
  
  // to handle Submit
  const handleSubmit = () =>{
    store.definePath('phone')
    store.handleStorePhone(store.profile.country_code , store.profile.phone)
    postMethod('provider/change-phone/send-code' , '' , true , '/settings/verification-code' , 'toast')
  }
</script>

<style lang="scss" scoped>
form{
  max-width: 500px;
  justify-content: flex-start;
  height: 50vh;
  padding-block-start: clamp(40px , 4vw , 75px);
  .input-wrap{
    margin-bottom: 50px;
  }
  label{
    font-weight: 600;
  }
}
</style>