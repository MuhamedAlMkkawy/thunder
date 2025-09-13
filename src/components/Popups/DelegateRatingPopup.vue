<template>
  <div class="popup delegate_rating_popup">
    <div class="content">
      <button class="pi pi-times close_btn" @click="emit('handleShowDelegateRatingPopup')"></button>
      <h3 class="title centered">
        {{ $t('delegate_rating.title') }}
      </h3>
      <Rating v-model="body.delegate_rate" :cancel="false">
        <template #onicon>
          <i class="pi pi-star-fill"></i>
        </template>
        <template #officon>
          <i class="pi pi-star"></i>
        </template>
      </Rating>
      <button class="main-btn" @click="handleSubmit">
        {{ $t('delegate_rating.button') }}
      </button>
    </div>
    <Toast 
      ref="toast"
      position="top-right"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import Rating from 'primevue/rating';
  import useApiMethods from '../../Composables/ApiMethods';
  import { useRoute } from 'vue-router';
  import Toast from 'primevue/toast';

  // define route
  const route = useRoute()

  // define api methods
  const {
    postMethod,
    toast
  } = useApiMethods();

  // define emits 
  const emit = defineEmits(['handleShowDelegateRatingPopup'])

  // define rating value 
  const body = ref({
    order_id : Number(route.params.id),
    delegate_rate : 0
  })

  const handleSubmit = () =>{
    postMethod('provider/rates/rate-order' , body.value , true , `/orders` , 'toast')
  }

</script>

<style lang="scss" scoped>
  @import "../../assets/scss/mixins";
  .p-rating{
    @include displayFlex($gap : 5px);
    margin:30px 0 80px;
    // transform:scale(2);
    i.pi{
      font-size: 35px;
    }
    i.pi-star-fill{
      color:goldenrod;
    }
  }
  .main-btn{
    max-width: 400px;
    margin: 0 auto 20px;
  }
</style>