<template>
  <div :class="['sidebar' , {active : fullSideBarSize}]">
    <button :class="['mini-bar' , {'rotateBtn' : $i18n.locale === 'en'}]" @click="$emit('handleSideBarSize')">
      <i class="pi pi-angle-right"></i>
    </button>
    <div class="image">
      <img src="../assets/images/horizontal_img.png" alt="img" loading="lazy">
    </div>
    <ul>
      <li :class="{'active' : activeRoute === '/orders'}" @click="store.handlePageName($t('sidebar.home'))">
        <RouterLink to="/orders">
          <div class="image">
            <img src="../assets/images/home.png" alt="img" loading="lazy" />
          </div>
          <span>{{ $t('sidebar.home') }}</span>
        </RouterLink>
      </li>
      <li :class="{'active' : activeRoute === '/pending_orders'}" @click="store.handlePageName($t('sidebar.pending_orders'))">
        <RouterLink to="/pending_orders">
          <div class="image">
            <img src="../assets/images/waiting_orders.png" alt="img" loading="lazy" />
          </div>
          <span>{{ $t('sidebar.pending_orders') }}</span>
          <div class="counter" v-if="getResult?.data?.pending_negotiation_orders_count > 0">
            {{getResult?.data?.pending_negotiation_orders_count}}
          </div>
        </RouterLink>
      </li>

      <li :class="{'active' : activeRoute === '/products'}" @click="store.handlePageName($t('sidebar.products'))">
        <RouterLink to="/products">
          <div class="image">
            <img src="../assets/images/products.png" alt="img" loading="lazy" />
          </div>
          <span>{{ $t('sidebar.products') }}</span>
        </RouterLink>
      </li>

      <li :class="{'active' : activeRoute === '/product_additions'}" @click="store.handlePageName($t('sidebar.add_products'))">
        <RouterLink to="/product_additions">
          <div class="image">
            <img src="../assets/images/add_products.png" alt="img" loading="lazy" />
          </div>
          <span>{{ $t('sidebar.add_products') }}</span>
        </RouterLink>
      </li>

      <li :class="{'active' : activeRoute.startsWith('/financial_transactions')}" @click="store.handlePageName($t('sidebar.financial_transactions'))">
        <RouterLink to="/financial_transactions/due-transactions">
          <div class="image">
            <img src="../assets/images/financial_transactions.png" alt="img" loading="lazy" />
          </div>
          <span>{{ $t('sidebar.financial_transactions') }}</span>
        </RouterLink>
      </li>

      <li :class="{'active' : activeRoute === '/chats'}" @click="store.handlePageName($t('sidebar.chats'))">
        <RouterLink to="/chats">
          <div class="image">
            <img src="../assets/images/chats.png" alt="img" loading="lazy" />
          </div>
          <span>{{ $t('sidebar.chats') }}</span>
        </RouterLink>
      </li>

      <li :class="{'active' : activeRoute.startsWith('/settings')}" @click="store.handlePageName($t('settings.data.pageName'))">
        <RouterLink to="/settings/update-data">
          <div class="image">
            <img src="../assets/images/settings.png" alt="img" loading="lazy" />
          </div>
          <span>{{ $t('sidebar.settings') }}</span>
        </RouterLink>
      </li>

      <li :class="{'active' : activeRoute === '/ratings'}" @click="store.handlePageName($t('sidebar.ratings'))">
        <RouterLink to="/ratings">
          <div class="image">
            <img src="../assets/images/ratings.png" alt="img" loading="lazy" />
          </div>
          <span>{{ $t('sidebar.ratings') }}</span>
        </RouterLink>
      </li>

      <li :class="{'active' : activeRoute === '/contact'}" @click="store.handlePageName($t('sidebar.contact'))">
        <RouterLink to="/contact">
          <div class="image">
            <img src="../assets/images/contact.png" alt="img" loading="lazy" />
          </div>
          <span>{{ $t('sidebar.contact') }}</span>
        </RouterLink>
      </li>

      <li :class="{'active' : activeRoute === '/faq'}" @click="store.handlePageName($t('sidebar.faq'))">
        <RouterLink to="/faq">
          <div class="image">
            <img src="../assets/images/faq.png" alt="img" loading="lazy" />
          </div>
          <span>{{ $t('sidebar.faq') }}</span>
        </RouterLink>
      </li>

      <li :class="{'active' : activeRoute === '/terms'}" @click="store.handlePageName($t('sidebar.terms'))">
        <RouterLink to="/terms">
          <div class="image">
            <img src="../assets/images/terms.png" alt="img" loading="lazy" />
          </div>
          <span>{{ $t('sidebar.terms') }}</span>
        </RouterLink>
      </li>

      <li :class="{'active' : activeRoute === '/about'}" @click="store.handlePageName($t('sidebar.about'))">
        <RouterLink to="/about">
          <div class="image">
            <img src="../assets/images/about.png" alt="img" loading="lazy" />
          </div>
          <span>{{ $t('sidebar.about') }}</span>
        </RouterLink>
      </li>
      <li>
        <button class="logout-btn" @click="handleLogout">
          <div class="image">
            <img src="../assets/images/logout.png" alt="img" loading="lazy" />
          </div>
          <span>{{ $t('sidebar.logout') }}</span>
        </button>
      </li>
    </ul>
    <Toast 
      ref="toast"
      position="top-right"
    />
    <loading v-if="loading" />
  </div>
