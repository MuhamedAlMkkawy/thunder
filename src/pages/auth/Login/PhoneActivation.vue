  <template>
    <div>
      <form @submit.prevent="handleSubmit">
        <h5>{{ $t('activationCode.title') }}</h5>
        <p>{{ $t('activationCode.text') }}</p>
        <div class="inputs">
          <div class="input" v-for="n in 6" :key="n">
            <input 
              type="text" 
              maxlength="1" 
              @input="handleInput($event, n)" 
              :id="'input-' + n" 
              @keypress="validateNumber"
              @keydown.enter.prevent="handleSubmit"
              :autofocus="n == 1"
            />
          </div>
        </div>
        <button class="main-btn" type="submit">
          {{ $t('activationCode.btn') }}
        </button>
        <p>{{ $t('activationCode.have_code') }} 
          <button 
            @click="handleResendCode"
            type="button" 
            :disabled="isButtonDisabled"
            :style="isButtonDisabled ? 'color:grey' : ''"
          >
            {{ isButtonDisabled ? `${$t('activationCode.resendWait')} ${timeLeft} ${$t('activationCode.seconds')}` : $t('activationCode.resend') }}
          </button>
        </p>
      </form>
      <Toast 
        ref="toast"
        position="top-right"
      />
      <Loading v-if="loading" />
    </div>
  </template>

<script setup>
  import { ref, onMounted, watchEffect } from 'vue';
  import useApiMethods from '../../../Composables/ApiMethods';
  import Toast from 'primevue/toast';
  import getDeviceInfo from '../../../deviceInfo';
  import Loading from '../../../components/Loading.vue';
  import { useStore } from '../../../store/store';

  // Handle store
  const store = useStore();

  // Device info
  const deviceInfo = ref(null);

  // Fetch device info on mount
  onMounted(async () => {
    deviceInfo.value = await getDeviceInfo();
  });

  // API methods
  const {
    postMethod,
    postResult,
    toast,
    loading,
    handleToast
  } = useApiMethods();

  // Activation code array
  const getCode = ref({
    code: ['', '', '', '', '', ''] // Array for 6 digits
  });

  // Resend button state
  const isButtonDisabled = ref(false);
  const timeLeft = ref(60);
  let countdownInterval = null;

  // Input handling
  const handleInput = (event, currentIndex) => {
    const inputValue = event.target.value;

    // Store the value
    getCode.value.code[currentIndex - 1] = inputValue;

    // Move to next field
    if (inputValue.length === 1) {
      const nextInput = document.getElementById(`input-${currentIndex + 1}`);
      if (nextInput) nextInput.focus();
    }

    // Move to previous field if empty
    if (inputValue.length === 0) {
      const prevInput = document.getElementById(`input-${currentIndex - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Only allow numeric input
  const validateNumber = (event) => {
    const key = event.key;
    if (!/[0-9]/.test(key) && key !== 'Backspace' && key !== 'Tab') {
      event.preventDefault();
    }
  };

  const submitCheck = ref(false)

  // Submit handler
  const handleSubmit = () => {
    if (getCode.value.code.join('').length == 0 ) {
      handleToast(
        'error',
        store.lang === 'ar'
          ? 'كود التحقق مطلوب'
          : store.lang === 'en'
          ? 'verification code is required.'
          : 'ایکٹیویشن کوڈ درکار ہے۔'
      );
    }else if(getCode.value.code.join('').length < 6){
      handleToast(
        'error',
        store.lang === 'ar'
          ? 'كود التحقق يجب أن يكون 6 أرقام.'
          : store.lang === 'en'
          ? 'verification code must be 6 digits.'
          : 'ایکٹیویشن کوڈ 6 اعداد پر مشتمل ہونا ضروری ہے۔'
      );
    } else {
      const activationCodeData = new FormData();
      activationCodeData.append('code', getCode.value.code.join(''));
      activationCodeData.append('country_code', store?.country_code);
      activationCodeData.append('phone', store?.phone);
      activationCodeData.append('device_id', store?.messagesToken);
      activationCodeData.append('device_type', 'web');
      postMethod('provider/activate?_method=patch', activationCodeData, false, '/orders', 'toast');
      submitCheck.value = true
    }
  };

  // Resend timer
  const startResendTimer = () => {
    if (countdownInterval) clearInterval(countdownInterval);

    isButtonDisabled.value = true;
    timeLeft.value = 60 ;

    countdownInterval = setInterval(() => {
      if (timeLeft.value <= 0) {
        clearInterval(countdownInterval);
        isButtonDisabled.value = false;
      } else {
        timeLeft.value--;
      }
    }, 1000);
  };

  // Handle resend code
  const handleResendCode = () => {
    const resendCodeData = new FormData();
    resendCodeData.append('country_code', store.country_code);
    resendCodeData.append('phone', store.phone);

    postMethod('provider/resend-code', resendCodeData, false, '', 'toast');
    startResendTimer();
  };

  // Watch post result
  watchEffect(() => {
    if (postResult?.value?.key === 'success' && submitCheck.value) {
      store.handleStoredProfile(postResult?.value?.data);
    }
  });

  // Start the timer on mount
  onMounted(() => {
    startResendTimer();
  });
</script>

  <style lang="scss" scoped>
    form{
      max-width: 500px;
        height: 70vh;
        justify-content: center;
    }
  .inputs {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      gap: 10px;
      direction: ltr;
      margin-top: 100px;
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
