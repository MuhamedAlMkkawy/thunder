<template>
  <div 
    :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'" 
    class="input" 
    :style="{ marginBottom: props.departmentError ? '15px' : '4px' }"
  >
    <!-- MultiSelect Dropdown -->
    <MultiSelect 
      v-model="selectedSubCategories" 
      :options="subCategories"        
      optionLabel="name" 
      :placeholder="$t('signup.departments_placeholder')" 
      style="direction: inherit !important;"
    />
    <!-- Display selected elements below with remove option -->
    <div 
      v-if="selectedSubCategories?.filter(item => item.parent_id === props.category_id).length > 0" 
      class="selected-sections"
    >
      <div 
        v-for="(section, index) in selectedSubCategories.filter(item => item.parent_id === props.category_id)" 
        :key="index" 
        class="selected-item"
      >
        <span>{{ section.name }}</span>
        <button type="button" @click="removeSection(index)" class="remove-btn">
          <i class="pi pi-times"></i>
        </button>
      </div>
    </div>
    <div 
      v-else-if="selectedSubCategories.length > 0"
      class="selected-sections"
    >
      <div 
        v-for="(section, index) in selectedSubCategories" 
        :key="index" 
        class="selected-item"
      >
        <span>{{ section.name }}</span>
        <button type="button" @click="removeSection(index)" class="remove-btn">
          <i class="pi pi-times"></i>
        </button>
      </div>
    </div>

    <div class="multiSelect_placeholder" v-else>
      {{$t('signup.departments_placeholder')}}
    </div>
  </div>

</template>

<script setup>
  import { ref , watch } from "vue";  
  import useApiMethods from "../../Composables/ApiMethods";
  import { useRoute } from "vue-router";
  
  // define route
  const route = useRoute()
  
  // define api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()

  // define props
  const props = defineProps({
    departmentError : {
      type : String,
      default : ''
    },
    category_id : {
      type : Number,
      default : 0
    },
    departments : {
      type : Object , 
      default : () => []
    }
  })

  // define emits
  const emit = defineEmits(['handleDepartments'])
  
  // MultiSelect data
  const subCategories = ref()
  const selectedSubCategories = ref(props.departments);

  const changeInCategory = ref(-1)

  watch(()=> props.category_id , (newValue)=>{
    if(newValue){
      changeInCategory.value++
      getMethod(`general/categories/${newValue}` , false)
    }
  })
  



  watch(()=> getResult.value , (newVal)=>{
    if(newVal){
      if(route.path=='/signup' || changeInCategory.value > 0){
        selectedSubCategories.value = []
      }
      subCategories.value = newVal.data
    }
  })

  // watch(()=>subCategories.value , (newValue)=>{
  //   if(newValue){
  //     subCategories.value = 
  //   }
  // })

  // Remove a section by index
  const removeSection = (index) => {
    selectedSubCategories.value.splice(index, 1);
  };

  // to watch selected departments to pass it to the emit
  watch((selectedSubCategories) , (oldVal , newVal) =>{
    if(oldVal !== newVal){
      emit('handleDepartments' , selectedSubCategories.value)
    }
  })

</script>

<style lang="scss" scoped>
  @import "/src/assets/scss/variables";
  @import "/src/assets/scss/mixins";

  .input{
    display: flex;
    justify-content: flex-start;
    height: 50px !important; 
  }

  .multiSelect_placeholder{
    position: absolute;
    bottom: 0px;
    color: #6c757da6;
  }
  .selected-sections {
    margin-block:0 5px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    position: absolute;
    inset-inline-start: 0;
    bottom: 0px;
    width: 90%;
    height: 35px;
    overflow-y: scroll;
    padding-inline-start: 5px;
    padding-bottom: 8px;
  }

  .input{
    border: none;
    border-bottom: 0.5px solid #D9D9D9;
    border-radius: 0;
    width: 100%;
    margin-block-start: 10px;
    // margin-bottom: 18px;
  }


  .p-multiselect{
    width: 100%;
    padding-inline: 5px;
    height: 35px;
    border: none;

  }


  .selected-item {
    display: flex;
    align-items: center;
    background-color: #E0BDB0;
    color: $textColor;
    border-radius: 25px;
    padding: 5px 10px 0;
    position: relative;
    // padding-inline-end: 20px;
  }

  .remove-btn {
    border: none;
    cursor: pointer;
    font-size: 8px;
    font-weight: bold;
    position: absolute;
    left: -5px;
    top: 0px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: red;
    color: #fff;
    padding: 2px;
    @include displayFlex();
    .pi{
      font-size: 9px;
      color: #fff;
      margin-bottom: 0;
    }
  }
</style>
