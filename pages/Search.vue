<template>
  <div class="wishist searchFull">
  
    <AwMegaMenu
      :visible="isSearchOpen"
      :title="$t('Search results' )"
      class="search"
    >
    
    <div>
       <div class="sf-breadcrumbs__breadcrumb">
      <template>
        <router-link to="/default">
          Home &nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;
        </router-link>
        <router-link :to="'/default/'"
          >Search Result for "{{searchTerm}}"&nbsp;&nbsp;&nbsp;
        </router-link>
      </template>
    </div>
       
    <!-- <div>{{categoryTree[0].items[0].items[0].label}}</div> <div>{{categoryTree[0].items[0].items[0].count}}</div> -->
     <div class="navbar section">
      <div class="navbar__aside desktop-only">
        <LazyHydrate never>
          <AwHeading :level="3" :title="$t('Categories')" class="navbar__title" />
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
              <!-- <SfSelectOption
                v-for="option in sortBy.options"
                :key="option.value"
                :value="option.value"
                class="sort-by__option"
              >
                {{ $t(option.label) }}
              </SfSelectOption>  -->
            </SfSelect>
          </LazyHydrate>
        </div>

        <div class="navbar__counter">
          <span class="navbar__label desktop-only">{{ $t("Products :") }}</span>

          <strong v-if="products">{{products.length}}</strong>
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
    <div style="display:flex">
    
 
            <category-sidebar-menu />
       
      <transition
        name="sf-fade"
        mode="out-in"
      >
        <div
          v-if="products && products.length > 0"
          key="results"
          class="search__wrapper-results"
        >
          <AwMegaMenuColumn
             
            class="sf-mega-menu-column--pined-content-on-mobile search__categories"
          >
            <template #title="{title}">
              <AwMenuItem
                :label="title"
              >
                <template #mobile-nav-icon>
                  &#8203;
                </template>
              </AwMenuItem>
            </template>
             <AwList v-if="categories.length > 0">
              <AwListItem v-for="(category, index) in categories" :key="index">
                <AwMenuItem
                
                  :label="category.label"
                  :link="localePath(th.getAgnosticCatLink(category))"
                >
                  <template #mobile-nav-icon> &#8203; </template>
                </AwMenuItem>
              </AwListItem>
            </AwList>
          </AwMegaMenuColumn>
          <AwMegaMenuColumn
            
            class="sf-mega-menu-column--pined-content-on-mobile search__results"
          >
            <template #title="{title}">
              <AwMenuItem
                :label="title"
                class="sf-mega-menu-column__header search__header"
              >
                <template #mobile-nav-icon>
                  &#8203;
                </template>
              </AwMenuItem>
            </template>
            <AwScrollable
              class="results--desktop desktop-only"
              show-text=""
              hide-text=""
            >
              <div class="results-listing">
                <AwProductCard
                  v-for="(product, index) in products"
                  :key="index"
                  class="result-card"
                  :regular-price="$fc(productGetters.getPrice(product).regular)"
                  :max-rating="5"
                  :score-rating="productGetters.getAverageRating(product)"
                  :reviews-count="productGetters.getTotalReviews(product)"
                  :image-width="imageSizes.productCard.width"
                  :image-height="imageSizes.productCard.height"
                  :image="getMagentoImage(productGetters.getProductThumbnailImage(product))"
                  :alt="productGetters.getName(product)"
                  :title="productGetters.getName(product)"
                  :link="localePath(`/p/${productGetters.getProductSku(product)}${productGetters.getSlug(product, product.categories[0])}`)"
                  :wishlist-icon="isAuthenticated ? 'heart' : ''"
                  :is-in-wishlist-icon="isAuthenticated ? 'heart_fill' : ''"
                  :is-in-wishlist="product.isInWishlist"
                  @click:wishlist="addItemToWishlist(product)"
                >
                  <template #image="imageSlotProps">
                    <AwButton
                      :link="imageSlotProps.link"
                      class="sf-button--pure sf-product-card__link"
                      data-testid="product-link"
                      aria-label="Go To Product"
                      v-on="$listeners"
                    >
                      <template v-if="Array.isArray(imageSlotProps.image)">
                        <nuxt-img
                          v-for="(picture, index) in imageSlotProps.image.slice(0, 2)"
                          :key="index"
                          class="sf-product-card__picture"
                          :src="picture"
                          :alt="imageSlotProps.title"
                          :width="imageSlotProps.imageWidth"
                          :height="imageSlotProps.imageHeight"
                        />
                      </template>
                      <nuxt-img
                        v-else
                        class="sf-product-card__image lol"
                        :src="imageSlotProps.image"
                        :alt="imageSlotProps.title"
                        :width="imageSlotProps.imageWidth"
                        :height="imageSlotProps.imageHeight"
                      />
                    </AwButton>
                  </template>
                </AwProductCard>
              </div>
            </AwScrollable>
            <div class="results--mobile smartphone-only">
              <AwProductCard
                v-for="(product, index) in products"
                :key="index"
                class="result-card"
                :regular-price="$fc(productGetters.getPrice(product).regular)"
                :max-rating="5"
                :score-rating="productGetters.getAverageRating(product)"
                :reviews-count="productGetters.getTotalReviews(product)"
                :image-width="imageSizes.productCardHorizontal.width"
                :image-height="imageSizes.productCardHorizontal.height"
                :image="getMagentoImage(productGetters.getProductThumbnailImage(product))"
                :alt="productGetters.getName(product)"
                :title="productGetters.getName(product)"
                :link="localePath(`/p/${productGetters.getProductSku(product)}${productGetters.getSlug(product, product.categories[0])}`)"
                :wishlist-icon="isAuthenticated ? 'heart' : ''"
                :is-in-wishlist-icon="isAuthenticated ? 'heart_fill' : ''"
                :is-in-wishlist="product.isInWishlist"
                @click:wishlist="addItemToWishlist(product)"
              >
                <template #image="imageSlotProps">
                  <AwButton
                    :link="imageSlotProps.link"
                    class="sf-button--pure sf-product-card__link"
                    data-testid="product-link"
                    aria-label="Go To Product"
                    v-on="$listeners"
                  >
                    <template v-if="Array.isArray(imageSlotProps.image)">
                      <nuxt-img
                        v-for="(picture, index) in imageSlotProps.image.slice(0, 2)"
                        :key="index"
                        class="sf-product-card__picture"
                        :src="picture"
                        :alt="imageSlotProps.title"
                        :width="imageSlotProps.imageWidth"
                        :height="imageSlotProps.imageHeight"
                      />
                    </template>
                    <nuxt-img
                      v-else
                      class="sf-product-card__image lol"
                      :src="imageSlotProps.image"
                      :alt="imageSlotProps.title"
                      :width="imageSlotProps.imageWidth"
                      :height="imageSlotProps.imageHeight"
                    />
                  </AwButton>
                </template>
              </AwProductCard>
            </div>
          </AwMegaMenuColumn>
          <div class="action-buttons smartphone-only">
            <AwButton
              class="action-buttons__button color-light"
              @click="$emit('close')"
            >
              {{ $t('Cancel') }}
            </AwButton>
          </div>
        </div>
        <div
          v-else
          key="no-results"
          class="before-results"
        >
          <nuxt-img
            src="/error/Frame 1.png"
            class="before-results__picture"
            alt="error"
            width="290.24"
            height="177.61" 
          />
          <p class="before-results__paragraph">
            {{ $t('No Searches') }}
          </p>
          
          
          <AwButton
            class="before-results__button color-secondary smartphone-only"
            @click="$emit('close')"
          >
            {{ $t('Go back') }}
          </AwButton>
        </div>
         
      </transition>
    
      </div>
      <div style="display:flex">
        <div class="sidebar-bottom">
          <SfPagination
            :total="4"
            :visible="4"
            hasArrows
            :current="1"
            class="Pagignation"
          />
          
        </div>
     <div
                class="products__show-on-page"
              >
                <span class="products__show-on-page__label">{{ $t('Show') }}</span>
                <LazyHydrate on-interaction>
                  <SfSelect
                    class="products__items-per-page"
                  >
                    <!-- <SfSelectOption
                    value="10"
                      class="products__items-per-page__option"
                    >
                       10 
                    </SfSelectOption> -->
                  </SfSelect>
                </LazyHydrate>
              </div>
           </div>
      </div>
      
    </AwMegaMenu>
      
  
          
          <!-- </div> -->
  </div>
  
