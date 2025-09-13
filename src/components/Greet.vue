<template>
  <div class="greet">
    <h6>{{ store?.pageName || $t('sidebar.home') }}</h6>
    <div class="image">
      <img src="../assets/images/greet_logo.png" alt="image" loading="lazy">
    </div>
    <ul class="settings">
      <li class="info-settings" ref="infoSettingsRef">
        <div class="info" @click="handleShowInfoSettings">
          <div class="image">
            <img :src="store?.profile?.image" alt="image" loading="lazy">
          </div>
          <h5>{{ store?.profile?.name }}</h5>
          <i
            class="pi pi-angle-down"
            :style="showInfoSettings ? 'transform: translateY(-50%) rotate(180deg)' : 'transform: translateY(-50%) rotate(0)'"
          ></i>
        </div>
        <ol :class="{ active: showInfoSettings }">
          <li @click="showInfoSettings = false">
            <RouterLink to="/work_periods" @click="store.handlePageName($t('work_periods.pageName'))">
              <i class="pi pi-calendar-clock"></i>
              <h4>{{ $t('greet.info_period') }}</h4>
              <i class="pi pi-angle-left"></i>
            </RouterLink>
          </li>
          <li @click="showInfoSettings = false">
            <RouterLink to="/profile" @click="store.handlePageName($t('profile.pageName'))">
              <i class="pi pi-user"></i>
              <h4>{{ $t('greet.info_details') }}</h4>
              <i class="pi pi-angle-left"></i>
            </RouterLink>
          </li>
        </ol>
      </li>

      <li class="notification" @click="handleNotification($t('notifications.pageName'))">
        <RouterLink to="/notifications">
          <div class="icon">
            <i class="pi pi-bell"></i>
            <div v-if="store.isNotificated" class="red_circle"></div>
          </div>
          <h5>{{$t('greet.notification')}}</h5>
        </RouterLink>
      </li>
      <li ref="languageSelectRef">
        <div @click="handleShowLanguageSelect">
          <LanguageSelect />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { onMounted, onUnmounted, ref, watch } from 'vue';
  import LanguageSelect from './SelectInputs/LanguageSelect.vue';
  import { RouterLink } from 'vue-router';
  import { useStore } from '../store/store';
  import useApiMethods from '../Composables/ApiMethods';

  // define api methods
  const { getMethod, getResult } = useApiMethods();
  // const notificationsCount = ref( store.isNotificated);

  // define store
  const store = useStore();

  // Handle notifications
  const handleNotification = (page) => {
    store.handleIsNotificatied(false)
    store?.handlePageName(page);
  };

  // Info settings
  const showInfoSettings = ref(false);
  const infoSettingsRef = ref(null);

  const handleShowInfoSettings = () => {
    showInfoSettings.value = !showInfoSettings.value;
  };

  // Detect clicks outside
  const handleOutsideClick = (event) => {
    if (infoSettingsRef.value && !infoSettingsRef.value.contains(event.target)) {
      showInfoSettings.value = false;
    }
  };

  // Watch API results
  watch(() => getResult?.value?.data?.count, (newValue) => {
    if (newValue) {
      // notificationsCount.value = newValue;
      store.handleIsNotificatied(true)
    }
  });

  // Watch language changes
  watch(() => store?.lang, (newValue) => {
    if (newValue) {
      store?.handlePageName('');
    }
  });

  // Lifecycle hooks
  onMounted(() => {
    getMethod('general/count-notifications', true);
    document.addEventListener('click', handleOutsideClick);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleOutsideClick);
  });
</script>


<style lang="scss" scoped>
  @import "../assets/scss/variables";
  @import "../assets/scss/mixins";
  @import "../assets/scss/pulse";
  
  .greet{
    border-bottom: 4px solid #fff;
    padding: 8px 22px;
    @include displayFlex($justify : space-between);
    @media screen and (max-width : 450px) {
      flex-wrap: wrap;
      justify-content: center;
    }
    h6{
      font-size: 18px;
      font-weight: 400;
      $color:$textColor;
      min-width: 150px;
      width: fit-content;
      @media (max-width : 991px){
        display: none;
      }
    }
    .image{
      // width: 80px;
      flex-shrink: 0;
    }
    h5{
      height: 24px;
      overflow: hidden;
    }
    ul.settings{
      @include displayFlex($gap : 8px);
      li , li a{
        @include displayFlex($justify:flex-start);
        position: relative;
        width: 100%;
        @media (max-width : 500px){
          justify-content: center;
        }
        &.notification{
          .icon{
            position: relative;
            .red_circle{
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: red;
              position: absolute;
              top: 5px;
              inset-inline-end: 0;
              animation-name: pulse;
              animation-duration: 1s;
              animation-iteration-count: infinite;
              animation-direction: alternate-reverse;
            }
          }
          a{
            justify-content: center !important;
          }
        }
        &:not(:last-of-type)::after{
          content: '';
          position: absolute;
          inset-inline-end: -4px;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 100%;
          background: #e4e4e4;
          @media (max-width : 500px){
            inset-inline-end: -5px;
          }
        }
        &.info-settings{
          width: 110px;
          padding-inline-end: 20px;
          .pi:last-of-type{
            position: absolute;
            inset-inline-end: 0;
            top: 50%;
            // transform: translateY(-50%);
            transition: 0.6s;
          }
          .info{
            @include displayFlex($gap : 5px);
            cursor: pointer;
            .image{
              width: 24px;
              height: 24px;
              border-radius: 50%;
              overflow: hidden;
            }
          }
          ol{
            position: absolute;
            inset-inline-start: -40px;
            inset-block-start: 35px;
            background: #fff;
            width: 200px;
            height: 0;
            overflow: hidden;
            box-shadow: 0 0 10px #e4e4e495;
            border-radius: 5px;
            z-index: 99;
            li{
              @include displayFlex($gap :4px , $justify : flex-start , $align : center);
              position: relative;
              padding: 5px 8px;
              cursor: pointer;
              &:hover{
                background: $mainColor;
                color: #fff;
                h4{
                  color: #fff;
                }
              }
              h4{
                font-size: 14px;
                font-weight: 400;
                color: $textColor;
              }
              .pi:last-of-type{
                position: absolute;
                inset-inline-end: 0;
                top: 50%;
                transform: translateY(-50%);
              }
            }
            @media (max-width:500px){
              inset-inline-start: 0;
              li a{
                justify-content: flex-start;
              }
            }
            &.active{
              height: fit-content;
            }
          }
        }
        .input{
          border: none;
        }
      }
      li a{
        gap: 5px;
      }
    }
  }
</style>