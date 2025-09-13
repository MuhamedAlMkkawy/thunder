<template>
  <div> 
    <div class="call_popup">
      <div class="content">
        <div class="info">
          <div class="image">
            <img :src="props.image" alt="image" loading="lazy">
          </div>
          <div class="title">
            <h3>{{props.title}} </h3>
            <p>{{$t('call.text')}}</p>
          </div>
        </div>
        <div class="buttons">
          <button class="main-btn accept" @click="emit('acceptCall')">
            <i class="pi pi-phone"></i>
            {{ $t('call.accept') }}
          </button>
          <button class="main-btn cancel" @click="emit('cancelCall')">
            <i class="pi pi-times"></i>
            {{ $t('call.cancel') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // define emits
  const emit = defineEmits(['acceptCall' , 'cancelCall'])
  // define props
  const props = defineProps({
    title : {
      type : String ,
      default : ""
    },
    image : {
      type : String,
      default: ""
    }
  })
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/mixins";

  .call_popup{
    position: fixed;
    top: 20px;
    right: 25px;
    width: fit-content;
    min-width: 350px;
    padding: 15px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px #6a6a6a;
    z-index: 999;
    animation-name: pulse;
    animation-duration:1s;
    animation-direction: alternate-reverse;
    animation-iteration-count: infinite;
    outline: unset !important;
    @media (max-width : 400px){
      min-width: unset;
      width: 100%;
      margin: 0 5px;
    }
    .content{
      .info{
        @include displayFlex($justify:center , $gap : 8px);
        margin-bottom: 15px;
        h3{
          @include textTruncate(1);
        }
        p {
          font-size: clamp(14px, 2.5vw, 20px);
          text-align: center;
          margin-top: -15px;
        }
        .image{
          width: 70px;
          height: 76px;
          overflow: hidden;
          // border-radius: 50%;
        }
      }
      .buttons{
        @include displayFlex($gap : 8px);
        button{
          font-size: 16px;
          text-wrap: nowrap;
          width: 100px;
          height: 40px;
          @include displayFlex($gap : 4px);
          &.accept{
            background: green;
            &:hover{
              border-color: green !important;
              color: green !important;
            }
          }
          &.cancel{
            background: red;
            &:hover{
              border-color: red !important;
              color: red !important;
            }
          }
        }
      }
    }
  }
</style>