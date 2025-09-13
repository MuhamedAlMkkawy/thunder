import { createApp } from 'vue';
import App from './App.vue';

// import stars rating library
import vue3StarRatings from "vue3-star-ratings";

// to import pinia
import { createPinia } from 'pinia';
import piniaPersistedState from 'pinia-plugin-persistedstate';
const pinia = createPinia();
pinia.use(piniaPersistedState);


// import Prime Vue Library 
import PrimeVue from 'primevue/config';
import 'primeflex/primeflex.css';
import MultiSelect from 'primevue/multiselect';
// import Accordion from 'primevue/accordion';
// import ToggleSwitch from 'primevue/toggleswitch';
import ToastService from 'primevue/toastservice';
// Import the desired theme (e.g., saga-blue)
import 'primevue/resources/themes/saga-blue/theme.css';
// Import PrimeVue core styles
import 'primevue/resources/primevue.min.css';
// Import PrimeIcons for icons
import 'primeicons/primeicons.css';



// import i18n configuration
import i18n from './plugins/i18n'; 



// import default css style file 
import './assets/css/style.css';



// import routing configuration 
import router from './plugins/router';



// to import firebase
import './firebase'

// import vue google maps --------------------------
import VueGoogleMaps from '@fawmi/vue-google-maps';
import * as deepEqual from 'fast-deep-equal';

createApp(App)
  .use(i18n)
  .use(PrimeVue)
  .use(pinia)
  .component('MultiSelect', MultiSelect)
  // .component('ToggleSwitch', ToggleSwitch)
  // .component('AccordionTab', AccordionTab)
  .use(ToastService)
  .component("vue3-star-ratings", vue3StarRatings)
  .use(router)
  .use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyAxKbPRJYB8-OtRces1p6kqhvk2NtAdJMQ', 
    },
  })
  .mount('#app');
