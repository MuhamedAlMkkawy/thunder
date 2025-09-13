import {onBeforeMount} from 'vue'
import { createRouter, createWebHistory } from 'vue-router';

// import login routes process
import Login from '../pages/auth/Login/Login.vue';
import SelectLanguage from '../pages/SelectLanguage/SelectLanguage.vue';
import PhoneEntry from '../pages/auth/Login/PhoneEntry.vue';
import PhoneActivation from '../pages/auth/Login/PhoneActivation.vue';

// to import register route path
import Signup from '../pages/auth/Register/Signup.vue';

// import terms route path
import Conditions from '../pages/Conditions/Conditions.vue';
import HomePage from '../pages/Home/HomePage.vue';
import Orders from '../pages/Home/Orders/Orders.vue';
import OrderDetails from '../pages/Home/OrderDetails/OrderDetails.vue';
import Pending_Orders from '../pages/Home/Pending_Orders/Pending_Orders.vue';
import UnPricingOrderDetails from '../pages/Home/UnPricingOrderDetails/UnPricingOrderDetails.vue';
import Products from '../pages/Home/Products/Products.vue';
import AddProducts from '../pages/Home/Products/AddProducts/AddProducts.vue';
import Edit_Product from '../pages/Home/Products/EditProduct/EditProduct.vue';
import Edit_Variants from '../pages/Home/Products/EditVariants/Edit_Variants.vue';
import Add_Variants from '../pages/Home/Products/AddVariants/Add_Variants.vue';
import Product_Additions from '../pages/Home/Product_Additions/Product_Additions.vue';
import Edit_Addition from '../pages/Home/Product_Additions/Edit_Addition/Edit_Addition.vue';
import Settings from '../pages/Home/Settings/Settings.vue';
import Ratings from '../pages/Home/Ratings/Ratings.vue';
import Contact from '../pages/Home/Contact/Contact.vue';
import Faq from '../pages/Home/Faq/Faq.vue';
import Terms from '../pages/Home/Terms/Terms.vue';
import About from '../pages/Home/About/About.vue';
import Notifications from '../pages/Home/Notifications/Notifications.vue'
import Profile from '../pages/Home/Profile/Profile.vue'
import Work_Periods from '../pages/Home/Work_Periods/Work_Periods.vue'
import UpdataData from '../pages/Home/Settings/UpdataData.vue';
import UpdatePhone from '../pages/Home/Settings/UpdatePhone.vue';
import UpdateEmail from '../pages/Home/Settings/UpdateEmail.vue';
import VerificationCode from '../pages/Home/Settings/VerificationCode.vue';
import NewPhone from '../pages/Home/Settings/NewPhone.vue';
import NewEmail from '../pages/Home/Settings/NewEmail.vue';
import ActivationCode from '../pages/Home/Settings/ActivationCode.vue';
import FinancialTransactions from '../pages/Home/FinancialTransactions/FinancialTransactions.vue';
import DueTransactions from '../pages/Home/FinancialTransactions/Due/DueTransactions.vue';
import CurrentSettlement from '../pages/Home/FinancialTransactions/Current/CurrentSettlement.vue';
import FinishedSettlement from '../pages/Home/FinancialTransactions/Finished/FinishedSettlement.vue';
import SingleSettlementPage from '../pages/Home/FinancialTransactions/Single_Page/SingleSettlementPage.vue';
import Chats from '../pages/Home/Chats/Chats.vue';
import Conversation from '../pages/Home/Chats/Call/Conversation.vue';
import { isAuthenticated } from '../middlewares/auth' 
import Add_Addition from '../pages/Home/Product_Additions/Add_Addition/Add_Addition.vue';


