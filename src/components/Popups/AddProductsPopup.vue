<template>
  <div>
    <div class="popup">
      <div class="content">
        <div class="image">
          <img src="../../assets/images/warning.gif" alt="image" loading="lazy">
        </div>
        <h5>{{$t('add_product_popup.title')}}</h5>
        <div class="edit_buttons">
          <RouterLink to="/products">
            <button class="main-btn">
              {{$t('add_product_popup.submit_btn')}}
            </button>
          </RouterLink>
          <RouterLink :to="'/add_variants/' + props.product_id">
            <button class="main-btn variants_btn">
              {{ $t('add_product_popup.add_variants') }}
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    product_id : {
      type : Number,
      default : ''
    }
  })
</script>

<style lang="scss" scoped>
  h5{
    margin-block: 40px;
  }
</style>