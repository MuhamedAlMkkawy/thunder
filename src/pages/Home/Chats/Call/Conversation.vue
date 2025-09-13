
<template>
  <section class="border-top">
    <div id="videos">
      <div class="reciever_data">
        <div class="image">
          <img :src="store.recieverData.image" alt="image" loading="lazy">
          <!-- Mute Button -->
          <button
            class="btn-grey btn-grey-reciever nav-icon me-3"
            @click="toggleMute('subscriber')"
            :class="{ 'muted': isSubscriberMuted }"
          >
            <i
              class="pi pi-microphone"
              ></i>
              <!-- :class="{ 'pi-microphone-slash': isSubscriberMuted, 'pi-microphone': !isSubscriberMuted }" -->
          </button>
        </div>
      </div>
      <div
        class="call_overlay"
      >
        <img
          :src="
            // store.profile.image
            store.recieverData.image
          "
          :alt="
            store.profile.name
          "
          class="avatar border border-primary w-170"
        />
        <h3 style="color:#fff;">{{ store.recieverData.name }}</h3>
      </div>
      <div class="mx-3 mx-md-5 text-white text-center">
        <!-- {{
          store.profile.name
        }} -->
        <span class="d-block">{{ timeCount }}</span>
      </div>
      <div class="controls">

        <div class="mt-3 mb-3 mt-md-0 d-flex align-items-center">
          <!-- <button
            class="btn-success nav-icon me-3"
            @click="toggleCamera"
          >
            <i
              class="fa-solid"
              :class="{ 'pi pi-video-slash': !camState, 'pi pi-video  ': camState }"
            ></i>
          </button> -->

          <!-- <button class="btn-gray nav-icon me-3" @click="toggleFullScreen">
            <i
              class="pi"
              :class="{
                'pi-expand': !isFullScreen,
                'pi-window-minimize': isFullScreen,
              }"
            ></i>
          </button> -->
        <!-- Mute Button -->
        <button
          class="btn-grey nav-icon me-3"
          @click="toggleMute('publisher')"
          :class="{ 'muted': isPublisherMuted }"
          v-if="publisher"
        >
          <i
            class="pi pi-microphone"
            ></i>
            <!-- :class="{ 'pi-microphone-slash': isPublisherMuted, 'pi-microphone': !isPublisherMuted }" -->
        </button>

        <!-- End Call Button -->
          <button
            class="btn-danger nav-icon"
            id="close-video"
            @click="handleCallSocket('end')"
          >
            <i class="pi pi-phone"></i>
          </button>
        </div>
      </div>
      <!-- <div>
        <div id="subscriber"></div>
        <div id="publisher"></div>
      </div>

      <div class="user-control">
        <img
          :src="
            userType === 'provider'
              ? order_details.user.image
              : order_details.provider.image
          "
          :alt="
            userType === 'provider'
              ? order_details.user.name
              : order_details.provider.name
          "
          class="avatar"
        />

        <div class="mx-3 mx-md-5 text-white text-center">
          {{
            userType === "provider"
              ? order_details.user.name
              : order_details.provider.name
          }}
          <span class="d-block mt-2">{{ timeCount }}</span>
        </div>

        <div class="mt-3 mt-md-0 d-flex align-items-center">
          <button
            v-if="order_details.consultation_slug === 'video'"
            class="btn-success nav-icon me-3"
            @click="toggleCamera"
          >
            <i
              class="fa-solid"
              :class="{ 'fa-video-slash': !camState, 'fa-video': camState }"
            ></i>
          </button>

          <button class="btn-gray nav-icon me-3" @click="toggleFullScreen">
            <i
              class="fa-solid"
              :class="{
                'fa-expand': !isFullScreen,
                'fa-compress': isFullScreen,
              }"
            ></i>
          </button>

          <button
            class="btn-danger nav-icon"
            id="close-video"
            @click="handleCallSocket('end') , answer_second = true"
          >
            <i class="fa-solid fa-phone"></i>
          </button>
        </div>
      </div> -->

    <!-- Add the audio element for the ringtone -->
    <audio ref="ringtone" controls  preload="auto" class="hidden" loop>
      <source src="/src/assets/media/ringing.mp3" type="audio/ogg" />
      <source src="/src/assets/media/ringing.mp3" type="audio/mpeg" />
    </audio> 
    <!-- Add the audio element for the end call -->
    <audio ref="endTone" preload="auto" controls class="hidden">
      <source src="/src/assets/media/end.mp3" type="audio/ogg">
      <source src="/src/assets/media/end.mp3" type="audio/mpeg">
    </audio>
    </div>
    <Toast ref="toast"  position="top-right"/>
  </section>
