<template>
  <div>
    <div class="tab_items">
      <button :class="['tab', { active: activeTab == 'due-transactions' }]" @click="handleRoute('due-transactions')">
        {{ $t('financial_transaction.due.tab') }}
      </button>
      <button 
        :class="['tab', { active: activeTab == 'current-settlement' }]" 
        @click="handleRoute('current-settlement')">
        {{ $t('financial_transaction.current.tab') }}
      </button>
      <button 
        :class="['tab', { active: activeTab == 'finished-settlement' }]" 
        @click="handleRoute('finished-settlement')">
        {{ $t('financial_transaction.finished.tab') }}
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
  import { ref , watch , onMounted } from 'vue';
  import { RouterView, useRoute, useRouter } from 'vue-router';

  // to handle the active tab 
  const activeTab = ref(window.sessionStorage.getItem('activeTab' ))
  
  // to handle the route path for each button
  const router = useRouter()
  const handleRoute = (newRoute) =>{
    router.push(`/financial_transactions/${newRoute}`)
  }
  
  // to watch the route
  const route = useRoute()
  watch(()=>route.path , (newPath)=>{
    if(newPath == '/financial_transactions/due-transactions' && newPath != '/financial_transactions/'){
      activeTab.value = 'due-transactions'
      window.sessionStorage.setItem('activeTab' , 'due-transactions')
    }else if(newPath == '/financial_transactions/current-settlement'  && newPath != '/financial_transactions/'){
      activeTab.value = 'current-settlement'
      window.sessionStorage.setItem('activeTab' , 'current-settlement')
    }else{
      activeTab.value = 'finished-settlement'
      window.sessionStorage.setItem('activeTab' , 'finished-settlement')
    }
  })

  onMounted(()=>{
    // activeTab.value = 'due-transactions'
    // window.sessionStorage.setItem('activeTab' , 'due-transactions')
  })
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/variables";
  @import "../../../assets/scss/mixins";

  .tab_items{
    @include displayFlex();
    margin-bottom: clamp(20px , 4vw , 50px);
    button{
      width: clamp(170px , 100% , 320px);
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
        background: $mainColor;
        color: #fff;
        box-shadow: unset;
      }
    }
    @media (max-width : 560px){
      flex-wrap: wrap;
    }
  }
</style>