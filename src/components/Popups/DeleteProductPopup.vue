<template>
  <div>
    <div class="popup">
      <div class="content">
        <button class="close_btn" @click="emit('handleShowDeleteProductPopup')">
          <i class="pi pi-times"></i>
        </button>
        <div class="image">
          <img src="../../assets/images/warning.gif" alt="image" loading="lazy">
        </div>
        <h5>{{$t('delete_product_popup.title')}}</h5>
        <p>
          {{$t('delete_popup.text')}}
        </p>
        <div class="buttons">
          <button class="main-btn" @click="emit('handleShowDeleteProductPopup')">
            {{$t('delete_popup.cancel')}}
          </button>
          <button class="main-btn delete_btn" @click="emit('handleDeleteProduct')">
            {{$t('delete_popup.confirm')}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const emit = defineEmits(['handleShowDeleteProductPopup' , 'handleDeleteProduct'])
</script>

<style lang="scss" scoped>

</style>