</template>

<script setup>
  import { ref , onMounted , onUnmounted, watch , watchEffect } from "vue";
  import { useRouter , useRoute } from "vue-router";
  import useApiMethods from "../../../../Composables/ApiMethods";
  import Toast from "primevue/toast";
  import { useStore } from "../../../../store/store";

  // define end call tone
  const endTone = ref()

  // define store 
  const store = useStore()

  // define props
  const props = defineProps({
    orderID : String,
    orderType :String,
    roomID : String ,
    apiKey : String,
    sessionId : String,
    call_token : String,
    api_secret : String,
    application_id : String,
    answerSecond : String
  })

  // ##############################################################################
  // ######################## Session Data Varaiables #############################
  // ##############################################################################
  const apiKey = ref("");
  const sessionId = ref("");
  const call_token = ref("");
  const api_secret = ref("");
  const application_id = ref("");
  const orderID = ref(store.orderInfo.id || "");
  const orderType = ref(store.orderInfo.type || "");
  const roomID = ref("");


  // ##############################################################################
  // ########## To Render Session Data From Props of Upcoming Calls  ##############
  // ##############################################################################
  watchEffect(() => {
    if (props.orderID) {
      orderID.value = props.orderID;
    }
    if (props.orderType) {
      orderType.value = props.orderType;
    }
    if (props.roomID) {
      roomID.value = props.roomID;
    }
    if (props.apiKey) {
      apiKey.value = props.apiKey;
    }
    if (props.sessionId) {
      sessionId.value = props.sessionId;
    }
    if (props.call_token) {
      call_token.value = props.call_token;
    }
    if (props.api_secret) {
      api_secret.value = props.api_secret;
    }
    if (props.application_id) {
      application_id.value = props.application_id;
    }
  });

  // ############ Initialize the time count with 0 seconds ########################
  const timeCount = ref("00:00");
  const receiver_id = ref(null);
  const receiver_name = ref(null);
  const receiver_image = ref(null); 

  // ##############################################################################
  // ########################## define api methods ################################
  // ##############################################################################
  const{
    getMethod ,
    getResult,
    toast,
    handleToast,
  } = useApiMethods()


  // ################################ Define Route ################################
  const route = useRoute()

  // add ringtone
  const ringtone = ref();

  // Function to play the ringtone
  const playRingtone = () => {
    if(ringtone?.value) {
      ringtone?.value?.play();
    }
  };

  // Function to stop the ringtone
  const stopRingtone = () => {
    if(ringtone?.value) {
      ringtone?.value?.pause();
    }
  };


  // ##############################################################################
  // ###################### [1] Socket Configuration ##############################
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


  // ############################################################################
  // ########################## [2] Initialize Session ##########################
  // ############################################################################
  let session = null;
  let publisher = null;
  let subscriber = null;
  const answer_second = ref(false);


  import OT from '@opentok/client'; 
  const initializeSession = () => {
    session = OT.initSession(application_id.value, sessionId.value);


    // Create a publisher
    publisher = OT.initPublisher(
      "publisher",
      {
        insertMode: "append",
        publishVideo: false,  // Disable video
        publishAudio: true,   // Enable audio
        width: "100%",
        height: "100%",
      },
      handleError()
    );

    // Subscribe to a newly created stream
    session.on("streamCreated", function (event) {
      answer_second.value = true;
      session.subscribe(
        event.stream,
        "subscriber",
        {
          insertMode: "append",
          width: "100%",
          height: "100%",
        },
        handleError()
      );
      isClientAnswered.value = true

      // Call updateTimeCount() when the subscriber stream is created
      updateTimeCount();

      // Stop the ringtone when the subscriber answers the call
      stopRingtone();
    });

    // Connect to the session
    session.connect(call_token.value, (error) => {
      if (error) {
        handleError(error);
      } else {
        session.publish(publisher, handleError);
      }
    });
  };


  // ##########################################################################
  // ############ The Function to Handle Finished Call From Socket ############
  // ##########################################################################
  socket.on("callFinished", function () {
    session?.disconnect();
    stopRingtone()
    publisher.publishAudio(false); // Stop using the mic
    if(store.showCoversation){
      store.toggleShowConversation()
    }
  });


  // ##########################################################################
  // ################### The Function to Render Session Data ##################
  // ##########################################################################
  const SessionData = () => {
    apiKey.value = apiKey.value
    sessionId.value = sessionId.value
    call_token.value = call_token.value
    api_secret.value = api_secret.value
    application_id.value = application_id.value
    receiver_id.value = store.recieverData.id;
    receiver_name.value = store.recieverData.name;
    receiver_image.value = store.recieverData.image;
  };


  // ##########################################################################
  // ###################### The Function to Handle Errors #####################
  // ##########################################################################
  const handleError = (error) => {
    if (error) {
      handleToast('error' , error.message)
    }
  };

  // ############################################################################
  // ############### Function to Control The Mic if Muted or Not ################
  // ############################################################################
  let isPublisherMuted = ref(false); 
  let isSubscriberMuted = ref(false);

  const toggleMute = (talker) => {
    console.log("Talker:", talker);
    if (talker == 'publisher') {
      // console.log("Publisher muted status:", isPublisherMuted.value);
      if (isPublisherMuted.value) {
        // console.log("Unmuting publisher...");
        publisher.publishAudio(true); // Unmute the microphone
      } else {
        // console.log("Muting publisher...");
        publisher.publishAudio(false); // Mute the microphone
      }
      isPublisherMuted.value = !isPublisherMuted.value; // Toggle state
      // console.log("New publisher muted status:", isPublisherMuted.value);
    } else {
      // console.log("Subscriber muted status:", isSubscriberMuted.value);
      if (isSubscriberMuted.value) {
        // console.log("Unmuting subscriber...");
        subscriber.subscribeToAudio(true); // Unmute the receiver
      } else {
        // console.log("Muting subscriber...");
        subscriber.subscribeToAudio(false); // Mute the receiver
      }
      isSubscriberMuted.value = !isSubscriberMuted.value; // Toggle state
      // console.log("New subscriber muted status:", isSubscriberMuted.value);
    }
  };

  const isClientAnswered = ref(false)


  // ############################################################################
  // ############# Function to Call the Socket To Control the Call ##############
  // ############################################################################
  // ####################### [start , answer , end] #############################
  // ############################################################################
  const handleCallSocket = (state) => {
    if(state == 'end'){
      session?.disconnect();
      store.handleOrderInfo({}); // to delete stored data about order room , id after call ended 
      endTone.value.play(); // to play the tone viewing the call closed
      store.toggleShowConversation();
      setTimeout(()=>{
        // console.clear();
        publisher.publishAudio(false); // Stop using the mic
      } , 1000)
      location.assign(orderType.value == 'order' ? `/order_details/${orderID.value}` : `/pending_order_details/${orderID.value}`)
    }
    socket.emit("call", {
      room_id: !roomID.value ? route.query.id : roomID.value,
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
      sender_name:store.profile.name,
      sender_image: store.profile.image ,
      sender_type:  "Provider",
      status: state,
      answer_second: 
      state == 'start' ? false 
      : (state == 'end' && isClientAnswered.value) ? true 
      : state == 'answer' ? true : false ,
    });

    console.log({
      room_id: !roomID.value ? route.query.id : roomID.value,
      session_id: sessionId.value,
      token: call_token.value,
      apiKey: apiKey.value,
      api_secret: api_secret.value,
      application_id: application_id.value,
      order_id: orderID.value,
      order_call_type: orderType.value,
      call_type: 'voice',
      // receiver_type: "User",
      // receiver_id: (state != 'start'|| state != 'end') ?  Number(store.recieverData.id):Number(store.profile.id) ,
      // receiver_name: (state != 'start'|| state != 'end') ? store.recieverData.name : store.profile.name,
      // receiver_image: (state != 'start'|| state != 'end') ?  store.recieverData.image : store.profile.image ,
      // sender_id: (state == 'start' || state == 'end') ? Number(store.profile.id) : Number(store.recieverData.id),
      // sender_name: (state == 'start' || state == 'end') ? store.profile.name : store.recieverData.name,
      // sender_image: (state == 'start' || state == 'end') ? store.profile.image : store.recieverData.image,
      // sender_type:  "Provider",
      receiver_type: "User",
      receiver_id:  Number(store.recieverData.id),
      receiver_name: store.recieverData.name,
      receiver_image: store.recieverData.image,
      sender_id: Number(store.profile.id),
      sender_name:store.profile.name,
      sender_image: store.profile.image ,
      sender_type:  "Provider",
      status: state,
      answer_second: 
      state == 'start' ? false 
      : (state == 'end' && isClientAnswered.value) ? true 
      : state == 'answer' ? true : false ,
      isClientAnswered : isClientAnswered.value
    }),
    console.log({
      'store_profile_id': store.profile.id,
      'store_profile_name': store.profile.name,
      'store_profile_image': store.profile.image,
      'store_recieverData_id': store.recieverData.id,
      'store_recieverData_name': store.recieverData.name,
      'store_recieverData_image': store.recieverData.image,
    })
  }


  // ############################################################################
  // ############## Function to update the time count every second ##############
  // ############################################################################
  const updateTimeCount = () => {
    setInterval(() => {
      const seconds = parseInt(timeCount.value.split(":")[1]) + 1;
      const minutes = parseInt(timeCount.value.split(":")[0]);
      const totalSeconds = seconds < 60 ? seconds : 0;
      const totalMinutes = seconds < 60 ? minutes : minutes + 1;
      timeCount.value = `${totalMinutes
        .toString()
        .padStart(2, "0")}:${totalSeconds.toString().padStart(2, "0")}`;
    }, 1000);
  };

  // #############################################################################
  // ###################### Handle Toggle Camera for Video Call ##################
  // #############################################################################
  let isCameraOn = false; // Initialize camera state
  let camState = ref(false);

  const toggleCamera = () => {
    if (publisher) {
      if (isCameraOn) {
        publisher.publishVideo(false); // Turn off camera
      } else {
        publisher.publishVideo(true); // Turn on camera
      }
      isCameraOn = !isCameraOn; // Toggle camera state
      camState.value = !camState.value; // Toggle camera state
    }
  };


  // #############################################################################
  // ################### Handle Toggle Full Screen for Video Call ################
  // #############################################################################

  let isFullScreen = ref(false);

  const toggleFullScreen = () => {
    const elem = document.getElementById("videos");
    if (!isFullScreen.value) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
    }
    isFullScreen.value = !isFullScreen.value;
  };

  // #####################################################################################
  // ##################### To Get The Fetched Data For Call Session ######################
  // #####################################################################################
  watch(()=> getResult?.value , (newValue)=>{
    if(newValue?.data && !props.orderType && !props.apiKey && !props.api_secret && !props.sessionId && !props.call_token && !props.application_id){
      apiKey.value = newValue?.data?.api_key
      api_secret.value = newValue?.data?.api_secret
      sessionId.value = newValue?.data?.session_id
      call_token.value = newValue?.data?.token
      application_id.value = newValue?.data?.application_id
    }
    // #####################################################################################
    // ############ to start call counter and stop ring tone once call started #############
    // #####################################################################################
    if(newValue?.key == 'sucess'){
      updateTimeCount()
      stopRingtone()
      isClientAnswered.value = true
    }
  })
  // ######################################################################################
  // ######### to handle if the user try to reload the page while call is running #########
  // ######################################################################################
  const handleBeforeUnload = (event) => {
    const message = [
      "سيتم ايقاف المكالمة",
      "The call will be stopped",
      "کال بند کردی جائے گی"
    ][store.lang] || "The call will be stopped";

    event.preventDefault();
    event.returnValue = message;
  };
  if(publisher){
    window.addEventListener('beforeunload', handleBeforeUnload);
  }

  // #####################################################################################
  // ######################### Fetch Call Data To Start the call #########################
  // #####################################################################################
  onMounted(() => {
    if(orderType.value == 'order' && !props.orderID && !props.orderType){
      getMethod(`provider/orders/${orderID.value}/make-call`, true)
    }else if(orderType.value == 'negotiation' && !props.orderID && !props.orderType){
      getMethod(`provider/un-pricing-orders/${orderID.value}/make-call`, true)
    }
    setTimeout(() => {
      SessionData();
      initializeSession();
      playRingtone();
      if (!props.orderID && !props.orderType) {
        handleCallSocket("start");
      } else {
        handleCallSocket("answer");
      }
      
      publisher.publishVideo(false); // Turn off camera
    }, 2000);
  });



  // Add navigation guard to close the session when navigating away
  onUnmounted(() => {
    session?.disconnect();
  });
