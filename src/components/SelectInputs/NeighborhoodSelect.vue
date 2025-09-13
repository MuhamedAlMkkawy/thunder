<template>
  <select 
    id="neighborhood"
    v-model="neighborhood"
    @input="emit('clearError', 'neighborhood')"
    @change="emit('handleNeighborhood', neighborhood)"
  >
    <option value=0>{{ $t('signup.neighborhood_placeholder') }}</option>
    <option 
      v-for="item in neighborhoods" 
      :key="item?.id"
      :value="item?.id"
    >
      {{item?.name}}
    </option>
  </select>
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue';
  import useApiMethods from '../../Composables/ApiMethods';
  // import { useRoute } from 'vue-router';

  const {
    getMethod,
    getResult
  } = useApiMethods()

  // define props
  const props = defineProps({
    city_id : {
      type : Number,
      default : 0
    },
    neighborhood_id : {
      type : Number,
      default : 0
    },
    neighborhoods: {
      type: Object, // Changed to Array instead of Object since it's an array
      default: () => []
    }
  });

  // // Local state to store the neighborhoods data
  // const localNeighborhoods = ref(props.neighborhoods);

  // // Watch the prop for changes, to update localNeighborhoods if the parent updates neighborhoods
  // watch(() => props.neighborhoods, (newNeighborhoods) => {
  //   console.log(newNeighborhoods)
  //   localNeighborhoods.value = newNeighborhoods
  // });


  const neighborhoods = ref(props.neighborhoods)
  watch(()=> props.neighborhoods , (newValue)=>{
    if(newValue){
      // console.log(newValue)
      // localNeighborhoods?.splice(0, localNeighborhoods.length, ...newNeighborhoods);
      neighborhoods.value = newValue
    }
  })

  const neighborhood = ref(props.neighborhood_id);

  watch(()=> props.neighborhood_id , (newValue)=>{
    if(newValue){
      setTimeout(()=>{
        // console.log('###################')
        // console.log(newValue)
        // console.log('###################')
        neighborhood.value = newValue
      } , 500)
    }
  })

  
  const changeInCity = ref(false)
  
  watch(()=> props.city_id , (newValue) => {
    if(newValue){
      changeInCity.value = true
      getMethod(`general/get_city_neighborhoods/${newValue}` , false)
      neighborhood.value = 0
    }
  })

  // watch(()=> getResult?.data , (newValue)=>{
  //   if(newValue && route.path == 'settings/update-data'){
  //     console.log(newValue)
  //   }
  // })

  // define emits
  const emit = defineEmits(['clearError', 'handleNeighborhood']);


  onMounted(()=>{
    neighborhood.value = props.neighborhood_id
  })
</script>

<style lang="scss" scoped>
</style>
