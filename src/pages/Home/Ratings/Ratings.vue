<template>
  <div class="rating_page">
    <div class="page_content">
      <h4>{{ $t('ratings.title') }}</h4>
      <hr>
      <div class="rating_tab" v-for="item in getResult?.data?.givenRates" :key="item.id">
        <div class="image">
          <img :src="item?.ratingable?.image" alt="image" loading="lazy">
        </div>
        <div class="text">
          <h3>{{item?.ratingable?.name}}</h3>
          <p>{{ item?.message }}</p>
          <RatingStars :rating="item.rate" />
        </div>
      </div>
    </div>
    <div class="rating_score">
      <div class="image">
        <img src="../../../assets/images/rating_img.png" alt="image" loading="lazy">
      </div>
      <h5>{{getResult?.data?.avg_rate}}</h5>
      <RatingStars :rating="getResult?.data?.avg_rate" />
      <p>({{getResult?.data?.givenRates.length}}) {{$t('ratings.text')}}</p>
    </div>
  </div>
</template>

<script setup>
  import RatingStars from '../../../components/RatingStars.vue';
  import { onMounted } from 'vue';
  import useApiMethods from '../../../Composables/ApiMethods'
  
  
  
  const {
    getMethod,
    getResult
  } = useApiMethods()


  onMounted(()=>{
    getMethod('provider/rates/my-given-rates' , true)
  })

</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/variables";
  @import "../../../assets/scss/mixins";

  .rating_page{
    @include displayFlex($align : flex-start , $justify : space-between , $gap : 20px);
    p{
      color: #949494;
      font-size: clamp(16px , 4vw , 20px);
      font-weight: 400;
    }
    .page_content{
      padding:  0;
      flex-grow: 1;
      border-radius: 20px;
      h4{
        padding-block: 5px;
        padding-inline-start: 15px;
        font-size: 18px;
        font-weight: 500;
        + hr{
          border: 1px solid #F1F1F1;
        }
      }
      .rating_tab{
        padding: 20px clamp(8px , 4vw , 25px) 24px;
        @include displayFlex($justify:flex-start);
        &:not(:last-of-type){
          border-bottom: 1px solid #F1F1F1;
        }
        .image{
          width: 70px;
          height: 70px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
        }
        .text{
          h3{
            font-size: clamp(14px , 4vw , 18px);
            font-weight: 500;
            color: #000000;
          }
          p{
            font-size: clamp(12px , 4vw , 16px);
            font-weight: 500;
            color:#656565;
          }
          
        }
        @media (max-width : 600px){
          flex-wrap: wrap;
          justify-content: flex-start;
        }
      }
    }
    .rating_score{
      max-width: 400px;
      width: 100%;
      margin-bottom: 50px;
      text-align: center;
      flex-shrink: 0;
      margin: 0 auto;
      .vue3-star-ratings{
        margin: 0 auto;
      }
      h5{
        font-size: clamp(20px , 4vw , 60px);
        font-weight: 500;
        color: $textColor;
      }
    }
    @media (max-width : 991px){
      flex-wrap: wrap-reverse;
    }
  }
</style>