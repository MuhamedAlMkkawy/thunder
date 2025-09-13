<template>
  <div :style="{ direction: $i18n.locale === 'en' ? 'ltr' : 'rtl' }">
    <RouterView />
    <Notification 
      v-if="showNotification"
      :title="notificationTitle"
      :body="notificationBody"
    />
    <CallPopup 
      v-if="showCallPopup"
      :title="callTitle"
      :image="callImage"
      @acceptCall = "acceptCall"
      @cancelCall = "cancelCall"
    />
        <!--################################ handle call feature ################################-->
    <Conversation
      v-if="store.showCoversation"
      :apiKey="apiKey"
      :sessionId="sessionId"
      :call_token="call_token"
      :api_secret="api_secret"
      :application_id="application_id"
      :orderID="orderID"
      :roomID="roomID"
      :orderType="orderType"
    />
    <!-- Add the audio element for the ringtone -->
    <audio ref="notificationAudio" preload="auto" controls class="hidden">
      <source src="/src/assets/media/notification.mp3" type="audio/ogg" />
      <source src="/src/assets/media/notification.mp3" type="audio/mpeg" />
    </audio>
    <audio ref="callAudio" preload="auto" controls loop class="hidden">
      <source src="/src/assets/media/call.mp3" type="audio/ogg">
      <source src="/src/assets/media/call.mp3" type="audio/mpeg">
    </audio>
  </div>
</template>

