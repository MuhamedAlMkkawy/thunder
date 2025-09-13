<template>
  <div class="empty">
    <i class="pi pi-box"></i>
    <h3>{{ emptyText }}</h3>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue';
  import { useStore } from '../store/store';

  const store = useStore();

  const emptyText = ref(getEmptyText(store.lang));

  // Watch for changes in store.lang and update emptyText accordingly
  watch(
    () => store.lang,
    (newLang) => {
      emptyText.value = getEmptyText(newLang);
    }
  );

  // Helper function to get the correct empty text based on the language
  function getEmptyText(lang) {
    return lang === 'ar' 
      ? 'لايوجد محتوي حتي الأن' 
      : lang === 'en' 
      ? 'No Content Found Yet' 
      : 'ابھی تک کوئی مواد نہیں ہے۔';
  }
</script>

<style lang="scss" scoped>

</style>