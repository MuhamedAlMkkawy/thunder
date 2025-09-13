<template>
  <div>
    <div class="page_content">
      <form action="" @submit.prevent="handleSubmit">
        <label for="phone">{{ $t('settings.phone.new_phone') }}</label>
        <div class="input-wrap">
          <div class="input">
            <input 
              type="text"
              id="phone"
              :placeholder="$t('settings.phone.new_phone_placeholder')"  
              v-model="body.phone"
            >
          </div>
          <div class="input">
            <CountryCode 
              @handleCountryCode="handleCountryCode"
            />
          </div>
        </div>
        <span v-if="phoneError" class="error-message">
          {{ phoneError }}
        </span>
        <button class="main-btn" :disabled="phoneError.length > 0">
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
  import { ref, watch } from 'vue';
  import { useStore } from '../../../store/store';
  import CountryCode from '../../../components/SelectInputs/CountryCode.vue';
  import Toast from 'primevue/toast';
  import useApiMethods from '../../../Composables/ApiMethods';

  // Define API methods
  const {
    postMethod,
    toast
  } = useApiMethods();

  // Define store
  const store = useStore();

  const body = ref({
    country_code: "966",
    phone: ""
  });

  const phoneError = ref(""); // To store phone validation error message

  // Handle country code change
  const handleCountryCode = (newCode) => {
    body.value.country_code = newCode;
  };

  // Phone number validation function
  const isValidPhone = (phone) => {
    return phone.length === 9 || phone.length === 10;
  };

  // Watcher for phone validation
  watch(() => body.value.phone, (newPhone) => {
    if (!newPhone) {
      phoneError.value = store?.lang === 'ar'
        ? "يرجى إدخال رقم الهاتف."
        : store?.lang === 'en'
        ? "Please enter a phone number."
        : "براہ کرم فون نمبر درج کریں۔";
    } else if (!isValidPhone(newPhone)) {
      phoneError.value = store?.lang === 'ar'
        ? "رقم الهاتف يجب أن يتكون من 9 أو 10 أرقام."
        : store?.lang === 'en'
        ? "The phone number must be 9 or 10 digits."
        : "فون نمبر 9 یا 10 اعداد پر مشتمل ہونا چاہیے۔";
    } else {
      phoneError.value = ""; // Clear error if valid
    }
  });

  // Handle form submit
  const handleSubmit = () => {
    if (phoneError.value) {
      return; // Prevent submission if there's an error
    }

    store.definePath('phone');
    store.handleStorePhone(body.value.country_code, body.value.phone);
    postMethod('provider/change-phone/send-code-for-new', body.value, true, '/settings/activation-code', 'toast');
  };
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/mixins';

  form {
    max-width: 500px;
    justify-content: flex-start;
    align-items: flex-start;
    height: 50vh;
    padding-block-start: clamp(40px , 4vw , 75px);
    label {
      font-weight: 600;
    }
  }

  .input-wrap {
    @include displayFlex($gap : 0);
    .input:last-of-type {
      max-width: 80px;
      margin-inline-start: auto;
      border-inline-start: 1px solid #e4e4e4;
      padding-inline-start: 5px;
    }
  }

  .error-message {
    color: red;
    font-size: 0.875rem;
    margin-top: 5px;
    margin-bottom: 50px;
  }
</style>
