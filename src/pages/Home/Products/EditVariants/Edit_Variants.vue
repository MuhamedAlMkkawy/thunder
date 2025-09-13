<template>
  <div>
    <form 
      action="" 
      @submit.prevent="handleSubmit" 
      v-for="classification in addonItems[0]" 
      :key="classification.id"
      v-if="addonItems[0]?.length > 0"
      >
      <div class="inputs">
        <div class="input-wrap">
          <label for="ar_name">{{ $t('product_variant.category_ar_name') }}</label>
          <div class="input">
            <input 
              type="text"
              id="ar_name"
              :placeholder="$t('product_variant.category_ar_name')"  
              :value="classification.translated_names['ar']"
              disabled
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
              :value="classification.translated_names['en']"
              disabled
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
              :value="classification.translated_names['ur']"
              disabled
            >
          </div>
        </div>

        <div class="input-wrap">
          <label for="status">{{ $t('product_variant.status_label') }}</label>
          <div class="input">
            <select 
              id="status"
              :value="classification.is_required"
              disabled
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
              :value="classification.number_of_choices"
              disabled
            >
          </div>
        </div>

        <!-- submit button
        <button class="variant_btn submit_variant">
          <i class="pi pi-plus"></i>
        </button> -->
        <!-- delete button  -->
        <button 
          class="variant_btn delete_variant" 
          @click="removeClassification(classification.id)"
          title="Delete Classification"
        >
          <i class="pi pi-trash"></i>
        </button>
      </div>
      <div class="addons">
        <div v-if="!classification.addons || loading" v-for="n in 20" :key="n" class="addon_tab">
            <Skeleton class="addon_skeleton" shape="rectangle" width="100%" height="70px" />
        </div>
        <div v-else class="addon_tab" v-for="addon in classification.addons" :key="addon.id">
          <button 
            @click="removeAddon(classification.id ,addon.id , classification.number_of_choices , classification.addons.length)"
            title="Delete Addon" 
            class="pi pi-trash">
          </button>
          <div class="addon">
            <div class="image">
              <img :src="addon.image" alt="image" loading="lazy">
            </div>
            <div class="text">
              <h3>{{addon.name}}</h3>
              <p>{{addon.price}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- <button class="main-btn" v-if="classification.id !== formIndex" @click="handleEditVariant(classification.id)">{{$t('addition.submit_btn')}}</button> -->
    </form>
    <div class="page"  v-else>
      <Empty />
    </div>
    <!-- handle toast message -->
    <Toast 
      ref="toast"
      position="top-right"
    />
  </div>
</template>

<script setup>  
  import { ref , watch , onMounted } from 'vue';
  import useApiMethods from '../../../../Composables/ApiMethods';
  import Skeleton from 'primevue/skeleton';
  import Toast from 'primevue/toast';
  import AddonItem from '../../../../components/AddonItem.vue';
  import { useRoute } from 'vue-router';
  import { useStore } from '../../../../store/store';
  import Empty from '../../../../components/Empty.vue';



  // define route
  const route = useRoute()


  // define store
  const store = useStore()


  // define api methods
  const {
    getMethod,
    deleteMethod,
    postMethod,
    getResult,
    postResult,
    toast,
    loading,
    handleToast
  } = useApiMethods()


    
  // define props
  const props = defineProps({
    addonItem: {
      type: Number,
      default : 0
    }
  })


  // define addonItems 
  const addonItems = ref([])
  

  // handle delete classification
  const removeClassification = (classificationId) => {
    deleteMethod(`provider/products-classifications/destroy/${classificationId}` , true , '' , '')
    addonItems.value[0] = addonItems.value[0]?.filter((item)=> item.id !== classificationId)
  }


  // handle remove addon
  const removeAddon = (classificationId , addonId , choicesNumber , addonsNumber) => {
    const body = ref({
      classification_id : classificationId,
      addon_id : addonId
    })
    if(addonsNumber > choicesNumber){
      postMethod('provider/products-classifications/detach-addon-from-classification' , body.value , true , '' , 'toast')
    }else{
      handleToast(
        'error',
        store.lang === 'ar'
          ? 'يجب ألا يكون عدد الإضافات أقل من العدد المطلوب للتصنيف'
          : store.lang === 'en'
          ? 'The number of additions must not be less than the required number for classification'
          : store.lang === 'ur'
          ? 'اضافات کی تعداد مطلوبہ درجہ بندی سے کم نہیں ہونی چاہیے'
          : 'يجب ألا يكون عدد الإضافات أقل من العدد المطلوب للتصنيف'
      );
    }
  }


  // handle control disable of each variant form
  // const formIndex = ref('')

  // const handleEditVariant = (index) => {
  //   formIndex.value = index
    
  // }



  // to watch changes in post result 
  watch(()=> postResult?.value , (newValue) => {
    if(newValue?.key === 'success'){
      getMethod(`provider/products/show/${route.params.id}` , true)
    }
  })


  
  // watch for changes in getResult and update addonItems
  watch(() => getResult?.value?.data , (newValue) => {
    if (newValue) {
      // If the item doesn't exist, add the new item to the array
      addonItems.value?.push(newValue?.classifications);
    }
  });


  onMounted(()=> {
    getMethod(`provider/products/show/${route.params.id}` , true)
  })
</script>

<style lang="scss" scoped>
  @import "/src/assets/scss/mixins";
  form{
    padding-block-start: clamp(15px , 2.5vw , 30px);
    &:not(:last-of-type){
      border-bottom: 1px solid #0000003d;
      padding-block-end: clamp(15px , 2.5vw , 30px);
    }
    .addons{
      @include displayGrid();
      width: 100%;
    }
    .addon_tab{
      @include displayFlex($justify : flex-start , $gap : 8px);
      button.pi{
        color:#A80202
      }
      .addon{
        @include displayFlex();
        .image{
          width: 70px;
          height: 70px;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, 0.0509803922);
          flex-shrink: 0;
          img{
            object-fit: contain;
          }
        }
        .text{
          h3{
            // @include textTruncate(1);
            font-size: 14px;
            font-weight: 400;
            max-height: 30px;
            overflow-y: scroll;
          }
          p{
            margin-bottom: 0;
          }
        }
      }
    }
    .main-btn{
      max-width:450px ;
      margin-block: 30px 0;
    }
  }
</style>