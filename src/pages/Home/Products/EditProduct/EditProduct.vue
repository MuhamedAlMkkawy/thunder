<template>
  <div>
    <div class="page">
      <h4>{{ $t('edit_product.title') }}</h4>
      <hr>
      <div class="content">
        <form action="" @submit.prevent="handleSubmit">
          <label for="main_section">{{$t('add_product.main_section')}}</label>
          <div class="input">
            <MainCategory 
              :parent_id="mainCategory?.parent_id"
              :category_id="mainCategory?.id"
              @handleCategory="handleMainCategory"
            />
          </div>
          <label for="sec_section">{{$t('add_product.sec_section')}}</label>
          <div class="input">
            <SecondCategory
              :parent_id="secCategory?.parent_id"
              :category_id="secCategory?.id"
              @handleCategory="handleSecCategory"
            />
          </div>
          <label for="ar_name">{{ $t('edit_product.ar_name') }}</label>
          <div class="input">
            <input 
                type="text"
                id="ar_name"
                :placeholder="$t('edit_product.ar_name')"  
                v-model="body.ar_name"
              >
            </div>
          <label for="en_name">{{ $t('edit_product.en_name') }}</label>
          <div class="input">
            <input 
                type="text"
                id="en_name"
                :placeholder="$t('edit_product.en_name')"  
                v-model="body.en_name"
              >
            </div>
            <label for="ur_name">{{ $t('edit_product.ur_name') }}</label>
          <div class="input">
            <input 
              type="text"
              id="ur_name"
              :placeholder="$t('edit_product.ur_name')"  
              v-model="body.ur_name"
            >
          </div>
          <label for="type">{{$t('add_product.type')}}</label>
          <div class="input">
            <ProductTypes
              :product_type="Number(body.has_price)"
              @handleProductType="handleProductType"
              />
              <!-- :has_price = "body.has_price" -->
            <!-- {{ body.has_price }} -->
          </div>
          <label for="price" v-if="Number(body.has_price) !== 0">{{ $t('edit_product.price') }}</label>
          <div class="input" v-if="Number(body.has_price) !== 0">
            <input 
              type="text"
              id="price"
              :placeholder="$t('edit_product.price')"  
              v-model="body.price"
            >
          </div>
          <label for="saled_price" v-if="Number(body.has_price) !== 0">{{$t('add_product.price_after_sale')}}</label>
          <div class="input" v-if="Number(body.has_price) !== 0">
            <input 
              type="text"
              id="saled_price"
              :placeholder="$t('add_product.price_after_sale')"
              v-model="body.price_after_discount"
            >
          </div>
          <label for="image">{{ $t('edit_product.image') }}</label>
          <div class="input">
            <input 
              type="file" 
              id="image"
              hidden
              @change="handleUploadImages"
              accept="image/*"
              multiple
            >
            <label for="image" class="pi pi-camera"></label>
            <label 
              for="image" 
              v-if="body.images.length === 0 && localImages.length === 0"
            >
              {{ $t('edit_product.image_placeholder') }}
            </label>
              <div class="images" v-else>
                <!-- to render fetched product images -->
                <div class="image" v-for="item in body.images" :key="item.id">
                  <i @click="deleteImage(item.id)" class="pi pi-trash"></i>
                  <img :src="item.image" alt="image" loading="lazy">
                </div>
                <!-- to render uploaded local images -->
                <div class="image" v-for="(item , index) in localImages" :key="item.id">
                  <i @click=removeImage(index) class="pi pi-trash"></i>
                  <img :src="item" alt="image" loading="lazy">
                </div>
              </div>
            </div>
          <label for="ar_desc">{{$t('add_product.ar_desc')}}</label>
          <div class="input">
            <input 
              type="text"
              id="ar_desc"
              :placeholder="$t('add_product.ar_desc')"
              v-model="body.ar_description"
              >
            </div>
          <label for="en_desc">{{$t('add_product.en_desc')}}</label>
          <div class="input">
            <input 
              type="text"
              id="en_desc"
              :placeholder="$t('add_product.en_desc')"
              v-model="body.en_description"
              >
            </div>
            <label for="ur_desc">{{$t('add_product.ur_desc')}}</label>
            <div class="input">
              <input 
              type="text"
              id="ur_desc"
              :placeholder="$t('add_product.ur_desc')"
              v-model="body.ur_description"
            >
          </div>
          <div class="edit_buttons">
            <button class="main-btn">
              {{$t('edit_product.submit_btn')}}
            </button>
            <RouterLink :to="'/edit_variants/' + route.params.id"  v-if="Number(body.has_price) !== 0">
              <button class="main-btn edit_variants">
                {{ $t('edit_product.edit_variants') }}
              </button>
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
    <!-- to handle successed add addition popup -->
    <SuccessPopup 
      v-if="showSuccessPopup"
      :successedMsg="successText"
      @handleSuccessPopup="handleSuccessPopup"
    />
    <!-- to handle loading -->
    <Loading  v-if="loading" />
    <!-- to handle toast -->
    <Toast 
      ref="toast"
      position="top-right"
    />
  </div>
</template>

