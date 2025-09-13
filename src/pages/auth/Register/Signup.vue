<template>
  <div class="sign-page">
    <div class="content">
      <LogoBar />
      <div class="form-side">
        <div class="upper-bar">
          <LanguageSelect />
          <div class="skew-image">
            <img :class="{ 'rotate-en': $i18n.locale === 'en' }" src="/src/assets/images/skew.png" alt="img" loading="lazy">
            <div class="title">
              <p>{{ $t('signup.title') }}</p>
            </div>
          </div>
        </div>
        <form action="" @submit.prevent="handleSubmit">
          <h5>{{ $t('signup.form_title') }}</h5>
          <p>{{ $t('signup.welcome') }}</p>


          <!--###################### to upload the image #########################-->
          <div class="image-uploader">
            <label for="img_upload" v-if="body.image" class="circle">
              <img :src="localImage" alt="Uploaded Image" loading="lazy">
            </label>
            <label class="circle" for="img_upload" v-else>
              <i class="pi pi-upload"></i>
            </label>
            <input 
              type="file"
              hidden
              id="img_upload"
              accept="image/*"
              @change="handleUploadImage"
            >
            <label for="img_upload">{{ $t('signup.img_title') }}</label>
          </div>
          <h6 class="error-msg" id="imageError" v-if="body.errors.image"><i class="pi pi-times"></i> {{ body.errors.image }}</h6>


          <!--###################### to upload the name #########################-->
          <label for="name">{{ $t('signup.name') }}</label>
          <div class="input" :style="body.errors.name ? 'margin-bottom:4px;' : 'margin-bottom:15px;' ">
            <input 
              type="text"
              :placeholder="$t('signup.name_placeholder')"
              v-model="body.name"
              @input="clearError('name')"
            >
          </div>
          <h6 class="error-msg" id="nameError" v-if="body.errors.name"><i class="pi pi-times"></i> {{ body.errors.name }}</h6>
          
          
          <!--###################### to upload the email #########################-->
          <label for="email">{{ $t('signup.email') }}</label>
          <div class="input" :style="body.errors.email ? 'margin-bottom:4px;' : 'margin-bottom:15px;' ">
            <input 
              type="text" 
              :placeholder="$t('signup.email_placeholder')" 
              id="email"
              v-model="body.email"
              @input="clearError('email')"
            >
          </div>
          <h6 class="error-msg" id="emailError" v-if="body.errors.email"><i class="pi pi-times"></i> {{ body.errors.email }}</h6>
          
          
          <!--###################### to upload the phone #########################-->
          <div class="input-wrap phonewithcode">
            <label for="phone">{{ $t('signup.phone') }}</label>
            <div class="inputs" :style="body.errors.phone ? 'margin-bottom:4px;' : 'margin-bottom:15px;' ">
              <div class="input">
                <input 
                  type="number" 
                  :placeholder="$t('signup.phone_placeholder')"
                  id="phone"
                  v-model="body.phone"
                  @input="clearError('phone')"
                >
              </div>
              <div class="input">
                <CountryCode 
                  @handleCountryCode="handleCountryCode"
                />
              </div>
            </div>
            <h6 class="error-msg" id="phoneError" v-if="body.errors.phone"><i class="pi pi-times"></i> {{ body.errors.phone }}</h6>
          </div>
          
          
          <!--###################### to upload identity number #########################-->
          <label for="identity_number">{{ $t('signup.identity_number') }}</label>
          <div class="input" :style="body.errors.identity_number ? 'margin-bottom:4px;' : 'margin-bottom:15px;' ">
            <input 
              type="text"
              :placeholder="$t('signup.identity_number_placeholder')"
              id="identity_number"
              v-model="body.identity_number"
              @input="clearError('identity_number')"
            >
          </div>
          <h6 class="error-msg" id="identity_numberError" v-if="body.errors.identity_number"><i class="pi pi-times"></i> {{ body.errors.identity_number }}</h6>
          
          
          
          <!--###################### to upload civil registration number #########################-->
          <label for="civil_registration_number">{{ $t('signup.civil_registration_number') }}</label>
          <div class="input" :style="body.errors.civil_registration_number ? 'margin-bottom:4px;' : 'margin-bottom:15px;' ">
            <input 
              type="text"
              :placeholder="$t('signup.civil_registration_number_placeholder')"
              id="civil_registration_number"
              v-model="body.civil_registration_number"
              @input="clearError('civil_registration_number')"
            >
          </div>
          <h6 class="error-msg" id="civil_registration_numberError" v-if="body.errors.civil_registration_number"><i class="pi pi-times"></i> {{ body.errors.civil_registration_number }}</h6>
          
          
          
          <!--###################### to handle tax number #########################-->
          <label for="tax_number">{{ $t('signup.tax_number') }}</label>
          <div class="input" :style="body.errors.tax_number ? 'margin-bottom:4px;' : 'margin-bottom:15px;' ">
            <input 
              type="text"
              :placeholder="$t('signup.tax_number_placeholder')"
              id="tax_number"
              v-model="body.tax_number"
              @input="clearError('tax_number')"
            >
          </div>
          <h6 class="error-msg" id="tax_numberError" v-if="body.errors.tax_number"><i class="pi pi-times"></i> {{ body.errors.tax_number }}</h6>
          
          
          
          <!--###################### to handle ar store title #########################-->
          <label for="ar_store_title">{{ $t('signup.ar_store_title') }}</label>
          <div class="input" :style="body.errors.ar_store_title ? 'margin-bottom:4px;' : 'margin-bottom:15px;' ">
            <textarea 
              :placeholder="$t('signup.ar_store_title_placeholder')"
              id="ar_store_title"
              v-model="body.ar_store_title"
              @input="clearError('ar_store_title')"
              @blur="body.ar_store_title = body.ar_store_title.trim()"
            ></textarea>
          </div>
          <h6 class="error-msg" id="ar_store_titleError" v-if="body.errors.ar_store_title"><i class="pi pi-times"></i> {{ body.errors.ar_store_title }}</h6>

          <!--###################### to handle en store title #########################-->
          <label for="en_store_title">{{ $t('signup.en_store_title') }}</label>
          <div class="input" :style="body.errors.en_store_title ? 'margin-bottom:4px;' : 'margin-bottom:15px;' ">
            <textarea 
              :placeholder="$t('signup.en_store_title_placeholder')"
              id="en_store_title"
              v-model="body.en_store_title"
              @input="clearError('en_store_title')"
              @blur="body.en_store_title = body.en_store_title.trim()"
            ></textarea>
          </div>
          <h6 class="error-msg" id="en_store_titleError" v-if="body.errors.en_store_title"><i class="pi pi-times"></i> {{ body.errors.en_store_title }}</h6>

          <!--###################### to handle ur store title #########################-->
          <label for="ur_store_title">{{ $t('signup.ur_store_title') }}</label>
          <div class="input" :style="body.errors.ur_store_title ? 'margin-bottom:4px;' : 'margin-bottom:15px;' ">
            <textarea 
              :placeholder="$t('signup.ur_store_title_placeholder')"
              id="ur_store_title"
              v-model="body.ur_store_title"
              @input="clearError('ur_store_title')"
              @blur="body.ur_store_title = body.ur_store_title.trim()"
            ></textarea>
          </div>
          <h6 class="error-msg" id="ur_store_titleError" v-if="body.errors.ur_store_title"><i class="pi pi-times"></i> {{ body.errors.ur_store_title }}</h6>

          <!--###################### to handle ar store description #########################-->
          <label for="ar_store_description">{{ $t('signup.ar_store_description') }}</label>
          <div class="input" :style="body.errors.ar_store_description ? 'margin-bottom:4px;' : 'margin-bottom:15px;' ">
            <textarea 
              :placeholder="$t('signup.ar_store_description_placeholder')"
              id="ar_store_description"
              v-model="body.ar_store_description"
              @input="clearError('ar_store_description')"
              @blur="body.ar_store_description = body.ar_store_description.trim()"
            ></textarea>
          </div>
          <h6 class="error-msg" id="ar_store_descriptionError" v-if="body.errors.ar_store_description"><i class="pi pi-times"></i> {{ body.errors.ar_store_description }}</h6>

          <!--###################### to handle en store description #########################-->
          <label for="en_store_description">{{ $t('signup.en_store_description') }}</label>
          <div class="input" :style="body.errors.en_store_description ? 'margin-bottom:4px;' : 'margin-bottom:15px;' ">
            <textarea 
              :placeholder="$t('signup.en_store_description_placeholder')"
              id="en_store_description"
              v-model="body.en_store_description"
              @input="clearError('en_store_description')"
              @blur="body.en_store_description = body.en_store_description.trim()"
            ></textarea>
          </div>
          <h6 class="error-msg" id="en_store_descriptionError" v-if="body.errors.en_store_description"><i class="pi pi-times"></i> {{ body.errors.en_store_description }}</h6>

          <!--###################### to handle ur store description #########################-->
          <label for="ur_store_description">{{ $t('signup.ur_store_description') }}</label>
          <div class="input" :style="body.errors.ur_store_description ? 'margin-bottom:4px;' : 'margin-bottom:15px;' ">
            <textarea 
              :placeholder="$t('signup.ur_store_description_placeholder')"
              id="ur_store_description"
              v-model="body.ur_store_description"
              @input="clearError('ur_store_description')"
              @blur="body.ur_store_description = body.ur_store_description.trim()"
            ></textarea>
          </div>
          <h6 class="error-msg" id="ur_store_descriptionError" v-if="body.errors.ur_store_description"><i class="pi pi-times"></i> {{ body.errors.ur_store_description }}</h6>

          
          <!--###################### to handle category select #########################-->
          <label for="category">{{ $t('signup.category') }}</label>
          <div class="input" :style="body.errors.category ? 'margin-bottom:4px;' : 'margin-bottom:15px;' ">
            <CategorySelect 
              :category_id = "Number(body.category)"
              @clearError="clearError"
              @handleCategory = "handleCategory"
            />
          </div>
          <h6 class="error-msg" id="categoryError" v-if="body.errors.category"><i class="pi pi-times"></i> {{ body.errors.category }}</h6>
          
          
          
          <!--######################  to handle subCategories #########################-->
          <label for="departments">{{ $t('signup.departments') }}</label>
          <MultiSelectSections
            :category_id = "Number(body.category)"
            :departments = "subCategories"
            :departmentError = body.errors.departments
            @handleDepartments = "handleDepartments"
          />
          <h6 class="error-msg" id="departmentsError" v-if="body.errors.departments"><i class="pi pi-times"></i> {{ body.errors.departments }}</h6>
          
          
          
          <!--###################### to handle upload logo #########################-->
          <label for="logo_img">{{ $t('signup.logo_label') }}</label>
          <div class="input" :style="body.logoImg !== '' ? 'height:60px;' : '' || body.errors.logoImg ? 'margin-bottom:4px' : 'margin-bottom:15px'">
            <input 
              type="file"
              id="logo_img"
              accept="image/*"
              hidden
            @change="handleUploadLogoImg"
            >
            <label class="pi pi-camera" for="logo_img"></label>
          <label for="logo_img" class="image_placeholder" v-if="body.logoImg === ''">{{$t('signup.logo_placeholder')}}</label>
            <label for="logo_img" v-else class="images">
              <div class="image">
                <i class="pi pi-trash"></i>
                <img :src="localLogoImg" alt="image" loading="lazy">
              </div>
            </label>
          </div>
          <h6 class="error-msg" id="logoImgError" v-if="body.errors.logoImg"><i class="pi pi-times"></i> {{ body.errors.logoImg }}</h6>
          
          
          
          <!--###################### to handle whatsapp  #########################-->
          <div class="input-wrap phonewithcode">
            <label for="whatsapp">{{ $t('signup.whatsapp_label') }}</label>
            <div class="inputs" :style="body.errors.whatsapp ? 'margin-bottom:4px;' : 'margin-bottom:15px;' ">
              <div class="input">
                <input 
                  type="number" 
                  :placeholder="$t('signup.whatsapp_placeholder')"
                  id="whatsapp"
                  v-model="body.whatsapp"
                  @input="clearError('whatsapp')"
                >
              </div>
              <div class="input">
                <CountryCode 
                  @handleCountryCode="handleWhatsappCountryCode"
                />
              </div>
            </div>
            <h6 class="error-msg" id="whatsappError" v-if="body.errors.whatsapp"><i class="pi pi-times"></i> {{ body.errors.whatsapp }}</h6>
          </div>
          
          
          
          <!--###################### to handle arrangment duration #########################-->
          <label for="minimum_order">{{ $t('signup.minimum_order') }}</label>
          <div class="input" :style="body.errors.minimum_order ? 'margin-bottom:4px;' : 'margin-bottom:15px;' ">
            <input 
              type="text"
              :placeholder="$t('signup.minimum_order_placeholder')"
              id="minimum_order"
              v-model="body.minimum_order"
              @input="clearError('minimum_order')"
            >
          </div>
          <h6 class="error-msg" id="minimum_orderError" v-if="body.errors.minimum_order"><i class="pi pi-times"></i> {{ body.errors.minimum_order }}</h6>
          
          
          
          <!--###################### to handle arrangment duration #########################-->
          <label for="arrangement_duration">{{ $t('signup.arrangement_duration') }}</label>
          <div class="input" :style="body.errors.arrangement_duration ? 'margin-bottom:4px;' : 'margin-bottom:15px;' ">
            <input 
              type="text"
              :placeholder="$t('signup.arrangement_duration_placeholder')"
              id="arrangement_duration"
              v-model="body.arrangement_duration"
              @input="clearError('arrangement_duration')"
            >
          </div>
          <h6 class="error-msg" id="arrangement_durationError" v-if="body.errors.arrangement_duration"><i class="pi pi-times"></i> {{ body.errors.arrangement_duration }}</h6>
          
          
          
          <!--###################### to handle city #########################-->
          <label for="city">{{ $t('signup.city_label') }}</label>
          <div class="input" :style="body.errors.city ? 'margin-bottom:4px;' : 'margin-bottom:15px;' ">
            <CitiesSelect 
              :city_id = "Number(body.city)"
              @clearError="clearError"
              @handleCity = "handleCity"
            />
          </div>
          <h6 class="error-msg" id="cityError" v-if="body.errors.city"><i class="pi pi-times"></i> {{ body.errors.city }}</h6>



          <!--###################### to handle neighborhood #########################-->
          <label for="neighborhood" v-if="body.city">{{ $t('signup.neighborhood_label') }}</label>
          <div class="input"  v-if="body.city" :style="body.errors.neighborhood ? 'margin-bottom:4px;' : 'margin-bottom:15px;' ">
            <NeighborhoodSelect 
              :neighborhood_id = "Number(body.neighborhood)"
              :neighborhoods ="neighborhoods"
              @clearError="clearError"
              @handleNeighborhood = "handleNeighborhood"
            />
          </div>
          <h6 class="error-msg" id="neightborhoodError" v-if="body.errors.neighborhood"><i class="pi pi-times"></i> {{ body.errors.neighborhood }}</h6>



          <!--###################### to handle store address #########################-->
          <label for="store_address">{{ $t('signup.store_address') }}</label>
          <div class="input" :style="body.errors.store_address ? 'margin-bottom:4px;' : 'margin-bottom:15px;' ">
            <input 
              type="text"
              :placeholder="$t('signup.store_address_placeholder')"
              v-model="body.store_address"
              @input="clearError('store_address')"
              >
              <!-- @click="handleShowMap" -->
            <i class="pi pi-map-marker"></i>
          </div>
          <!-- <h6 class="error-msg" id="store_addressError" v-if="body.errors.store_address"><i class="pi pi-times"></i> {{ body.errors.store_address }}</h6> -->



          <!--###################### to handle owner #########################-->
          <label for="owner_label">{{ $t('signup.owner_label') }}</label>
          <div class="input" :style="body.errors.owner_label ? 'margin-bottom:4px;' : 'margin-bottom:15px;' ">
            <input 
              type="text"
              :placeholder="$t('signup.owner_placeholder')"
              v-model="body.owner_label"
              @input="clearError('owner_label')"
            >
          </div>
          <h6 class="error-msg" id="owner_labelError" v-if="body.errors.owner_label"><i class="pi pi-times"></i> {{ body.errors.owner_label }}</h6>



          <!--###################### to handle account #########################-->
          <label for="account_label">{{ $t('signup.account_label') }}</label>
          <div class="input" :style="body.errors.account_label ? 'margin-bottom:4px;' : 'margin-bottom:15px;' ">
            <input 
              type="text"
              :placeholder="$t('signup.account_placeholder')"
              v-model="body.account_label"
              @input="clearError('account_label')"
            >
          </div>
          <h6 class="error-msg" id="account_labelError" v-if="body.errors.account_label"><i class="pi pi-times"></i> {{ body.errors.account_label }}</h6>



          <!--###################### to handle bank name #########################-->
          <label for="bank_name">{{ $t('signup.bank_name') }}</label>
          <div class="input" :style="body.errors.bank_name ? 'margin-bottom:4px;' : 'margin-bottom:15px;' ">
            <input 
              type="text"
              :placeholder="$t('signup.bank_name_placeholder')"
              v-model="body.bank_name"
              @input="clearError('bank_name')"
            >
          </div>
          <h6 class="error-msg" id="bank_nameError" v-if="body.errors.bank_name"><i class="pi pi-times"></i> {{ body.errors.bank_name }}</h6>



          <!--###################### to handle iban #########################-->
          <label for="iban_label">{{ $t('signup.iban_label') }}</label>
          <div class="input" :style="body.errors.iban_label ? 'margin-bottom:4px;' : 'margin-bottom:15px;' ">
            <input 
              type="text"
              :placeholder="$t('signup.iban_placeholder')"
              v-model="body.iban_label"
              @input="clearError('iban_label')"
            >
          </div>
          <h6 class="error-msg" id="iban_labelError" v-if="body.errors.iban_label"><i class="pi pi-times"></i> {{ body.errors.iban_label }}</h6>



          <!--###################### to handle account details #########################-->
          <label for="account_details_img">{{ $t('signup.account_details_label') }}</label>
          <div class="input" :style="body.account_details_img !== '' ? 'height:60px;' : '' || body.errors.account_details_img ? 'margin-bottom:4px' : 'margin-bottom:15px'">
            <input 
              type="file"
              id="account_details_img"
              accept="image/*"
              hidden
              @change="handleUploadAccountDetailsImg"
            >
            <label class="pi pi-camera" for="account_details_img"></label>
            <label for="account_details_img"  class="image_placeholder" v-if="body.account_details_img === ''">{{$t('signup.account_details_placeholder')}}</label>
            <label for="account_details_img" v-else class="images">
              <div class="image">
                <i class="pi pi-trash"></i>
                <img :src="localAccountImage" alt="image" loading="lazy">
              </div>
            </label>
          </div>
          <h6 class="error-msg" id="account_details_imgError" v-if="body.errors.account_details_img"><i class="pi pi-times"></i> {{ body.errors.account_details_img }}</h6>
          <!--###################### to handle delivery_method #########################-->
          <label for="delivery_method">{{ $t('signup.delivery_method') }}</label>
          <div class="inputs">
            <div class="radio_input">
              <input 
                type="radio" 
                name="delivery_method" 
                id="delivery"
                v-model="body.delivery_method"
                value="2"
                :checked="body.delivery_method === '2'"
                @input="clearError('delivery_method')"
              >
              <label for="delivery">{{ $t('signup.delivery') }}</label>
            </div>
            <div class="radio_input">
              <input 
                type="radio" 
                name="delivery_method" 
                id="store"
                v-model="body.delivery_method"
                value="1"
                :checked="body.delivery_method === '1'"
                @input="clearError('delivery_method')"
              >
              <label for="store">{{ $t('signup.store_method') }}</label>
            </div>
            <div class="radio_input">
              <input 
                type="radio" 
                name="delivery_method" 
                id="both"
                v-model="body.delivery_method"
                value="3"
                :checked="body.delivery_method === '3'"
                @input="clearError('delivery_method')"
              >
              <label for="both">{{ $t('signup.both_methods') }}</label>
            </div>
          </div>
          <h6 class="error-msg" id="delivery_methodError" v-if="body.errors.delivery_method"><i class="pi pi-times"></i> {{ body.errors.delivery_method }}</h6>


          
          <!--###################### to handle terms #########################-->
          <div class="terms">
            <input 
              type="checkbox" 
              id="terms"
              v-model="body.terms"
              @input="clearError('terms')"
            >
            <label for="terms">
              {{ $t('signup.agreewith') }}
              <span class="terms_link" @click="navigateToTerms">
                {{ $t('signup.terms') }}
              </span>
            </label>
          </div>
          <h6 class="error-msg" id="termsError" v-if="body.errors.terms"><i class="pi pi-times"></i> {{ body.errors.terms }}</h6>


          
          <!--###################### to handle submit btn #########################-->
          <button type="submit" class="main-btn">
            {{ $t('signup.btn') }}
          </button>


          <!--###################### to handle have account #########################-->
          <p>{{ $t('signup.have_account') }} <RouterLink to="/login/phone-entry">{{ $t('signup.login') }}</RouterLink></p>
        </form>
      </div>
    </div>
      <!----------------------------------- Google Map ------------------------------------->
    <MapPopup 
      v-if="showMap"
      :selectedPosition="selectedPosition"
      :lat="Number(selectedPosition?.lat)"
      :lng="Number(selectedPosition?.lng)"
      @handleShowMap="handleShowMap"
      @handleMapClick="handleMapClick"
    />
    <!-- ############ to handle toast ############ -->
    <Toast 
      ref="toast"
      position="top-right"
    />
    <Loading v-if=loading />
  </div>
