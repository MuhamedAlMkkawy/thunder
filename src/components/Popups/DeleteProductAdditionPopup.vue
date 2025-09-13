<template>
  <div>
    <div class="popup">
      <div class="content">
        <button class="close_btn" @click="emit('handleShowDeleteProductAdditionPopup')">
          <i class="pi pi-times"></i>
        </button>
        <div class="image">
          <img src="../../assets/images/warning.gif" alt="image" loading="lazy">
        </div>
        <h5>{{$t('delete_product_addition_popup.title')}}</h5>
        <p>
          {{$t('delete_popup.text')}}
        </p>
        <div class="buttons">
          <button class="main-btn" @click="emit('handleShowDeleteProductAdditionPopup')">
            {{$t('delete_popup.cancel')}}
          </button>
          <button class="main-btn delete_btn" @click="emit('handleDeleteProductAddition')">
            {{$t('delete_popup.confirm')}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const emit = defineEmits(['handleShowDeleteProductAdditionPopup' , 'handleDeleteProductAddition'])
</script>

<style lang="scss" scoped>

</style>