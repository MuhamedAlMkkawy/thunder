<template>
  <div class="page_content">
    <form @submit.prevent="handleSubmit">
      <h5>{{ $t('settings.code.verification') }}</h5>
      <p>{{ $t('settings.code.verification_text') }}</p>
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
  import { onMounted, ref } from 'vue';
  import { useStore } from '../../../store/store';
  import useApiMethods from '../../../Composables/ApiMethods';
  import Toast from 'primevue/toast';

  const { postMethod, toast } = useApiMethods();
  const store = useStore();

  const body = ref({
    code: ['', '', '', '', '', ''] // Array to hold 6 digits
  });

  const isResendDisabled = ref(false);
  const timer = ref(60);
  let countdownInterval = null;

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
    const verificationCode = body.value.code.join('');

    if (store.pathFrom === 'phone') {
      const phoneData = new FormData();
      phoneData.append('country_code', store.country_code);
      phoneData.append('phone', store.phone);
      phoneData.append('code', verificationCode);
      phoneData.append('type', '1');

      postMethod('provider/change-phone/check-code', phoneData, true, '/settings/new-phone', 'toast');
    } else if (store.pathFrom === 'email') {
      const emailData = new FormData();
      emailData.append('email', store.email);
      emailData.append('code', verificationCode);
      emailData.append('type', '3');

      postMethod('provider/change-email/check-code', emailData, true, '/settings/new-email', 'toast');
    }
  };

  const startResendTimer = () => {
    isResendDisabled.value = true;
    timer.value = 60;
    countdownInterval = setInterval(() => {
      timer.value -= 1;
      if (timer.value === 0) {
        clearInterval(countdownInterval);
        isResendDisabled.value = false;
      }
    }, 1000);
  };

  const handleResendCode = () => {
    if (isResendDisabled.value) return;

    if (store.pathFrom === 'phone') {
      const phoneDataResend = new FormData();
      phoneDataResend.append('country_code', store.country_code);
      phoneDataResend.append('phone', store.phone);

      postMethod('provider/change-phone/resend-code', phoneDataResend, true, '', 'toast');
    } else if (store.pathFrom === 'email') {
      const emailDataResend = new FormData();
      emailDataResend.append('email', store.email);

      postMethod('provider/change-email/resend-code', emailDataResend, true, '', 'toast');
    }

    startResendTimer();
  };
  onMounted(()=>{
    startResendTimer()
  })
</script>

<style lang="scss" scoped>
form {
  max-width: 500px;
  justify-content: center;
  h5,
  p {
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
  max-width: 400px;
  .input {
    border-bottom: unset;
    input {
      text-align: center;
      font-size: 18px;
      padding: 10px;
      border: 0.5px solid #7c9dc480;
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
