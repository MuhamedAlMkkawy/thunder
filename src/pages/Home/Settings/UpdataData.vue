<template>
  <div>
    <form action="" @submit.prevent="handleSubmit">
      <div class="image-uploader">
        <label for="img_upload" v-if="uploadedInfoLocalImg" class="circle">
          <img :src="uploadedInfoLocalImg" alt="Uploaded Image" loading="lazy">
        </label>
        <label class="circle" for="img_upload" v-else>
          <i class="pi pi-upload"></i>
        </label>
        <input 
          type="file"
          hidden
          id="img_upload"
          accept="image/*"
          @change="handleUploadInfoImg"
        >
        <label for="img_upload">{{ $t('settings.data.image') }}</label>
      </div>
      <div class="page_content">
        <div class="input-wrap">
          <label for="manager">{{ $t('settings.data.manager') }}</label>
          <div class="input">
            <input 
              id="manager" 
              type="text"
              :placeholder="$t('settings.data.manager')"
              v-model="body.name"
              @input="formChanged = true"
            >
          </div>
        </div>
        <div class="input-wrap">
          <label for="nationalityID">{{ $t('settings.data.nationalityID') }}</label>
          <div class="input">
            <input 
              id="nationalityID" 
              type="number"
              :placeholder="$t('settings.data.nationalityID')"
              v-model="body.identity_number"
              @input="formChanged = true"
            >
          </div>
        </div>
        <div class="input-wrap">
          <label for="ecommerce">{{ $t('settings.data.ecommerce') }}</label>
          <div class="input">
            <input 
              id="ecommerce" 
              type="number"
              :placeholder="$t('settings.data.ecommerce')"
              v-model="body.civil_registration_number"
              @input="formChanged = true"
            >
          </div>
        </div>
        <div class="input-wrap">
          <label for="tax">{{ $t('settings.data.tax') }}</label>
          <div class="input">
            <input 
              id="tax" 
              type="number"
              :placeholder="$t('settings.data.tax')"
              v-model="body.tax_number"
              @input="formChanged = true"
            >
          </div>
        </div>
      </div>
      <div class="page_content">
        <div class="input-wrap">
          <label for="ar_name">{{ $t('settings.data.ar_name') }}</label>
          <div class="input">
            <input 
              id="ar_name" 
              type="text"
              :placeholder="$t('settings.data.ar_name')"
              v-model="body.ar_store_name"
              @input="formChanged = true"
            >
          </div>
        </div>
        <div class="input-wrap">
          <label for="en_name">{{ $t('settings.data.en_name') }}</label>
          <div class="input">
            <input 
                id="en_name" 
                type="text"
                :placeholder="$t('settings.data.en_name')"
                v-model="body.en_store_name"
                @input="formChanged = true"
              >
            </div>
        </div>
        <div class="input-wrap">
          <label for="ur_name">{{ $t('settings.data.ur_name') }}</label>
          <div class="input">
            <input 
                id="ur_name" 
                type="text"
                :placeholder="$t('settings.data.ur_name')"
                v-model="body.ur_store_name"
                @input="formChanged = true"
              >
            </div>
        </div>
        <div class="input-wrap">
          <label for="account_img">{{ $t('settings.data.logo_label') }}</label>
          <div class="input" style="justify-content: flex-start">
            <input 
              id="logo" 
              type="file"
              hidden
              accept="image/*"
              @change="handleUploadLogoImg"
            >
            <label for="logo" class="fileInput_text" v-if="uploadedLogoImg === null">{{ $t('settings.data.logo_label') }}</label>
            <label for="logo" class="pi pi-camera"></label>
            <div v-if="uploadedLogoImg" class="images">
              <label for="logo" class="image">
                <i class="pi pi-trash"></i>
                <img :src="uploadedLogoImg" alt="image" loading="lazy">
              </label>
            </div>
          </div>
        </div>
        <div class="input-wrap">
          <label for="ar_desc">{{ $t('settings.data.ar_desc') }}</label>
          <div class="input">
            <input 
              id="ar_desc" 
              type="text"
              :placeholder="$t('settings.data.ar_desc')"
              @input="formChanged = true"
              v-model="body.ar_store_description"
            >
          </div>
        </div>
        <div class="input-wrap">
          <label for="en_desc">{{ $t('settings.data.en_desc') }}</label>
          <div class="input">
            <input 
              id="en_desc" 
              type="text"
              :placeholder="$t('settings.data.en_desc')"
              @input="formChanged = true"
              v-model="body.en_store_description"
            >
          </div>
        </div>
        <div class="input-wrap">
          <label for="ur_desc">{{ $t('settings.data.ur_desc') }}</label>
          <div class="input">
            <input 
              id="ur_desc" 
              type="text"
              :placeholder="$t('settings.data.ur_desc')"
              @input="formChanged = true"
              v-model="body.ur_store_description"
            >
          </div>
        </div>
        <div class="input-wrap">
          <label for="prepare_order">{{ $t('settings.data.prepare_order') }}</label>
          <div class="input">
            <input 
              id="prepare_order" 
              type="text"
              :placeholder="$t('settings.data.prepare_order')"
              @input="formChanged = true"
              v-model="body.preparing_time"
            >
          </div>
        </div>
      </div>
      <div class="page_content">
        <div class="input-wrap whatsapp-inputs">
          <label for="whatsapp">{{ $t('settings.data.whatsapp') }}</label>
          <div class="inputs">
            <div class="input">
              <input 
                id="whatsapp" 
                type="text"
                placeholder="0000000000000000000"
                @input="formChanged = true"
                v-model="body.whatsapp_phone"
              >
            </div>
            <div class="input">
              <CountryCode 
                :country_code="Number(body.whatsapp_country_code)"
                @handleCountryCode="handleCountryCode"
              />
            </div>
          </div>
        </div>
        <div class="input-wrap">
          <label for="city">{{ $t('settings.data.city') }}</label>
          <div class="input">
            <CitiesSelect 
              :city_id="Number(body.city_id)"
              @handleCity="handleCity"
            />
          </div>
        </div>
        <div class="input-wrap">
          <label for="main_section">{{ $t('settings.data.main_section') }}</label>
          <div class="input">
            <CategorySelect 
              :category_id = "Number(body.category_id)"
              @handleCategory = "handleCategory"
            />
          </div>
        </div>
        <div class="input-wrap multiselect_input">
          <label for="activity_sections">{{ $t('settings.data.activity_sections') }}</label>
          <MultiSelectSections 
            :category_id = "Number(body.category_id)"
            :departments ="body.departments"
            @handleDepartments="handleDepartments"
          />
        </div>
        <div class="input-wrap">
          <label for="location">{{ $t('settings.data.location') }}</label>
          <div class="input">
            <input 
              type="text"
              id="location"
              :placeholder="$t('settings.data.location')"
              disabled
              :value="body.map_desc"
            >
            <span class="pi pi-map-marker"></span>
          </div>
        </div>
        <div class="input-wrap">
          <label for="neighborhood">{{ $t('settings.data.neighborhood') }}</label>
          <!-- {{ body.neighborhood_id }} -->
          <div class="input">
            <NeighborhoodSelect 
              :city_id="Number(body.city_id)"
              :neighborhoods="fetchedNeighborhoods"
              :neighborhood_id="Number(body.neighborhood_id)"
              @handleNeighborhood="handleNeighborhood"
              :disabled = "!cityChanged"
            />
          </div>
        </div>
        <div class="input-wrap">
          <label for="minimum">{{ $t('settings.data.minimum') }}</label>
          <div class="input">
            <input 
              type="text"
              id="minimum"
              :placeholder="$t('settings.data.minimum')"
              @input="formChanged = true"
              v-model="body.minimum_order"
            >
          </div>
        </div>
      </div>
      <div class="page_content">
        <div class="input-wrap">
          <label for="bank">{{ $t('settings.data.bank') }}</label>
          <div class="input">
            <input 
              id="bank" 
              type="text"
              :placeholder="$t('settings.data.bank')"
              @input="formChanged = true"
              v-model="body.bank_name"
            >
          </div>
        </div>
        <div class="input-wrap">
          <label for="owner">{{ $t('settings.data.owner') }}</label>
          <div class="input">
            <input 
              id="owner" 
              type="text"
              :placeholder="$t('settings.data.owner')"
              @input="formChanged = true"
              v-model="body.account_name"
            >
          </div>
        </div>
        <div class="input-wrap">
          <label for="account">{{ $t('settings.data.account') }}</label>
          <div class="input">
            <input 
              id="account" 
              type="number"
              :placeholder="$t('settings.data.account')"
              @input="formChanged = true"
              v-model="body.account_number"
            >
          </div>
        </div>
        <div class="input-wrap">
          <label for="iban">{{ $t('settings.data.iban') }}</label>
          <div class="input">
            <input 
              id="iban" 
              type="text"
              :placeholder="$t('settings.data.iban')"
              @input="formChanged = true"
              v-model="body.iban"
            >
          </div>
        </div>
        <div class="input-wrap">
          <label for="account_img">{{ $t('settings.data.account_img') }}</label>
          <div class="input"  style="justify-content: flex-start">
            <input 
              id="account_img" 
              type="file"
              hidden
              accept="image/*"
              @change="handleUploadAccountImg"
            >
            <label for="account_img" class="fileInput_text" v-if="uploadedAccountLocalImg === null">{{ $t('settings.data.account_img') }}</label>
            <label for="account_img" class="pi pi-camera"></label>
            <label for="account_img" v-if="uploadedAccountLocalImg" class="images">
              <div class="image">
                <i class="pi pi-trash"></i>
                <img :src="uploadedAccountLocalImg" alt="image" loading="lazy">
              </div>
            </label>
          </div>
        </div>
      </div>
      <div class="radio_inputs">
        <label for="delivery">{{ $t('settings.data.product_recieve') }}</label>
        <div class="inputs">
          <div class="input-wrap">
            <input 
              type="radio" 
              name="product_recieved" 
              id="delivery"
              value="2"
              @input="formChanged = true"
              v-model=body.delivery_method
            >
            <label for="delivery">{{ $t('settings.data.delivery') }}</label>
          </div>
          <div class="input-wrap">
            <input 
              type="radio" 
              name="product_recieved" 
              id="from_branch"
              value="1"
              @input="formChanged = true"
              v-model="body.delivery_method"
            >
            <label for="from_branch">{{ $t('settings.data.from_branch') }}</label>
          </div>
          <div class="input-wrap">
            <input 
              type="radio" 
              name="product_recieved" 
              id="both_ways"
              value="3"
              @input="formChanged = true"
              v-model="body.delivery_method"
            >
            <label for="both_ways">{{ $t('settings.data.both_ways') }}</label>
          </div>
        </div>
      </div>
      <button class="main-btn" :style="!formChanged ? 'pointer-events:none;background:grey;user-select:none;' : ''">
        {{ $t('settings.data.save') }}
      </button>
    </form>
    <Toast 
      ref="toast"
      position="top-right"
    />
    <Loading 
      v-if="body.city_id === '' || 
      body.whatsapp_country_code === '' || 
      body.category_id === '' || loading"
    />
  </div>