</template>
<script>
import {
  SfMegaMenu,
  SfList,
  SfProductCard,
  SfScrollable,
  SfMenuItem,
  SfButton,
  SfSelect,
  SfSelectOption,
  SfPagination,
} from '@storefront-ui/vue';

import CategorySidebarMenu from '~/components/Category/CategorySidebarMenu';
import LazyHydrate from "vue-lazy-hydration";
import AwHeading from "../node_modules/@storefront-ui/root/packages/vue/src/components/atoms/AwHeading/AwHeading.vue";
import AwButton from '@storefront-ui/root/packages/vue/src/components/atoms/AwButton/AwButton.vue';
import AwMenuItem from '@storefront-ui/root/packages/vue/src/components/molecules/AwMenuItem/AwMenuItem.vue';
import AwScrollable from '@storefront-ui/root/packages/vue/src/components/molecules/AwScrollable/AwScrollable.vue';
import AwProductCard from '@storefront-ui/root/packages/vue/src/components/organisms/AwProductCard/AwProductCard.vue';
import AwList from '@storefront-ui/root/packages/vue/src/components/organisms/AwList/AwList.vue';
import AwListItem from '@storefront-ui/root/packages/vue/src/components/organisms/AwList/_internal/AwListItem.vue';
import AwMegaMenu from '@storefront-ui/root/packages/vue/src/components/organisms/AwMegaMenu/AwMegaMenu.vue';
import AwMegaMenuColumn from '@storefront-ui/root/packages/vue/src/components/organisms/AwMegaMenu/_internal/AwMegaMenuColumn.vue';
import {
  ref,
  watch,
  computed,
  defineComponent,
} from '@nuxtjs/composition-api';
import SvgImage from '~/components/General/SvgImage.vue';
import { productGetters, useFacet, facetGetters, useUser, useWishlist } from '@vue-storefront/magento';
import { useUiHelpers, useImage } from '~/composables';
import { keyboardImplementationWrapper } from '@testing-library/user-event/dist/keyboard';

