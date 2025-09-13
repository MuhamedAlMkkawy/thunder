<template>
  <div class="accordion-container">
    <!-- Show skeletons while data is loading -->
    <div 
      class="accordion" 
      v-for="(item, index) in getResult?.data" 
      :key="index" 
      :class="{ active: activeIndex === index }"
      @click="toggle(index)"
    >
      <div class="title">
        <!-- Show skeleton loader if data is loading -->
        <Skeleton v-if="loading && !getResult" width="80%" height="2rem" />
        <span v-else>{{ item?.question }}</span>
        <i class="pi pi-angle-down"></i>
      </div>
      <div class="content">
        <!-- Show skeleton loader if data is loading -->
        <Skeleton v-if="loading && !getResult" height="6rem" />
        <span v-else>{{ item?.answer }}</span>
      </div>
    </div>
  </div>
</template>



<script setup>
  import { ref , onMounted , watch } from 'vue';
  import useApiMethods from '../Composables/ApiMethods';
  import Skeleton from 'primevue/skeleton';  // Import PrimeVue Skeleton
  import { useStore } from '../store/store';

  const store = useStore()

  const {
    getMethod ,
    getResult,
    loading
  } = useApiMethods()

  // to watch changes in the language 
  watch(()=> store.lang , (newValue)=>{
    if(newValue){
      getMethod('general/fqs' , false)
    }
  })

  const activeIndex = ref(0);


  const toggle = (index) => {
    activeIndex.value = activeIndex.value === index ? null : index;
  };
  
  onMounted(()=>{
    getMethod('general/fqs' , false)
  })
</script>

<style lang="scss" scoped>
  @import '../assets/scss/variables';

  .accordion {
    width: 100%;
    margin-bottom: 27px;

    .title {
      border: 0.5px solid #4C637F;
      padding: 15px 24px;
      padding-inline-start: 15px;
      border-radius: 15px;
      background: #2367AA1A;
      color: $mainColor;
      position: relative;
      cursor: pointer;

      i.pi-angle-down {
        position: absolute;
        inset-block-start: 50%;
        inset-inline-end: 5px;
        transform: translateY(-50%);
        transition: 0.6s;
      }
    }

    .content {
      max-height: 0;
      height: 100%;
      overflow: hidden;
    }

    &.active {
      .title {
        margin-bottom: 20px;
        i.pi-angle-down {
          transform: translateY(-50%) rotate(180deg);
        }
      }

      .content {
        max-height: 500px;
        overflow-y: scroll;
        transition: 1.5s;
      }
    }
  }
</style>
