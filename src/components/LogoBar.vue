<template>
  <div class="logo-side">
    <div class="image">
      <img src="../assets/images/vertical_logo.png" alt="img" loading="lazy">
    </div>
    <div class="copyright">
      <p>{{ $t('copyright.thunder_rights') }}</p>
      <p>{{ $t('copyright.awamer_rights')}}</p>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables";
  @import "../assets/scss/mixins";
  .logo-side {
    width: 35%;
    background: $mainColor;
    padding: 200px 20px 70px;
    position: fixed;
    inset-inline-start: 0;
    height: 100%;
    @include displayFlex($direction: column, $justify: space-between, $align: flex-start);
    .image {
      max-width: 200px;
      margin: 0 auto;
      img {
        object-fit: contain;
      }
    }
    p {
      font-size: 14px;
      color: #fff;
    }
    @media (max-width: 767px){
      display: none;
    }
  }
</style>