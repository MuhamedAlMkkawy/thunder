<template>
  <div :class="['home-page', { 'active' : !fullSideBarSize }]">
    <button
      :class="['maxi-bar', { 'active' : !fullSideBarSize , 'rotateBtn' : $i18n.locale === 'en' }]"
      @click="handleSideBarSize"
    >
      <i class="pi pi-angle-left"></i>
    </button>
    <Sidebar
      :fullSideBarSize="fullSideBarSize"
      @handleSideBarSize="handleSideBarSize"
    />
    <div :class="['content', { 'active' : !fullSideBarSize }]">
      <Greet />
      <div class="route-page">
        <router-view v-slot="{ Component }">
          <transition name="fade-blur" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>



<script setup>
  import { ref } from 'vue';
  import { RouterView } from 'vue-router';
  import Sidebar from '../../components/Sidebar.vue';
  import Greet from '../../components/Greet.vue';
  
  // to handle minimize the side bar
  const fullSideBarSize = ref(true)
  const handleSideBarSize = () =>{
    fullSideBarSize.value = !fullSideBarSize.value
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/mixins";
  @import "../../assets/scss/variables";

  .home-page {
    @include displayFlex($justify: flex-start, $align: flex-start);
    width: 100%;

    &.active {
      gap: 0;
    }

    button.maxi-bar {
      position: fixed;
      width: 40px;
      height: 40px;
      font-size: 22px;
      color: #fff;
      background: #E0BDB0;
      inset-block-start: 0px;
      inset-inline-start: -40px;
      border-radius: 50% 0 0 50%;
      overflow: hidden;
      @include displayFlex();
      transition: 1s;
      z-index: 9;
      &.rotateBtn{
        transform: rotateY(180deg)
      }
      &.active {
        inset-inline-start: 0;
      }
    }

    .content {
      margin-inline-start: 290px;
      transition: 2s;
      width: 100%;

      @media (max-width: 991px) {
        margin-inline-start: 0;
      }

      &.active {
        margin-inline-start: 0px;
      }

      .route-page {
        // padding: 20px 22px;
        padding: 20px 10px;

        @media (max-width: 500px) {
          padding: 20px 8px;
        }
      }
    }
  }
</style>

