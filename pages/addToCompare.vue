<template>
  <div id="product">
    <!-- <h1>{{desc}}</h1> -->
    <!-- <h1>{{ shortDescription }}</h1> -->
    <!-- <h1>{{ data }}</h1> -->
    <div class="bread">
      <router-link to="/default">
        Home &nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp; Compare Your Item
      </router-link>
    </div>
    <div class="compOuter">
      <table>
        <tr>
          <th></th>
          <td></td>       
        </tr>
        <tr>
          <th>SKU</th>  
          <td></td>    
        </tr>
         <tr>
          <th>Description</th>   
          <td></td>  
        </tr>
      </table>
      <table v-for="product in data">
        <tr>
          <td>
            <SfProductCard
              :key="product"
              :image="product.thumbnail.url"
              :imageWidth="216"
              :imageHeight="326"
              badgeLabel=""
              badgeColor=""
              :title="product.name"
              linkTag=""
              specialPrice=""
              :regularPrice="
                'as low as $' +
                product.price_range.minimum_price.final_price.value
              "
              :scoreRating="4"
              :reviewsCount="product.review_count"
              :maxRating="5"
              wishlistIcon="heart"
              isInWishlistIcon="heart_fill"
              :isInWishlist="false"
              showAddToCartButton
              :isAddedToCart="
                localePath(
                  `/p/${product.sku}/${product.name.replaceAll(' ', '-')}+.html`
                )
              "
              :addToCartDisabled="false"
              :link="
                localePath(
                  `/p/${product.sku}/${product.name.replaceAll(' ', '-')}+.html`
                )
              "
            />
          </td>
        </tr>
        <tr>
          
          <td>
            <p>{{ product.sku }}</p>
          </td>
        </tr>
        <tr>
          
          <td><p v-html="product.description.html"></p></td>
        </tr>
      </table>

      <!-- <div class="compcard" v-for="product in data">
        <SfProductCard
          :key="product"
          :image="product.thumbnail.url"
          :imageWidth="216"
          :imageHeight="326"
          badgeLabel=""
          badgeColor=""
          :title="product.name"
          linkTag=""
          specialPrice=""
          :regularPrice="
            'as low as $' + product.price_range.minimum_price.final_price.value
          "
          :scoreRating="4"
          :reviewsCount="product.review_count"
          :maxRating="5"
          wishlistIcon="heart"
          isInWishlistIcon="heart_fill"
          :isInWishlist="false"
          showAddToCartButton
          :isAddedToCart="
            localePath(
              `/p/${product.sku}/${product.name.replaceAll(' ', '-')}+.html`
            )
          "
          :addToCartDisabled="false"
          :link="
            localePath(
              `/p/${product.sku}/${product.name.replaceAll(' ', '-')}+.html`
            )
          "
        />
        <p v-html="product.description.html"></p>
        <p>{{product.sku}}</p>
      </div> -->
    </div>
    <!-- <div class="descr">
        <h3>Description</h3>
        <p v-html="desc"></p>
      </div> -->
    <!-- <div>
        <p id="arr"></p>
      </div> -->
  </div>
</template>

<script>
import { computed, defineComponent } from "@nuxtjs/composition-api";
import { SfProductCard } from "@storefront-ui/vue";
import store from "./store";
// import productGetters from "@vue-storefront/magento";
export default defineComponent({
  name: "CategoryPage",
  components: {
    SfProductCard,
  },

  setup() {
    const data = computed(() => {
      return store.state.addedItem;
    });
    // console.log(data);
    // const desc = data.value.map((value) => value.description.html);
    // console.log(desc)

    // const parser = new DOMParser();
    // const document = parser.parseFromString(desc[0], "text/html");

    // const arrValue = desc.map((val)=>val.indexOf('</p>'))
    // console.log(arrValue)
    // const arrValue1 = desc[0].indexOf('</p>')
    // const shortDescription = desc[0].slice(3,arrValue1)
    // console.log(shortDescription)

    // console.log(productGetters)

    return {
      data,
      // desc,

      // shortDescription,

      // productGetters
    };
  },
});
</script>

<style scoped>
.compOuter {
  display: flex;
  margin: 50px;
  /* display: grid;
  grid-template-columns: auto auto auto auto auto auto auto auto auto auto; */
}
.compcard {
  /* display: flex;
  margin-left: 100px; */
  /* margin-top: 20px; */
  /* outline: dotted; */
  width: 280px;
  margin: 20px;
}
.bread {
  display: flex;
}

table {
  border: 1px solid black;
  /* display: inline-block; */
}
th {
  margin-bottom: 100px;
}
</style>