</template>


<script setup>
  import { onMounted, ref, watch } from 'vue';
  import MultiSelectSections from '../../../components/SelectInputs/MultiSelectSections.vue';
  import useApiMethods from '../../../Composables/ApiMethods'
  import Toast from 'primevue/toast'
  import CountryCode from '../../../components/SelectInputs/CountryCode.vue'
  import CitiesSelect from '../../../components/SelectInputs/CitiesSelect.vue';
  import CategorySelect from '../../../components/SelectInputs/CategorySelect.vue';
  import Loading from '../../../components/Loading.vue'
  import NeighborhoodSelect from '../../../components/SelectInputs/NeighborhoodSelect.vue';
  import { useStore } from '../../../store/store';

  // define store
  const store = useStore()

  // define api methods
  const {
    getMethod,
    getResult,
    postMethod,
    postResult,
    toast,
    loading,
    handleToast
  } = useApiMethods()

  // define formChanged Variable
  const formChanged = ref(false)

  // define body data
  const body = ref({
    image : "",
    name : "" ,
    identity_number : "",
    tax_number : "" ,
    civil_registration_number : "",
    ar_store_name : "",
    en_store_name : "",
    ur_store_name : "",
    logo: "",
    ar_store_description : "",
    en_store_description : "",
    ur_store_description : "",
    whatsapp_country_code : "",
    whatsapp_phone : "" ,
    category_id : "",
    departments : [] ,
    city_id : "",
    lat : "",
    lng : "",
    map_desc : "" ,
    neighborhood_id : "",
    minimum_order : "" ,
    bank_name : "" , 
    account_name : "" , 
    account_number : "" ,
    iban : "" ,
    bank_account_image : "" ,
    delivery_method : ""
  })

  // to handle upload / remove info image
  const uploadedInfoLocalImgChanged = ref(false)
  const uploadedInfoLocalImg = ref(null)
  const handleUploadInfoImg = (event) => {
    const file = event.target.files[0];

    if (!file) {
      handleToast('error', store?.lang === 'ar'
        ? "لم يتم تحديد أي ملف للصورة."
        : store?.lang === 'en'
        ? "No file selected for the image."
        : "تصویر کے لیے کوئی فائل منتخب نہیں کی گئی۔");
      body.value.image = ''; // Clear file
      return;
    }


    if (!file.type.startsWith('image/')) {
      handleToast('error', store?.lang === 'ar'
        ? "يجب أن يكون الملف صورة بصيغة مدعومة مثل JPEG, PNG، أو GIF."
        : store?.lang === 'en'
        ? "The file must be an image in a supported format like JPEG, PNG, or GIF."
        : "فائل کو تصویر ہونا چاہیے، جیسے JPEG، PNG، یا GIF۔");
      body.value.image = ''; // Clear invalid file
      return;
    }

    // If the file is valid
    uploadedInfoLocalImg.value = URL.createObjectURL(file); // Create a temporary URL for the image
    body.value.image = file;
    formChanged.value = true;
    uploadedInfoLocalImgChanged.value = true
  };

  // to handle upload / remove account image
  const uploadedAccountLocalImgChanged = ref(false)
  const uploadedAccountLocalImg = ref(null)
  const handleUploadAccountImg = (event) => {
    formChanged.value = true;
    uploadedAccountLocalImgChanged.value = true;

    const file = event.target.files[0];
    if (!file || body.value.bank_account_image == null) {
      handleToast('error', store?.lang === 'ar'
        ? "لم يتم تحديد أي ملف لصورة تفاصيل الحساب البنكي."
        : store?.lang === 'en'
        ? "No file selected for the account details image."
        : "اکاؤنٹ کی تفصیلات کی تصویر کے لیے کوئی فائل منتخب نہیں کی گئی۔");
      body.value.bank_account_image = ''; // Clear file
      return;
    }


    if (!file.type.startsWith('image/')) {
      handleToast('error', store?.lang === 'ar'
        ? "يجب أن يكون الملف صورة بصيغة مدعومة مثل JPEG, PNG، أو GIF."
        : store?.lang === 'en'
        ? "The file must be an image in a supported format like JPEG, PNG, or GIF."
        : "فائل کو تصویر ہونا چاہیے، جیسے JPEG، PNG، یا GIF۔");
      body.value.bank_account_image = ''; // Clear invalid file
      return;
    }

    // If the file is valid
    uploadedAccountLocalImg.value = URL.createObjectURL(file); // Create a temporary URL for the image
    body.value.bank_account_image = file;
    formChanged.value = true
    uploadedAccountLocalImgChanged.value = true
  };




  const handleRemoveAccountLocalImg = () =>{
    uploadedAccountLocalImgChanged.value = true
    uploadedAccountLocalImg.value = null
    body.value.bank_account_image = null
  }


  
    // to handle upload / remove logo image
  const uploadedLogoImgChanged = ref(false)
  const uploadedLogoImg = ref(null)
  const handleUploadLogoImg = (event) => {
    formChanged.value = true;
    uploadedLogoImgChanged.value = true;

    const file = event.target.files[0];

    if (!file) {
      handleToast('error', store?.lang === 'ar'
        ? "لم يتم تحديد أي ملف لشعار الشركة."
        : store?.lang === 'en'
        ? "No file selected for the logo image."
        : "لوگو تصویر کے لیے کوئی فائل منتخب نہیں کی گئی۔");
      body.value.logo = ''; // Clear file
      return;
    }


    if (!file.type.startsWith('image/')) {
      handleToast('error', store?.lang === 'ar'
        ? "يجب أن يكون الملف صورة بصيغة مدعومة مثل JPEG, PNG، أو GIF."
        : store?.lang === 'en'
        ? "The file must be an image in a supported format like JPEG, PNG, or GIF."
        : "فائل کو تصویر ہونا چاہیے، جیسے JPEG، PNG، یا GIF۔");
      body.value.logo = ''; // Clear invalid file
      return;
    }

    // If the file is valid
    uploadedLogoImg.value = URL.createObjectURL(file); // Create a temporary URL for the image
    body.value.logo = file;
    formChanged.value = true
    uploadedLogoImgChanged.value = true
  };


  const handleRemoveLogoImg = () =>{
    uploadedLogoImgChanged.value = true
    uploadedLogoImg.value = null
    body.value.logo = null
  }


  // to handle country code for whatsapp
  const handleCountryCode = (newValue) =>{
    formChanged.value = true
    body.value.country_code = newValue
  }


  // define fetched neighborhoods && check if the city changed to un/disable the neighborhoods select
  const fetchedNeighborhoods = ref()
  const cityChanged = ref(false)



  // to handle change in city
  const handleCity = (newValue) => {
    // formChanged.value = true
    body.value.city_id = newValue
    getMethod(`general/get_city_neighborhoods/${newValue}` , false)
    cityChanged.value = true
  }

  watch(()=> getResult?.value , (newValue)=>{
    if(cityChanged.value && newValue){
      // console.log(newValue.data)
      // body.value.neighborhood_id = 0
      fetchedNeighborhoods.value = newValue.data
    }
  })

  // to handle change in neighborhood
  const handleNeighborhood = (newValue) => {
    formChanged.value = true
    body.value.neighborhood_id = newValue
  }

  // to handle change in category
  const handleCategory = (newValue) => {
    formChanged.value = true
    body.value.category_id = newValue
  }

  // to handle sub categories from multiselect sections
  const handleDepartments = (newValue) => {
    formChanged.value = true
    body.value.departments = newValue
  } 


  watch(()=> getResult.value?.data , (newValue)=>{
    if(newValue && !cityChanged.value){
      uploadedInfoLocalImg.value = newValue.image
      uploadedLogoImg.value = newValue.logo
      body.value.name = newValue.name
      body.value.identity_number = newValue.identity_number
      body.value.civil_registration_number = newValue.civil_registration_number
      body.value.tax_number = newValue.tax_number
      body.value.ar_store_name = newValue.store_name['ar']
      body.value.en_store_name = newValue.store_name['en']
      body.value.ur_store_name = newValue.store_name['ur']
      body.value.logo = newValue?.logo
      body.value.ar_store_description = newValue.store_description['ar']
      body.value.en_store_description = newValue.store_description['en']
      body.value.ur_store_description = newValue.store_description['ur']
      body.value.preparing_time = newValue.preparing_time
      body.value.whatsapp_country_code = newValue.whatsapp_country_code
      body.value.whatsapp_phone = newValue.whatsapp_phone
      body.value.city_id = newValue.city.id
      body.value.lat = newValue.location.lat
      body.value.lng = newValue.location.lng
      body.value.map_desc = newValue.location.map_desc
      body.value.category_id = newValue.main_category.id
      newValue.categories.forEach((item) => {
        body.value.departments.push(item)
      })
      body.value.neighborhood_id = newValue.neighborhood.id
      body.value.minimum_order = newValue.minimum_order
      body.value.bank_name = newValue.bank_info?.bank_name
      body.value.account_name = newValue.bank_info?.account_name
      body.value.account_number = newValue.bank_info?.account_number
      body.value.iban = newValue.bank_info?.iban
      body.value.bank_account_image = newValue.bank_info?.bank_account_image
      uploadedAccountLocalImg.value = newValue.bank_info?.bank_account_image
      body.value.delivery_method = newValue.delivery_method.value
      store.handleStoredProfile(getResult.value?.data)
      setTimeout(() => {
        handleCity(body.value.city_id)
      }, 300);
    }
  })


  watch(()=> postResult?.value , (newValue)=>{
    if(newValue.key === 'success'){
      getMethod('provider/profile' , true)
    }
  })


  const handleSubmit = () => {
    const dataForm = new FormData()
    if(uploadedInfoLocalImgChanged.value){
      dataForm.append('image', body.value.image);
    }
    dataForm.append('name', body.value.name);
    dataForm.append('identity_number', body.value.identity_number);
    dataForm.append('tax_number', body.value.tax_number);
    dataForm.append('civil_registration_number', body.value.civil_registration_number);
    dataForm.append('store_name[ar]', body.value.ar_store_name);
    dataForm.append('store_name[en]', body.value.en_store_name);
    dataForm.append('store_name[ur]', body.value.ur_store_name);
    dataForm.append('store_description[ar]', body.value.ar_store_description);
    dataForm.append('store_description[en]', body.value.en_store_description);
    dataForm.append('store_description[ur]', body.value.ur_store_description);
    dataForm.append('preparing_time', body.value.preparing_time);
    dataForm.append('whatsapp_country_code', body.value.whatsapp_country_code);
    dataForm.append('whatsapp_phone', body.value.whatsapp_phone);
    dataForm.append('city_id', body.value.city_id);
    dataForm.append('category_id', body.value.category_id);
    dataForm.append('lat', body.value.lat);
    dataForm.append('lng', body.value.lng);
    dataForm.append('map_desc', body.value.map_desc);
    dataForm.append('neighborhood_id', body.value.neighborhood_id);
    dataForm.append('minimum_order', body.value.minimum_order);
    dataForm.append('bank_name', body.value.bank_name);
    dataForm.append('account_name', body.value.account_name);
    dataForm.append('account_number', body.value.account_number);
    dataForm.append('iban', body.value.iban);
    if(uploadedAccountLocalImgChanged.value){
      dataForm.append('bank_account_image', body.value.bank_account_image);
    }
    if(uploadedLogoImgChanged.value){
      dataForm.append('logo', body.value.logo);
    }
    dataForm.append('delivery_method', body.value.delivery_method);

    // Append departments (assuming it is an array)
    body.value.departments.forEach((department, index) => {
      dataForm.append(`sub_categories[${index}]`, department.id);
    });
    if(body.value.preparing_time <= 0){
      handleToast('error' , store?.lang === 'ar' 
        ? "مدة تجهيز الطلب يجب أن تكون أكبر من صفر"  // "Order preparation time must be greater than zero"
        : store?.lang === 'en' 
        ? 'Order preparation time must be greater than zero.' 
        : 'آرڈر تیاری کا وقت صفر سے زیادہ ہونا چاہیے'  // "Order preparation time must be greater than zero."
    )}else{
      postMethod('provider/profile/update?_method=put' , dataForm , true , '/orders' , 'toast')
    }
  }

  onMounted(()=>{
    getMethod('provider/profile' , true)
  })
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/mixins";
  form{
    max-width: 1200px;
    .image-uploader{
      margin-bottom: 30px;
      .circle{
        transition: 0.3s;
        &:hover{
          filter: brightness(0.5);
        }
      }
    }
    .page_content{
      padding: 20px;
      border-radius: 15px;
      box-shadow: -3px 3px 4px 0px #00000026;
      @include displayGrid(45%);
      width: 100%;
      &:not(:last-of-type){
        margin-bottom: 30px
      }
      .input-wrap{
        &.multiselect_input{
          // justify-content: end !important;
        }
        label{
          margin-bottom: 8px;
          &.fileInput_text{
            text-align: start;
            margin: 0;
            width: 100%;
          }
        }
        .input{
          @include displayFlex();
          margin-bottom: 0 !important;
          height: unset !important;
          margin-block-start:0;
          .images{
            width: 100%;
          }
        }
      }
      .whatsapp-inputs{
        .inputs{
          @include displayFlex($gap : 0);
          margin-block-end: 0 !important;
          .input:last-of-type{
            max-width: 80px;
            margin-inline-start: auto;
            // transform: translateY(-1px);
            border-inline-start: 1px solid #e4e4e4;
            padding-inline-start: 5px;
          }
        }
      }
      @media (max-width : 600px){
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
    }
    .radio_inputs{
      margin-inline-end: auto;
      .inputs{
        @include displayFlex();
        margin-block-start: 5px;
        .input-wrap{
          @include displayFlex($gap : 5px);
          label{
            text-wrap: nowrap;
            cursor: pointer;
          }
          input{
            width: 20px;
            flex-shrink: 0;
          }
        }
      }
    }
    .main-btn{
      max-width: 450px;
      margin: 50px auto 0;
    }
  }
</style>