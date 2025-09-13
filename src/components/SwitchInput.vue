<template>
  <button 
    class="toggle-switch"
    @click="handleToggleSwitch"
    :style="checked ? 'background: #7C9DC4;' : 'background: #DBDBDB;'"
  >
    <div :class="['circle', checked ? 'active' : '']"></div>
  </button>
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue';

  const props = defineProps({
    // modelValue: {
    //   type: Boolean,
    //   default: false
    // },
    is_available_to_recieve_orders : {
      type : Boolean,
      default : false
    }
  });

  const emit = defineEmits(['updateStatus']);

  const checked = ref();

  // // Watch for changes in the modelValue prop to update the local state
  // watch(() => props.modelValue, (newVal) => {
  //   checked.value = !newVal;
  // });


  // // Watch for changes in the is_available_to_recieve_orders prop to update the local state
  watch(() => props.is_available_to_recieve_orders, (newVal) => {
    // console.log(newVal)
    checked.value = newVal;
  });

  const handleToggleSwitch = () => {
    checked.value = !checked.value;
    emit('updateStatus', checked.value); // Emit the updated value for v-model binding
  };

  onMounted(() => {
    checked.value = props.is_available_to_recieve_orders;
  });
</script>

<style lang="scss" scoped>
  button.toggle-switch {
    width: 40px;
    height: 20px;
    border-radius: 20px;
    background: #434343;
    transition: 1s;
    position: relative;

    .circle {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #fff;
      position: absolute;
      inset-inline-start: 3px;
      top: 50%;
      transform: translateY(-50%);
      transition: 1s;

      &.active {
        inset-inline-start: 22px;
      }
    }

    @media (max-width: 500px) {
      width: 20px;
      height: 10px;

      .circle {
        width: 8px;
        height: 8px;

        &.active {
          inset-inline-start: 10px;
        }
      }
    }
  }
</style>
