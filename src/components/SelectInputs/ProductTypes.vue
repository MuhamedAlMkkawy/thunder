<template>
  <select 
    id="type"
    v-model="productType"
    @change="handleChange"
  >
    <option :value="-1">{{$t('add_product.choose')}} {{$t('add_product.type')}}</option>
    <option 
      v-for="type in getResult?.data" 
      :key="Number(type.value)"
      :value="Number(type.value)"
    >
      {{type.text}}
    </option>
  </select>
</template>

<script setup>
  import { ref, onMounted, watch, watchEffect } from 'vue';
  import useApiMethods from '../../Composables/ApiMethods';

  const { getMethod, getResult } = useApiMethods();

  // Define props
  const props = defineProps({
    product_type: {
      type: Number, 
      default: -1
    },
    has_price: {
      type: Boolean, 
      default: false
    }
  });

  const productType = ref(props.product_type);

  // Define emits
  const emit = defineEmits(['clearError', 'handleProductType']);

  // Watch for changes in `product_type` and update `productType`
  watch(() => props.product_type, (newValue) => {
    if (newValue !== undefined) {
      productType.value = newValue;
    }
  });

  // Handle select change event
  const handleChange = () => {
    emit('clearError', 'type');
    emit('handleProductType', productType.value);
  };

  watchEffect(() => {
    if (props.has_price) {
      console.log('Price flag:', props.has_price);
    }
  });

  onMounted(() => {
    getMethod('general/get-product-types', true);
  });
</script>

<style lang="scss" scoped>
</style>
