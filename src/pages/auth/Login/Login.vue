<template>
  <div class="sign-page">
    <div class="content">
      <LogoBar />
      <div class="form-side">
        <div class="upper-bar">
          <LanguageSelect />
          <div class="skew-image" v-if="showSkewImg">
            <img :class="{ 'rotate-en': $i18n.locale === 'en' }" src="../../../assets/images/skew.png" alt="img" loading="lazy">
            <div class="title">
              <p>{{ $t('login.title') }}</p>
            </div>
          </div>
        </div>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
  import LanguageSelect from '../../../components/SelectInputs/LanguageSelect.vue';
  import { RouterView } from 'vue-router';
  import LogoBar from '../../../components/LogoBar.vue';
  import { useRoute } from 'vue-router';
  import { ref, watch } from 'vue';


  // to handle the route
  const route = useRoute();

  // to handle showing the skew image in only the login page
  const showSkewImg = ref(true);

  // to watch the changes of the url path
  watch(
    () => route.path, // Watch for changes in the route path
    (newPath) => {
      if (newPath === '/login/phone-entry') {
        showSkewImg.value = true;
      } else {
        showSkewImg.value = false;
      }
    }
  );
</script>


<style lang="scss" scoped>

</style>