</script>

<style lang="scss">
@import "/src/assets/scss/mixins";
.btn-grey{
  background: #000000b3;
  color: #fff;
  position: relative;
  border-radius: 50% !important;
  &.btn-grey-reciever{
    position: absolute;
    right: 5px;
    bottom: 5px;
    // transform: translateX(-50%);
    width: 30px;
    height: 30px;
    background: red;
  }
  &.muted{
    &::after{
      content: "";
      position: absolute;
      right: 50%;
      top: 10%;
      width: 1px;
      height: 80%;
      background: #fff;
      transform: rotate(45deg);
    }
  }
}
.border-top{
  position: fixed;
  width: 100%;
  height: 100%;
  background: #141313e0;
  top: 0;
  left: 0;
  z-index: 999;
  border: unset;
  .mx-3.mx-md-5.text-white.text-center{
    position: absolute;
    z-index: 99;
    top: -25px;
    left: 0;
    margin: 0 !important;
  }
  .controls{
    position: absolute;
    bottom: 0;
    z-index: 999;
    left: 50%;
    transform: translateX(-50%);
    button{
      width: 40px;
      height: 40px;
      padding: 5px;
      border-radius: 5px;
      border: 1px solid transparent;
      transition: 0.3s;
      .pi{
        color: #fff;
        font-size: 20px;
        &.pi-phone{
          transform: rotate(135deg);
        }
      }
      &.btn-danger{
        background: red;
        &:hover{
          background: #fff;
          border-color: red;
          .pi{
            color: red;
          }
        }
      }
    }
    .mx-3{
      @include displayFlex($direction:column , $gap:5px);
    }
    .mt-3.mt-md-0.d-flex.align-items-center{
      @include displayFlex($gap:20px);
    }
  }
}
#videos {
  // position: relative;
  // width: 100%;
  // height: 100%;
  // height: 87vh;
  // background-color: #fff;
  max-width:767px;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50% , -50%);
  z-index: 9999;
  height: 72vh;
  text-align: center;
  margin: 0 auto;
  border-radius: 4px;
  // overflow: hidden;
  .reciever_data{
    position: absolute;
    right: 20px;
    top: 20px;
    border-radius: 8px;
    overflow: hidden;
    width: 120px;
    height: 120px;
    background: aliceblue;
    z-index: 99;
    display: none;
  }
  @media (max-width : 767px){
    max-width: 95%;
  }
}

#publisher {
  width: 12%;
  aspect-ratio: 1 / 1;
  border: 1px solid white;
  position: absolute;
  top: 20px;
  right: 20px;

  .OT_publisher {
    width: 100% !important;
    height: 100% !important;
  }
}

#subscriber {
  width: 100%;
  height: 72vh;

  .OT_subscriber {
    width: 100% !important;
    height: 100% !important;
  }
}

.user-control {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
  background-color: #2966b0;
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.call_overlay {
  background-color: #141313;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  border-radius: 5px;
  @include displayFlex($direction:column , $gap:20px);
  // img{
  // }
  > img{
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: contain;
    object-position: center;
    background-color: grey;
    border: 1px solid grey;
  }
}
.OT_publisher, .OT_subscriber{
  display:none !important;
}
</style>