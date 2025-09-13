<template>
  <div>
    <div class="page">
      <h4>{{$t('add_product.title')}}</h4>
      <hr>
      <div class="content">
        <form action="" @submit.prevent="handleSubmit">
          <label for="main_section">{{$t('add_product.main_section')}}</label>
          <div class="input">
            <MainCategory 
              :parent_id="store.profile.main_category.id"
              @handleCategory="handleMainCategory"
            />
          </div>
          <label v-show="body.main_category !== ''" for="sec_section">{{$t('add_product.sec_section')}}</label>
          <div class="input" v-show="body.main_category !== ''">
            <SecondCategory
              :parent_id="Number(body.main_category)"
              @handleCategory="handleSecCategory"
            />
          </div>
          <label for="ar_name">{{$t('add_product.ar_name')}}</label>
          <div class="input">
            <input 
              type="text"
              id="ar_name"
              :placeholder="$t('add_product.ar_name')"
              v-model="body.ar_name"
            >
          </div>
          <label for="en_name">{{$t('add_product.en_name')}}</label>
          <div class="input">
            <input 
              type="text"
              id="en_name"
              :placeholder="$t('add_product.en_name')"
              v-model="body.en_name"
            >
          </div>
          <label for="ur_name">{{$t('add_product.ur_name')}}</label>
          <div class="input">
            <input 
              type="text"
              id="ur_name"
              :placeholder="$t('add_product.ur_name')"
              v-model="body.ur_name"
            >
          </div>
          <label for="type">{{$t('add_product.type')}}</label>
          <div class="input">
            <ProductTypes 
              @handleProductType ="handleProductType"
            />
          </div>
          <label for="price" v-if="body.has_price === 1">{{$t('add_product.price')}}</label>
          <div class="input" v-if="body.has_price === 1">
            <input 
              type="text"
              id="price"
              :placeholder="$t('add_product.price')"
              v-model="body.price"
            >
          </div>
          <label for="saled_price" v-if="body.has_price === 1">{{$t('add_product.price_after_sale')}}</label>
          <div class="input" v-if="body.has_price === 1">
            <input 
              type="text"
              id="saled_price"
              :placeholder="$t('add_product.price_after_sale')"
              v-model="body.price_after_discount"
            >
          </div>
          <label for="product_images">{{$t('add_product.images')}}</label>
          <div class="input">
            <input 
              type="file"
              id="product_images"
              hidden
              multiple
              @change="handleUploadImages"
              accept="image/*"
            >
            <label for="product_images" class="pi pi-camera"></label>
            <label class="images" v-if="body.images.length > 0">
              <div class="image" v-for="(item , index) in localImages" :key="index">
                <i @click="removeImage(index)" class="pi pi-trash"></i>
                <img :src="item" alt="image" loading="lazy">
              </div>
            </label>
            <label v-else class="image_placeholder" for="product_images">{{$t('add_product.add')}} {{$t('add_product.images')}}</label>
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
          <button type="submit" class="main-btn">
            {{$t('add_product.add_btn')}}
          </button>
        </form>
      </div>
    </div>
    <!-- to handle successed add addition popup -->
    <AddProductsPopup 
      v-if="showAddProductsPopup"
      :product_id="postResult?.data?.product_id"
    /> 
    <Toast 
      ref="toast"
      position="top-right"
    />
    <Loading 
      v-if="loading"
    />
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue';
  import AddProductsPopup from '../../../../components/Popups/AddProductsPopup.vue';
  import MainCategory from '../../../../components/SelectInputs/MainCategory.vue';
  import SecondCategory from '../../../../components/SelectInputs/SecondCategory.vue';
  import ProductTypes from '../../../../components/SelectInputs/ProductTypes.vue';
  import { useStore } from '../../../../store/store';
  import useApiMethods from '../../../../Composables/ApiMethods';
  import Toast from 'primevue/toast';
  import Loading from '../../../../components/Loading.vue';




  // define api methods
  const {
    postMethod,
    postResult,
    toast,
    loading,
    handleToast,
    handleNextRoute
  } = useApiMethods()



  // define store
  const store = useStore()

  // define body 
  const body =ref({
    ar_name : '',
    en_name : '',
    ur_name : '',
    ar_description : '',
    en_description : '',
    ur_description : '',
    main_category : '',
    category : '',
    has_price : '',
    price : '',
    price_after_discount : '',
    images: []
  })


  // to handle main_category
  const handleMainCategory = (id) => {
    body.value.main_category = id
  }


  // to handle main_category
  const handleSecCategory = (id) => {
    body.value.category = id
  }

  // to handle product types
  const handleProductType = (type) =>{
    body.value.has_price= type
  }

  // to handle upload images
  const localImages = ref([])
  const handleUploadImages = (event) => {
    const files = event.target.files;
    
    if (files.length > 0) {
      // Loop through the selected files and create image previews
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Check if the file is an image by its MIME type
        if (file.type.startsWith('image/')) {
          // Create an object URL for the file and add it to the images array
          const imageUrl = URL.createObjectURL(file);
          localImages.value.push(imageUrl);
          body.value.images.push(file);
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


  // to handle show add variants popup
  const showAddProductsPopup = ref(false)
  const handleShowAddProductsPopup = () =>{
    showAddProductsPopup.value = !showAddProductsPopup.value
  }

  const handleSubmit = () => {
    if(body.value.main_category === ''){
      handleToast('error', 
      store.lang === 'ar' ? 'يجب إضافة القسم الرئيسي' : 
      store.lang === 'en' ? 'The main section must be added' : 
      "اہم سیکشن کو شامل کرنا ضروری ہے۔"
      )
    }
    else if(body.value.category === ''){
      handleToast('error', 
      store.lang === 'ar' ? 'يجب إضافة القسم الفرعي' : 
      store.lang === 'en' ? 'The second section must be added' : 
      "ذیلی سیکشن شامل کرنا ضروری ہے۔"
      )
    }
    else if(body.value.ar_name === ''){
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
    else if(body.value.has_price === ''){
      handleToast('error', 
        store.lang === 'ar' ? 'يجب تحديد نوع المنتج' : 
        store.lang === 'en' ? 'The product type must be specified.' : 
        "مصنوعات کی قسم کا تعین کرنا ضروری ہے۔"
      );
    }
    else if(body.value.has_price === 1 && (body.value.price === '' || body.value.price <= 0)){
      handleToast('error', 
        store.lang === 'ar' ? 'يجب إضافة سعر المنتج ويجب أن يكون أكبر من 0' : 
        store.lang === 'en' ? 'The product price must be added and it must be greater than 0' : 
        "مصنوعات کی قیمت شامل کرنا ضروری ہے اور یہ 0 سے زیادہ ہونی چاہیے۔"
      );
    }
    else if(body.value.has_price === 1 && (body.value.price_after_discount === '' || body.value.price_after_discount <= 0)){
      handleToast('error', 
        store.lang === 'ar' ? 'يجب إضافة سعر المنتج بعد الخصم ويجب أن يكون أكبر من 0' : 
        store.lang === 'en' ? 'The product price after discount must be added and it must be greater than 0' : 
        "خصم کے بعد مصنوعات کی قیمت شامل کرنا ضروری ہے اور یہ 0 سے زیادہ ہونی چاہیے۔"
      );
    }
    else if(Number(body.value.price_after_discount) >  Number(body.value.price)){
      handleToast('error', 
        store.lang === 'ar' ? ' سعر المنتج بعد الخصم يجب أن يكون أقل من  ' + body.value.price : 
        store.lang === 'en' ? 'The product price after discount must be less than ' + body.value.price : 
        "The product price after discount must be less than " + body.value.price
      );
    }
    else if(body.value.images.length === 0){
      handleToast('error', 
        store.lang === 'ar' ? 'يجب إضافة صور المنتج' : 
        store.lang === 'en' ? 'The product images must be added.' : 
        "مصنوعات کی تصاویر شامل کرنا ضروری ہے۔"
      );
    }
    else if(body.value.ar_description === '') {
      handleToast('error', 
        store.lang === 'ar' ? 'يجب إضافة الوصف باللغة العربية' : 
        store.lang === 'en' ? 'The Arabic Description must be added' : 
        "عربی میں تفصیل شامل کرنا ضروری ہے۔"
      );
    }
    else if (body.value.ar_description.length < 2) {
      handleToast('error', 
        store.lang === 'ar' ? 'يجب أن يكون الوصف باللغة العربية مكون من حرفين على الأقل' : 
        store.lang === 'en' ? 'The Arabic Description must be at least 2 characters' : 
        "عربی تفصیل کم از کم دو حرفوں پر مشتمل ہونا چاہیے۔"
      );
    }
    else if(body.value.en_description === '') {
      handleToast('error', 
        store.lang === 'ar' ? 'يجب إضافة الوصف باللغة الإنجليزية' : 
        store.lang === 'en' ? 'The English Description must be added' : 
        "انگریزی میں تفصیل شامل کرنا ضروری ہے۔"
      );
    }
    else if (body.value.en_description.length < 2) {
      handleToast('error', 
        store.lang === 'ar' ? 'يجب أن يكون الوصف باللغة الإنجليزية مكون من حرفين على الأقل' : 
        store.lang === 'en' ? 'The English Description must be at least 2 characters' : 
        "انگریزی تفصیل کم از کم دو حرفوں پر مشتمل ہونا چاہیے۔"
      );
    }
    else if(body.value.ur_description === '') {
      handleToast('error', 
        store.lang === 'ar' ? 'يجب إضافة الوصف باللغة الأردية' : 
        store.lang === 'en' ? 'The Urdu Description must be added' : 
        "اردو میں تفصیل شامل کرنا ضروری ہے۔"
      );
    }
    else if (body.value.ur_description.length < 2) {
      handleToast('error', 
        store.lang === 'ar' ? 'يجب أن يكون الوصف باللغة الأردية مكون من حرفين على الأقل' : 
        store.lang === 'en' ? 'The Urdu Description must be at least 2 characters' : 
        "اردو تفصیل کم از کم دو حرفوں پر مشتمل ہونا چاہیے۔"
      );
    }
    else{
      const product = new FormData()

      product.append('name[ar]' , body.value.ar_name)
      product.append('name[en]' , body.value.en_name)
      product.append('name[ur]' , body.value.ur_name)
      product.append('description[ar]' , body.value.ar_description)
      product.append('description[en]' , body.value.en_description)
      product.append('description[ur]' , body.value.ur_description)
      product.append('category_id' , body.value.category)
      product.append('has_price' , body.value.has_price)
      if(body.value.has_price === 1){
        product.append('price' , body.value.price)
        product.append('price_after_discount' , body.value.price_after_discount)
      }
      body.value.images.map((item , index) => {
        product.append(`images[${index}]` , item)
      })

      postMethod('provider/products/store' , product , true , '' , 'toast')
    }
  }

  watch(() => postResult?.value , (newValue) => {
    if(newValue?.key === 'success' && body.value.has_price === 1){
      handleShowAddProductsPopup()
    }else{
      // handleToast('success' , newValue?.msg);
      handleNextRoute('/products')
    }
  })
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/mixins";
  form{
    max-width: unset;
    margin: 40px 0;
    margin-inline-end: auto;
    align-items: flex-start;
    .input{
      margin-bottom: 20px;
      max-width: 520px;
    }
    .main-btn{
      max-width: 520px;
      margin: 20px auto 0;
    }
    .image_placeholder{
      color: #7a8289;
    }
  }
</style>