import axios from 'axios';
import useApiVariables from './ApiVariables';
import { ref } from 'vue';
import { deleteCookie, getCookie , setCookie } from './Cookies';
import { useRouter } from 'vue-router';
import { useStore } from '../store/store';
import useSuccessPopup from './handleSuccessedPopup';
import { useI18n } from 'vue-i18n';
// import {isProfileCompleted } from '../auth';


export default function useApiMethods() {
  // define i18n library
  const {t} = useI18n(); 
  // to handle get base url for server
  const { base_url } = useApiVariables();

  // to handle variables and actions in store
  const store = useStore()

  // to handle get token from cookie
  const  token  = getCookie('token')

  // to use Prime Vue Toast
  const toast = ref(null);

  // to handle get data from endpoint
  const getResult = ref(null)
  
  // to handle result after post to db
  const postResult = ref(null)

  // to handle result after put to db
  const putResult = ref(null) 

  // to handle result after patch to db
  const patchResult = ref(null) 

  // to handle loading variable 
  const loading = ref(false)

  // to handle route after successed post method
  const router = useRouter()


  // to handle successed Popup
  const {
    successText,
    showSuccessPopup, 
    handleSuccessPopup
  } = useSuccessPopup()

  // to handle toast notification 
  const handleToast = (toastStatus ,toastMsg) => {
    toast.value.add({
      severity: toastStatus === 'success' ? 'success' : 'error',
      summary: toastStatus === 'success' ? t('toast.successTitle') : t('toast.failTitle'),
      detail: toastMsg === 'Network Error' ? 'يرجي التأكد من اتصالك بالانترنت  وإعادة المحاولة' : toastMsg,
      life: 1500
    });
  };

  // to handle next route after successed function
  const handleNextRoute = (nextRoute) =>{
    setTimeout(()=>{
      router.push(nextRoute)
    } , 800)
  }

  // to handle catch error 
  const handleCatchError = (error) =>{
    loading.value=false;
    if(error.message === 'Request failed with status code 403'){
      if(error.response.data.message === 'Your account is not accepted yet'){
        router.push('/store-details')
      }else{
        handleToast('error' ,error?.response?.data?.message)
        setTimeout(()=>{
          router.push('/home/last-orders')
        }, 500)
      }
    }else if(error?.response?.status === 401){
      deleteCookie('token')
      location.reload()
    }else{
      handleToast('error' ,error.message)
    }
  }

  // to handle successed popup
  const handlePopupType = (popupType , response) => {
    if(popupType === 'toast'){
      handleToast('success', response.data.msg);
    }else{
      handleSuccessPopup(response.data.msg)
    }
  }


// // to handle token config for post method
// const config = {
//   Authorization: `Bearer ${token}`,
// };

  // to handle get method
  const getMethod = (targetApi, requireConfig) => {
    loading.value = true;         
    // Conditionally add the Authorization header if requireConfig is true
    const headers = {
      Lang: store?.lang || 'ar',
    };

    if (requireConfig === true) {
      headers.Authorization = `Bearer ${token}`;
    }
    axios.get(base_url.value + targetApi, { headers })
      .then((response) => {
        loading.value = false;         
        if (response.data.key === 'success') {
          getResult.value = response.data;
            // Check the target API to display the corresponding toast message
            // console.log('#############')
            // console.log(response.data)
            // console.log('#############')
            if (
              targetApi.startsWith('provider/orders/accept') ||
              targetApi.startsWith('provider/orders/preparing') ||
              targetApi.startsWith('provider/orders/prepared') ||
              targetApi.startsWith('provider/orders/finish')  
              ) {
              handleToast('success', response.data.msg);
              setTimeout(() => {
                location.reload()
              }, 800);
            }
        }else if(response.data.key == 'unauthenticated'){
          handleToast('error', response.data.msg);
          handleNextRoute('/login/phone-entry');
          deleteCookie('token')
        }else if(response.data.key == 'fail'){
          handleToast('error', response.data.msg);
          // handleNextRoute('/login/phone-entry');
        }else {
          handleToast('error', response.data.msg);
        }
      })
      .catch((error) => {
        handleCatchError(error);
      });
  };


  // to handle post method
  const postMethod = (targetApi, body, requireConfig, nextRoute , popupType) => {
    loading.value = true;

    // Create headers object
    const headers = {
      Lang: store?.lang || 'ar',
    };

    // Add token to headers if required
    if (requireConfig === true) {
      headers.Authorization = `Bearer ${token}`;
    }

    axios.post(base_url.value + targetApi, body, { headers })
      .then((response) => {
        loading.value = false;
        if (response.data.key === 'success') {
          postResult.value = response.data;
          handlePopupType(popupType , response)

          if (nextRoute === 'reload_page') {
            setTimeout(()=>{
              location.reload();
            }, 800)
          }else{
            handleNextRoute(nextRoute);
          }
          if(targetApi === 'provider/activate?_method=patch'){
            setCookie(response.data.data.token)
          }
        }else if(response.data.key === 'needActive'){
          handleToast('error', response.data.msg);
          handleNextRoute('/login/phone-activation');
        }else if(response.data.key === 'unauthenticated'){
          handleToast('error', response.data.msg);
          handleNextRoute('/login/phone-entry');
        }else if(response.data.key == 'not_approved'){
          handleToast('error', response.data.msg);
          handleNextRoute('/login/phone-entry');
        }else {
          handleToast('error', response.data.msg);
        }
      })
      .catch((error) => {
        handleCatchError(error);
      });
  };

  // to handle put method
  const putMethod = (targetApi, body, requireConfig, nextRoute) => {
    loading.value = true;

    // Create headers object
    const headers = {
      Lang: store?.lang || 'ar',
    };

    // Add token to headers if required
    if (requireConfig === true) {
      headers.Authorization = `Bearer ${token}`;
    }

    axios.put(base_url.value + targetApi, body, { headers })
      .then((response) => {
        loading.value = false;
        if (response.data.key === 'success') {
          handleToast('success', response.data.msg);
          handleNextRoute(nextRoute);
          putResult.value = response.data
          if (targetApi === '/api/merchant/update-password') {
            deleteCookie('token');
            // location.reload()
          } else if (targetApi === '/api/merchant/verify' && isProfileCompleted()) {
            deleteCookie('token');
            router.push('/login');
          } else if (targetApi === '/api/merchant/verify' && !isProfileCompleted()) {
            router.push('/store-details');
          }
        } else {
          handleToast('error', response.data.msg);
        }
      })
      .catch((error) => {
        handleCatchError(error);
      });
  };

  // to handle patch method
  const patchMethod = (targetApi, requireConfig) => {
    loading.value = true;

    // Create headers object
    const headers = {
      Lang: store?.lang || 'ar',
    };

    // Add token to headers if required
    if (requireConfig === true) {
      headers.Authorization = `Bearer ${token}`;
    }

    axios.patch(base_url.value + targetApi, '', { headers })
      .then((response) => {
        loading.value = false;
        if (response.data.key === 'success') {
          patchResult.value = response;
        } else {
          handleToast('error', response.data.msg);
        }
      })
      .catch((error) => {
        handleCatchError(error);
      });
  };

  // to handle delete method
  const deleteMethod = (targetApi, requireConfig, reFetchApi, nextRoute) => {
    loading.value = true;

    // Create headers object
    const headers = {
      Lang: store?.lang || 'ar',
    };

    // Add token to headers if required
    if (requireConfig === true) {
      headers.Authorization = `Bearer ${token}`;
    }

    axios.delete(base_url.value + targetApi , { headers })
      .then((response) => {
        loading.value = false;
        if (response.data.key === 'success') {
          handleToast('success', response.data.msg);
          if(reFetchApi !== ''){
            getMethod(reFetchApi, true);
          }
          if(nextRoute === 'reload_page'){
            setTimeout(()=>{
              location.reload()
            } , 300)
          }else{
            router.push(nextRoute || '');
          }
        }else if(response.data.key === 'unauthenticated'){
          router.push('/select-language')
        } else {
          handleToast('error', response.data.msg);
        }
      })
      .catch((error) => {
        handleCatchError(error);
      });
  };


  return {
    getMethod,
    postMethod,
    putMethod,
    patchMethod,
    deleteMethod,
    getResult,
    postResult,
    putResult,
    patchResult,
    toast,
    handleToast,
    handleNextRoute,
    loading,
    successText,
    showSuccessPopup, 
    handleSuccessPopup
  };
}
