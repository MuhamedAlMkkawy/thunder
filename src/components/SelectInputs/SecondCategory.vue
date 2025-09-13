<template>
  <select 
    id="category"
    v-model="category_id"
    @input="emit('clearError' , 'category')"
    @change="emit('handleCategory' , category_id)"
  >
    <option value=0>{{$t('add_product.choose')}} {{$t('add_product.sec_section')}}</option>
    <option 
      v-for="category in getResult?.data" 
      :key="category.id"
      :value="category.id"
    >
      {{category.name}}
    </option>
  </select>
</template>

<script setup>
  import {ref , watch} from 'vue'
  import useApiMethods from '../../Composables/ApiMethods';
  import { useStore } from '../../store/store';
  import { useRoute } from 'vue-router';


  // define api methods
  const {
    getMethod , 
    getResult
  } = useApiMethods()

  const route = useRoute()
  
  // define props
  const props = defineProps({
    category_id : {
      type : Number , 
      default : 0
    },
    parent_id:{
      type : Number,
      default : 0
    }
  })
  
  const parent_id = ref(0)
  const category_id = ref(0)

  // define emits
  const emit = defineEmits(['clearError' , 'handleCategory'])

  // define store
  const store= useStore()
  


  watch(()=>props.category_id , (newValue)=>{
    if(newValue){
      category_id.value = newValue 
    }
  })
  
  
  watch(()=>props.parent_id , (newValue)=>{
    if(newValue){
      parent_id.value = newValue
      getMethod(`general/categories/${newValue}` , false)
      if(props.category_id === 0){
        category_id.value = 0
      }
    }
  })
  
  watch(()=> store.lang , (newValue) => {
    if(newValue){
      getMethod(`provider/products/show/${route.params.id}` , true)
    }
  })

</script>

<style lang="scss" scoped>

</style>