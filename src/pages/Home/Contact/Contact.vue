<template>
  <div class="page_content">
    <form @submit.prevent="handleSubmit">
      <label for="name">{{$t('contact.name')}}</label>
      <div class="input" :style="errors.user_name ? 'margin-bottom:0px' : ''">
        <input 
          type="text" 
          id="name"
          v-model="body.user_name"
          :placeholder="$t('contact.name_placeholder')"
          @input="clearError('user_name')"
          @blur="body.user_name = body.user_name.trim()"
        >
      </div>
      <span v-if="errors.user_name&& !body.user_name" class="error-msg"><i class="pi pi-times"></i> {{$t('contact.name_error')}}</span>
      <span v-else-if="errors.user_name && body.user_name.length < 2" class="error-msg"><i class="pi pi-times"></i> {{$t('contact.name_length_error')}}</span>

      <label for="phone">{{$t('contact.phone')}}</label>
      <div class="input" :style="errors.phone ? 'margin-bottom:0px' : ''">
        <input 
          type="tel" 
          id="phone"
          v-model="body.phone"
          :placeholder="$t('contact.phone_placeholder')"
          @input="clearError('phone')"
          @blur="body.phone = body.phone.trim()"
        >
      </div>
      <span v-if="errors.phone && body.phone.length == 0" class="error-msg"><i class="pi pi-times"></i> {{$t('contact.phone_error')}}</span>
      <span v-else-if="errors.phone && body.phone.length < 9" class="error-msg"><i class="pi pi-times"></i> {{$t('contact.phone_length_error')}}</span>


      <label for="complain">{{$t('contact.demand')}}</label>
      <div class="input" :style="errors.type ? 'margin-bottom:0px' : ''">
        <select 
          name="complain" 
          id="complain"
          v-model="body.type"
          @change="clearError('type')"
        >
          <option class="select_placeholder" value="">{{$t('contact.demand_placeholder')}}</option>
          <option 
            :value="1">{{$t('contact.complaint')}}
          </option>
          <option 
            :value="2">{{$t('contact.suggestion')}}
          </option>
        </select>
      </div>
      <span v-if="errors.type" class="error-msg"><i class="pi pi-times"></i> {{$t('contact.demand_error')}}</span>

      <label for="title">{{$t('contact.title')}}</label>
      <div class="input" :style="errors.complaint ? 'margin-bottom:0px' : ''">
        <input 
          type="text" 
          id="title"
          v-model="body.complaint"
          :placeholder="$t('contact.title_placeholder')"
          @input="clearError('complaint')"
          @blur="body.complaint = body.complaint.trim()"
        >
      </div>
      <span v-if="errors.complaint && !body.complaint.trim()" class="error-msg">
        <i class="pi pi-times"></i> {{$t('contact.title_error')}}
      </span>
      <span v-else-if="errors.complaint && body.complaint.trim().length < 4" class="error-msg">
        <i class="pi pi-times"></i> {{$t('contact.complaint_length_error')}}
      </span>

      <label for="message">{{$t('contact.message')}}</label>
      <div class="input" :style="errors.subject ? 'margin-bottom:0px' : ''">
        <input 
          type="text" 
          id="message"
          v-model="body.subject"
          :placeholder="$t('contact.message_placeholder')"
          @input="clearError('subject')"
          @blur="body.subject = body.subject.trim()"
        >
      </div>
      <span v-if="errors.subject && !body.subject.trim()" class="error-msg">
        <i class="pi pi-times"></i> {{$t('contact.message_error')}}
      </span>
      <span v-else-if="errors.subject && body.subject.trim().length < 4" class="error-msg">
        <i class="pi pi-times"></i> {{$t('contact.subject_length_error')}}
      </span>

      <button class="main-btn" :disabled="hasErrors" :style="hasErrors ? 'background:grey;' : ''">
        {{$t('contact.submitBtn')}}
      </button>
      
    </form>
    <Toast 
      ref="toast"
      position="top-right"
    />
    <loading 
      v-if="loading"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import useApiMethods from '../../../Composables/ApiMethods';
import { useStore } from '../../../store/store';
import Toast from 'primevue/toast';
import Loading from '../../../components/Loading.vue';

const store = useStore();

const body = ref({
  user_name: "",
  phone: "",
  type: "",
  complaint: "",
  subject: ""
});

const errors = ref({
  user_name: false,
  phone: false,
  type: false,
  complaint: false,
  subject: false
});

const { getMethod, postMethod, getResult, toast, loading } = useApiMethods();

// Validate function to check if fields are valid
const validate = () => {
  errors.value.user_name = !body.value.user_name.trim() || body.value.user_name.trim().length < 2;
  errors.value.phone = !body.value.phone.trim() || 
    !/^(\+?\d{1,4}[\s\-]?)?(\(?\d{1,3}\)?[\s\-]?)?(\d{1,4}[\s\-]?)?\d{1,4}[\s\-]?\d{1,4}$/.test(body.value.phone)|| body.value.phone.trim().length < 9;
  errors.value.type = !body.value.type;
  
  // Check for at least 4 characters in complaint and subject
  errors.value.complaint = !body.value.complaint.trim() || body.value.complaint.trim().length < 4;
  errors.value.subject = !body.value.subject.trim() || body.value.subject.trim().length < 4;
};

// Handle form submit
const handleSubmit = () => {
  validate();  // Run validation before submitting

  if (Object.values(errors.value).every((e) => !e)) {
    postMethod('general/new-complaint', body.value, true, '/orders', 'toast');
  }
};

// Computed property to track if there are any validation errors
const hasErrors = computed(() => Object.values(errors.value).some((e) => e));

// Clear the error for the specific field when the user starts typing
const clearError = (field) => {
  errors.value[field] = false;
};

// To watch changes in the language 
watch(() => store.lang, (newValue) => {
  if (newValue) {
    getMethod('general/cancel-reasons', false);
  }
});

onMounted(() => {
  getMethod('general/cancel-reasons', false);
});
</script>

<style lang="scss" scoped>
form {
  max-width: 500px;
  align-items: flex-start;
  label {
    font-weight: 600;
  }
  .input {
    border-bottom: 1.61px solid #00000033;
    margin-block-end: 20px;
    position: relative;
  }
  select, input {
    color: #7a8289;
  }
  button:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
  button.main-btn {
    font-weight: 300;
    background: #4C637F;
  }
}
</style>