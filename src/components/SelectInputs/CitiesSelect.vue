<template>
  <select 
    id="category"
    v-model="city_id"
    @input="emit('clearError' , 'city')"
    @change="emit('handleCity' , city_id)"
  >
    <option value=0>{{ $t('signup.city_placeholder') }}</option>
    <option 
      v-for="city in getResult?.data" 
      :key="city.id"
      :value="city.id"
    >
      {{city.name}}
    </option>
  </select>
</template>

<script setup>
  import {ref , watch , onMounted} from 'vue' 
  import useApiMethods from '../../Composables/ApiMethods';
  
  // to handle api methods
  const {
    getMethod , 
    getResult
  } = useApiMethods()


  // define props
  const props = defineProps({
    city_id : {
      type : Number , 
      default : 0
    }
  })
  
  const city_id = ref(0)

  // define emits
  const emit = defineEmits(['clearError' , 'handleCity'])


  watch(()=>props.city_id , (newValue)=>{
    if(newValue){
      city_id.value = newValue
    }
  })
  
  
  onMounted(()=>{
    getMethod('general/cities' , false)
  })
</script>

<style lang="scss" scoped>

</style>