<template>
  <div>
    <div class="info">
      <div class="image">
        <img :src="getResult?.data[0]?.image" alt="image" loading="lazy" />
        <!-- <div :class="['circle' , getResult?.data[0]?.active ? 'status_circle active' : 'status_circle']"></div> -->
      </div>
      <div class="name">
        <h4>{{getResult?.data[0]?.name}}</h4>
        <button 
          class="ask_invoice" 
          v-if="store.orderInfo.type != 'order'" 
          @click="emit('handleShowInvoicePopup')"
        >
          {{$t('chat.invoice_request')}}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import useApiMethods from '../Composables/ApiMethods';
  import { useStore } from '../store/store';


  // define store
  const store = useStore()

  // define api methods
  const{
    getMethod,
    getResult
  } = useApiMethods()

  // define route
  const route = useRoute()

  // define props
  const props = defineProps({
    chatId : {
      type : String,
      default : ""
    }
  })

  // define emits 
  const emit = defineEmits(['handleShowInvoicePopup'])

  onMounted(()=>{
    getMethod(`general/room-members/${route.query.id}` , true)
  })
</script>

<style lang="scss" scoped>

</style>