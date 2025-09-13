<template>
  <vue3-star-ratings v-model="props.rating" />
</template>

<script setup>
  // import { ref } from "vue";
  // import vue3starRatings from "vue3-star-ratings";

  const props = defineProps({
    rating : {
      type:Number,
      default : 0
    }
  })

</script>

<style lang="scss" scoped>
  .vue3-star-ratings{
    direction: ltr;
    // margin: 0 auto;
  }
</style>
