<template>
  <div class="wishist">
    <div class="sf-breadcrumbs__breadcrumb">
      <template>
        <router-link to="/default">
          Home &nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;
        </router-link>
        <router-link :to="'/default/'"
          >Wishlist &nbsp;&nbsp;&nbsp;
        </router-link>
      </template>
    </div>
    <div class="navbar section">
      <div class="navbar__aside">
        <LazyHydrate never>
          <AwHeading :level="3" :title="$t('Wishlist')" class="navbar__title" />
        </LazyHydrate>
      </div>

      <div class="navbar__main">
        <LazyHydrate on-interaction>
          <AwButton
            class="sf-button--text navbar__filters-button"
            :aria-label="$t('Filters')"
          >
            <SvgImage
              icon="filter2"
              width="24"
              height="24"
              class="navbar__filters-icon"
            />
            {{ $t("Filters") }}
          </AwButton>
        </LazyHydrate>

        <div class="navbar__sort">
          <span class="navbar__label desktop-only">{{ $t("Sort by") }}:</span>
          <LazyHydrate when-visible>
            <SfSelect placeholder="Select sorting" class="navbar__select">
        
            </SfSelect>
          </LazyHydrate>
        </div>

        <div class="navbar__counter">
          <span class="navbar__label desktop-only">{{ $t("Products :") }}</span>

          <strong>{{ totalItems }}</strong>
        </div>

        <div class="navbar__view">
          <span class="navbar__view-label desktop-only">{{ $t("View") }}</span>
          <SvgImage
            icon="tiles"
            :label="$t('Change to grid view')"
            width="12"
            height="12"
            class="navbar__view-icon"
            @click.native="changeToCategoryGridView"
          />
          <SvgImage
            icon="list"
            :label="$t('Change to list view')"
            width="12"
            height="12"
            class="navbar__view-icon"
            @click.native="changeToCategoryListView"
          />
        </div>
      </div>
    </div>

    <AwLoader :loading="loading">
      <div v-if="totalItems" key="my-wishlist" class="my-wishlist">
        <!-- <div>
              <a href="" @click="clear()">
                <AwButton
                  v-e2e="'go-to-checkout-btn'"
                  class="sf-button check clear"
                >
                  {{ $t("Clear all") }}
                </AwButton></a
              >
            </div> -->
        <!-- <div class="my-wishlist__total-items">
            Total items: <strong>{{ totalItems }}</strong>
          </div> -->
        <div class="collected-product-list">
         

          <!--card-->
          <AwProductCard
            v-for="(product, i) in products"
            :key="i"
            v-e2e="'category-product-card'"
            class="products__product-card"
            :style="{ '--index': i }"
            :title="wishlistGetters.getItemName(product)"
            :image-width="imageSizes.productCard.width"
            :image-height="imageSizes.productCard.height"
            :image="wishlistGetters.getItemImage(product)"
            :score-rating="
              product.product &&
              product.product.reviews &&
              product.product.reviews.items &&
              product.product.reviews.items[0] &&
              product.product.reviews.items[0].ratings_breakdown &&
              product.product.reviews.items[0].ratings_breakdown[0] &&
              product.product.reviews.items[0].ratings_breakdown[0].value
                ? Number(
                    product.product.reviews.items[0].ratings_breakdown[0].value
                  )
                : 0
            "
            :regular-price="$fc(wishlistGetters.getItemPrice(product).regular)"
            :special-price="
              wishlistGetters.getItemPrice(product).special &&
              $fc(wishlistGetters.getItemPrice(product).special)
            "
            :show-add-to-cart-button="true"
            :is-added-to-cart="isInCart({ product :product.product})"
            :colors=" product && product.product && product.product.configurable_options && product.product.configurable_options[0] && product.product.configurable_options[0].values ? colorArray(product.product.configurable_options[0].values, product) : []"
            :link="
              localePath(
                `/p/${wishlistGetters.getItemSku(
                  product
                )}${productGetters.getSlug(
                  product.product,
                  product.product.categories[0]
                )}`
              )
            "
            @click:wishlist="addItemToWishlist(product)"
            @click:add-to-cart="addItemToCart({ product:product.product, quantity: 1 })"
          >
        
            <template #input>
              <div />
            </template>
            <template #image>
              <AwLink
                :link="
                  localePath(
                    `/p/${wishlistGetters.getItemSku(
                      product
                    )}${productGetters.getSlug(
                      product.product,
                      product.product.categories[0]
                    )}`
                  )
                "
              >
                <nuxt-img
                  :src="getMagentoImage(wishlistGetters.getItemImage(product))"
                  :alt="wishlistGetters.getItemName(product)"
                  :width="140"
                  :height="200"
                  class="sf-collected-product__image"
                />
              </AwLink>
            </template>
            <template #configuration>
              <div v-if="getAttributes(product).length > 0">
                <AwProperty
                  v-for="(attr, index) in getAttributes(product)"
                  :key="index"
                  :name="attr.option_label"
                  :value="attr.value_label"
                />
              </div>
              <div v-if="getBundles(product).length > 0">
                <AwProperty
                  v-for="(bundle, i) in getBundles(product)"
                  :key="i"
                  :value="bundle"
                >
                  <template #name>
                    <div />
                  </template>
                </AwProperty>
              </div>
              <div v-else />
            </template>
            <template #actions>
              <div />
            </template>
          </AwProductCard>
        </div>
        <div class="sidebar-bottom">
          <AwPagination
            :total="4"
            :visible="4"
            hasArrows
            :current="1"
            class="Pagignation"
          />
        </div>
      </div>
      <div v-else key="empty-wishlist" class="empty-wishlist">
        <div class="empty-wishlist__banner">
          <nuxt-img
            src="/icons/wish.png"
            class="before-results__picture"
            alt="wish"
            width="250"
            height="180"
          />
          <AwHeading
            title="No favourites yet"
            description="Tap any heart next to a product to favotite. We’ll save them for you here!"
            class="empty-wishlist__label"
          />
        </div>
      </div>
    </AwLoader>
  </div>
