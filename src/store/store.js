import { ref } from 'vue';
import { defineStore } from 'pinia';
import i18n from '../plugins/i18n';

export const useStore = defineStore('store', () => {
  // to handle page name in greet component
  const pageName = ref(window.sessionStorage.getItem('pageName') || '')
  const handlePageName = (newValue)=>{
    pageName.value = newValue
    window.sessionStorage.setItem('activeTab' , 'due-transactions')
    window.sessionStorage.setItem('pageName' , newValue)
  }


  // Profile
  const profile = ref(
    window.sessionStorage.getItem('profile')
      ? JSON.parse(window.sessionStorage.getItem('profile'))
      : []
  );
  const handleStoredProfile = (profileData) => {
    profile.value = profileData;
    window.sessionStorage.setItem('profile', JSON.stringify(profileData));
    is_available_to_recieve_orders.value = profileData?.is_available_to_recieve_orders;
    // console.log(profileData?.is_available_to_recieve_orders)
    window.sessionStorage.setItem('is_available_to_recieve_orders', profileData?.is_available_to_recieve_orders);
  };

  // Revieve Orders Control
  const is_available_to_recieve_orders = ref(
    window.sessionStorage.getItem('is_available_to_recieve_orders') === 'true'
  );

  // Handle Notification Alert
  const isNotificated = ref(false)
  const handleIsNotificatied = (newValue) => {
    isNotificated.value = newValue
  }
  
  const handleControlRecieveNotification = (newValue) => {
    // console.log(newValue)
    is_available_to_recieve_orders.value = newValue;
    window.sessionStorage.setItem('is_available_to_recieve_orders', newValue);
  };

  // Path From
  const pathFrom = ref('');
  const definePath = (newPath) => {
    pathFrom.value = newPath;
  };

  // Language
  const lang = ref(window.sessionStorage.getItem('app_lang') || 'ar');
  const handleLang = (newLang) => {
    console.log(newLang)
    i18n.global.locale.value = newLang;
    lang.value = newLang;
    window.sessionStorage.setItem('app_lang', newLang);
    // location.reload(); // Uncomment if necessary
  };

  // Phone
  const country_code = ref('');
  const phone = ref('');
  const handleStorePhone = (newCountryCode, newPhone) => {
    country_code.value = newCountryCode;
    phone.value = newPhone;
  };

  // Email
  const email = ref('');
  const handleStoreEmail = (newEmail) => {
    email.value = newEmail;
  };

  // Product ID
  const product_id = ref('');
  const handleStoreProductId = (productId) => {
    product_id.value = productId;
  };

  // Addition ID
  const addition_id = ref('');
  const handleStoreAdditionId = (additionId) => {
    addition_id.value = additionId;
  };

  // Product Pagination Page
  const productPaginationPage = ref('1');
  const storeProductsPageNum = (pageNum) => {
    productPaginationPage.value = pageNum;
  };


  // to store token of firebase messages
  const messagesToken = ref();
  const storeMessageToken = (newToken) =>{
    messagesToken.value = newToken
  }

  // to store reciever data for call 
  const recieverData = ref({})
  const storeRecieverData = (id , name , image) => {
    recieverData.value.id = id;
    recieverData.value.name = name;
    recieverData.value.image = image;
  }

  // handle conversation
  const showCoversation = ref(false)
  const toggleShowConversation = () => {
    showCoversation.value = !showCoversation.value
  }

  // handle store order id from chat to be used in call
  const orderInfo = ref({})
  const handleOrderInfo = (newType , newId) => {
    orderInfo.value.type = newType
    orderInfo.value.id = newId
  }
  
  // Expose state and actions
  return {
    pageName,
    handlePageName,
    profile,
    handleStoredProfile,
    is_available_to_recieve_orders,
    handleControlRecieveNotification,
    isNotificated,
    handleIsNotificatied,
    pathFrom,
    definePath,
    lang,
    handleLang,
    country_code,
    phone,
    handleStorePhone,
    email,
    handleStoreEmail,
    product_id,
    handleStoreProductId,
    addition_id,
    handleStoreAdditionId,
    productPaginationPage,
    storeProductsPageNum,
    messagesToken,
    storeMessageToken,
    recieverData,
    storeRecieverData,
    showCoversation,
    toggleShowConversation,
    orderInfo,
    handleOrderInfo
  };
});