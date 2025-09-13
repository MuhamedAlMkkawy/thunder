<template>
  <div>
    <div class="page">
      <h4>{{ $t('addition.edit_title') }}</h4>
      <hr>
      <div class="content">
        <form action="" @submit.prevent="handleSubmit">
          <label for="ar_name">{{ $t('addition.ar_name') }}</label>
          <div class="input">
            <input 
              type="text"
              id="ar_name"
              :placeholder="$t('addition.ar_name')"  
              v-model="body.ar_name"
            >
          </div>
          <label for="en_name">{{ $t('addition.en_name') }}</label>
          <div class="input">
            <input 
              type="text"
              id="en_name"
              :placeholder="$t('addition.en_name')"
              v-model="body.en_name"  
            >
          </div>
          <label for="ur_name">{{ $t('addition.ur_name') }}</label>
          <div class="input">
            <input 
              type="text"
              id="ur_name"
              :placeholder="$t('addition.ur_name')"
              v-model="body.ur_name"  
            >
          </div>
          <label for="ar_description">{{ $t('addition.ar_description') }}</label>
          <div class="input">
            <input 
              type="text"
              id="ar_description"
              :placeholder="$t('addition.ar_description')"  
              v-model="body.ar_description"
            >
          </div>
          <label for="en_description">{{ $t('addition.en_description') }}</label>
          <div class="input">
            <input 
              type="text"
              id="en_description"
              :placeholder="$t('addition.en_description')"
              v-model="body.en_description"  
            >
          </div>
          <label for="ur_description">{{ $t('addition.ur_description') }}</label>
          <div class="input">
            <input 
              type="text"
              id="ur_description"
              :placeholder="$t('addition.ur_description')"
              v-model="body.ur_description"  
            >
          </div>
          <label for="price">{{ $t('addition.price') }}</label>
          <div class="input">
            <input 
              type="number"
              id="price"
              :placeholder="$t('addition.price')"  
              v-model="body.price"
            >
          </div>
          <label for="image">{{ $t('addition.image') }}</label>
          <div class="input">
            <input 
              type="file" 
              id="image"
              hidden
              @change="handleUploadImage"
              accept="image/*"
            >
            <label for="image" class="pi pi-camera"></label>
            <label for="image" v-if="body.image === ''">
              {{ $t('addition.image_placeholder') }}
            </label>
            <div class="images" v-else>
              <div class="image">
                  <!-- <i class="pi pi-trash"></i> -->
                  <img :src="localImage" alt="image" loading="lazy">
                </div>
            </div>
          </div>
          <button class="main-btn">
            {{$t('addition.submit_btn')}}
          </button>
        </form>
      </div>
    </div>
    <!-- to handle successed add addition popup -->
    <SuccessPopup 
      v-if="showSuccessPopup"
      @handleSuccessPopup="handleSuccessPopup"
      :successedMsg="$t('addition.successedMsg')"
    />
    <!-- handle Toast Msg -->
    <Toast 
      ref="toast"
      position="top-right"
    />
    <!-- handle Loading Component -->
    <Loading 
      v-if="loading"
    />
  </div>
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue';
  import SuccessPopup from '../../../../components/Popups/SuccessPopup.vue';
  import useApiMethods from '../../../../Composables/ApiMethods';
  import { useRoute } from 'vue-router';
  import Toast from 'primevue/toast';
  import Loading from '../../../../components/Loading.vue';
  import { useStore } from '../../../../store/store';


  // define store
  const store =  useStore()


  // define route 
  const route = useRoute()

  // define api methods
  const {
    getMethod,
    postMethod,
    getResult,
    toast,
    loading,
    showSuccessPopup,
    handleSuccessPopup,
    handleToast
  } = useApiMethods()


  // define body
  const body = ref({
    ar_name : "",
    en_name : "",
    ur_name : "",
    ar_description : "",
    en_description : "",
    ur_description : "",
    price : "",
    image : []
  })


  // to check if image of addition is changed
  const imageChanged = ref(false)

  // handle upload image 
  const localImage = ref()
  const handleUploadImage = (event) => {
    imageChanged.value = true
    const file = event.target.files[0]

    const imageUrl = URL.createObjectURL(file)
    localImage.value = imageUrl
    body.value.image= file
  }



  // handle submit form
  const handleSubmit = () => {
    // Validate Arabic Name
    if (body.value.ar_name === '') {
      handleToast('error', 
        store.lang === 'ar' ? 'يجب إضافة إسم الإضافة باللغة العربية' : 
        store.lang === 'en' ? 'You must add the Arabic Name' :
        store.lang === 'ur' ? 'آپ کو اردو میں ایڈیشن کا نام شامل کرنا ہوگا' : 
        ''
      );
      if (body.value.ar_name.length < 2) {
        handleToast('error', 
          store.lang === 'ar' ? 'إسم الإضافة باللغة العربية يجب أن يكون مكون من حرفين على الأقل' : 
          store.lang === 'en' ? 'The Arabic Name must be at least 2 characters long' :
          store.lang === 'ur' ? 'اردو میں ایڈیشن کا نام کم از کم 2 حروف پر مشتمل ہونا چاہیے' : 
          ''
        );
      }
    }

    // Validate English Name
    else if (body.value.en_name === '') {
      handleToast('error', 
        store.lang === 'ar' ? 'يجب إضافة إسم الإضافة باللغة الإنجليزية' : 
        store.lang === 'en' ? 'You must add the English Name' :
        store.lang === 'ur' ? 'آپ کو انگریزی میں ایڈیشن کا نام شامل کرنا ہوگا' : 
        ''
      );
      if (body.value.en_name.length < 2) {
        handleToast('error', 
          store.lang === 'ar' ? 'إسم الإضافة باللغة الإنجليزية يجب أن يكون مكون من حرفين على الأقل' : 
          store.lang === 'en' ? 'The English Name must be at least 2 characters long' :
          store.lang === 'ur' ? 'انگریزی میں ایڈیشن کا نام کم از کم 2 حروف پر مشتمل ہونا چاہیے' : 
          ''
        );
      }
    }

    // Validate Urdu Name
    else if (body.value.ur_name === '') {
      handleToast('error', 
        store.lang === 'ar' ? 'يجب إضافة إسم الإضافة باللغة الأوردو' : 
        store.lang === 'en' ? 'You must add the Urdu Name' :
        store.lang === 'ur' ? 'آپ کو اردو میں ایڈیشن کا نام شامل کرنا ہوگا' : 
        ''
      );
      if (body.value.ur_name.length < 2) {
        handleToast('error', 
          store.lang === 'ar' ? 'إسم الإضافة باللغة الأوردو يجب أن يكون مكون من حرفين على الأقل' : 
          store.lang === 'en' ? 'The Urdu Name must be at least 2 characters long' :
          store.lang === 'ur' ? 'اردو میں ایڈیشن کا نام کم از کم 2 حروف پر مشتمل ہونا چاہیے' : 
          ''
        );
      }
    }

    // Validate Arabic Description
    else if (body.value.ar_description === '') {
      handleToast('error', 
        store.lang === 'ar' ? 'يجب إضافة وصف الإضافة باللغة العربية' : 
        store.lang === 'en' ? 'You must add the Arabic Description' :
        store.lang === 'ur' ? 'آپ کو اردو میں ایڈیشن کی تفصیل شامل کرنا ہوگی' : 
        ''
      );
      if (body.value.ar_description.length < 2) {
        handleToast('error', 
          store.lang === 'ar' ? 'وصف الإضافة باللغة العربية يجب أن يكون مكون من حرفين على الأقل' : 
          store.lang === 'en' ? 'The Arabic Description must be at least 2 characters long' :
          store.lang === 'ur' ? 'اردو میں ایڈیشن کی تفصیل کم از کم 2 حروف پر مشتمل ہونی چاہیے' : 
          ''
        );
      }
    }

    // Validate English Description
    else if (body.value.en_description === '') {
      handleToast('error', 
        store.lang === 'ar' ? 'يجب إضافة وصف الإضافة باللغة الإنجليزية' : 
        store.lang === 'en' ? 'You must add the English Description' :
        store.lang === 'ur' ? 'آپ کو انگریزی میں ایڈیشن کی تفصیل شامل کرنا ہوگی' : 
        ''
      );
      if (body.value.en_description.length < 2) {
        handleToast('error', 
          store.lang === 'ar' ? 'وصف الإضافة باللغة الإنجليزية يجب أن يكون مكون من حرفين على الأقل' : 
          store.lang === 'en' ? 'The English Description must be at least 2 characters long' :
          store.lang === 'ur' ? 'انگریزی میں ایڈیشن کی تفصیل کم از کم 2 حروف پر مشتمل ہونی چاہیے' : 
          ''
        );
      }
    }

    // Validate Urdu Description
    else if (body.value.ur_description === '') {
      handleToast('error', 
        store.lang === 'ar' ? 'يجب إضافة وصف الإضافة باللغة الأوردو' : 
        store.lang === 'en' ? 'You must add the Urdu Description' :
        store.lang === 'ur' ? 'آپ کو اردو میں ایڈیشن کی تفصیل شامل کرنا ہوگی' : 
        ''
      );
      if (body.value.ur_description.length < 2) {
        handleToast('error', 
          store.lang === 'ar' ? 'وصف الإضافة باللغة الأوردو يجب أن يكون مكون من حرفين على الأقل' : 
          store.lang === 'en' ? 'The Urdu Description must be at least 2 characters long' :
          store.lang === 'ur' ? 'اردو میں ایڈیشن کی تفصیل کم از کم 2 حروف پر مشتمل ہونی چاہیے' : 
          ''
        );
      }
    }


    else if (body.value.price === '') {
      handleToast('error', 
        store.lang === 'ar' ? 'يجب إضافة السعر' : 
        store.lang === 'en' ? 'You must add the price' :
        store.lang === 'ur' ? 'آپ کو قیمت شامل کرنی ہوگی' : 
        ''
      );
    }

    else if (body.value.image === []) {
      handleToast('error', 
        store.lang === 'ar' ? 'يجب إضافة صورة الإضافة' : 
        store.lang === 'en' ? 'You must add the image' :
        store.lang === 'ur' ? 'آپ کو تصویر شامل کرنی ہوگی' : 
        ''
      );
    }

    else {
      const addition = new FormData()
      addition.append('name[ar]' , body.value.ar_name)
      addition.append('name[en]' , body.value.en_name)
      addition.append('name[ur]' , body.value.ur_name)
      addition.append('description[ar]' , body.value.ar_description)
      addition.append('description[en]' , body.value.en_description)
      addition.append('description[ur]' , body.value.ur_description)
      addition.append('price' , body.value.price)
      if(imageChanged.value){
        addition.append('image' , body.value.image)
      }



      postMethod(`provider/products-addons/update/${route.params.id}?_method=put` , addition , true , '/product_additions' , 'success')
    }
  }


  watch(()=> getResult?.value?.data , (newValue)=> {
    if(newValue){
      body.value.ar_name = newValue.translated_names['ar']
      body.value.en_name = newValue.translated_names['en']
      body.value.ur_name = newValue.translated_names['ur']
      body.value.ar_description = newValue.translated_description['ar']
      body.value.en_description = newValue.translated_description['en']
      body.value.ur_description = newValue.translated_description['ur']
      body.value.price = newValue.price
      body.value.image = newValue.image
      localImage.value = newValue.image
    }
  })


  onMounted(()=>{
    getMethod(`provider/products-addons/show/${route.params.id}` , true)
  })

</script>

<style lang="scss" scoped>
  form{
    margin: 40px 0;
    max-width: unset;
    align-items: flex-start;
    .input{
      max-width: 520px;
      margin-bottom: 25px;
    }
    .main-btn{
      max-width: 520px;
      margin: 20px auto 0;
    }
  }
</style>