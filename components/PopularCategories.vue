<template>
  <div >
    <h1>Popular Categories</h1>

    <div class="popular">   
      <AwCategoryCard class="first"
        label="Personal Care" 
        count="32"
        :background='{"mobile":"http://192.168.11.123:3000/_ipx/s_470x470/homepage/two-business-partners-working-office%202.png","desktop":"http://192.168.11.123:3000/_ipx/s_470x470/homepage/two-business-partners-working-office%202.png"}'
        link="#"
      /> 
      <AwCategoryCard class="first"
        label="Personal Care" 
        count="32"
        :background='{"mobile":"http://192.168.11.123:3000/_ipx/s_470x470/homepage/two-business-partners-working-office%202.png","desktop":"http://192.168.11.123:3000/_ipx/s_470x470/homepage/two-business-partners-working-office%202.png"}'
        link="#"
      /> 
      <AwCategoryCard class="first"
        label="Personal Care" 
        count="32"
        :background='{"mobile":"http://192.168.11.123:3000/_ipx/s_470x470/homepage/two-business-partners-working-office%202.png","desktop":"http://192.168.11.123:3000/_ipx/s_470x470/homepage/two-business-partners-working-office%202.png"}'
        link="#"
      /> 
      <AwCategoryCard class="first"
      
        label="Personal Care" 
        count="32"
        :background='{"mobile":"http://192.168.11.123:3000/_ipx/s_470x470/homepage/two-business-partners-working-office%202.png","desktop":"http://192.168.11.123:3000/_ipx/s_470x470/homepage/two-business-partners-working-office%202.png"}'
        link="#"
      />   
    </div>
  </div>
</template>

<script>
import AwCategoryCard from '../node_modules/@storefront-ui/root/packages/vue/src/components/molecules/AwCategoryCard/AwCategoryCard.vue';

export default {
  name: 'PopularCategories',
  components: {
    AwCategoryCard
  },
};
</script>



<style scoped>

  

  h1 {

    /* outline: dotted; */
    text-align: center;
    left: 42.1%;
    right: 42.1%;
    top: 0%;
    bottom: 84.24%;
    /* font-family: 'Source Sans Pro'; */
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px; 

   /* display: flex; */
    color: #282828
  }


  .first {
    margin: 0.8rem;
  }


</style>

<style lang=scss>
  .popular {
    display: flex;
    .sf-category-card__details  {
      background: #037EE6;
    }
  }
</style>

