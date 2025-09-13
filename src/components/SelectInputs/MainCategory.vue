<template>
  <select 
    id="category"
    v-model="category_id"
    @input="emit('clearError' , 'category')"
    @change="emit('handleCategory' , category_id)"
  >
    <option value=0 class="category_placeholder">{{ route.path == '/add_products' ? $t('add_product.main_section') : $t('signup.category_placeholder') }}</option>
    <option 
      v-for="category in getResult?.data?.filter((item)=>item.has_childs)" 
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
  import { useStore } from '../../store/store';
  import { useRoute } from 'vue-router';

  
  // define api methods
  const {
    getMethod , 
    getResult
  } = useApiMethods()

  // define route 
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

  // define store
  const store = useStore()
  
  const parent_id = ref(0)
  const category_id = ref(0)

  // define emits
  const emit = defineEmits(['clearError' , 'handleCategory'])


  
  watch(()=>props.category_id , (newValue)=>{
    if(newValue){
      category_id.value = newValue
    }
  })


  watch(()=>props.parent_id , (newValue)=>{
    if(newValue){
      parent_id.value = newValue
      // getMethod(`general/categories/${newValue}` , false)
      getMethod('provider/lists/list-sub-categories' , true)
    }
  })
  
  watch(()=> store.lang , (newValue) => {
    if(newValue){
      getMethod('provider/lists/list-sub-categories' , true)
      // getMethod(`general/categories/${props.parent_id}` , false)
    }
  })
  
  onMounted(()=>{
    getMethod('provider/lists/list-sub-categories' , true)
    // getMethod(`general/categories/${props.parent_id}` , false)
  })
</script>

<style lang="scss" scoped>
  .category_placeholder{
    color: #6c757da6 !important;
  }
</style>