<template>
  <select 
    id="category"
    v-model="category_id"
    @input="emit('clearError' , 'category')"
    @change="emit('handleCategory' , category_id)"
  >
    <option value=0>{{ $t('signup.category_placeholder') }}</option>
    <option 
      v-for="category in getResult?.data?.filter(category => category?.has_childs)" 
      :key="category.id"
      :value="category.id"
    >
      {{category.name}}
    </option>
  </select>
</template>

<script setup>
  import {ref  , onMounted, watch} from 'vue'
  import useApiMethods from '../../Composables/ApiMethods';


  const {
    getMethod , 
    getResult
  } = useApiMethods()

  
  // define props
  const props = defineProps({
    category_id : {
      type : Number , 
      default : 0
    }
  })
  
  const category_id = ref(0)

  // define emits
  const emit = defineEmits(['clearError' , 'handleCategory'])

  watch(()=>props.category_id , (newValue)=>{
    if(newValue){
      category_id.value = newValue
      // console.log(newValue)
    }
  })
  
  onMounted(()=>{
    getMethod('general/categories' , false)
  })
</script>

<style lang="scss" scoped>

</style>