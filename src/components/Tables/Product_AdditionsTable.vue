<template>
  <div>
    <SkeletonTable v-if="props.additions.length === 0 && props.loading"/>
    <Empty 
      v-else-if="props.additions.length === 0 && !props.loading" 
    />
    <div v-else>
      <DataTable 
        :value="props.additions" 
        class="table products_table centered-table statistics-table">
        <Column field="id" header="#" :style="{ minWidth: '120px' }"></Column>
        <Column :header="$t('products_additions.image')" :style="{ minWidth: '120px' }">
          <template #body="slotProps">
            <div class="image">
              <img :src="slotProps.data.image" alt="image" loading="lazy">
            </div>
          </template>
        </Column>
        <Column field="name" :header="$t('products_additions.name')" :style="{ minWidth: '120px' }"></Column>
        <Column field="price" :header="$t('products_additions.price')" :style="{ minWidth: '120px' }">
          <template #body="slotProps">
            {{slotProps.data.price}}  {{$t('currency')}}
          </template>
        </Column>
        <Column :style="{ minWidth: '120px' }">
          <template #body="slotProps">
            <div class="buttons">
              <RouterLink :to="'/edit_addition/' + slotProps.data.id">
                <button class="edit_btn">
                  <i class="pi pi-cog"></i>
                </button>
              </RouterLink>
              <button class="delete_btn" @click="handleDeleteAddition(slotProps.data.id)">
                <i class="pi pi-trash"></i>
              </button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import { RouterLink } from 'vue-router';
  import { useStore } from '../../store/store';
  import Empty from '../Empty.vue';
  import SkeletonTable from './SkeletonTable.vue';



  // define store
  const store = useStore()


  // define emits
  const emit = defineEmits(['handleShowDeleteProductAdditionPopup'])


  // define props
  const props = defineProps({
    additions : {
      type : Object ,
      default : []
    },
    loading:{
      type : Boolean,
      default : false
    }
  })

  // handle delete addition
  const handleDeleteAddition = (additionId) => {
    store.handleStoreAdditionId(additionId)
    emit('handleShowDeleteProductAdditionPopup')
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/mixins";
  .image {
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.0509803922);
    background: #fff;
    width: 60px;
    height: 60px;
    border-radius: 4px;
    overflow: hidden;
    img{
      object-fit: contain;
    }
  }
  .blue-column {
    color: #2367AA; /* Change the text color to blue */
  }
  .buttons{
    @include displayFlex($gap : 4px);
    button{
      width: 35px;
      height: 35px;
      border-radius: 5px;
      font-size: 20px;
      color: #fff;
      border: 1px solid;
      @include displayFlex();
      &.edit_btn{
        background: #7C9DC4;
        &:hover{
          border-color:#7C9DC4;
          color: #7C9DC4;
          background: #fff;
        }
      }
      &.delete_btn{
        background: #A80202;
        &:hover{
          border-color:#A80202;
          color: #A80202;
          background: #fff;
        }
      }
    }
  }
</style>
