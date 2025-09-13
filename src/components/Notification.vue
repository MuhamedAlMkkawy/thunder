<template>
  <div>
    <div class="notification">
      <div class="image">
        <img src="/src/assets/images/logo.png" alt="img" loading="lazy">
      </div>
      <div class="text">
        <h4>{{props.title}}</h4>
        <p>{{props.body}}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    title : {
      type : String,
      default : ''
    },
    body : {
      type: String,
      default : ''
    }
  })
</script>

<style lang="scss" scoped>
  @import "../assets/scss/mixins";
  .notification{
    position: fixed;
    right: 15px;
    top: 15px;
    width: fit-content;
    display: flex;
    gap: 15px;
    align-items: center;
    z-index: 99999;
    background: #fff;
    box-shadow: 0 0 8px #8b8b8b;
    border-radius: 10px;
    padding: 10px 15px;
    animation-name:pulse;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    outline: unset !important;
    .image{
      width: 70px;
      height: 77px;
      flex-shrink: 0;
    }
    .text{
      h4{
        font-size: 18px;
        font-weight: 500;
      }
      p{
        font-size: 14px;
        font-weight: 300;
        white-space: normal;
        word-wrap: break-word;
        overflow-wrap: break-word;
        width: 245px;
        line-height: 1.2;
        @include textTruncate(3);
      }
    }
  }
</style>