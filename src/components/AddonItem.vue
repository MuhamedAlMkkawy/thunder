<template>
  <div class="addon_item" v-for="item in addonItems" :key="item.id">
    <button class="variant_btn delete_variant" @click="removeClassification(item.id)">
      <i class="pi pi-trash"></i>
    </button>
    <div class="inputs">
      <div class="input-wrap">
        <label for="ar_name">{{$t('product_variant.category_ar_name')}}</label>
        <div class="input">
          <input 
            type="text" 
            id="ar_name"
            disabled
            :value="item.translated_names['ar']"
            :placeholder="$t('product_variant.category_ar_name')"
            >
          </div>
      </div>
      <div class="input-wrap">
        <label for="en_name">{{$t('product_variant.category_en_name')}}</label>
        <div class="input">
          <input 
            type="text" 
            id="en_name"
            disabled
            :value="item.translated_names['en']"
            :placeholder="$t('product_variant.category_en_name')"
          >
        </div>
      </div>
      <div class="input-wrap">
        <label for="ur_name">{{$t('product_variant.category_ur_name')}}</label>
        <div class="input">
          <input 
            type="text" 
            id="ur_name"
            disabled
            :value="item.translated_names['ur']"
            :placeholder="$t('product_variant.category_ur_name')"
          >
        </div>
      </div>
      <div class="input-wrap">
        <label for="is_required">{{$t('product_variant.status_label')}}</label>
        <div class="input">
          <input 
            type="text" 
            id="is_required"
            disabled
            :value="item.is_required === 1 ? $t('product_variant.required') : $t('product_variant.optional')"
            :placeholder="$t('product_variant.status_label')"
          >
        </div>
      </div>
      <div class="input-wrap">
        <label for="quantity">{{$t('product_variant.quantity')}}</label>
        <div class="input">
          <input 
            type="text" 
            id="quantity"
            disabled
            :value="item.number_of_choices"
            :placeholder="$t('product_variant.quantity')"
          >
        </div>
      </div>
    </div>
    <div class="addons">
      <div v-if="!item.addons || loading" v-for="n in 20" :key="n" class="addon_tab">
          <Skeleton class="addon_skeleton" shape="rectangle" width="100%" height="70px" />
      </div>
      <div v-else class="addon_tab" v-for="addon in item.addons" :key="addon.id">
        <button @click="removeAddon(addon.id , item.number_of_choices , item.addons.length)" class="pi pi-trash"></button>
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
  </div>
  <Toast 
    ref="toast"
    position="top-right"
  />
</template>

<script setup>
  import { watch , ref, watchEffect } from 'vue';
  import useApiMethods from '../Composables/ApiMethods';
  import Toast from 'primevue/toast';
  import { useStore } from '../store/store';
  import Skeleton from 'primevue/skeleton';

  // define store
  const store = useStore()


  // define api methods
  const {
    getMethod,
    postMethod,
    deleteMethod,
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

  
  // store addon items
  const addonItems = ref([])



  // handle delete classification
  const removeClassification = (classificationId) => {
    deleteMethod(`provider/products-addons/destroy/${classificationId}` , true , '' , '')
    addonItems.value = addonItems.value.filter((item)=> item.id !== classificationId)
  }


  // handle remove addon
  const removeAddon = (addonId , choicesNumber , addonsNumber) => {
    const body = ref({
      classification_id : props.addonItem,
      addon_id : addonId
    })
    if(addonsNumber > choicesNumber){
      postMethod('provider/products-classifications/detach-addon-from-classification' , body.value , true , '' , 'toast')
    }else{
      handleToast('error' , store.lang === 'ar' ? 'لايمكن مسح الإضافة' :
        store.lang === 'en' ? 'addition cannot be deleted' : 'اسٹاپ کی فہرست نہیں مٹ سکتی'
      )
    }
  }



  watch(()=>props.addonItem , (newValue) =>{
    if(newValue){
      getMethod(`provider/products-classifications/show/${props.addonItem}` , true)
    }
  })
  



  // watch for changes in getResult and update addonItems
  watch(() => getResult?.value?.data, (newValue) => {
    if (newValue) {
      // Check if the newValue.id exists in the current addonItems
      const existingItemIndex = addonItems.value.findIndex(item => item.id === newValue.id);

      if (existingItemIndex !== -1) {
        // If the item already exists, replace the old one with the new one
        addonItems.value.splice(existingItemIndex, 1, newValue);
      } else {
        // If the item doesn't exist, add the new item to the array
        addonItems.value.push(newValue);
      }
    }
  });



  watch(()=> postResult?.value , (newValue) => {
    if(newValue?.key === 'success'){
      getMethod(`provider/products-classifications/show/${props.addonItem}` , true)
    }
  })

</script>

<style lang="scss" scoped>
  @import "/src/assets/scss/mixins";
  .addon_item{
    margin-block-start: 30px;
    position: relative;
    &:not(:last-of-type){
      padding-block-end: 40px;
      border-bottom: 1px solid #e4e4e4;
    }
    .inputs{
      @include displayFlex($wrap : wrap , $justify : flex-start);
      margin-block-end: 30px;
      .input-wrap{
        width: 250px;
      }
    }
    .addons{
      @include displayGrid();
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
          flex-shrink:0;
          img{
            object-fit: contain;
          }
        }
        .text{
          h3{
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
  }
</style>