<script setup>
  import { onMounted, ref , watch } from 'vue';
  import { RouterLink , useRoute } from 'vue-router';
  import SuccessPopup from '../../../../components/Popups/SuccessPopup.vue';
  import useApiMethods from '../../../../Composables/ApiMethods';
  import MainCategory from '../../../../components/SelectInputs/MainCategory.vue';
  import SecondCategory from '../../../../components/SelectInputs/SecondCategory.vue';
  import Toast from 'primevue/toast';
  import Loading from '../../../../components/Loading.vue'
  import ProductTypes from '../../../../components/SelectInputs/ProductTypes.vue';
  import { useStore } from '../../../../store/store';

  // define api methods
  const {
    getMethod,
    postMethod,
    deleteMethod,
    getResult,
    loading,
    toast,
    handleToast,
    successText,
    showSuccessPopup,
    handleSuccessPopup
  } = useApiMethods()


  // define route to get the id param of product
  const route = useRoute()


  // define body
  const body =ref({
    ar_name : '',
    en_name : '',
    ur_name : '',
    ar_description : '',
    en_description : '',
    ur_description : '',
    main_category : [],
    category : [],
    has_price : '',
    price : '',
    price_after_discount : '',
    images: []
  })

  // define store 
  const store = useStore()

  
  // to check if the images changed to be posted with edits
  const imageChanged = ref(false)

  //  ot handle view of uploaded image in local
  const localImages = ref([])

  //  ot handle view of uploaded image in local
  const newImages = ref([])
  // to handle upload images
  const handleUploadImages = (event) => {
    imageChanged.value = true
    // body.value.images = []
    const files = event.target.files;
    
    if (files.length > 0) {
      // Loop through the selected files and create image previews
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Check if the file is an image by its MIME type
        if (file.type.startsWith('image/')) {
          // Create an object URL for the file and add it to the images array
          const imageUrl = URL.createObjectURL(file);
          localImages.value.push(imageUrl)
          newImages.value.push(file);
        } else {
          handleToast('error' , `'The selected file is not an image => ${file.name}`)
        }
      }
    }
  }

  // to handle remove image from uploaded local image
  const removeImage = (imageID) => {
    localImages.value.splice(imageID , 1)
    handleToast('success' , store.lang === 'ar' ? 'تم حذف الصورة بـنجاح' : store.lang === 'en' ? 'Image Deleted Successfully' : "تصویر کامیابی کے ساتھ حذف کر دی گئی ہے۔")
  }


  // to handle remove image from uploaded local image
  const deleteImage = (imageID) => {
    localImages.value.splice(imageID , 1)
    deleteMethod(`provider/products/delete-attachement/${imageID}` , true , `provider/products/show/${route.params.id}` , '')
  }

  // to handle Main Category
  const mainCategory = ref()
  const handleMainCategory = (mainCategoryId) =>{
    body.value.main_category = mainCategoryId
    mainCategory.value.id = mainCategoryId
    secCategory.value.parent_id = mainCategoryId
    secCategory.value.id = 0
  }
  
  
  const secCategory = ref()
  // to handle Second Category
  const handleSecCategory = (secCategoryId) =>{
    body.value.category = secCategoryId
  }


  // to handle Second Category
  const handleProductType = (type_id) =>{
    body.value.has_price = Number(type_id)
  }

  
  // handle submit form
  const handleSubmit = () => {
    const productData = new FormData()

    productData.append('name[ar]' , body.value.ar_name)
    productData.append('name[en]' , body.value.en_name)
    productData.append('name[ur]' , body.value.ur_name)
    productData.append('description[ar]' , body.value.ar_description)
    productData.append('description[en]' , body.value.en_description)
    productData.append('description[ur]' , body.value.ur_description)
    productData.append('category_id' , body.value.category)
    productData.append('has_price' , Number(body.value.has_price))
    if(imageChanged.value){
      newImages.value.map((item , index) => {
        productData.append(`images[${index}]` , item)
      })
    }
    if(Number(body.value.has_price) !== 0){
      productData.append('price' , body.value.price)
      productData.append('price_after_discount' , Number(body.value.price_after_discount))
    }
    if(body.value.images.length == 0 && newImages.value.length == 0){
      handleToast(
      'error',
        store.lang == 'ar'
          ? 'يجب إضافة صورة أو أكثر للمنتج'
          : store.lang == 'en'
          ? 'You must add one or more images for the product'
          : 'آپ کو پروڈکٹ کے لیے ایک یا زیادہ تصاویر شامل کرنی ہوں گی'
      );
    }
    else{
      postMethod(`provider/products/update/${route.params.id}?_method=put` , productData , true , '/products' , 'success')
    }
  }

  watch(()=> getResult.value?.data , (newValue) => {
    if(newValue){
      body.value.ar_name = newValue.translated_names['ar']
      body.value.en_name = newValue.translated_names['en']
      body.value.ur_name = newValue.translated_names['ur']
      body.value.ar_description = newValue.translated_descriptions['ar']
      body.value.en_description = newValue.translated_descriptions['en']
      body.value.ur_description = newValue.translated_names['ur']
      body.value.main_category = newValue.main_category.id
      mainCategory.value = newValue.main_category
      body.value.category = newValue.category.id
      secCategory.value = newValue.category
      body.value.has_price = newValue.has_price
      body.value.price = parseFloat(newValue.price).toFixed(2)
      body.value.price_after_discount = parseFloat(newValue.price_after_discount).toFixed(2)
      body.value.images = newValue.images
    }
  })


  onMounted(()=> {
    getMethod(`provider/products/show/${route.params.id}` , true)
  })


  watch(()=> store.lang , (newValue) => {
    if(newValue){
      getMethod(`provider/products/show/${route.params.id}` , true)
    }
  })

</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";
  form{
    margin: 40px 0;
    max-width: unset;
    align-items: flex-start;
    .input{
      max-width: 520px;
      margin-bottom: 25px;
    }
    .main-btn{
      max-width: 500px;
      margin: 0 auto;
    }
    .edit_buttons{
      @include displayFlex();
      .edit_variants{
        background: $secColor;
        &:hover{
          color: $secColor;
          border-color: $secColor !important;
        }
      }
      @media (max-width : 500px){
        flex-wrap: wrap;
        a{
          display: block;
          max-width: 100%;
          .edit_variants{
            margin-top: 0;
          }
        }
      }
    }
  }
</style>