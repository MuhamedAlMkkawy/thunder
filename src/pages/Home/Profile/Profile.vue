<template>
  <div>
    <div class="page_content">  
      <div class="info">
        <h4>{{$t('profile.name')}}</h4>
        <div class="text">
          <span class="pi pi-user"></span>
          <h4 class="text_data">{{getResult?.data?.name}}</h4>
        </div>
      </div>
      <div class="info">
        <h4>{{$t('profile.email')}}</h4>
        <div class="text">
          <span class="pi pi-envelope"></span>
          <h4 class="text_data">{{getResult?.data?.email}}</h4>
        </div>
      </div>
      <div class="info">
        <h4>{{$t('profile.phone')}}</h4>
        <div class="text">
          <span class="pi pi-phone"></span>
          <h4 class="text_data">{{getResult?.data?.full_phone}}</h4>
        </div>
      </div>
      <!-- ################################# -->
      <div class="info">
        <h4>{{$t('profile.delivery_method')}}</h4>
        <div class="text">
          <span class="pi pi-objects-column"></span>
          <h4 class="text_data">{{getResult?.data?.delivery_method?.text}}</h4>
        </div>
      </div>
      <div class="info">
        <h4>{{$t('profile.preparing_time')}}</h4>
        <div class="text">
          <span class="pi pi-objects-column"></span>
          <h4 class="text_data">{{getResult?.data?.preparing_time}}</h4>
        </div>
      </div>
      <div class="info">
        <h4>{{$t('profile.minimum_order')}}</h4>
        <div class="text">
          <span class="pi pi-objects-column"></span>
          <h4 class="text_data">{{getResult?.data?.minimum_order}}</h4>
        </div>
      </div>
    </div>
    <div class="page_content">  
      <div class="info">
        <h4>{{$t('profile.city')}}</h4>
        <div class="text">
          <span class="pi pi-map-marker"></span>
          <h4 class="text_data">{{getResult?.data?.city?.name}}</h4>
        </div>
      </div>
      <div class="info">
        <h4>{{$t('profile.store_location')}}</h4>
        <div class="text">
          <span class="pi pi-map-marker redIcon"></span>
          <h4 class="text_data">{{getResult?.data?.location?.map_desc}}</h4>
        </div>
      </div>
      <div class="info">
        <h4>{{$t('profile.whatsapp')}}</h4>
        <div class="text">
          <span class="pi pi-phone"></span>
          <h4 class="text_data">{{getResult?.data?.whatsapp_phone}}</h4>
        </div>
      </div>
      <div class="info">
        <h4>{{$t('profile.neighborhood')}}</h4>
        <div class="text">
          <span class="pi pi-map-marker"></span>
          <h4 class="text_data">{{getResult?.data?.neighborhood?.name}}</h4>
        </div>
      </div>
      <!-- ################### -->
      <div class="info">
        <h4>{{$t('profile.image')}}</h4>
        <div class="text">
          <div class="image" @click="handleImage(getResult?.data?.image)">
            <img :src="getResult?.data?.image" alt="image" loading="lazy" />
          </div>
        </div>
      </div>
      <div class="info">
        <h4>{{$t('profile.logo')}}</h4>
        <div class="text">
          <div class="image" @click="handleImage(getResult?.data?.logo  )">
            <img :src="getResult?.data?.logo " alt="image" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
    <div class="page_content">  
      <div class="info">
        <h4>{{$t('profile.info_card')}}</h4>
        <div class="text">
          <span class="pi pi-id-card"></span>
          <h4 class="text_data">{{getResult?.data?.identity_number}}</h4>
        </div>
      </div>
      <div class="info">
        <h4>{{$t('profile.ecommerce')}}</h4>
        <div class="text">
          <span class="pi pi-receipt"></span>
          <h4 class="text_data">{{getResult?.data?.civil_registration_number}}</h4>
        </div>
      </div>
      <div class="info">
        <h4>{{$t('profile.tax')}}</h4>
        <div class="text">
          <span class="pi pi-receipt"></span>
          <h4 class="text_data">{{getResult?.data?.tax_number}}</h4>
        </div>
      </div>
    </div>
    <div class="page_content">  
      <div class="info">
        <h4>{{$t('profile.ar_store_name')}}</h4>
        <div class="text">
          <span class="pi pi-clipboard"></span>
          <h4 class="text_data">{{getResult?.data?.store_name?.ar}}</h4>
        </div>
      </div>
      <div class="info en-content">
        <h4>{{$t('profile.en_store_name')}}</h4>
        <div class="text">
          <span class="pi pi-clipboard"></span>
          <h4 class="text_data">{{getResult?.data?.store_name?.en}}</h4>
        </div>
      </div>
      <div class="info">
        <h4>{{$t('profile.ur_store_name')}}</h4>
        <div class="text">
          <span class="pi pi-clipboard"></span>
          <h4 class="text_data">{{getResult?.data?.store_name?.ur}}</h4>
        </div>
      </div>
    </div>
    <div class="page_content">  
      <h4>{{$t('profile.ar_store_description')}}</h4>
      <div class="text">
        <span class="pi pi-clipboard"></span>
        <h4 class="text_data">{{getResult?.data?.store_description?.ar}}</h4>
      </div>
    </div>
    <div class="page_content en-content">  
      <h4>{{$t('profile.en_store_description')}}</h4>
      <div class="text">
        <span class="pi pi-clipboard"></span>
        <h4 class="text_data">{{getResult?.data?.store_description?.en}}</h4>
      </div>
    </div>
    <div class="page_content">  
      <h4>{{$t('profile.ur_store_description')}}</h4>
      <div class="text">
        <span class="pi pi-clipboard"></span>
        <h4 class="text_data">{{getResult?.data?.store_description?.ur}}</h4>
      </div>
    </div>
    <div class="page_content">
      <div class="info">
        <h4>{{$t('profile.main_category')}}</h4>
        <div class="text">
          <span class="pi pi-objects-column"></span>
          <div class="store_categories">
            {{ getResult?.data?.main_category?.name }}
          </div>
        </div>
      </div>  
      <div class="info">
        <h4>{{$t('profile.store_category')}}</h4>
        <div class="text">
          <span class="pi pi-objects-column"></span>
          <div class="store_categories">
            <span v-for="category in getResult?.data?.categories" :key="category.id">
              {{ category.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="page_content">  
      <div class="info">
        <h4>{{$t('profile.bank_name')}}</h4>
        <div class="text">
          <span class="pi pi-building-columns"></span>
          <h4 class="text_data">{{getResult?.data?.bank_info?.bank_name}}</h4>
        </div>
      </div>
      <div class="info">
        <h4>{{$t('profile.account_name')}}</h4>
        <div class="text">
          <span class="pi pi-id-card"></span>
          <h4 class="text_data">{{getResult?.data?.bank_info?.account_name}}</h4>
        </div>
      </div>
      <div class="info">
        <h4>{{$t('profile.account_number')}}</h4>
        <div class="text">
          <span class="pi pi-sort-numeric-up-alt"></span>
          <h4 class="text_data">{{getResult?.data?.bank_info?.account_number}}</h4>
        </div>
      </div>
      <div class="info">
        <h4>{{$t('profile.iban_number')}}</h4>
        <div class="text">
          <span class="pi pi-sort-numeric-up-alt"></span>
          <h4 class="text_data">{{getResult?.data?.bank_info?.iban}}</h4>
        </div>
      </div>
      <div class="info">
        <h4>{{$t('profile.account_image')}}</h4>
        <div class="image"  @click="handleImage(getResult?.data?.bank_info?.bank_account_image)">
          <img :src="getResult?.data?.bank_info?.bank_account_image" alt="image" loading="lazy">
        </div>
      </div>
    </div>
    <Toast 
      ref="toast"
      position="top-right"
    />
    <ImagePopup 
      v-if="showImagePopup"
      @handleShowImagePopup ="handleShowImagePopup"
      :image = "profileImage"
    />
  </div>
</template>

<script setup>
  import { onMounted, watch , ref } from 'vue';
  import useApiMethods from '../../../Composables/ApiMethods';
  import Toast from 'primevue/toast';
  import { useStore } from '../../../store/store';
  import ImagePopup from '../../../components/Popups/ImagePopup.vue';



  // define api methods
  const {
    getMethod,
    getResult,
    toast
  } = useApiMethods()

  // handle show image popup
  const profileImage = ref()
  const showImagePopup = ref(false)

  const handleShowImagePopup = () => {
    showImagePopup.value = !showImagePopup.value
  }

  const handleImage = (imageSrc) => {
    handleShowImagePopup()
    profileImage.value = imageSrc
  }


  // define store
  const store = useStore()

  watch(() => store.lang , (newValue)=>{
    if(newValue){
      getMethod('provider/profile' , true)
    }
  })

  watch(()=> getResult?.value?.data , (newValue)=>{
    if(newValue){
      // console.log(newValue)
      store.handleStoredProfile(newValue)
    }
  })

  onMounted(()=>{
    getMethod('provider/profile' , true)
  })
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/mixins";
  @import "../../../assets/scss/variables";


  .page_content{
    padding: 20px;
    border-radius: 15px;
    box-shadow: -3px 3px 4px 0px #00000026;
    // @include displayFlex($justify : space-between , $wrap : wrap);
    @include displayGrid(256px);
    .info{
      flex-grow: 1;
      min-width: 30%;
    }
    @media (max-width : 500px){
      // @include displayGrid(47%);
    }
    h4{
      font-size: clamp(12px , 4vw , 16px);
      font-weight: 700;
      color: $textColor;
      margin-block-end: 12px;
      &.text_data{
        font-weight: 500;
      }
    }
    .text{
      @include displayFlex($justify : flex-start , $gap :5px);
      span{
        font-size: 20px;
        color: $mainColor;
        &.redIcon{
          color: red;
        }
      }
      h4{
        margin-bottom: 0;
        font-size: 14px;
      }
      .store_categories{
        @include displayFlex($gap : 0);
        span{
          font-size: 14px;
          color: $textColor;
          &:not(:last-of-type){
            &::after{
              content: ' - '
            }
          }
        }
      }
    }
    .image{
      width: 100px;
      height: 80px;
      border-radius: 5px;
      overflow: hidden;
      cursor: pointer;
    }
    &:not(:last-of-type){
      margin-block-end: 24px;
    }
    &:nth-of-type(5),
    &:nth-of-type(6),
    &:nth-of-type(7),
    // &:nth-of-type(8),
    &:nth-of-type(9),
    &:nth-of-type(10){
      @include displayFlex($direction : column , $justify:flex-start , $align:flex-start);
      width: 100%;
    }
    &.en-content{
      .text{
        direction: ltr;
        width: 100%;
        text-align: end;
        h4{
          text-align: end;
          direction: rtl;
        }
      }
    }
    &:last-of-type{
      @include displayGrid(45%);
      @media (max-width : 560px){
        @include displayFlex($direction:column , $align:flex-start)
      }
    }
  }
</style>