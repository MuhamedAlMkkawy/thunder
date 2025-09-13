<template>
  <div class="page_content">
    <form @submit.prevent="handleSubmit">
      <h5>{{ $t('settings.code.activation') }}</h5>
      <p>{{ $t('settings.code.activation_text') }}</p>
      <div class="inputs">
        <div class="input" v-for="n in 6" :key="n">
          <input 
            type="text" 
            maxlength="1" 
            @input="handleInput($event, n)" 
            :id="'input-' + n" 
            @keydown="validateNumber($event)"
            @keydown.enter.prevent="handleSubmit"
          />
        </div>
      </div>
      <button class="main-btn" type="submit">
        {{ $t('settings.submit_btn') }}
      </button>
      <p>
        {{ $t('settings.code.question') }}
        <button 
          @click="handleResendCode" 
          type="button" 
          :disabled="isResendDisabled"
          :style="isResendDisabled ? 'color:grey' : ''"
        >
        {{ isResendDisabled ? `${$t('activationCode.resendWait')} ${timer} ${$t('activationCode.seconds')}` : $t('activationCode.resend')  }}
        </button>
      </p>
    </form>
    <Toast
      ref="toast"
      position="top-right"
    />
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useStore } from '../../../store/store';
  import Toast from 'primevue/toast';
  import useApiMethods from '../../../Composables/ApiMethods';
  




  const store = useStore();
  
  
  
  const {
    postMethod,
    toast
  } = useApiMethods();

  const body = ref({
    code: ['', '', '', '', '', '']  // Array to hold 6 digits
  });

  const handleInput = (event, currentIndex) => {
    const inputValue = event.target.value;
    body.value.code[currentIndex - 1] = inputValue;

    if (inputValue.length === 1) {
      const nextInput = document.getElementById(`input-${currentIndex + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const validateNumber = (event) => {
    const key = event.key;

    if (!/[0-9]/.test(key) && key !== "Backspace" && key !== "Tab") {
      event.preventDefault();
    }

    if (key === "Backspace") {
      const currentInput = event.target;
      if (currentInput.value.length === 0) {
        const prevInput = document.getElementById(`input-${parseInt(currentInput.id.split('-')[1]) - 1}`);
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };

  const handleSubmit = () => {
    const activationCode = body.value.code.join('');  

    if(store.pathFrom === 'phone'){
      const phoneData = new FormData();
      phoneData.append('country_code', store.country_code);
      phoneData.append('phone', store.phone);
      phoneData.append('code', activationCode);
      phoneData.append('type', '2');

      postMethod('provider/change-phone/check-code', phoneData, true, '/settings/update-phone', 'toast');
    } else if(store.pathFrom === 'email') {
      const emailData = new FormData();
      emailData.append('code', activationCode);
      emailData.append('email', store.email);
      emailData.append('type', '4');

      postMethod('provider/change-email/check-code', emailData, true, '/settings/update-email', 'toast');
    }
  };

  const isResendDisabled = ref(false);
  const timer = ref(0);

  const startResendTimer = () => {
    isResendDisabled.value = true;
    timer.value = 60;

    const interval = setInterval(() => {
      timer.value -= 1;
      if (timer.value <= 0) {
        clearInterval(interval);
        isResendDisabled.value = false;
      }
    }, 1000);
  };

  const handleResendCode = () => {
    startResendTimer();

    if (store.pathFrom === 'phone') {
      const phoneDataActivate = new FormData();
      phoneDataActivate.append('country_code', store.country_code);
      phoneDataActivate.append('phone', store.phone);

      postMethod('provider/change-phone/send-code-for-new', phoneDataActivate, true, '', 'toast');
    } else if (store.pathFrom === 'email') {
      const emailDataActivate = new FormData();
      emailDataActivate.append('email', store.email);

      postMethod('provider/change-email/re-send-code-for-new', emailDataActivate, true, '', 'toast');
    }
  };

  onMounted(()=>{
    startResendTimer()
  })
</script>

<style lang="scss" scoped>
  form {
    max-width: 500px;
    justify-content: center;
    height: 50vh;
    max-width: 400px;
    h5, p {
      width: 100%;
      text-align: center;
    }
  }
  .inputs {
    display: flex;
    gap: 10px;
    direction: ltr;
    margin-bottom: 50px;
    flex-wrap: nowrap;
    .input {
      border-bottom: unset;
      input {
        text-align: center;
        font-size: 18px;
        padding: 10px;
        border: 0.5px solid #7C9DC480;
        width: 60px;
        height: 60px;
        border-radius: 4px;
        @media (max-width: 400px) {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
</style>
