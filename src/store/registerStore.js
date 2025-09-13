import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRegisterStore = defineStore('form', () => {
  // State
  const formData = ref({});

  // Actions
  const saveFormData = (data) => {
    formData.value = data;
  };

  const clearFormData = () => {
    formData.value = {};
  };

  // Return state and actions
  return {
    formData,
    saveFormData,
    clearFormData,
  };
});
