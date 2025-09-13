import {getCookie} from '../Composables/Cookies'
// import { useStore } from '../store/store';



export function isAuthenticated() {
  return !!getCookie('token');
}


// export function isActivated() {
//   return useStore().profile;
// }
