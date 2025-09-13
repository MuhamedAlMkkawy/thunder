<template>
  <div>
    <div class="page_content">
      <form action="" @submit.prevent="handleSubmit">
        <div class="input-wrap">
          <label for="email">{{ $t('settings.email.current_email') }}</label>
          <div class="input">
            <input 
              type="text" 
              :placeholder="$t('settings.email.current_email_placeholder')" 
              id="email"
              disabled
              :value="store.profile.email"
            >
          </div>
        </div>
        <button type="submit" class="main-btn">
          {{$t('settings.submit_btn')}}
        </button>
      </form>
    </div>
    <Toast 
      ref="toast"
      position="top-right"
    />
  </div>
</template>

<script setup>
  import useApiMethods from '../../../Composables/ApiMethods';
  import { useStore } from '../../../store/store';
  import Toast from 'primevue/toast';



  // define api methods
  const {
    postMethod,
    toast
  } = useApiMethods()
  
  // define Store
  const store = useStore()


  // to handle Submit
  const handleSubmit = () =>{
    store.definePath('email')
    store.handleStoreEmail(store.profile.email)
    postMethod('provider/change-email/send-code' , '' , true , '/settings/verification-code' , 'toast')
  }
</script>

<style lang="scss" scoped>
  form{
    max-width: 500px;
    justify-content: flex-start;
    height: 50vh;
    padding-block-start: clamp(40px, 4vw, 75px);
    align-items: flex-start;
    .input-wrap{margin-bottom: 50px;}
  }
  .input , label{
    margin-block-end: 8px;
    font-weight: 600;
  }
</style>