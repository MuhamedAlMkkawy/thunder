<template>
  <div>
    <div class="page contacts" :style="{ insetInlineEnd: props.showContacts ? '0' : '-500px' }">
      <h4>{{$t('chat.title')}}</h4>
      <button class="main-btn close-contacts" v-if="route.query.id" @click="emit('toggleShowContacts')">
        <i class="pi pi-angle-left"></i>
      </button>
      <hr />
      <SkeletonTable v-if="loading" />
      <div class="content" v-else>
        <div :class="['chat_tab' , room.id == route.query.id ? 'active' : '']" v-for="room in getResult?.data?.rooms" :key="room.id" @click="emit('handleEnterRoom' , room.id)">
          <div class="image">
            <img :src="room.members[0].image" loading="lazy" alt="image" />
            <!-- <div :class="['circle' , room.members[0].active ? 'status_circle active' : 'status_circle']"></div> -->
          </div>
          <div class="contact_text">
            <h3>{{room.members[0].name}}</h3>
            <div class="time">{{room.last_message_created_at}}</div>
            <p v-if="room.last_message_type == 'image'">
              <i class="pi pi-camera"></i>
              {{ $t('chat.image') }}
            </p>
            <p v-else-if="room.last_message_type == 'sound'">
              <i class="pi pi-microphone"></i>
              {{ $t('chat.sound') }}
            </p>
            <p v-else>
              {{room.last_message_type == 'invoice' ? $t('chat.invoice_title') : room.last_message_body}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import useApiMethods from '../Composables/ApiMethods';
  import SkeletonTable from './Tables/SkeletonTable.vue';



  // define route
  const route = useRoute()

  // define api methods
  const {
    getMethod,
    getResult,
    loading
  } = useApiMethods()

  // define Emits
  const emit = defineEmits(['toggleShowContacts' , 'handleEnterRoom'])
  // define props
  const props = defineProps({
    showContacts : {
      type : Boolean,
      default : false
    }
  })


  onMounted(()=>{
    getMethod('general/get-rooms' , true)
  })
</script>

<style lang="scss" scoped>

</style>