</template>

<script setup>
  import { ref, nextTick, watch, onMounted, watchEffect } from 'vue';
  import LanguageSelect from '../../../components/SelectInputs/LanguageSelect.vue';
  import LogoBar from '../../../components/LogoBar.vue';
  import MultiSelectSections from '../../../components/SelectInputs/MultiSelectSections.vue';
  import { routerKey, RouterLink , useRouter } from 'vue-router';
  import { useStore } from '../../../store/store';
  import CategorySelect from '../../../components/SelectInputs/CategorySelect.vue';
  import useApiMethods from '../../../Composables/ApiMethods';
  import CitiesSelect from '../../../components/SelectInputs/CitiesSelect.vue';
  import NeighborhoodSelect from '../../../components/SelectInputs/NeighborhoodSelect.vue';
  import Toast from 'primevue/toast';
  import Loading from '../../../components/Loading.vue';
  import CountryCode from '../../../components/SelectInputs/CountryCode.vue';
  import MapPopup from '../../../components/Popups/MapPopup.vue'
  import useFawmiMap from '../../../Composables/handleMap'
  import { useRegisterStore } from '../../../store/registerStore';

  // define store of register form data
  const registerStore = useRegisterStore();

  // define router
  const router = useRouter()
  
  // to handle fawmi google maps popup
  const {
    showMap,
    handleShowMap,
    selectedPosition,
    handleMapClick
  } = useFawmiMap() 


  // to handle api methods
  const {
    getMethod ,
    postMethod,
    getResult ,
    toast,
    loading,
    handleToast
  } = useApiMethods()

  // to import store 
  const store = useStore()

  // to remove the error while user entering the input
  const clearError = (field) => {
    if (body.value.errors[field]) {
      delete body.value.errors[field]; // Remove the error for the specific field
    }
  };

  // to handle country code
  const handleCountryCode = (newValue) =>{
    body.value.country_code = newValue
  }

  
  // to handle whatsapp country code
  const handleWhatsappCountryCode = (newValue) =>{
    body.value.whatsapp_code = newValue
  }


  // To handle body values
  const body = ref({
    image: "",
    name: "",
    email: "",
    phone: "",
    country_code: "966",
    identity_number: "",
    civil_registration_number: "",
    tax_number: "",
    ar_store_title: "",
    en_store_title: "",
    ur_store_title: "",
    ar_store_description: "",
    en_store_description: "",
    ur_store_description: "",
    category: 0,
    departments : [],
    lat : "31.037933",
    lng : "31.381523",
    map_desc : "ElRyadh",
    store_address : 'ElRyadh',
    logoImg: "",
    whatsapp_code: "966",
    whatsapp: "",
    minimum_order : "",
    arrangement_duration : "",
    city: "",
    neighborhood: "",
    owner_label: "",
    account_label: "",
    bank_name : "",
    iban_label: "",
    account_details_img: "",
    delivery_method : "",
    terms: false, // Changed to boolean for checkbox
    errors: {}
  });


  
  // Clear form data
  const clearForm = () => {
    registerStore.clearFormData();
  };
  
  
  const navigateToTerms = () =>{
    registerStore.saveFormData(body.value);
    router.push('/terms_and_conditions')
  }

  // To handle upload image
  const localImage = ref();
  const handleUploadImage = (event) => {
    const file = event.target.files[0];

    if (!file) {
      handleToast('error', store?.lang === 'ar'
        ? "لم يتم تحديد أي ملف."
        : store?.lang === 'en'
        ? "No file selected."
        : "کوئی فائل منتخب نہیں کی گئی۔");
      body.value.image = '';
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
    localImage.value = URL.createObjectURL(file);
    body.value.image = file;
    delete body.value.errors.image; // Clear error if the image is valid
  };


  // to handle upload logo image
  const localLogoImg = ref();
  const handleUploadLogoImg = (event) => {
    const file = event.target.files[0];

    if (!file) {
      handleToast('error', store?.lang === 'ar'
        ? "لم يتم تحديد أي ملف."
        : store?.lang === 'en'
        ? "No file selected."
        : "کوئی فائل منتخب نہیں کی گئی۔");
      return;
    }

    if (!file.type.startsWith('image/')) {
      handleToast('error', store?.lang === 'ar'
        ? "يجب أن يكون الملف صورة بصيغة مدعومة مثل JPEG, PNG, أو GIF."
        : store?.lang === 'en'
        ? 'The file must be an image in a supported format like JPEG, PNG, or GIF.'
        : 'فائل کو تصویر ہونا چاہیے، جیسے JPEG، PNG، یا GIF۔');
      return;
    }

    // Clear any previous error and update the file
    body.value.errors.logoImg = '';
    body.value.logoImg = file;
    localLogoImg.value = URL.createObjectURL(file);
  };

  
  // to handle upload account details image
  const localAccountImage = ref();
  const handleUploadAccountDetailsImg = (event) => {
    const file = event.target.files[0];

    if (!file) {
      handleToast('error', store?.lang === 'ar'
        ? "لم يتم تحديد أي ملف."
        : store?.lang === 'en'
        ? "No file selected."
        : "کوئی فائل منتخب نہیں کی گئی۔");
      body.value.account_details_img = '';
      return;
    }

    if (!file.type.startsWith('image/')) {
      handleToast('error', store?.lang === 'ar'
        ? "يجب أن يكون الملف صورة بصيغة مدعومة مثل JPEG, PNG، أو GIF."
        : store?.lang === 'en'
        ? "The file must be an image in a supported format like JPEG, PNG, or GIF."
        : "فائل کو تصویر ہونا چاہیے، جیسے JPEG، PNG، یا GIF۔");
      body.value.account_details_img = ''; // Clear invalid file
      return;
    }

    // If the file is valid
    body.value.errors.account_details_img = ''; // Clear error if valid
    localAccountImage.value = URL.createObjectURL(file);
    body.value.account_details_img = file;
  };


  
  watchEffect(()=>{
    if(body.value.image){
      localImage.value = URL.createObjectURL(body.value.image)
    }
    if(body.value.logoImg){
      localLogoImg.value = URL.createObjectURL(body.value.logoImg)
    }
    if(body.value.account_details_img){
      localAccountImage.value = URL.createObjectURL(body.value.account_details_img)
    }
  })


  // to handle validate the inputs
  const validateInputs = () => {
    const errors = {};

    // Check if the profile picture is added
    if (!body.value.image) {
      errors.image = store?.lang === 'ar' ? "يجب إضافة الصورة الشخصية" 
        : store?.lang === 'en' ? 'You must add the profile picture.' 
        : 'شخصی تصویر شامل کرنی چاہیے';
    }

    // Validate the name field (min length 2)
    if (!body.value.name) {
      errors.name = store?.lang === 'ar' ? "الاسم مطلوب" 
        : store?.lang === 'en' ? 'Name is required.' 
        : 'نام ضروری ہے';
    } else if (body.value.name.length < 2) {
      errors.name = store?.lang === 'ar' ? "يجب أن يكون الاسم مكونًا من حرفين على الأقل"
        : store?.lang === 'en' ? 'Name must be at least 2 characters long.'
        : 'نام میں کم از کم 2 حروف ہونے چاہئیں';
    }

    // Validate the email field
    if (!body.value.email) {
      errors.email = store?.lang === 'ar' ? "البريد الإلكتروني مطلوب" 
        : store?.lang === 'en' ? 'Email is required.' 
        : 'ایمیل ضروری ہے';
    } else if (!/\S+@\S+\.\S+/.test(body.value.email)) {
      // Check if the email has an '@' and a domain (basic validation)
      errors.email = store?.lang === 'ar' ? "البريد الإلكتروني غير صالح. يجب أن يحتوي على @ ونطاق صالح." 
        : store?.lang === 'en' ? 'Invalid email. It should contain @ and a valid domain.' 
        : 'غلط ای میل۔ اس میں @ اور ایک درست ڈومین ہونا چاہیے';
    }

    // Validate phone number field
    if (!body.value.phone) {
      errors.phone = store?.lang === 'ar' ? "رقم الجوال مطلوب" 
        : store?.lang === 'en' ? 'Phone number is required.' 
        : 'فون نمبر ضروری ہے';
    }

    // Validate identity number
    if (!body.value.identity_number) {
      errors.identity_number = store?.lang === 'ar' ? "رقم الهوية مطلوب" 
        : store?.lang === 'en' ? 'Identity number is required.' 
        : 'شناختی نمبر ضروری ہے';
    }

    // Validate civil registration number
    if (!body.value.civil_registration_number) {
      errors.civil_registration_number = store?.lang === 'ar' ? "رقم التسجيل التجاري مطلوب" 
        : store?.lang === 'en' ? 'Civil registration number is required.' 
        : 'شہری رجسٹریشن نمبر ضروری ہے';
    }

    // Validate tax number
    if (!body.value.tax_number) {
      errors.tax_number = store?.lang === 'ar' ? "رقم الضريبة مطلوب" 
        : store?.lang === 'en' ? 'Tax number is required.' 
        : 'ٹیکس نمبر ضروری ہے';
    }

    // Validate store titles in different languages
    const storeTitleValidation = (langKey, fieldName) => {
      const value = body.value[fieldName]?.trim(); // Trim spaces before checking
      if (!value) {
        errors[fieldName] = store?.lang === 'ar' ? `عنوان المتجر باللغة ${langKey} مطلوب` 
          : store?.lang === 'en' ? `Store title in ${langKey} is required.` 
          : `متجر کا عنوان ${langKey} میں ضروری ہے`;
      }
    };

    storeTitleValidation('العربية', 'ar_store_title');
    storeTitleValidation('الإنجليزية', 'en_store_title');
    storeTitleValidation('الأوردو', 'ur_store_title');

    // Validate store descriptions in different languages
    const storeDescriptionValidation = (langKey, fieldName) => {
      const value = body.value[fieldName]?.trim(); // Trim spaces before checking
      if (!value) {
        errors[fieldName] = store?.lang === 'ar' ? `وصف المتجر باللغة ${langKey} مطلوب` 
          : store?.lang === 'en' ? `Store description in ${langKey} is required.` 
          : `متجر کی وضاحت ${langKey} میں ضروری ہے`;
      }
    };

    storeDescriptionValidation('العربية', 'ar_store_description');
    storeDescriptionValidation('الإنجليزية', 'en_store_description');
    storeDescriptionValidation('الأوردو', 'ur_store_description');

    // Validate category field
    if (!body.value.category) {
      errors.category = store?.lang === 'ar' ? "التصنيف مطلوب" 
        : store?.lang === 'en' ? 'Category is required.' 
        : 'زمرہ ضروری ہے';
    }

    // Validate departments field
    if (!body.value.departments) {
      errors.departments = store?.lang === 'ar' ? "الأقسام مطلوبة" 
        : store?.lang === 'en' ? 'Departments are required.' 
        : 'محکمے ضروری ہیں';
    }

    // Validate logo image
    if (!body.value.logoImg) {
      errors.logoImg = store?.lang === 'ar' ? "صورة الشعار مطلوبة" 
        : store?.lang === 'en' ? 'Logo image is required.' 
        : 'لوگو کی تصویر ضروری ہے';
    }

    // Validate WhatsApp number
    if (!body.value.whatsapp) {
      errors.whatsapp = store?.lang === 'ar' ? "رقم الواتساب مطلوب" 
        : store?.lang === 'en' ? 'WhatsApp number is required.' 
        : 'واٹس ایپ نمبر ضروری ہے';
    }

    // Validate Order Preparation Time (مدة تجهيز الطلب)
    if (!body.value.arrangement_duration) {
      errors.arrangement_duration = store?.lang === 'ar' 
        ? "مدة تجهيز الطلب مطلوبة" 
        : store?.lang === 'en' 
        ? 'Order preparation time is required.' 
        : 'آرڈر تیاری کا وقت ضروری ہے';
    }else if(body.value.arrangement_duration <= 0) {
      errors.arrangement_duration = store?.lang === 'ar' 
        ? "مدة تجهيز الطلب يجب أن تكون أكبر من صفر"  // "Order preparation time must be greater than zero"
        : store?.lang === 'en' 
        ? 'Order preparation time must be greater than zero.' 
        : 'آرڈر تیاری کا وقت صفر سے زیادہ ہونا چاہیے';  // "Order preparation time must be greater than zero."
    }


    // Validate city
    if (!body.value.city) {
      errors.city = store?.lang === 'ar' ? "المدينة مطلوبة" 
        : store?.lang === 'en' ? 'City is required.' 
        : 'شہر ضروری ہے';
    }

    // Validate neighborhood
    if (!body.value.neighborhood) {
      errors.neighborhood = store?.lang === 'ar' ? "الحي مطلوب" 
        : store?.lang === 'en' ? 'Neighborhood is required.' 
        : 'محلہ ضروری ہے';
    }

    // Validate store address
    if (!body.value.store_address) {
      errors.store_address = store?.lang === 'ar' ? "عنوان المتجر مطلوب" 
        : store?.lang === 'en' ? 'Store address is required.' 
        : 'متجر کا پتہ ضروری ہے';
    }

    // Validate bank account holder name
    if (!body.value.owner_label) {
      errors.owner_label = store?.lang === 'ar' ? "إسم صاحب الحساب البنكي مطلوب" 
        : store?.lang === 'en' ? 'Account holder name is required.' 
        : 'بینک اکاؤنٹ کے مالک کا نام ضروری ہے';
    }

    // Validate account number
    if (!body.value.account_label) {
      errors.account_label = store?.lang === 'ar' ? "رقم الحساب مطلوب" 
        : store?.lang === 'en' ? 'Account number is required.' 
        : 'اکاؤنٹ نمبر ضروری ہے';
    }

    // Validate bank name
    if (!body.value.bank_name) {
      errors.bank_name = store?.lang === 'ar' 
        ? "اسم البنك مطلوب" 
        : store?.lang === 'en' 
        ? 'Bank name is required.' 
        : 'بینک کا نام ضروری ہے';
    }

    // Validate IBAN number
    if (!body.value.iban_label) {
      errors.iban_label = store?.lang === 'ar' ? "رقم الايبان مطلوب" 
        : store?.lang === 'en' ? 'IBAN number is required.' 
        : 'آئبان نمبر ضروری ہے';
    }

    // Validate account details image
    if (!body.value.account_details_img) {
      errors.account_details_img = store?.lang === 'ar' ? "صورة بيانات الحساب البنكي مطلوبة" 
        : store?.lang === 'en' ? 'Bank account details image is required.' 
        : 'بینک اکاؤنٹ کی تفصیلات کی تصویر ضروری ہے';
    }

    // Validate terms acceptance
    if (!body.value.terms) {
      errors.terms = store?.lang === 'ar' ? "يجب قبول الشروط والأحكام" 
        : store?.lang === 'en' ? 'You must accept the terms and conditions.' 
        : 'آپ کو شرائط و ضوابط قبول کرنے کی ضرورت ہے';
    }

    // Validate delivery_method acceptance
    if (!body.value.delivery_method) {
      errors.delivery_method = store?.lang === 'ar' ? "يجب إختيار طريقة التوصيل" 
        : store?.lang === 'en' ? 'You must select a delivery method.' 
        : 'آپ کو ترسیل کے طریقہ کا انتخاب کرنا ضروری ہے';
    }



    // Set errors to body
    body.value.errors = errors;

    return errors;
  };


  // make a watcher on the lang in the store to clear all errors if the lang is changed 
  watch(
    () => store?.lang, // Use a getter function to watch the reactive property
      (newValue) => {
        if (newValue) {
          // Additional logic based on newValue can go here
          body.value.errors = {};
        }
      }
  );



  const subCategories = ref([])
  watch((getResult) , (oldVal , newVal)=>{
    if(oldVal !== newVal){
      subCategories.value = getResult.value.data
    }
  })

  // to handle choosing the categories
  const handleCategory = (category_id) =>{
    body.value.category = category_id
    // subCategories.value = []
    getMethod(`general/categories/${category_id}` , false)
  }

  // to handle choosing the sub_categories
  const handleDepartments = (departments) =>{
    body.value.departments = departments
  }

    
  // to handle choosing the city and fetch the neighborhoods
  const handleCity = (city_id) =>{
    body.value.city = city_id
    body.value.neighborhood = 0
    getMethod(`general/get_city_neighborhoods/${city_id}` , false)
  }

  const handleNeighborhood = (neighborhood_id) =>{
    body.value.neighborhood = neighborhood_id
  }

  
  const neighborhoods = ref()
  watch(()=> getResult?.value , (newVal)=>{
    if(newVal){
      // console.log(newVal.data)
      neighborhoods.value = newVal.data
    }
  })


  // to watch changes in app language
  watch(()=> store?.lang , (newValue)=>{
    if(newValue){
      location.reload()
    }
  })
  

  // to handle submit form
  const handleSubmit = async () => {
    // Reset errors
    body.value.errors = {};

    // Validate all inputs
    const errors = validateInputs();

    // If there are errors, scroll to the first one
    if (Object.keys(errors).length > 0) {
      await nextTick(); // Ensure DOM updates
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.getElementById(`${firstErrorField}Error`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }else{
      const registerData = new FormData();

      registerData.append('image' , body.value.image)
      registerData.append('name' , body.value.name)
      registerData.append('email' , body.value.email)
      registerData.append('country_code' , body.value.country_code)
      registerData.append('phone' , body.value.phone)
      registerData.append('identity_number' , body.value.identity_number)
      registerData.append('civil_registration_number' , body.value.civil_registration_number)
      registerData.append('tax_number' , body.value.tax_number)
      registerData.append('whatsapp_country_code' , body.value.whatsapp_code)
      registerData.append('whatsapp_phone' , body.value.whatsapp)
      registerData.append('minimum_order' , body.value.minimum_order)
      registerData.append('store_name[ar]' , body.value.ar_store_title)
      registerData.append('store_name[en]' , body.value.en_store_title)
      registerData.append('store_name[ur]' , body.value.ur_store_title)
      registerData.append('store_description[ar]' , body.value.ar_store_description)
      registerData.append('store_description[en]' , body.value.en_store_description)
      registerData.append('store_description[ur]' , body.value.ur_store_description)
      registerData.append('category_id' , body.value.category)
      body.value.departments.forEach((department , index)=>{
        registerData.append(`sub_categories[${index}]` , department.id)
      })
      registerData.append('lat' , body.value.lat)
      registerData.append('lng' , body.value.lng)
      registerData.append('map_desc' , body.value.map_desc)
      registerData.append('logo' , body.value.logoImg)
      registerData.append('whatsapp_country_code' , body.value.whatsapp_code)
      registerData.append('whatsapp_phone' , body.value.whatsapp)
      registerData.append('preparing_time' , body.value.arrangement_duration)
      registerData.append('city_id' , body.value.city)
      registerData.append('neighborhood_id' , body.value.neighborhood)
      registerData.append('account_name' , body.value.owner_label)
      registerData.append('account_number' , body.value.account_label)
      registerData.append('bank_name' , body.value.bank_name)
      registerData.append('iban' , body.value.iban_label)
      registerData.append('bank_account_image' , body.value.account_details_img)
      registerData.append('delivery_method' , body.value.delivery_method)
      registerData.append('is_accept_terms' , Number(body.value.terms))

      
      store?.handleStorePhone(body.value.country_code , body.value.phone)
      postMethod('provider/sign-up' , registerData , false , '/login/phone-activation' , 'toast')

      clearForm()
    }
  }

  onMounted(()=>{
    if (Object.keys(registerStore.formData).length > 0) {
      body.value = { ...registerStore.formData };
    }
    // console.log(registerStore.formData)
  })
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/mixins";
  @import "../../../assets/scss/variables";
  form{
    max-width: 430px;
    align-items: flex-start;
    gap: 0;
    padding-block-start: 60px;
    label{
      &.image_placeholder{
        color: #6c757da6;
      }
      &:first-child{
        margin-bottom: 15px;
      }
    }
    h5,
    p{
      width: 100%;
      text-align: center;
    }
    .input{
      width: 100%;
      height: 40px;
      @include displayFlex($align : flex-end , $justify: flex-start);
      border:none;
      border-bottom: 0.5px solid #D9D9D9;
      border-radius: 0;
      margin-bottom: 20px;
      margin-block-start: 0;
      overflow-y: scroll;
      textarea{
        height: 100%;
      }
    }
    .terms{
      @include displayFlex($justify : flex-start , $gap : 10px);
      width: 100%;
      margin-bottom: 20px;
      a , .terms_link{
        color: $mainColor;
        text-decoration: underline;
        cursor: pointer;
        &:hover{
          text-decoration: unset;
        }
      }
      input{
        width: 20px;
        height: 20px;
      }
    }
    .inputs{
      @include displayFlex($justify:space-between);
      margin-bottom: 30px;
      .radio_input{
        @include displayFlex($gap : 4px);
        input{
          width: 20px;
        }
        label{
          text-wrap: nowrap;
        }
      }
    }
    .main-btn{
      margin-bottom: 25px;
    }
  }
</style>