export default defineComponent({
  name: 'Search',
  components: {
    SfMegaMenu,
    AwList,
    SvgImage,
    AwListItem,
    SfSelect,
    LazyHydrate,
    AwMegaMenu,
    AwMegaMenuColumn,
    AwButton,
    AwMenuItem,
    SfList,
      SfSelectOption,
  SfPagination,
    AwHeading,
    AwScrollable,
    SfProductCard,
    CategorySidebarMenu,
    AwProductCard,
    SfScrollable,
    SfMenuItem,
    SfButton,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    result: {
      type: Object,
      default: () => ({}),
    },
    categoryTree:{
      type: [Object,Array],
      default:null
    },
    searchTerm:{
      type: String,
      default:'',
    },
  },
  setup(props, { emit }) {
    const { isAuthenticated } = useUser();
    const { isInWishlist, addItem, removeItem } = useWishlist('GlobalWishlist');
const categoryNames=ref([])
    const th = useUiHelpers();
    const isSearchOpen = ref(props.visible);
    const products = computed(() => props.result?.products);
    const categories = computed(() => props.result?.categories);
  // const pagination = computed(() => facetGetters.getPagination(results.value));
    watch(() => props.visible, (newVal) => {
      isSearchOpen.value = newVal;
      if (isSearchOpen.value) {
        document.body.classList.add('search-scroll');
      } else {
        document.body.classList.remove('search-scroll');
        emit('removeSearchResults');
      }
    });
    const addItemToWishlist = async (product) => {
      await (
        isInWishlist({ product })
          ? removeItem({ product })
          : addItem({ product })
      );
    };
        const {
      results:result,
    } = useFacet
 const testCategory=(categoryName)=>{
    if(categoryNames.value.includes(categoryName)){
      return 
    }
    else{
      categoryNames.value.push(categoryName)
      return 
    }
  }
    const { getMagentoImage, imageSizes } = useImage();

    return {
      th,
      isSearchOpen,
      productGetters,
      products,
      categories,
      addItemToWishlist,
      testCategory,
      categoryNames,
      isInWishlist,
      isAuthenticated,
      getMagentoImage,
      imageSizes
    };
  },
});
</script>
<style lang="scss" scoped>
.search {
  position: absolute;
  right: 0;
  left: 0;
  z-index: 3;
  --mega-menu-column-header-margin: var(--spacer-sm) 0 var(--spacer-xl);
  --mega-menu-content-padding: 0;
  --mega-menu-height: auto;
  @include for-desktop {
    --mega-menu-content-padding: var(--spacer-xl) 0;
  }
  &__wrapper-results {
    display: flex;
    flex-direction: column;
    @include for-desktop {
      flex-direction: row;
      flex: 1;
    }
  }
  &__categories {
    flex: 0 0 220px;
  }
  &__results {
    flex: 1
  }
  &__header {
    margin-left: var(--spacer-sm);
  }
  ::v-deep .sf-bar {
    display: none;
  }
  ::v-deep .sf-mega-menu-column__header {
    display: none;
    @include for-desktop {
      display: flex;
    }
  }
}