</template>

<script setup>
  import { ref, watch , onMounted } from 'vue';
  import { RouterLink , useRoute } from 'vue-router';
  import useApiMethods from '../Composables/ApiMethods';
  import Loading from './Loading.vue';
  import Toast from 'primevue/toast';
  import getDeviceInfo from '../deviceInfo';
  import { deleteCookie } from '../Composables/Cookies';
  import { useStore } from '../store/store';
  
  
  // to store device information
  const deviceInfo = ref(null);

  onMounted(async () => {
    deviceInfo.value = await getDeviceInfo(); // Fetch device info on mount
  });

  // define store
  const store = useStore()

  // define route 
  const route = useRoute()

  // define api methods
  const { 
    getMethod,
    getResult,
    deleteMethod,
    toast,
    loading
  } = useApiMethods()


  // define handle logout 
  const handleLogout = () =>{
    deleteMethod(`general/sign-out?device_id=${store.messagesToken}` , true , '' , '/login/phone-entry')
    window.sessionStorage.clear()
    console.clear()
    deleteCookie('token')
  }


  // define props
  defineProps({
    fullSideBarSize :{
      type : Boolean,
      default : true
    }
  })

  // define emits
  defineEmits(['handleSideBarSize'])


  // wathc active path 
  const activeRoute = ref('/orders')
  watch(()=> route.path , (newPath)=>{
    // const pathAfterHome = newPath.startsWith('/home/') ? newPath.substring(6) : '';
    activeRoute.value = newPath
  })

  onMounted(()=>{
    getMethod('provider/un-pricing-orders/pending-negotiation-orders-count' , true)
  })
</script>

<style lang="scss" scoped>
  @import "../assets/scss/mixins";
  @import "../assets/scss/variables";
  .sidebar{
    background: #fff;
    position: fixed;
    inset-inline-start: 0;
    top: 0;
    overflow: hidden scroll;
    width: 290px;
    height: 100%;
    transition: 2s;
    padding: 30px 0;
    margin-inline-start: -350px;
    z-index: 999;
    &.active{
      padding-inline: 12px;
      flex-shrink: 0;
      margin-inline-start: 0px;
    }
    button.mini-bar{
      position: absolute;
      width: 40px;
      height: 40px;
      font-size: 22px;
      color: #fff;
      background: #E0BDB0;
      inset-block-start: 18px;
      inset-inline-end: 0;
      border-radius: 0 50% 50% 0;
      overflow: hidden;
      @include displayFlex();
      &.rotateBtn{
        transform: rotateY(180deg);
      }
    }
    > .image{
      max-width: 200px;
      margin: 0 auto 54px;
    }
    ul{
      li{
        border: 0.5px solid #7C9DC433;
        border-radius: 6px;
        position: relative;
        z-index: 3;
        overflow: hidden;
        margin-bottom: 15px;
        &:last-of-type{
          margin-bottom: 0px;
          background: #FF000033;
          span{
            color: #FF0000;
          }
          &::after , &::before{
            background: #ff0000;
          }
        }
        a , button{
          padding: 8px 16px;
          @include displayFlex($justify:flex-start , $gap : 8px);
          width: 100%;
          font-family: $fontFamily;
          .image{
            width: 20px;
            height: 20px;
            img{
              object-fit: contain;
            }
          }
          span{
            font-size: 16px;
            font-weight: 500;
            color: #4C637F;
          }
          .counter{
            position: absolute;
            inset-inline-end: 15px;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            border-radius: 50%;
            font-size: 12px;
            background: $secColor;
            @include displayFlex();
          }
        }
        &::after{
          content: '';
          position: absolute;
          inset-inline-start: -50%;
          top: 0;
          width: 50%;
          height: 100%;
          background: $mainColor;
          z-index: -1;
          transition: 0.3s;
        }
        &::before{
          content: '';
          position: absolute;
          inset-inline-end: -50%;
          top: 0;
          width: 50%;
          height: 100%;
          background: $mainColor;
          z-index: -1;
          transition: 0.3s;
        }
        &:hover,
        &.active{
          a , button{
            .image{
              filter: brightness(0)invert(1);
            }
            span{
              color: #fff;
            }
          }
          &::after{
            inset-inline-start: 0;
          }
          &::before{
            inset-inline-end: 0;
          }
        }
      }
    }
  }
</style>