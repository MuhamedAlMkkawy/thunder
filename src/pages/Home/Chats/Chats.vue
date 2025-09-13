<template>
  <div class="chats_page">

    <!-- Contacts Sidebar -->
    <ChatContacts 
      :showContacts="showContacts"
      @toggleShowContacts="toggleShowContacts"
      @handleEnterRoom="handleEnterRoom"
    />

    <!-- Chat Interface -->
    <div class="page contact_chat" v-if="route.query.id != undefined">
      <div class="top">
        <ChatInfo 
          :chatId="chatID" 
          @handleShowInvoicePopup="handleShowInvoicePopup"
        />
        <div class="chat-buttons">
          <!-- Show Contacts Button -->
          <button
            class="main-btn show-contacts-btn"
            :style="{ opacity: showContacts ? 0 : 1 }"
            @click="toggleShowContacts"
          >
            <i class="pi pi-users"></i>
          </button> 
          <!-- {{  getResult?.data?.members[0]?.is_busy  }} -->
          <button @click="handleStartConversation" class="main-btn" v-if="!getResult?.data?.members[0]?.is_busy">
            <i class="pi pi-phone"></i>
          </button>
          <p class="danger_color" v-else>
            {{ store.lang == 'ar' ? 'في مكالمة جارية' : store.lang == 'en' ? 'In a call' : 'مكالمة جاری ہے' }}
          </p>
        </div>
      </div>
      <hr />
      <SkeletonTable v-if="loading" />
      <div class="content" v-else id="chatContent">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="['message', message.type == 'invoice' ? 'invoice-msg' : '' , { 'recieved_msg': message.sender_id != store.profile.id, 'sent_msg': message.sender_id == store.profile.id }]"
          :style="message.type == 'invoice' ? 'invoice-msg' : ''"
        >
          <pre class="message_text" v-if="message.type == 'text'">{{ message.body }}</pre>
          <div class="image" @click="handleImage(message.body)" v-else-if="message.type == 'image'">
            <img :src="message.body" alt="image" loading="lazy">
          </div>
          <div class="invoice" v-else-if="message.type == 'invoice'">
            <h6>{{$t('chat.invoice_title')}}</h6>
            <ul>
              <li>
                <p>{{$t('chat.order_value')}}</p>
                <p>{{JSON.parse(message.body).total}} {{ $t('currency') }}</p>
              </li>
              <li>
                <p>{{$t('chat.delivery_fee')}}</p>
                <p>{{JSON.parse(message.body).delivery_price}} {{ $t('currency') }}</p>
              </li>
              <li>
                <p>{{$t('chat.vat_amount')}}</p>
                <p>{{JSON.parse(message.body).vat_amount}} {{ $t('currency') }}</p>
              </li>
              <li>
                <p>{{$t('chat.total_amount')}}</p>
                <p>{{JSON.parse(message.body).final_total}} {{ $t('currency') }}</p>
              </li>
            </ul>
          </div>
          <div class="audio" v-else-if="message.type == 'sound'">
            <audio 
              :src="message.body" 
              controls 
              preload="none" 
              :alt="'Audio message from ' + message.senderName">
            </audio>
          </div>
          <!-- <a class="message_link" :href="message.body" v-if="message.type == 'link'">{{ message.body }}</a> -->
          <div class="message-time" :style="store.lang === 'en' ? 'direction:ltr' : 'direction:rtl'">{{ message.created_at }}</div>
        </div>
      </div>
      <form @submit.prevent="sendMessage">
        <div class="inputs">
          <input 
            type="file" 
            ref="fileInput" 
            hidden 
            id="fileInput" 
            @change="uploadFile"
            accept="image/*"
          />
          <label for="fileInput" class="pi pi-camera"></label>
          <input 
            type="text"  
            v-model="inputMessage" 
            :placeholder="$t('chat.chat_text')" 
            @keydown.enter="sendMessage"
          />
          <button type="submit" class="sender_btn">
            <i class="pi pi-send"></i>
          </button>
        </div>
        <button
          class="microphone"
          :class="{ recording: isRecording }"
          @click="handleRecording"
          >
          <!-- @mousedown.prevent="startRecording"
            @mouseup.prevent="stopRecording"
          @touchstart.prevent="startRecording"
          @touchend.prevent="stopRecording" -->
          <i class="pi" :class="isRecording ? 'pi-stop' : 'pi-microphone'"></i>
        </button>
      </form>
    </div>
    <div class="page empty-chat" v-else>
      <i class="pi pi-sync"></i>
      <h3>{{$t('chat.empty_text')}}</h3>
    </div>
    <!-- ################################ handle call feature ################################
    <Conversation
      v-if="showCoversation"
      @toggleShowConversation="toggleShowConversation"
    /> -->
    <!--######################## handle request invoice from client #########################-->
    <InvoicePopup
      v-if="showInvoicePopup"
      @handleShowInvoicePopup="handleShowInvoicePopup"
      @handleRequestInvoice="handleRequestInvoice"
    />
    <ImagePopup 
      v-if="showImagePopup"
      @handleShowImagePopup ="handleShowImagePopup"
      :image = "chatImage"
    />
    <!--####################################### Toast #######################################-->
    <Toast 
      ref="toast"
      position="top-right"
    />
    <audio ref="messageAudio" preload="auto" controls class="hidden">
      <source src="/src/assets/media/message.mp3" type="audio/ogg">
      <source src="/src/assets/media/message.mp3" type="audio/mpeg">
    </audio>
  </div>