.results {
  &--desktop {
    --scrollable-max-height: 35vh;
  }
  &--mobile {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background: var(--c-white);
    padding: var(--spacer-base) var(--spacer-sm);
    --product-card-max-width: 9rem ;
  }
}
.see-all {
  padding: var(--spacer-xl) 0 0 var(--spacer-sm);
}
.action-buttons {
  padding: var(--spacer-xl) var(--spacer-sm) var(--spacer-3xl);
  background: var(--c-white);
  width: 100%;
  &__button {
    width: calc(100% - 32px);
  }
}
.results-listing {
  display: flex;
  flex-wrap: wrap;
  margin-left: var(--spacer-2xs);
}
.result-card {
  margin: var(--spacer-sm) 0;
  @include for-desktop {
    margin: var(--spacer-2xs) 0;
  }
}

.before-results {
  box-sizing: border-box;
  padding: var(--spacer-base) var(--spacer-sm) var(--spacer-2xl);
  width: 100%;
  text-align: center;
  @include for-desktop {
    padding: 0;
  }
  &__picture {
    --image-width: 230px;
    margin-top: var(--spacer-2xl);
    @include for-desktop {
      --image-width: 18.75rem;
      margin-top: var(--spacer-base);
    }
  }
  &__paragraph {
    font-family: var(--font-family--primary);
    font-weight: var(--font-weight--normal);
    font-size: var(--font-size--base);
    color: var(--c-text-muted);
    margin: 0;
    @include for-desktop {
      font-size: var(--font-size--lg);
    }
    &:first-of-type {
      margin: var(--spacer-xl) auto var(--spacer-xs);
    }
  }
  &__button {
    margin: var(--spacer-xl) auto;
    width: 100%;
  }
  .before-results__paragraph{
    /* position: absolute; */
    width: 101px;
    height: 23px;
    left: 201px;
    top: 453px;

    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 23px;
    /* identical to box height */

    display: flex;
    align-items: flex-end;
    letter-spacing: 0.03em;

    color: #000000;

    }
}
.sf-button--pure.sf-accordion-item__header.sf-button{
  display: unset !important;
}
</style>
