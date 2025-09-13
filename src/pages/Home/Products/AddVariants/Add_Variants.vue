<template>
  <div>
    <form action="" @submit.prevent="handleSubmit">
      <div class="inputs">
        <div class="input-wrap">
          <label for="ar_name">{{ $t('product_variant.category_ar_name') }}</label>
          <div class="input">
            <input 
              type="text"
              id="ar_name"
              :placeholder="$t('product_variant.category_ar_name')"  
              v-model="body.ar_name"
            >
          </div>
        </div>

        <div class="input-wrap">
          <label for="en_name">{{ $t('product_variant.category_en_name') }}</label>
          <div class="input">
            <input 
              type="text"
              id="en_name"
              :placeholder="$t('product_variant.category_en_name')"  
              v-model="body.en_name"
            >
          </div>
        </div>

        <div class="input-wrap">
          <label for="ur_name">{{ $t('product_variant.category_ur_name') }}</label>
          <div class="input">
            <input 
              type="text"
              id="ur_name"
              :placeholder="$t('product_variant.category_ur_name')"  
              v-model="body.ur_name"
            >
          </div>
        </div>
        <div class="input-wrap">
          <label for="status">{{ $t('product_variant.status_label') }}</label>
          <div class="input">
            <select 
              id="status"
              v-model="body.is_required"
            >
              <option value="">{{ $t('product_variant.select_status') }}</option> 
              <option value="0">{{ $t('product_variant.optional') }}</option> 
              <option value="1">{{ $t('product_variant.required') }}</option> 
            </select>
          </div>
        </div>

        <div class="input-wrap">
          <label for="number">{{ $t('product_variant.quantity') }}</label>
          <div class="input">
            <input 
              type="number"
              id="number"
              :placeholder="$t('product_variant.quantity_placeholder')"  
              v-model="body.number_of_choices"
            >
          </div>
        </div>
        <button class="variant_btn submit_variant">
          <i class="pi pi-plus"></i>
        </button>
      </div>
      <div class="addons">
        <div v-if="!getResult?.data?.addons || loading" v-for="n in 20" :key="n" class="addon_tab">
          <Skeleton class="addon_skeleton" shape="rectangle" width="100%" height="70px" />
        </div>
        <div v-else class="addon_tab" v-for="item in getResult?.data?.addons" :key="item.id">
          <input 
            type="checkbox" 
            :id="item.id" 
            :checked="isSelected(item.id)"
            @change="addToAddons(item.id)"  
          >
          <label :for="item.id">
            <div class="image">
              <img :src="item.image" alt="image" loading="lazy">
            </div>
            <div class="text">
              <h3>{{ item.name }}</h3>
              <p>{{ item.price }}</p>
            </div>
          </label>
        </div>
      </div>
    </form>
    <Pagination 
      :data="getResult?.data?.pagination"
      @handlePagination="handlePaginationData"
    />
    <AddonItem :addonItem="product_classification_id" />
    <!-- handle toast message -->
    <Toast 
      ref="toast"
      position="top-right"
    />
  </div>
</template>