<script setup>
  import { ref , onMounted , watch } from "vue";
  import { RouterView , useRouter  , useRoute } from "vue-router";
  import { initializeApp } from "firebase/app";
  import { getMessaging, getToken , onMessage } from "firebase/messaging";
  import { useStore } from "./store/store";
  import Notification from "./components/Notification.vue";
  import CallPopup from "./components/Popups/CallPopup.vue";
  import useApiMethods from "./Composables/ApiMethods";
  import Conversation from "./pages/Home/Chats/Call/Conversation.vue";

  // define store
  const store = useStore()

  // define router
  const router = useRouter()

  // store  payload  fetched while recieving call
  const data = ref()

  
  // ##############################################################################
  // ########################## Socket Configuration ##############################
  // ##############################################################################
  import { io } from "socket.io-client";
  const socket =  io("https://thunder-way.com:4797", {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    transports: ["websocket"],
    query: {
      sender_id: store?.profile.id,
      sender_type: 'Provider',
      sender_name: store?.profile.name,
      avatar: store?.profile.avatar,
      lang: store?.lang || 'ar',
    },
  });

  // ##############################################################################
  // ############################ Data Variables ##################################
  // ##############################################################################
  const apiKey = ref("");
  const sessionId = ref("");
  const call_token = ref("");
  const api_secret = ref("");
  const application_id = ref("");
  const orderID = ref("");
  const roomID = ref("");
  const orderType = ref("");


  // #################################### Notification Handler ###################################
  // define notification data 
  const showNotification = ref(false)
  const notificationAudio = ref(null)
  const notificationTitle = ref('')
  const notificationBody = ref('')


  // Function to play notification ringtone
  const playNotificationAudio = () => {
    if(notificationAudio?.value){
      notificationAudio.value?.play();
    }
  };
  
  // ######################################## Call Handler ######################################
  // define call data 
  const showCallPopup = ref(false)
  const callAudio = ref(null)
  const callTitle = ref('')
  const callImage = ref('')


  // Function to play call ringtone
  const playCallAudio = () => {
    if(callAudio?.value){
      callAudio?.value?.play();
    }
  };

  // hadnle pause call audio
  const pauseCallAudio = () => {
    if(callAudio?.value){
      callAudio?.value?.pause();
    }
  }

  // handle accept call
  const acceptCall = () =>{
    pauseCallAudio()
    store.toggleShowConversation()
    showCallPopup.value = false
  }
  
  
  // handle cancel call
  const cancelCall = () =>{
    pauseCallAudio()
    showCallPopup.value = false
    handleCallSocket('end')
  }



  let session = null;
  import OT from '@opentok/client'; 
  session = OT.initSession(application_id.value, sessionId.value);


  const handleCallSocket = (state) => {
    if(state == 'end'){
      session?.disconnect();
    }
    // console.log(state)
    socket.emit("call", {
      room_id:  roomID.value,
      session_id: sessionId.value,
      token: call_token.value,
      apiKey: apiKey.value,
      api_secret: api_secret.value,
      application_id : application_id.value,
      order_id : orderID.value,
      order_call_type: orderType.value,
      call_type : 'voice',
      receiver_type: "User",
      receiver_id:  Number(store.recieverData.id),
      receiver_name: store.recieverData.name,
      receiver_image: store.recieverData.image,
      sender_id: Number(store.profile.id),
      sender_name: store.profile.name,
      sender_image: store.profile.image,
      sender_type:  "Provider" ,
      status: state,
      answer_second: state == 'answer' ? true : false, // not the same of 
    });
    // console.log({
    //   room_id: roomID.value,
    //   session_id: sessionId.value,
    //   token: call_token.value,
    //   apiKey: apiKey.value,
    //   api_secret: api_secret.value,
    //   application_id: application_id.value,
    //   order_id: orderID.value,
    //   order_call_type: orderType.value,
    //   call_type: 'voice',
    //   receiver_type: "User",
    //   receiver_id:  Number(store.recieverData.id),
    //   receiver_name: store.recieverData.name,
    //   receiver_image: store.recieverData.image,
    //   sender_id: Number(store.profile.id),
    //   sender_name: store.profile.name,
    //   sender_image: store.profile.image,
    //   sender_type:  "Provider" ,
    //   status: state,
    //   answer_second: state == 'answer' ? true : false,
    // })
    // console.log({
    //   'store_profile_id': store.profile.id,
    //   'store_profile_name': store.profile.name,
    //   'store_profile_image': store.profile.image,
    //   'store_recieverData_id': store.recieverData.id,
    //   'store_recieverData_name': store.recieverData.name,
    //   'store_recieverData_image': store.recieverData.image,
    //   'apiKey': apiKey.value,
    //   'sessionId': sessionId.value,
    //   'call_token': call_token.value,
    //   'api_secret': api_secret.value,
    //   'application_id': application_id.value,
    //   'orderID': orderID.value,
    //   'roomID': roomID.value,
    //   'orderType': orderType.value,
    // })
  };

  onMounted(()=>{
    const firebaseConfig = {
      apiKey: "AIzaSyDMryFNsv7jbaZbRg8Boek8mAcK5LPXSt0",
      authDomain: "thandar-dbdda.firebaseapp.com",
      projectId: "thandar-dbdda",
      storageBucket: "thandar-dbdda.firebasestorage.app",
      messagingSenderId: "419462465590",
      appId: "1:419462465590:web:97ecdab88fabcfd0413097",
      measurementId: "G-P15FD86QNL"
    };

    // Initialize Firebase
    initializeApp(firebaseConfig);

    // Get registration token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      console.log('###########')
      if (payload.data.type == "newCall") {
        showCallPopup.value = true
        callImage.value = payload?.data?.image;
        callTitle.value = payload?.data?.title;
        orderID.value = payload?.data?.order_id
        roomID.value = payload?.data?.room_id
        orderType.value = payload?.data?.order_call_type
        apiKey.value = payload?.data?.apiKey
        api_secret.value = payload?.data?.secretKey
        sessionId.value = payload?.data?.session_id
        call_token.value = payload?.data?.token
        application_id.value = payload?.data?.application_id
        data.value = payload
        store.storeRecieverData(payload?.data?.sender_id , payload?.data?.sender_name, payload?.data?.image )
        console.log('payload?.data?.sender_id '  , payload?.data?.sender_id )
        playCallAudio()
      } else if (payload.data.type === "finish_call") {
        router.push('/orders')
      } else if (payload.data.type === "cancel") {
        showCallPopup.value = false
        pauseCallAudio()
        handleCallSocket('end')
        showCallPopup.value = false
        if(store.showCoversation){
          store.toggleShowConversation()
        }
      }else if (payload.data.type == "missedCall" ) {
        showCallPopup.value = false
        pauseCallAudio()
      }else if(payload.data.type == "admin_accept_request_for_edit"){
        router.push('/profile')
      } else{
        notificationTitle.value = payload.notification.title;
        notificationBody.value = payload.notification.body;
        showNotification.value = true;
        store.handleIsNotificatied(true);
        playNotificationAudio();
      }
      // console.log(notificationAudio.value)
      setTimeout(() => {
        showNotification.value = false
      }, 4000);
    });

    getToken(messaging, { vapidKey: 'BL6KDLenmp2cO1sVGAh7BNJqOIokv97ol1WnBqqbZWU1Yyygz6xN9MuU_eb27cimlkeOkpoUYZiOP4cJinEIvHY' }).then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // console.log(currentToken)
        store?.storeMessageToken(currentToken)
        // ...
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
    // -------------------------------------------------------------------------
    // ----------------------- Ask Microphone permission -----------------------
    // -------------------------------------------------------------------------
    navigator.mediaDevices.getUserMedia({ audio: true , video : false })
      .then((stream) => {
        // console.log("Microphone permission granted", stream);
      })
      .catch((error) => {
        // console.error("Microphone permission denied", error);
      });
    })
</script>
