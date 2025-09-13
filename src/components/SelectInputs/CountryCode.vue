<template>
  <div>
    <select 
      id="country_code" 
      v-model="selectedCode"
    >
      <option
        v-for="code in getResult?.data"
        :key="code.id"
        :value="code.key"
      >{{code.key}}+</option>
    </select>
  </div>
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue';
  import useApiMethods from '../../Composables/ApiMethods';


  const {
    getMethod ,
    getResult
  } = useApiMethods()

  // define emits
  const emit = defineEmits(['handleCountryCode'])

  // define props
  const props = defineProps({
    country_code : {
      type : Number,
      default : 966
    }
  })

  const selectedCode = ref(props.country_code || 966)


  watch(()=>selectedCode.value , (newVal)=>{
    if(newVal){
      emit('handleCountryCode' , newVal || '966')
    }
  })

  onMounted(()=>{
    getMethod('general/countries' , false)
  })
</script>

<style lang="scss" scoped>

</style>