const routes = [
  {
    path: '/select-language',
    name: 'SelectLanguage',
    component: SelectLanguage
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    children : [
      // path to login with the phone number
      {
        path:'phone-entry',
        name : 'PhoneEntry',
        component : PhoneEntry
      },
      // path to activate phone
      {
        path:'phone-activation',
        name : 'PhoneActivation',
        component : PhoneActivation
      },
    ]
  },
  // to handle the path of the signup
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  // path to conditions and Conditions
  {
    path:'/terms_and_conditions',
    name : 'Conditions',
    component : Conditions
  },
  // path to home page with its nested pages
  {
    path : '/',
    name : HomePage,
    component : HomePage,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();
      } else {
        next({ name: 'SelectLanguage' });
      }
    },
    children:[
      // path to notifications page
      { 
        path : 'notifications',
        name : Notifications,
        component : Notifications
      },
      // path to Profile page
      { 
        path : 'profile',
        name : Profile,
        component : Profile
      },
      // path to Work_Periods page
      { 
        path : 'work_periods',
        name : Work_Periods,
        component : Work_Periods
      },
      // path to orders page
      { 
        path : 'orders',
        name : Orders,
        component : Orders
      },
      // path to order details page
      { 
        path : 'order_details/:id',
        name : OrderDetails,
        component : OrderDetails
      },
      // path to pending orders page
      { 
        path : 'pending_orders',
        name : Pending_Orders,
        component : Pending_Orders
      },
      // path to single page of pending orders
      { 
        path : 'pending_order_details/:id',
        name : UnPricingOrderDetails,
        component : UnPricingOrderDetails
      },
      // path to products page
      { 
        path : 'products',
        name : Products,
        component : Products
      },
      // path to add products page
      { 
        path : 'add_products',
        name : AddProducts,
        component : AddProducts
      },
      // path to add variants page
      { 
        path : 'add_variants/:id',
        name : Add_Variants,
        component : Add_Variants
      },
      // path to edit product page
      { 
        path : 'edit_product/:id',
        name : Edit_Product,
        component : Edit_Product
      },
      // path to edit product variants page
      { 
        path : 'edit_variants/:id',
        name : Edit_Variants,
        component : Edit_Variants
      },
      // path to products additions page
      { 
        path : 'product_additions',
        name : Product_Additions,
        component : Product_Additions
      },
      // path to add products additions page
      { 
        path : 'add_addition',
        name : Add_Addition,
        component : Add_Addition
      },
      // path to edit products additions page
      { 
        path : 'edit_addition/:id',
        name : Edit_Addition,
        component : Edit_Addition
      },
      // path to financial transactions pages
      { 
        path : 'financial_transactions/',
        name : FinancialTransactions,
        component : FinancialTransactions,
        children : [
          {
            path : 'due-transactions',
            name : DueTransactions ,
            component : DueTransactions
          },
          {
            path : 'current-settlement',
            name : CurrentSettlement ,
            component : CurrentSettlement
          },
          {
            path : 'finished-settlement',
            name : FinishedSettlement ,
            component : FinishedSettlement
          },
        ]
      },
      // path to single settlement page 
      {
        path : 'single-settlement/:id',
        name : SingleSettlementPage ,
        component : SingleSettlementPage
      },
      // path to chats page 
      {
        path : 'chats',
        name : Chats ,
        component : Chats
      },
      // path to video call page 
      // {
      //   path : 'conversation/:id',
      //   name : Conversation ,
      //   component : Conversation
      // },
      // path to settings page
      { 
        path : 'settings',
        name : Settings,
        component : Settings,
        children:[
          {
            path : 'update-data',
            name : UpdataData,
            component : UpdataData
          },
          {
            path : 'update-phone',
            name : UpdatePhone,
            component : UpdatePhone
          },
          {
            path : 'verification-code',
            name : VerificationCode,
            component : VerificationCode
          },
          {
            path : 'new-phone',
            name : NewPhone,
            component : NewPhone
          },
          {
            path : 'new-email',
            name : NewEmail,
            component : NewEmail
          },
          {
            path : 'activation-code',
            name : ActivationCode,
            component : ActivationCode
          },
          {
            path : 'update-email',
            name : UpdateEmail,
            component : UpdateEmail,
          }
        ]
      },
      // path to ratings page
      { 
        path : 'ratings',
        name : Ratings,
        component : Ratings
      },
      // path to contact page
      { 
        path : 'contact',
        name : Contact,
        component : Contact
      },
      // path to faq page
      { 
        path : 'faq',
        name : Faq,
        component : Faq
      },
      // path to terms page
      { 
        path : 'terms',
        name : Terms,
        component : Terms
      },
      // path to about page
      { 
        path : 'about',
        name : About,
        component : About
      },

    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
