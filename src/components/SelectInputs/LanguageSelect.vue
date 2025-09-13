<template>
  <div class="input">
    <ul class="languages-select">
      <i class="pi pi-angle-down"></i>
      <!-- Show only the selected language -->
      <li @click="toggleDropdown">
        <div class="image">
          <img :src="selectedLanguage.image" alt="image" loading="lazy">
        </div>
        <span>{{ selectedLanguage.name }}</span>
      </li>

      <!-- Show other languages when the dropdown is open -->
      <ul v-if="isDropdownOpen" class="dropdown">
        <li v-for="language in languages" :key="language.value" @click="selectLanguage(language)">
          <div class="image">
            <img :src="language.image" alt="image" loading="lazy">
          </div>
          <span>{{ language.name }}</span>
        </li>
      </ul>
    </ul>
    <Toast 
      ref="toast"
      position="top-right"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useStore } from '../../store/store';
  import { useI18n } from 'vue-i18n';
  import useApiMethods from '../../Composables/ApiMethods';
  import Toast from 'primevue/toast';


  // define store
  const store = useStore()

  // define use i18n
  const {t} = useI18n()


  // define api methods
  const {
    postMethod,
    toast,
  } = useApiMethods()

  // Array of languages with their corresponding images and names
  const languages = [
    { value: 'ar', name : "العربية" , image: '/assets/images/ar.png' },
    { value: 'en',name : "English" , image: '/assets/images/en.png' },
    { value: 'ur', name : "اردو" , image: '/assets/images/ur.png' }
  ];

  // Set the default selected language
  const selectedLanguage = ref(
    languages.find(item => item.value === window.sessionStorage.getItem('app_lang')) || languages[0]
  );

  // Toggle dropdown visibility
  const isDropdownOpen = ref(false);
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
  };

  // define body 
  const body = ref({
    _method : 'patch',
    lang : ''
  })

  // Set selected language and close dropdown
  const selectLanguage = (language) => {
    store?.handleLang(language.value);
    selectedLanguage.value = language;
    isDropdownOpen.value = false;
    body.value.lang = language.value  
    postMethod('general/change-lang' , body.value , true , '' , 'toast')
  };
</script>

<style lang="scss" scoped>
  @import '/src/assets/scss/mixins';

  .input {
    width: fit-content;
    padding-inline-end: 5px;

    .languages-select {
      position: relative;
      width: fit-content;

      i.pi {
        position: absolute;
        inset-inline-end: 0;
        top: 50%;
        transform: translateY(-50%);
        z-index: -1;
      }

      li {
        @include displayFlex($gap: 5px, $direction: row, $justify: flex-start);
        padding: 3px 5px;
        height: 30px;
        overflow: hidden;
        cursor: pointer;
        padding-inline-end: 20px;

        .image {
          width: 25px;
          // height: 25px;
          border-radius: 5px;
          overflow: hidden;
        }

        span {
          font-size: clamp(14px, 2.5vw, 16px);
        }
      }

      .dropdown {
        position: absolute;
        top: 110%;
        left: 0;
        background-color: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        width: fit-content;
        z-index: 10;
        padding: 5px;

        li {
          padding: 3px 5px;
          height: 30px;
          overflow: hidden;

          &:not(:last-of-type) {
            margin-bottom: 5px;
          }

          &:hover {
            background-color: #f0f0f0;
          }
        }
      }
    }
  }
</style>