</template>

<script setup>
  import { ref, onMounted , onUnmounted, watch } from 'vue';
  import { io } from 'socket.io-client';
  import { useStore } from '../../../store/store';
  import { useRoute , useRouter } from 'vue-router';
  import useApiMethods from '../../../Composables/ApiMethods';
  import ChatContacts from '../../../components/ChatContacts.vue';
  import ChatInfo from '../../../components/ChatInfo.vue';
  import Toast from 'primevue/toast'
  import InvoicePopup from '../../../components/Popups/InvoicePopup.vue';
  import Conversation from './Call/Conversation.vue';
  import SkeletonTable from '../../../components/Tables/SkeletonTable.vue'
  import ImagePopup from '../../../components/Popups/ImagePopup.vue';


  // define message tone 
  const messageAudio = ref()

  // define api methods
  const {
    getMethod,
    postMethod,
    getResult,
    postResult,
    toast,
    loading,
    handleToast
  } = useApiMethods()

  // Reactive state
  const showContacts = ref(true);
  const messages = ref([]);
  const inputMessage = ref('');
  const fileInput = ref(null);
  const socket = ref(null);
  const isRecording = ref(false);
  const mediaRecorder = ref(null);
  const audioChunks = ref([]);
  // const chatContent = ref()

  // define router
  const router = useRouter()
  
  // define store 
  const store = useStore()

  // define route to get params of room
  const route = useRoute()

  

  // get chat id from the query
  const chatID = route.query.id

  const handleStartConversation = () =>{
  // #################### to chech if mic and cam permission is granted ###################
  navigator.permissions.query({ name: "microphone" }).then((result) => {
      if (result.state === "granted") {
        console.log("Microphone permission is granted ✅");
        store.toggleShowConversation();
      } else {
        handleToast('error' , store.lang === 'en' ? "Microphone permission denied ❌" : store.lang === 'ar' ? "يرجي تفعيل الميكروفون" : "مائیکروفون کی اجازت نہیں ہے ❌")
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      }
    });
    // Promise.all([
    //   navigator.permissions.query({ name: "microphone" }),
    //   navigator.permissions.query({ name: "camera" })
    // ])
    //   .then(([micResult, camResult]) => {
    //     if (micResult.state === "granted" && camResult.state === "granted") {
    //       // console.log("Microphone & Camera permissions are granted ✅");
    //     } else {
    //       navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    //         .then((stream) => {
    //           console.log("Permissions granted, stream:", stream);
    //         })
    //         .catch((error) => {
    //           handleToast('error' , store.lang === 'en' ? "Microphone or camera permission denied ❌" : store.lang === 'ar' ? "يرجي تفعيل الميكروفون والكاميرا" : "مائیکروفون یا کیمرہ کی اجازت نہیں ہے ❌")
    //           navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    //           .then((stream) => {
    //             console.log(stream)
    //           })
    //           .catch((error) => {
    //             console.error("Microphone permission denied", error);
    //           });
    //         });
    //     }
    //   })
    //   .catch((error) => console.error("Error checking permissions:", error));

    store.storeRecieverData(getResult?.value?.data?.members[0].id , getResult?.value?.data?.members[0].name , getResult?.value?.data?.members[0].image)
  }
  // to handle show chat contacts
  const toggleShowContacts = () =>{
    showContacts.value = !showContacts.value;
  }

  // handle enter room
  const handleEnterRoom = (roomId) => {
    toggleShowContacts()
    router.push(`/chats?id=${roomId}`)
    getMethod(`general/get-room-messages/${roomId}` , true)
  }


  // handle request invoice 
  const showInvoicePopup = ref(false)
  const handleShowInvoicePopup = () =>{
    showInvoicePopup.value = !showInvoicePopup.value
  }

  const handleRequestInvoice = () =>{
    handleShowInvoicePopup()
  }


  // handle show image popup
  const chatImage = ref()
  const showImagePopup = ref(false)

  const handleShowImagePopup = () => {
    showImagePopup.value = !showImagePopup.value
  }

  const handleImage = (imageSrc) => {
    handleShowImagePopup()
    chatImage.value = imageSrc
  }

  //#############################################################################################
  //##################################### SOCKET CONFIGURATION ##################################
  //#############################################################################################
  socket.value = io("https://thunder-way.com:4797", {
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



  //#############################################################################################
  //##################################### Handle Send Message ###################################
  //#############################################################################################
  const sendMessage = () => {
    if (inputMessage.value.trim() || fileInput.value?.files?.length > 0) {
      const message = {
        id: Date.now(),
        senderId: store.profile.id,
        // content: inputMessage.value || '',
        file: null,
        fileType: null,
        time: new Date().toLocaleTimeString(),
      };

      if (fileInput.value?.files?.length > 0) {
        const file = fileInput.value.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          message.file = e.target.result; // Base64 encoded file
          message.fileType = file.type;
          socket.value.emit('send_message', message);
          messages.value.push(message);
          // inputMessage.value = '';
          fileInput.value.value = ''; // Reset file input
        };
        reader.readAsDataURL(file);
        const fileData = new FormData()
        fileData.append('file' , file)
        postMethod(`general/upload-room-file/${chatID}` , fileData , true , `/chats?id=${chatID}` , 'toast')
        getMethod(`general/get-room-messages/${chatID}` , true)
        // console.log(file)
      }
      else {
        sendMessageTosocket('text' , inputMessage.value)
      }
    }
  };



  //#############################################################################################
  //###################### Watch Result Of posting to send it to the socket #####################
  //#############################################################################################
  watch(() => postResult?.value?.data, (newValue) => {
    if (newValue) {
      // console.log(newValue);

      // Determine file type from the file extension
      const fileName = newValue?.file_name;
      const fileType = determineFileType(fileName);

      // console.log(fileName , fileType)
      // Send the message with the appropriate type
      sendMessageTosocket(fileType, fileName);
      if(messageAudio.value){
        messageAudio.value.play()
      }

      // Optionally fetch room messages (only if necessary)
      getMethod(`general/get-room-messages/${route.query.id}`, true);
    }
  });



  //#############################################################################################
  //################## Helper function to determine file type from extension ####################
  //#############################################################################################
  function determineFileType(fileName) {
    const extension = fileName?.split('.').pop()?.toLowerCase();

    // Map of known extensions to message types
    const fileTypeMap = {
      // Image types
      jpg: 'image',
      jpeg: 'image',
      png: 'image',
      gif: 'image',

      // Audio types
      mp3: 'sound',
      wav: 'sound',
      m4a: 'sound',
      ogg: 'sound',
      webm: 'sound',

      // Video types
      mp4: 'video',
      avi: 'video',
      mov: 'video',

      // Document types
      pdf: 'document',
      doc: 'document',
      docx: 'document',
      xls: 'document',
      xlsx: 'document',

      // Invoice types (treated as documents)
      invoice: 'invoice', // Custom logic if you want to handle invoices separately

      // Default or unrecognized types
    };

    // Return the determined type or default to 'file'
    return fileTypeMap[extension] || 'file';
  }




  //#############################################################################################
  // ############################## SOCKET SEND FUNCTION ########################################
  //#############################################################################################
  function sendMessageTosocket(newType , newResponse) {
    socket.value.emit("sendMessage", {
        receiver_id: getResult?.value?.data?.members[0]?.id,
        receiver_type: 'User',
        room_id: route.query.id,
        type: newType,
        body: newResponse,
    });
    inputMessage.value = ''
    // console.log(getResult?.value?.data?.members[0]?.id)
  }
  // File upload handler
  const uploadFile = () => {
    sendMessage();
  };




  //###################################################################################### 
  //############################## Handle Recording ###################################### 
  //###################################################################################### 
  const startRecording = async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Create MediaRecorder with the stream
      mediaRecorder.value = new MediaRecorder(stream);

      // Clear previous audio chunks
      audioChunks.value = [];

      // Collect audio data as it becomes available
      mediaRecorder.value.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.value.push(event.data);
        }
      };

      // Handle stopping of recording
      mediaRecorder.value.onstop = () => {
        const message = {
          id: Date.now(),
          senderId: store.profile.id,
          file: null,
          fileType: 'audio',
          time: new Date().toLocaleTimeString(),
        };

        // Create a Blob from recorded audio
        const audioBlob = new Blob(audioChunks.value, { type: 'audio/mp3' });

        // Prepare FormData for file upload
        const formData = new FormData();
        formData.append("file", audioBlob, `audio-${Date.now()}.mp3`);

        // Read the audio file as a base64 string for preview (if needed)
        const reader = new FileReader();
        reader.onload = (e) => {
          message.file = e.target.result; // Base64 encoded file

          // Emit the audio message through the socket
          socket.value.emit('send_message', message);

          // Push the message to local messages array
          messages.value.push(message);

          // Upload audio file to the server
          postMethod(`general/upload-room-file/${chatID}`, formData, true, `/chats?id=${chatID}`, "toast")
          // Clear audio chunks
          audioChunks.value = [];
        };
        reader.readAsDataURL(audioBlob);
      };
      
      getMethod(`general/get-room-messages/${chatID}`, true)
      // Start recording
      mediaRecorder.value.start();
      isRecording.value = true;

    } catch (error) {
      console.error('Failed to start recording:', error);

      // Reset recording state if an error occurs
      isRecording.value = false;
    }
  };


  // Stop recording
  const stopRecording = () => {
    mediaRecorder.value.stop();
    isRecording.value = false;
    // if (mediaRecorder.value && isRecording.value) {
    //   mediaRecorder.value = false;
      audioChunks.value = [];
    // }
  };

  const handleRecording = () => {
    if(isRecording.value){
      stopRecording()
    }else{
      startRecording()
    }
  }


  //#############################################################################################
  //###################### Watch Result Of Fetching Messages ####################################
  //#############################################################################################
  watch(()=>getResult?.value?.data , (newValue)=> {
    if(newValue){
      messages.value = newValue?.messages?.data
      store.handleOrderInfo(newValue.room.order_type , newValue.room.order_id)
      // setTimeout(() => {
      //   document.getElementById('chatContent').scrollTo({ top: document.getElementById('chatContent').scrollHeight , behavior: 'smooth' })
      // }, 150);
    }
  })



  //#############################################################################################
  //############### watch changes in query id to fetch the room messages ########################
  //#############################################################################################
  watch(()=>chatID , (oldValue , newValue)=> {
    if(newValue){
      getMethod(`general/get-room-messages/${chatID}` , true)
    }
  })


  watch(()=> store.lang , (newValue)=>{
    if(newValue){
      getMethod(`general/get-room-messages/${chatID}`, true);
    }
  })

  //###################################################################################### 
  //########################## Listen to Socket Messages ################################# 
  //###################################################################################### 
  socket.value.on('sendMessageRes', function (data) {
    messages.value.push(data);
    // console.log(data)
  });


  
  //###################################################################################### 
  //############################## Socket Connection ##################################### 
  //###################################################################################### 
  onMounted(() => {
    route.query.id && getMethod(`general/get-room-messages/${route.query.id}` , true)
    socket.value.emit("enterChat", {
      room_id: route.query.id,
    });
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    navigator.permissions.query({ name: "microphone" }).then((result) => {
      if (result.state === "granted") {
        console.log("Microphone permission is granted ✅");
      } else {
        console.log("Microphone permission is denied ❌");
      }
    });

  });

  onUnmounted(() => {
    socket.value?.disconnect();
  });
</script>

<style lang="scss" scoped>
  audio{
    width: 100%;
    input , button{
      color: #fff !important;
    }
  }
  audio::-webkit-media-controls-enclosure{
    background: transparent;
  }
  .empty-chat{
    margin: 0 auto 4px;
    width: 100%;
  }

  .danger_color{
    color: red;
    font-size: 14px;
  }
</style>