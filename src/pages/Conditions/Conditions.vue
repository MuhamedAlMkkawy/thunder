<template>
  <div class="sign-page">
    <div class="content">
      <LogoBar />
      <div class="form-side">
        <div class="upper-bar">
          <LanguageSelect />
          <button class="backBtn" @click="handleBackPage">
            <i class="pi pi-arrow-left"></i>
          </button>
        </div>
        <div class="head">
          <h3>{{ $t('terms.title') }}</h3>
          <p>
            {{ getResult?.data }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import LanguageSelect from '../../components/SelectInputs/LanguageSelect.vue';
  import LogoBar from '../../components/LogoBar.vue';
  import { onMounted, watch } from 'vue';
  import useApiMethods from '../../Composables/ApiMethods';
  import { useStore } from '../../store/store';
  import { useRouter } from 'vue-router';


  // define store
  const store = useStore()

  // define api methods
  const {
    getMethod ,
    getResult
  } = useApiMethods()


  // define router
  const router = useRouter()

  // to handle the back btn to gog the prev page
  const handleBackPage = () => {
    router.back()
  }

  // to watch changes in the language 
  watch(()=> store.lang , (newValue)=>{
    if(newValue){
      getMethod('general/terms' , false)
    }
  })


  onMounted(()=>{
    getMethod('general/terms' , false)
  })
  
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .upper-bar{
    @include displayFlex($justify : space-between);
    width: 100%;
  }

  .head{
    text-align: center;
    max-width: 600px;
    margin: 50px auto 0;
    h3{
      font-size: 18px;
      font-weight: 500;
      color: $textColor;
      margin-bottom: 30px;
    }
    p{
      font-size: 14px;
      font-weight: 400;
      color: #505050;
    }
  }
</style>