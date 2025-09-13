<template>
  <div>
    <div class="page_content">
      <form action="" @submit.prevent="handleSubmit">
        <div class="input-wrap">
          <label for="email">{{ $t('settings.email.new_email') }}</label>
          <div class="input">
            <input 
              type="text" 
              :placeholder="$t('settings.email.new_email_placeholder')" 
              id="email"
              v-model="body.email"
            >
          </div>
          <span v-if="emailError" class="error-message">
            {{ emailError }}
          </span>
        </div>
        <button type="submit" class="main-btn"  :disabled="emailError.length > 0">
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
  import useApiMethods from '../../../Composables/ApiMethods';
  import Toast from 'primevue/toast';

  // Define API methods
  const { postMethod, toast } = useApiMethods();

  // Define store
  const store = useStore();

  const body = ref({
    email: ""
  });

  const emailError = ref(""); // To store email validation error message

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Watcher for email validation
  watch(() => body.value.email, (newEmail) => {
    if (!newEmail) {
      emailError.value = store?.lang === 'ar'
        ? "يرجى إدخال البريد الإلكتروني."
        : store?.lang === 'en'
        ? "Please enter an email address."
        : "براہ کرم ای میل پتہ درج کریں۔";
    } else if (!isValidEmail(newEmail)) {
      emailError.value = store?.lang === 'ar'
        ? "يرجى إدخال بريد إلكتروني صالح."
        : store?.lang === 'en'
        ? "Please enter a valid email address."
        : "براہ کرم درست ای میل پتہ درج کریں۔";
    } else {
      emailError.value = ""; // Clear error if valid
    }
  });

  // Handle form submit
  const handleSubmit = () => {
    if (emailError.value) {
      return; // Prevent submission if there's an error
    }

    store.definePath('email');
    store.handleStoreEmail(body.value.email);
    postMethod('provider/change-email/send-code-for-new', body.value, true, '/settings/activation-code', 'toast');
  };
</script>

<style lang="scss" scoped>
  form {
    max-width: 500px;
    justify-content: flex-start;
    height: 50vh;
    padding-block-start: clamp(40px, 4vw, 75px);
    align-items: flex-start;
    .input-wrap {
      margin-bottom: 50px;
    }
  }
  .input, label {
    margin-block-end: 8px;
    font-weight: 600;
  }
  .error-message {
    color: red;
    font-size: 0.875rem;
    margin-top: 5px;
  }
</style>
