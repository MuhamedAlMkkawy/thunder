<template>
  <div class="half-page">
    <div class="content">
      <div class="image">
        <img src="/src/assets/images/vertical_logo.png" alt="img" loading="lazy">
      </div>
      <div class="text">
        <h3>إختر اللغه التي تود أن تكمل بها</h3>
        <div class="lang-tabs">
          <div class="tab" @click="handleLangRoute('ar')">العربيه</div>
          <div class="tab" @click="handleLangRoute('en')">English</div>
          <div class="tab" @click="handleLangRoute('ur')">أوردو</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // import useHandleLang from '../../Composables/handleLang';
  import { useRouter } from 'vue-router';
  import { useStore } from '../../store/store';
  
  const store = useStore()
  // Handle language switching
  // const { handleLang } = useHandleLang();

  // to handle route to next page
  const router = useRouter()

  const handleLangRoute = (lang) => {
    router.push('/login/phone-entry')
    setTimeout(()=>{
      store.handleLang(lang)
    }, 100)
  }

</script>

<style lang="scss" scoped>
@import "/src/assets/scss/mixins";
@import "/src/assets/scss/variables";

.content {
  max-width: 80%;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  direction: rtl;
  @include displayFlex($direction : column);
  .image {
    width: 200px;
    margin-bottom: 20px;
    position: absolute;
    inset-inline-start: 30px;
    top: 0px;
  }

  .text {
    text-align: center;
    color: #fff;

    h3 {
      font-size: clamp(18px, 4vw, 24px);
      font-weight: 500;
      margin-bottom: 25px;
    }

    .lang-tabs {
      @include displayFlex($wrap: wrap);

      .tab {
        width: 120px;
        height: 120px;
        border-radius: 8px;
        @include displayFlex();
        box-shadow: 3px 3px 8px 0px #00000040;
        font-size: clamp(16px, 4vw, 20px);
        font-weight: 500;
        border: 1px solid transparent;
        transition: $transition3;
        cursor: pointer;

        &:nth-of-type(1) {
          background: $secColor;
        }

        &:nth-of-type(2) {
          background: $mainColor;
        }

        &:nth-of-type(3) {
          background: #fff;
          color: #000;
        }

        &:hover {
          box-shadow: none;
        }
      }

      @media (max-width: 400px) {
        .tab {
          width: 100%;
        }
      }
    }
  }
}
</style>