<script setup>
  import { onMounted, ref, watch, watchEffect } from 'vue';
  import useApiMethods from '../../../../Composables/ApiMethods'
  import usePagination from '../../../../Composables/Pagination'
  import Toast from 'primevue/toast'
  import Pagination from '../../../../components/Pagination.vue'
  import Skeleton from 'primevue/skeleton'
  import { useStore } from '../../../../store/store';
  import { useRoute } from 'vue-router';
  import AddonItem from '../../../../components/AddonItem.vue';

  // define route
  const route = useRoute()

  // define store
  const store = useStore()


  // define api methods
  const {
    postMethod,
    postResult,
    loading,
    toast,
    handleToast
  } = useApiMethods()

  // define body
  const body = ref({
    ar_name : "",
    en_name : "" ,
    ur_name : "",
    is_required : "",
    number_of_choices : "",
    addons : []
  })


  // handle selected addons
  const addToAddons = (id) =>{
    // If the id is in the selectedAddons array, add it to body.addons
    if (!body.value.addons.includes(id)) {
        body.value.addons.push(id);
    } else {
      // If the id is removed from selectedAddons, remove it from body.addons
      const index = body.value.addons.indexOf(id);
      if (index > -1) {
        body.value.addons.splice(index, 1);
      }
    }
  }

  // to check if the addons items is selected.
  const isSelected = (id) => {
    return body.value.addons.includes(id);  // Check if the id exists in selectedAddons
  }

  // define pagination methods
  const {
    handlePagination,
    getResult
  } = usePagination()

  const pageNumber = ref(1)
  const handlePaginationData = (pageNum) => {
    pageNumber.value = pageNum
    handlePagination('provider/products-addons?page=' , pageNum)
  }


  onMounted(()=> {
    handlePagination('provider/products-addons?page=' , 1)
  })

  // to handleSubmit
  const handleSubmit = () => {
    if(body.value.ar_name === ''){
      handleToast('error', 
      store.lang === 'ar' ? 'يجب إضافة الإسم باللغة العربية' : 
      store.lang === 'en' ? 'The Arabic Name must be added' : 
      "نام عربی میں شامل کرنا ضروری ہے۔"
      )
    }
    else if (body.value.ar_name.length < 2) {
      handleToast('error', 
        store.lang === 'ar' ? 'يجب أن يكون الإسم باللغة العربية مكون من حرفين على الأقل' : 
        store.lang === 'en' ? 'The Arabic Name must be at least 2 characters' : 
        "عربی نام کم از کم دو حرفوں پر مشتمل ہونا چاہیے۔"
      );
    }
    else if(body.value.en_name === ''){
      handleToast('error', 
      store.lang === 'ar' ? 'يجب إضافة الإسم باللغة الإنجليزية' : 
      store.lang === 'en' ? 'The English Name must be added' : 
      "نام انگریزی میں شامل کرنا ضروری ہے۔"
      )
    }
    else if (body.value.en_name.length < 2) {
      handleToast('error', 
        store.lang === 'ar' ? 'يجب أن يكون الإسم باللغة الإنجليزية مكون من حرفين على الأقل' : 
        store.lang === 'en' ? 'The English Name must be at least 2 characters' : 
        "انگریزی نام کم از کم دو حرفوں پر مشتمل ہونا چاہیے۔"
      );
    }
    else if(body.value.ur_name === ''){
      handleToast('error', 
      store.lang === 'ar' ? 'يجب إضافة الإسم باللغة الأردية' : 
      store.lang === 'en' ? 'The Urdo Name must be added' : 
      "نام انگریزی میں شامل کرنا ضروری ہے۔"
      )
    }
    else if (body.value.ur_name.length < 2) {
      handleToast('error', 
        store.lang === 'ar' ? 'يجب أن يكون الإسم باللغة الأردية مكون من حرفين على الأقل' : 
        store.lang === 'en' ? 'The Urdu Name must be at least 2 characters' : 
        "اردو نام کم از کم دو حرفوں پر مشتمل ہونا چاہیے۔"
      );
    }
    else if(body.value.is_required === ''){
      handleToast('error', 
        store.lang === 'ar' ? 'يجب اختيار حالة التصنيف' :
        store.lang === 'en' ? 'The category status must be selected' : 
        'کٹیگری کی حالت منتخب کرنا ضروری ہے'
      )
    }
    else if (body.value.number_of_choices === '') {
      handleToast('error', 
        store.lang === 'ar' ? 'يجب اختيار عدد الخيارات' : // Arabic: "The number of choices must be selected."
        store.lang === 'en' ? 'The number of choices must be selected' : // English: "The number of choices must be selected."
        store.lang === 'ur' ? 'انتخاب کے تعداد کا انتخاب ضروری ہے' : // Urdu: "The number of choices must be selected."
        "The number of choices must be selected" // Default message
      );
    }
    else if (Array.isArray(body.value.addons) && body.value.addons.length === 0) {
      handleToast('error', 
        store.lang === 'ar' ? 'يجب اختيار الإضافات' : // Arabic: "Add-ons must be selected."
        store.lang === 'en' ? 'Add-ons must be selected' : // English: "Add-ons must be selected."
        store.lang === 'ur' ? 'اضافات کا انتخاب ضروری ہے' : // Urdu: "Add-ons must be selected."
        "Add-ons must be selected" // Default message
      );
    }
    else if (body.value.addons.length < body.value.number_of_choices) {
      handleToast('error', 
        store.lang === 'ar' ? 'يجب اختيار عدد كافٍ من الإضافات' : // Arabic: "You must select enough add-ons."
        store.lang === 'en' ? 'You must select enough add-ons' : // English: "You must select enough add-ons."
        store.lang === 'ur' ? 'آپ کو کافی اضافات کا انتخاب کرنا ہوگا' : // Urdu: "You must select enough add-ons."
        "You must select enough add-ons" // Default message
      );
    }
    else{
      const addonData = new FormData()

      addonData.append('product_id' , route.params.id)
      addonData.append('name[ar]' , body.value.ar_name)
      addonData.append('name[en]' , body.value.en_name)
      addonData.append('name[ur]' , body.value.ur_name)
      addonData.append('is_required' , body.value.is_required)
      addonData.append('number_of_choices' , body.value.number_of_choices)
      body.value.addons.map((item , index)=> {
        addonData.append(`addons[${index}]` , item)
      });

      postMethod('provider/products-classifications/store' , addonData , true , '' , 'success')
    }
  }


  // define product classification id which would be fetched after opost addons to pass it as props to show the addon items 
  const product_classification_id = ref()

  //  watch result after posting data to get all variants added
  watchEffect(()=>{
    if(postResult?.value){
      product_classification_id.value = postResult?.value?.data?.product_classification_id;
      body.value.ar_name = "";
      body.value.en_name = "" ;
      body.value.ur_name = "";
      body.value.is_required = "";
      body.value.number_of_choices = "";
      body.value.addons = []
    }
  })
  

  // to watch stored language if chaned to refetch data
  watch(()=> store.lang , (newValue)=> {
    if(newValue){
      handlePagination('provider/products-addons?page=' , pageNumber.value)
    }
  })
</script>

<style lang="scss" scoped>

</style>