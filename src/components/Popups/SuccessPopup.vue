<template>
  <div>
    <div class="popup">
      <div class="content">
        <div class="image">
          <img src="../../assets/images/success.gif" alt="image" loading="lazy">
        </div>
        <h5>{{ props.successedMsg }}</h5>
      </div>
    </div>
  </div>
</template>

<script setup>
  const emit = defineEmits(['handleShowSuccessedPopup'])

  const props = defineProps({
    successedMsg : {  
      type : String,
      default : ''
    }
  })
</script>

<style lang="scss" scoped>
.popup{
  .content{
    padding-block: 50px;
  }
}
</style>