</template>
<script>
import { SfSelectOption, SfSelect, SfBreadcrumbs } from "@storefront-ui/vue";
import AwPagination from "@storefront-ui/root/packages/vue/src/components/molecules/AwPagination/AwPagination.vue";
import AwSidebar from "../node_modules/@storefront-ui/root/packages/vue/src/components/organisms/AwSidebar/AwSidebar.vue";
import AwHeading from "../node_modules/@storefront-ui/root/packages/vue/src/components/atoms/AwHeading/AwHeading.vue";
import AwButton from "../node_modules/@storefront-ui/root/packages/vue/src/components/atoms/AwButton/AwButton.vue";
import AwProperty from "../node_modules/@storefront-ui/root/packages/vue/src/components/atoms/AwProperty/AwProperty.vue";
import AwPrice from "../node_modules/@storefront-ui/root/packages/vue/src/components/atoms/AwPrice/AwPrice.vue";
import AwProductCard from "@storefront-ui/root/packages/vue/src/components/organisms/AwProductCard/AwProductCard.vue";
import AwLink from "../node_modules/@storefront-ui/root/packages/vue/src/components/atoms/AwLink/AwLink.vue";
import AwLoader from "../node_modules/@storefront-ui/root/packages/vue/src/components/atoms/AwLoader/AwLoader.vue";
import { computed, defineComponent, onMounted } from "@nuxtjs/composition-api";
import AwColor from '@storefront-ui/root/packages/vue/src/components/atoms/AwColor/AwColor.vue';
import LazyHydrate from "vue-lazy-hydration";
import { useAddToCart } from "~/helpers/cart/addToCart";
import {
  useWishlist,
  useUser,
  useCart,
  wishlistGetters,
  productGetters,
} from "@vue-storefront/magento";
import { useUiState, useImage } from "~/composables";
import SvgImage from "~/components/General/SvgImage.vue";

