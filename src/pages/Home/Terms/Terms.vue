<template>
  <div class="page">
    <div class="image">
      <img src="../../../assets/images/horizontal_img.png" alt="image" loading="lazy">
    </div>
    <p>
      {{ getResult?.data }}
    </p>
  </div>
</template>

<script setup>
  import { onMounted , watch } from 'vue';
  import useApiMethods from '../../../Composables/ApiMethods';
  import { useStore } from '../../../store/store';

  const store = useStore()

  const {
    getMethod ,
    getResult
  } = useApiMethods()

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
  .page{
    text-align: center;
    box-shadow: -3px 3px 4px 0px #00000026;
    padding-inline: clamp(10px , 4vw , 40px);
    .image{
      max-width: 220px;
      margin: 0 auto;
    }
    p{
      font-size: 16px;
      font-weight: 400;
      color: #505050;
      line-height: 2;
    }
  }
</style>