import { ref } from 'vue';

export default function useSuccessPopup() {
  const showSuccessPopup = ref(false);
  const successText = ref(null);

  const handleSuccessPopup = (successTargetText) => {
    showSuccessPopup.value = true;
    successText.value = successTargetText;
    setTimeout(() => {
      handlePopupTimer();
    }, 1000);
  };

  const handlePopupTimer = () => {
    showSuccessPopup.value = false;
  };

  return {
    successText,
    showSuccessPopup,
    handleSuccessPopup
  };
};
