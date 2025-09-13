<template>
  <div>
    <div class="tab_items">
      <button 
        :class="['tab ' , 
        {active : activeTab === 'update-data' }]" 
        @click="handleRoute('update-data')">
        {{ $t('settings.data.tab') }}
      </button>
      <button 
        :class="['tab ' , 
        {active : activeTab === 'update-phone'}]" 
        @click="handleRoute('update-phone')">
        {{ $t('settings.phone.tab') }}
      </button>
      <button 
        :class="['tab ' , 
        {active : activeTab === 'update-email' }]" 
        @click="handleRoute('update-email')">
        {{ $t('settings.email.tab') }}
      </button>
    </div>
    <div class="content">
      <router-view v-slot="{ Component }">
          <transition name="fade-blur" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
    </div>
  </div>
</template>

<script setup>
  import { ref , watch } from 'vue';
  import { RouterView, useRoute, useRouter } from 'vue-router';
  import { useStore } from '../../../store/store';
  import { useI18n } from 'vue-i18n';

  // define i18n
  const { t } = useI18n();

  // define store 
  const store = useStore();


  // to handle the active tab 
  const activeTab = ref('update-data')
  
  // to handle the route path for each button
  const router = useRouter()
  const handleRoute = (newRoute) =>{
    router.push(`/settings/${newRoute}`)
  }
  
  // to watch the route
  const route = useRoute()
  watch(()=>route.path , (newPath)=>{
    if(newPath === '/settings/update-data'){
      activeTab.value = 'update-data'
      store.handlePageName(t('settings.data.pageName'))
    }else if(
      newPath === '/settings/update-phone' || 
      newPath === '/settings/activation-code' && store.pathFrom === 'phone' ||
      newPath === '/settings/verification-code' && store.pathFrom === 'phone' ||
      newPath === '/settings/new-phone'
    ){
      activeTab.value = 'update-phone'
      store.handlePageName(t('settings.phone.tab'))
    }else{
      activeTab.value = 'update-email'
      store.handlePageName(t('settings.email.tab'))
    }
  })
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/variables";
  @import "../../../assets/scss/mixins";

  .tab_items{
    @include displayFlex();
    margin-bottom: 50px;
    button{
      max-width: 230px;
      width: 100%;
      height: 52px;
      border-radius: 50px;
      background: #fff;
      color: $mainColor;
      box-shadow: -3px 3px 4px 0px #00000026;
      @include displayFlex();
      transition: 0.6s;
      font-size: 16px;
      font-weight: 500;
      padding-inline: 8px;
      font-family: $fontFamily;
      &.active ,
      &:hover{
        background: #4C637F;
        color: #fff;
        box-shadow: unset;
      }
    }
  }
</style>