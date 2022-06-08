<template>
  <div class="outer">
    <h1 class="popular_category">Popular Categories</h1>
    <div class="main">
      <div class="popular">
        <AwCategoryCard
          class="first"
          label="Personal Care"
          count="32"
          :background="{
            mobile: require('../static/homepage/two-business-partners-working-office 2.png'),
            desktop: require('../static/homepage/two-business-partners-working-office 2.png'),
          }"
          link="#"
        />
      </div>
      <div class="popular">
        <AwCategoryCard
          class="first"
          label="Personal Care"
          count="32"
          :background="{
            mobile: require('../static/homepage/two-business-partners-working-office 2.png'),
            desktop: require('../static/homepage/two-business-partners-working-office 2.png'),
          }"
          link="#"
        />
      </div>
      <div class="popular">
        <AwCategoryCard
          class="first"
          label="Personal Care"
          count="32"
          :background="{
            mobile: require('../static/homepage/two-business-partners-working-office 2.png'),
            desktop: require('../static/homepage/two-business-partners-working-office 2.png'),
          }"
          link="#"
        />
      </div>
      <div class="popular">
        <AwCategoryCard
          class="first"
          label="Personal Care"
          count="32"
          :background="{
            mobile: require('../static/homepage/two-business-partners-working-office 2.png'),
            desktop: require('../static/homepage/two-business-partners-working-office 2.png'),
          }"
          link="#"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AwCategoryCard from "../node_modules/@storefront-ui/root/packages/vue/src/components/molecules/AwCategoryCard/AwCategoryCard.vue";

export default {
  name: "PopularCategories",
  components: {
    AwCategoryCard,
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.outer {
  width: 100%;
  .main {
    @media screen and (max-width: 1300px) {
      overflow: scroll;
    }
  }
}

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
  color: #282828;
}

@media (max-width: 1024px) {
  .popular_category {
    font-weight: 700;
    font-size: 18px;
    margin-top: 50px;
    font-family: "Source Sans Pro";
    line-height: 24px;
    letter-spacing: 0.1px;
    margin-bottom: 10px;
    
    margin-right: 350px;

    
  }
}

.main {
  display: flex;
}

.first {
  margin: 0.8rem;
}
</style>

<style lang="scss">
.popular {
  display: flex;
  .sf-category-card__details {
    background: #037ee6;
  }
}

@media screen and (max-width: 1024px) {
  .popular {
    width: 17rem;
    height: 15rem;
    display: flex;
  }
}

@media screen and (max-width: 768px) {
  .popular {
    width: 14rem;
    height: 12rem;
    display: flex;
  }
}
</style>
