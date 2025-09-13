<template>
  <div>
    <form action="" @submit.prevent="handleSubmit">
      <h5>{{ $t('login.title') }}</h5>
      <p>{{ $t('login.welcome') }}</p>
      <div class="input-wrap phonewithcode">
        <label for="phone">{{ $t('login.phone') }}</label>
        <div class="inputs">
          <div class="input">
            <input 
              type="tel" 
              :placeholder="$t('login.phone_placeholder')"
              id="phone"
              v-model="body.phone"
            >
          </div>
          <div class="input">
            <CountryCode 
              @handleCountryCode="handleCountryCode"
            />
          </div>
        </div>
      </div>
      <button class="main-btn" type="submit">
        {{ $t('login.btn_text') }}
      </button>
      <p>{{ $t('login.have_account') }} <RouterLink to="/signup">{{ $t('login.signup') }}</RouterLink></p>
    </form>
    <Toast 
      ref="toast"
      position="top-right"
    />
    <loading v-if="loading" />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import useApiMethods from '../../../Composables/ApiMethods';
  import Toast from 'primevue/toast';
  import Loading from '../../../components/Loading.vue';
  import CountryCode from '../../../components/SelectInputs/CountryCode.vue';
import { useStore } from '../../../store/store';



  // define store
  const store = useStore()




  // define api methods
  const {
    postMethod,
    toast,
    loading,
    handleToast
  } = useApiMethods()



  // to handle body
  const body = ref({
    phone:'',
    country_code : '966'
  })



  // to handle country code
  const handleCountryCode = (newValue) =>{
    body.value.country_code = newValue
  }

  // to handle submit form
  const handleSubmit = () =>{
    if(body.value.phone === ''){
      handleToast('error' , store.lang === 'ar' ? 'رقم الهاتف مطلوب' :
        store?.lang === 'en' ? 'Phone Number is Required' : 
        'فون نمبر درکار ہے۔'
      )
    }else{
      store?.handleStorePhone(body.value.country_code , body.value.phone)
      // window.sessionStorage.setItem('country_code' , body.value.country_code)
      // window.sessionStorage.setItem('phone' , body.value.phone)
      postMethod('provider/sign-in' , body.value , false , '/login/phone-activation' , 'toast')
    }
  }
</script>

<style lang="scss" scoped>
  form{
    max-width: 500px;
    justify-content: center;
    height: 70vh;
  }
  .input-wrap{
    margin-bottom: 100px;
    .inputs{
      border-bottom: 0.5px solid #D9D9D9;
      margin-top: 20px;
      .input{
        border: none;
      }
    }
  }
</style>