export default defineComponent({
  name: "Wishlist",
  components: {
    AwSidebar,
    AwButton,
    AwColor,
    AwHeading,
    AwProperty,
    AwPagination,
    AwPrice,
    SfSelectOption,
    SfSelect,
    AwProductCard,
    AwLink,
    LazyHydrate,
    AwLoader,
    SfBreadcrumbs,
    SvgImage,
  },
  setup() {
    const { addItem } = useCart();
    const {
      wishlist,
      removeItem,
      load: loadWishlist,
      loading,
    } = useWishlist("GlobalWishlist");
    const { isAuthenticated } = useUser();
    const products = computed(() =>
      wishlistGetters.getProducts(wishlist.value)
    );

    const totalItems = computed(() =>
      wishlistGetters.getTotalItems(wishlist.value)
    );

    const { addItemToCart, isInCart } = useAddToCart();
    const getAttributes = (product) =>
      product?.product?.configurable_options || [];
    const getBundles = (product) =>
      product?.product?.items?.map((b) => b.title).flat() || [];

    const { getMagentoImage, imageSizes } = useImage();
    const clear = async () => {
      await products.value.forEach(async (item) => {
        await actionRemoveItem(item);
      });
      products.value = [];
      console.log(products.value.length);
    };
    const actionRemoveItem = async (product) => {
      await removeItem({ product: product.product });
    };

    const colorArray = (colors, product) => {
      const colorsToReturn = []
      colors.forEach((color) => {
        const item = {
          product,
          label: color.label,
          value: color.label,
          color: color.swatch_data.value,
          selected: false,
        }
        colorsToReturn.push(item)
      })
      return colorsToReturn
    };

    onMounted(() => {
      if (wishlist.value === null) {
        loadWishlist("GlobalWishlist");
      }
    });

    return {
      getAttributes,
      getBundles,
      isAuthenticated,
      products,
      removeItem,
      actionRemoveItem,
      totalItems,
      addItemToCart,
      clear,
      addItem,
      
      wishlistGetters,
      wishlist,
      productGetters,
      colorArray,
      getMagentoImage,
      imageSizes,
      loading,
      isInCart,
    };
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  --sidebar-z-index: 3;
  --overlay-z-index: 3;
  --sidebar-top-padding: var(--spacer-lg) var(--spacer-base) 0
    var(--spacer-base);
  --sidebar-content-padding: var(--spacer-lg) var(--spacer-base);
}

.my-wishlist {
  
  flex: 1;
  margin-left: 218px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  &__total-items {
    font: var(--font-weight--normal) var(--font-size--lg) / 1.6
      var(--font-family--secondary);
    color: var(--c-link);
    margin: 0;
  }
  &__total-price {
    --property-name-font-size: var(--font-size--xl);
    --price-font-size: var(--font-size--xl);
    margin: 0 0 var(--spacer-xl) 0;
    &-label {
      font: var(--font-weight--normal) var(--font-size--2xl) / 1.6
        var(--font-family--secondary);
      color: var(--c-link);
    }
  }
}
.empty-wishlist {
  display: flex;
  flex: 1;

  flex-direction: column;
  &__banner {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  &__label,
  &__description {
    text-align: center;
  }
  &__label {
    --heading-description-margin: 0 0 var(--spacer-xl) 0;
    --heading-title-margin: 0 0 var(--spacer-xl) 0;
    // --heading-title-color: var(--c-primary);
    --heading-title-color: #037ee6;
    --heading-title-font-weight: var(--font-weight--semibold);
    @include for-desktop {
      --heading-title-font-size: var(--font-size--xl);
      --heading-title-margin: 0 0 var(--spacer-sm) 0;
    }
  }
  &__icon {
    --image-width: 16rem;
    margin: 0 0 var(--spacer-2xl) 7.5rem;
  }
}
.heading {
  &__wrapper {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--semibold);
    display: flex;
    justify-content: space-between;
  }

  &__close {
    color: var(--c-gray-variant);
    cursor: pointer;
  }
}

.sidebar-bottom {
  margin: 50px 0 0 0;
}

.collected-product {
  margin: var(--spacer-base) 0;
  &__properties {
    margin: var(--spacer-sm) 0 0 0;
  }
}
.check {
  background-color: #037ee6;
  margin: 0 0 20px 0;
}

</style>