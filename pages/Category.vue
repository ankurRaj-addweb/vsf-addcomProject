<template>
  <div id="category">
     <!-- <div>{{products}}</div> -->
    <!-- <p>{{routeData}}</p> -->
    <!-- <p>{{ breadcrumbs }}</p> -->

    <div
      class="sf-breadcrumbs__breadcrumb"
      v-if="routeData && routeData.relative_url"
    >
      <template v-for="head in routeData.relative_url.split('.').slice(0, 1)">
        <router-link to="/default">
          Home &nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;
        </router-link>
        <router-link :to="'/default/c/' + head + '.html'">
          {{ head.charAt(0).toUpperCase() + head .slice(1) .replaceAll("/", "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;") }} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        </router-link>
      </template>
  </div>

  <AwBreadcrumbs
    class="breadcrumbs desktop-only"
    :breadcrumbs="breadcrumbs"
  />
  <div
    class="navbar section"
    v-if="Object.keys($route.query).length==0"
  >
    <div class="navbar__aside desktop-only">
      <LazyHydrate never>
        <AwHeading
          :level="3"
          :title="$t('Categories')"
          class="navbar__title"
        />
      </LazyHydrate>
    </div>

    <div class="navbar__main">
      <LazyHydrate on-interaction>
        <AwButton
          class="sf-button--text navbar__filters-button"
          :aria-label="$t('Filters')"
          @click="toggleFilterSidebar"
        >
          <SvgImage
            icon="filter2"
            width="24"
            height="24"
            class="navbar__filters-icon"
          /> {{ $t('Filters') }}
          </AwButton>
      </LazyHydrate>

      <div class="navbar__sort">
        <span class="navbar__label desktop-only">{{ $t('Sort by') }}:</span>
        <LazyHydrate when-visible>
          <AwSelect
            :value="sortBy.selected"
            placeholder="Select sorting"
            class="navbar__select"
            @input="uiHelpers.changeSorting"
          >
            <AwSelectOption
              v-for="option in sortBy.options"
              :key="option.value"
              :value="option.value"
              class="sort-by__option"
            >
              {{ $t(option.label) }}
              </AwSelectOption>
              </AwSelect>
        </LazyHydrate>
      </div>

      <div class="navbar__counter product__found">
        <span class="navbar__label desktop-only">{{ $t('Products found:') }}</span>
        <span class="desktop-only">
          <b>{{ pagination.totalItems }}</b>
        </span>
        <span class="navbar__label smartphone-only">{{ pagination.totalItems }} {{ $t('Items') }}
        </span>
      </div>

      <div class="navbar__view">
        <span class="navbar__view-label desktop-only">{{ $t('View') }}</span>
        <SvgImage
          icon="tiles"
          :label="$t('Change to grid view')"
          :aria-pressed="isCategoryGridView"
          width="12"
          height="12"
          class="navbar__view-icon"
          :class="{ 'navbar__view-icon--active': isCategoryGridView }"
          @click.native="changeToCategoryGridView"
        />
        <SvgImage
          icon="list"
          :label="$t('Change to list view')"
          :aria-pressed="!isCategoryGridView"
          width="12"
          height="12"
          class="navbar__view-icon"
          :class="{ 'navbar__view-icon--active': !isCategoryGridView }"
          @click.native="changeToCategoryListView"
        />
      </div>
    </div>
    </div>

    <div
      class="navbar section"
      v-if="Object.keys($route.query).length!=0"
    >
      <div class="navbar__aside desktop-only">
        <LazyHydrate never>

          <div class="navbar__view">
            <span class="navbar__view-label desktop-only">{{ $t("View") }}</span>
            <SvgImage
              icon="tiles"
              :label="$t('Change to grid view')"
              :aria-pressed="isCategoryGridView"
              width="12"
              height="12"
              class="navbar__view-icon"
              :class="{ 'navbar__view-icon--active': isCategoryGridView }"
              @click.native="changeToCategoryGridView"
            />
            <SvgImage
              icon="list"
              :label="$t('Change to list view')"
              :aria-pressed="!isCategoryGridView"
              width="12"
              height="12"
              class="navbar__view-icon"
              :class="{ 'navbar__view-icon--active': !isCategoryGridView }"
              @click.native="changeToCategoryListView"
            />
          </div>

        </LazyHydrate>
        <div class="navbar__counter">
          <span class="navbar__label desktop-only">{{ $t("Products found:") }}
          </span>
          <span class="desktop-only">
            <b>{{ pagination.totalItems }}</b>
          </span>
          <span class="navbar__label smartphone-only">{{ pagination.totalItems }} {{ $t("Items") }}</span>
        </div>
      </div>
      <div class="navbar__sort">

        <div
          v-for="(facet, i) in facets"
          :key="i"
          class="filter-title"
        >
          <AwHeading
            :key="`filter-title-${facet.id}`"
            :level="5"
            :title="facet.label"
            class="filters__title filterheading"
          />
          <span class="colon">{{ $t(":") }}</span>

          <div
            v-if="uiHelpers.isFacetColor(facet)"
            :key="`${facet.id}-colors`"
          >
            <AwSelect
              :value="facet.options.selected"
              @input="uiHelpers.changeSorting"
              class="navbar__select selectvalue"
            >
              <AwSelectOption
                v-for="option in facet.options"
                :key="`${facet.id}-${option.value}`"
                :label="option.attrName"
                class="filters__color"
              >
                {{ $t(facet.options.label) }}
                </AwSelectOption>

                </AwSelect>

                <!-- <span> :{{ facet.options[0].attrName }} </span> -->
      </div>
      <div v-if="facet.id === 'price'">
        <AwSelect
          :value="facet.options.selected"
          @input="uiHelpers.changeSorting"
          class="navbar__select selectvalue"
        >
          <AwSelectOption
            v-for="option in facet.options"
            :key="`${facet.id}-${option.value}`"
            :label="`${option.id}${option.count ? ` (${option.count})` : ''}`"
            name="filter__price"
            class="filters__color"
          >

            {{ $t(facet.options.label) }}
            </AwSelectOption>

            </AwSelect>

      </div>

      <div v-if="facet.id === 'material'">

        <AwSelect
          :value="facet.options.selected"
          @input="uiHelpers.changeSorting"
          class="navbar__select"
        >
          <AwSelectOption
            v-for="option in facet.options"
            :key="`${facet.id}-${option.value}`"
            :label="`${option.id}${option.count ? ` (${option.count})` : ''}`"
            name="filter__price"
            class="filters__color"
          >
            {{ $t(facet.options.label) }}

            </AwSelectOption>

            </AwSelect>

      </div>

      </div>
      <div>
        <LazyHydrate on-interaction>

          <AwButton
            class="sf-button--text navbar__filters-button"
            :aria-label="$t('All Filters')"
            @click="toggleFilterSidebar"
          >
            <SvgImage
              icon="filter2"
              width="24"
              height="24"
              class="navbar__filters-icon"
            /> {{ $t("All Filters") }}
            </AwButton>
        </LazyHydrate>
      </div>
      </div>

      <div class="navbar__main">

        <div class="navbar__sort">
          <span>{{ $t("SortBy") }}:</span>
          <LazyHydrate when-visible>
            <AwSelect
              :value="sortBy.selected"
              placeholder="Select sorting"
              class="navbar__select"
              @input="uiHelpers.changeSorting"
            >
              <AwSelectOption
                v-for="option in sortBy.options"
                :key="option.value"
                :value="option.value"
                class="sort-by__option"
              >
                {{ $t(option.label) }}
                </AwSelectOption>
                </AwSelect>
          </LazyHydrate>
        </div>
      </div>
    </div>

    <div class="main section">
     
      <div class="sidebar desktop-only">
        <SfLoader
          :class="{ loading: isCategoriesLoading }"
          :loading="isCategoriesLoading"
        >
          <LazyHydrate when-visible>
            <category-sidebar-menu
              :no-fetch="true"
            />
          </LazyHydrate>
        </SfLoader>
      </div>

      <div class="main section">
        <div class="sidebar desktop-only">
          <AwLoader
            :class="{ loading: isCategoriesLoading }"
            :loading="isCategoriesLoading"
          >
            <LazyHydrate when-visible>
              <category-sidebar-menu :no-fetch="true" />
            </LazyHydrate>
            </AwLoader>
        </div>
        <AwLoader
          :class="{ loading: isProductsLoading }"
          :loading="isProductsLoading"
        >
          <div
            v-if="!isProductsLoading"
            class="products"
          >
            <transition-group
              v-if="isCategoryGridView"
              appear
              name="products__slide"
              tag="div"
              class="products__grid"
            >
              <AwProductCardQuantitySelector
                v-for="(product, i) in products"
                :key="productGetters.getSlug(product)"
                v-e2e="'category-product-card'"
                class="products__product-card"
                :style="{ '--index': i }"
                :title="productGetters.getName(product)"
                :image-width="imageSizes.productCard.width"
                :image-height="imageSizes.productCard.height"
                :image="
                getMagentoImage(
                  productGetters.getProductThumbnailImage(product)
                )
              "  badgeColor=""
                :colors='[{"label":"Sand","value":"sand","color":"#EDCBB9","selected":false},{"label":"Mint","value":"mint","color":"#ABD9D8","selected":false},{"label":"Vivid rose","value":"vivid rose","color":"#DB5593","selected":false},{"label":"Peach","value":"peach","color":"#F59F93","selected":false},{"label":"Citrus","value":"citrus","color":"#FFEE97","selected":false}]'
                :regular-price="$fc(productGetters.getPrice(product).regular)"
                :special-price="
                productGetters.getPrice(product).special &&
                $fc(productGetters.getPrice(product).special)
              "
                :score-rating="productGetters.getAverageRating(product)"
                :reviews-count="productGetters.getTotalReviews(product)"
                :show-add-to-cart-button="true"
                :is-added-to-cart="isInCart({ product })"
                :is-in-wishlist="isInWishlist({ product })"
                :wishlist-icon="isAuthenticated ? 'heart' : ''"
                :is-in-wishlist-icon="isAuthenticated ? 'heart_fill' : ''"
                :link="
                localePath(
                  `/p/${productGetters.getProductSku(
                    product
                  )}${productGetters.getSlug(product, product.categories[0])}`
                )
              "
                @click:wishlist="addItemToWishlist(product)"
                @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
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
                        v-for="(picture, key) in imageSlotProps.image.slice(0, 2)"
                        :key="key"
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
                </AwProductCardQuantitySelector>
                </transition-group>
                <transition-group
                  v-else
                  appear
                  name="products__slide"
                  tag="div"
                  class="products__list"
                >
                  <AwProductCardHorizontal
                    v-for="(product, i) in products"
                    :key="productGetters.getSlug(product)"
                    class="products__product-card-horizontal"
                    :style="{ '--index': i }"
                    :title="productGetters.getName(product)"
                    :description="productGetters.getDescription(product)"
                    :image="
                getMagentoImage(
                  productGetters.getProductThumbnailImage(product)
                )
              "
                    :image-width="imageSizes.productCardHorizontal.width"
                    :image-height="imageSizes.productCardHorizontal.height"
                    :regular-price="$fc(productGetters.getPrice(product).regular)"
                    :special-price="
                productGetters.getPrice(product).special &&
                $fc(productGetters.getPrice(product).special)
              "
                    :score-rating="productGetters.getAverageRating(product)"
                    :reviews-count="productGetters.getTotalReviews(product)"
                    :is-in-wishlist="isInWishlist({ product })"
                    :is-in-wishlist-icon="isAuthenticated ? '' : ''"
                    :wishlist-icon="isAuthenticated ? '' : ''"
                    :link="
                localePath(
                  `/p/${productGetters.getProductSku(
                    product
                  )}${productGetters.getSlug(product, product.categories[0])}`
                )
              "
                    @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
                    @click:wishlist="addItemToWishlist(product)"
                  >
                    <template #image="imageSlotProps">
                      <AwLink
                        :link="imageSlotProps.link"
                        class="sf-product-card-horizontal__link sf-product-card-horizontal__link--image"
                      >
                        <template v-if="Array.isArray(imageSlotProps.image)">
                          <nuxt-img
                            v-for="(picture, key) in imageSlotProps.image.slice(0, 2)"
                            :key="key"
                            class="sf-product-card-horizontal__picture"
                            :src="picture"
                            :alt="imageSlotProps.title"
                            :width="imageSlotProps.imageWidth"
                            :height="imageSlotProps.imageHeight"
                          />
                        </template>
                        <nuxt-img
                          v-else
                          class="sf-product-card-horizontal__image"
                          :src="imageSlotProps.image"
                          :alt="imageSlotProps.title"
                          :width="imageSlotProps.imageWidth"
                          :height="imageSlotProps.imageHeight"
                        />
                        </AwLink>
                    </template>
                    <template #configuration>

                      <AwProperty
                        class="desktop-only"
                        name="Size"
                        value="XS"
                      />
                      <AwProperty
                        class="desktop-only"
                        name="Color"
                        value="white"
                      />
                    </template>
                    <template #actions>
                      <AwButton
                        v-if="isAuthenticated"
                        class="sf-button--text products__product-card-horizontal__add-to-wishlist"
                        @click="addItemToWishlist(product)"
                      >
                        {{ isInWishlist({ product }) ? $t("Remove from Wishlist") : $t("Save for later") }}
                        </AwButton>
                    </template>
                    </AwProductCardHorizontal>
                    </transition-group>
                    <div class="products__display-opt">
                      <LazyHydrate on-interaction>
                        <AwPagination
                          v-if="!isProductsLoading"
                          v-show="pagination.totalPages > 1"
                          class="products__pagination"
                          :current="pagination.currentPage"
                          :total="pagination.totalPages"
                          :visible="5"
                        />
                      </LazyHydrate>

                      <div v-show="pagination.totalPages > 1"
                        class="products__show-on-page"
                      >
                        <span class="products__show-on-page__label">{{ $t("Show") }}
                        </span>
                        <LazyHydrate on-interaction>
                          <AwSelect
                            :value="pagination.itemsPerPage.toString()"
                            class="products__items-per-page"
                            @input="uiHelpers.changeItemsPerPage"
                          >
                            <AwSelectOption
                              v-for="option in pagination.pageOptions"
                              :key="option"
                              :value="option"
                              class="products__items-per-page__option"
                            >
                              {{ option }}
                              </AwSelectOption>
                              </AwSelect>
                        </LazyHydrate>
                      </div>
                    </div>
      </div>
      </AwLoader>
      </div>

      <LazyHydrate when-idle>
        <AwSidebar
          :visible="isFilterSidebarOpen"
          title="Filters"
          class="sidebar-filters"
          @close="toggleFilterSidebar"
        >
          <div class="filters desktop-only">
            <div
              v-for="(facet, i) in facetsHeader"
              :key="i"
            >
              <AwHeading
                :key="`filter-title-${facet.id}`"
                :level="3"
                :title="facet.label"
                class="filters__title sf-heading--left"
              />
              <div
                v-if="uiHelpers.isFacetColor(facet)"
                :key="`${facet.id}-colors`"
                class="filters__colors"
              >
                <AwColor
                  v-for="option in facet.options"
                  :key="`${facet.id}-${option.value}`"
                  :color="option.attrName"
                  :selected="isFilterSelected(facet, option)"
                  class="filters__color"
                  @click="() => selectFilter(facet, option)"
                />

          </div>

          <div v-else-if="facet.id === 'price'">
            <AwRadio
              v-for="option in facet.options"
              :key="`${facet.id}-${option.value}`"
              :label="`${option.id}${option.count ? ` (${option.count})` : ''}`"
              :value="option.value"
              :selected="isFilterSelected(facet, option)"
              name="filter__price"
              @change="() => selectFilter(facet, option)"
            />
            <h2>{{ facet.options[0].attrName }}</h2>
               <h2>{{ facet.options[1].attrName }}</h2>
              <h2>{{ facet.options[2].attrName }}</h2>
              <h2>{{ facet.options[3].attrName }}</h2>
              <h2>{{ facet.options[4].attrName }}</h2> 

          </div>

          <div v-else-if="facet.id === 'size'">
            <AwFilter
              v-for="option in facet.options"
              :key="`${facet.id}-${option.id}`"
              :label="option.id"
              :selected="isFilterSelected(facet, option)"
              class="filters__item"
              @change="() => selectFilter(facet, option)"
            />

          </div>
          <div v-else-if="facet.id === 'material'">
            <AwCheckbox
              v-for="option in facet.options"
              :key="`${facet.id}-${option.id}`"
              :label="option.id"
              :selected="isFilterSelected(facet, option)"
              class="filters__item"
              @change="() => selectFilter(facet, option)"
            />
          </div>
          </div>
          </div>
          <AwAccordion class="filters smartphone-only">
            <div
              v-for="(facet, i) in facets"
              :key="i"
            >
              <AwAccordionItem
                :key="`filter-title-${facet.id}`"
                :header="facet.label"
                class="filters__accordion-item"
              >
                <div v-if="facet.id === 'price'">
                  <AwRadio
                    v-for="option in facet.options"
                    :key="`${facet.id}-${option.value}`"
                    :label="`${option.id}${
                    option.count ? ` (${option.count})` : ''
                  }`"
                    :value="option.value"
                    :selected="isFilterSelected(facet, option)"
                    name="filter__price"
                    @change="() => selectFilter(facet, option)"
                  />
                </div>
                <div v-else>
                  <AwFilter
                    v-for="option in facet.options"
                    :key="`${facet.id}-${option.id}`"
                    :label="option.id"
                    :selected="isFilterSelected(facet, option)"
                    class="filters__item"
                    @change="() => selectFilter(facet, option)"
                  />
                </div>
                </AwAccordionItem>
                </div>
          </AwAccordion>
          <template #content-bottom>
            <div class="filters__buttons">
              <AwButton
                class="sf-button--full-width"
                @click="applyFilters()"
              >
                {{ $t("Done") }}
                </AwButton>
                <AwButton
                  class="sf-button--full-width filters__button-clear"
                  @click="applyFilters({})"
                >
                  {{ $t("Clear all") }}
                  </AwButton>
            </div>
          </template>
          </AwSidebar>
      </LazyHydrate>
      </div>
  </div>
</template>

<script>
import findDeep from "deepdash/findDeep";
import LazyHydrate from "vue-lazy-hydration";

import AwHeading from "@storefront-ui/root/packages/vue/src/components/atoms/AwHeading/AwHeading.vue";
import AwBreadcrumbs from "@storefront-ui/root/packages/vue/src/components/atoms/AwBreadcrumbs/AwBreadcrumbs.vue";
import AwButton from "@storefront-ui/root/packages/vue/src/components/atoms/AwButton/AwButton.vue";
import AwSidebar from "@storefront-ui/root/packages/vue/src/components/organisms/AwSidebar/AwSidebar.vue";
import AwFilter from "@storefront-ui/root/packages/vue/src/components/molecules/AwFilter/AwFilter.vue";
import AwRadio from "@storefront-ui/root/packages/vue/src/components/molecules/AwRadio/AwRadio.vue";
// import AwProductCard from "@storefront-ui/root/packages/vue/src/components/organisms/AwProductCard/AwProductCard.vue";
import AwProductCardHorizontal from "@storefront-ui/root/packages/vue/src/components/organisms/AwProductCardHorizontal/AwProductCardHorizontal.vue";
import AwPagination from "@storefront-ui/root/packages/vue/src/components/molecules/AwPagination/AwPagination.vue";
import AwAccordion from "@storefront-ui/root/packages/vue/src/components/organisms/AwAccordion/AwAccordion.vue";
import AwSelect from "@storefront-ui/root/packages/vue/src/components/molecules/AwSelect/AwSelect.vue";
import AwLink from "@storefront-ui/root/packages/vue/src/components/atoms/AwLink/AwLink.vue";
import AwLoader from "@storefront-ui/root/packages/vue/src/components/atoms/AwLoader/AwLoader.vue";
import AwColor from "@storefront-ui/root/packages/vue/src/components/atoms/AwColor/AwColor.vue";
import AwProperty from "@storefront-ui/root/packages/vue/src/components/atoms/AwProperty/AwProperty.vue";
import AwProductCardQuantitySelector from '@storefront-ui/root/packages/vue/src/components/organisms/AwProductCardQuantitySelector/AwProductCardQuantitySelector.vue';
import {
  ref,
  computed,
  defineComponent,
  useRouter,
  useRoute,
} from "@nuxtjs/composition-api";
import {
  categoryGetters,
  facetGetters,
  productGetters,
  useCategory,
  useFacet,
  useUser,
  useWishlist,
} from "@vue-storefront/magento";
import { onSSR, useVSFContext } from "@vue-storefront/core";
import { useCache, CacheTagPrefix } from "@vue-storefront/cache";
import { useUrlResolver } from "~/composables/useUrlResolver.ts";
import { useUiHelpers, useUiState, useImage } from "~/composables";
import cacheControl from "~/helpers/cacheControl";
import { useAddToCart } from "~/helpers/cart/addToCart";
import CategorySidebarMenu from "~/components/Category/CategorySidebarMenu";
import SvgImage from "~/components/General/SvgImage.vue";
import AwSelectOption from "@storefront-ui/root/packages/vue/src/components/molecules/AwSelect/_internal/AwSelectOption.vue";
import AwCheckbox from "@storefront-ui/root/packages/vue/src/components/molecules/AwCheckbox/AwCheckbox.vue";

// TODO(addToCart qty, horizontal): https://github.com/vuestorefront/storefront-ui/issues/1606
export default defineComponent({
  name: "CategoryPage",
  components: {
    CategorySidebarMenu,
    SvgImage,
    AwButton,
    AwSidebar,
    AwFilter,
    AwRadio,
    // AwProductCard,
     AwProductCardQuantitySelector,
    AwProductCardHorizontal,
    AwPagination,
    AwAccordion,
    AwSelect,
    AwBreadcrumbs,
    AwLoader,
    AwColor,
    AwHeading,
    AwProperty,
    AwLink,
    AwCheckbox,
    LazyHydrate,
    AwSelectOption,
    AwCheckbox
},
  middleware: cacheControl({
    "max-age": 60,
    "stale-when-revalidate": 5,
  }),
  transition: "fade",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { addTags } = useCache();
    const uiHelpers = useUiHelpers();
    const uiState = useUiState();
    const { path, result: routeData, search: resolveUrl } = useUrlResolver();
    const { $magento: { config: magentoConfig } } = useVSFContext();
    const { isAuthenticated } = useUser();
    const getAttributes = product => product.configurable_options || [];
    const {
      addItem: addItemToWishlistBase,
      isInWishlist,
      removeItem: removeItemFromWishlist,
    } = useWishlist("GlobalWishlist");
    const { result, search } = useFacet(`facetId:${path}`);
    const { toggleFilterSidebar } = useUiState();
    const { categories, search: categoriesSearch } = useCategory(
      `categoryList:${path}`
    );
    const { addItemToCart, isInCart } = useAddToCart();

    const products = computed(() => facetGetters.getProducts(result.value));
    const show_nav = ref(false);

    const return_show = computed(() => {
      console.log(routeData.value);
      console.log(route.value);
      return show_nav.value;
    });
    const categoryTree = computed(() =>
      categoryGetters.getCategoryTree(
        categories.value?.[0],
        routeData.value?.entity_uid,
        false
      )
    );

    const breadcrumbs = computed(() =>
      facetGetters.getBreadcrumbs(result.value)
    );
    const sortBy = computed(() => facetGetters.getSortOptions(result.value));
    const colorFilter = computed(() => facetGetters.getProducts(result.value));
    // const facets = computed(() => facetGetters.getGrouped(result.value, magentoConfig.facets.available));
    const facetsHeader = computed(() =>
      facetGetters.getGrouped(result.value, [
        "color",
        "material",
        "size",
        "price",
      ])
    );

    const facets = computed(() =>
      facetGetters.getGrouped(result.value, ["color", "material", "price"])
    );

    const pagination = computed(() => facetGetters.getPagination(result.value));

    const activeCategory = computed(() => {
      const items = categoryTree.value?.items;

      if (!items) {
        return "";
      }

      const category = items.find(
        cat => cat.isCurrent || cat.items.find(c => c.isCurrent)
      );

      return category?.label || items[0]?.label;
    });

    const activeCategoryUid = categoryUid => {
      const items = categoryTree.value?.items;

      if (!items) {
        return "";
      }

      const categoryDeep = findDeep(
        categoryTree.value?.items,
        (value, key, parentValue, _deepCtx) => {
          const hasUid = key === "0" && value && Array.isArray(parentValue);

          return hasUid ? value === categoryUid : false;
        }
      );

      const categoryUidResult =
        categoryDeep?.parent && categoryDeep?.parent.length === 1
          ? categoryDeep?.parent[0]
          : categoryDeep?.parent;

      return categoryUidResult || items[0]?.uid;
    };

    const isFilterSelected = (facet, option) => {
      if (facet.id === "price") {
        return selectedFilters.value[facet.id] || "";
      }

      return (selectedFilters.value[facet.id] || []).includes(option.value);
    };

    /* eslint-disable */
    const selectFilter = (facet, option) => {
      if (facet.id === "price") {
        // eslint-disable-next-line
        selectedFilters.value[facet.id] = option.value;
        return;
      }
      if (facet.id === "style") {
        // eslint-disable-next-line
        selectedFilters.value[facet.id] = option.value;
        return;
      }
      if (!selectedFilters.value[facet.id]) {
        selectedFilters.value[facet.id] = [];
      }

      if (selectedFilters.value[facet.id].find(f => f === option.value)) {
        selectedFilters.value[facet.id] = selectedFilters.value[
          facet.id
        ]?.filter(f => f !== option.value);
        return;
      }

      selectedFilters.value[facet.id].push(option.value);
    };
    /* eslint-enable */

    const applyFilters = filters => {
      toggleFilterSidebar();
      if (filters) {
        selectedFilters.value = filters;
      }

      uiHelpers.changeFilters(selectedFilters.value);
    };

    const addItemToWishlist = async product => {
      await (isInWishlist({ product })
        ? removeItemFromWishlist({ product })
        : addItemToWishlistBase({ product }));
    };

    const searchCategoryProduct = async () => {
      const categoryId = activeCategoryUid(routeData.value?.entity_uid)
        ? activeCategoryUid(routeData.value?.entity_uid)
        : routeData.value?.entity_uid;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await search({
        ...uiHelpers.getFacetsFromURL(),
        categoryId,
      });
    };

    const getSelectedFilterValues = () => {
      let selectedFilterValues = Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        magentoConfig.facets.available.map(curr => [
          curr,
          curr === "price" ? "" : [],
        ])
      );
      const filters = uiHelpers.getFacetsFromURL().filters;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      Object.keys(filters).forEach(filter => {
        if (filter === "price") {
          selectedFilterValues[filter] = filters[filter][0];
        } else {
          selectedFilterValues[filter] = filters[filter];
        }
      });
      return selectedFilterValues;
    };

    const isProductsLoading = ref(false);
    const isCategoriesLoading = ref(false);
    const selectedFilters = ref(getSelectedFilterValues());

    // const breadUrl = routeData.relative_url.split('.').slice(0, 1);

    onSSR(async () => {
      isProductsLoading.value = true;
      isCategoriesLoading.value = true;
      await resolveUrl();

      await categoriesSearch({
        pageSize: 20,
      });
      isCategoriesLoading.value = false;

      if (routeData?.value) {
        selectedFilters.value = getSelectedFilterValues();

        await searchCategoryProduct();
        isProductsLoading.value = false;
      }

      const tags = [{ prefix: CacheTagPrefix.View, value: "category" }];
      // eslint-disable-next-line no-underscore-dangle
      const productTags = products.value.map(product => ({
        prefix: CacheTagPrefix.Product,
        value: product.uid,
      }));

      const categoriesTags = categoryTree.value.items.map(category => ({
        prefix: CacheTagPrefix.Category,
        value: category.slug,
      }));

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      addTags([...tags, ...productTags, ...categoriesTags]);
    });

    const { getMagentoImage, imageSizes } = useImage();

    return {
      routeData,
      ...uiState,
      activeCategory,
      addItemToCart,
      addItemToWishlist,
      applyFilters,
      breadcrumbs,
      categories,
      categoryTree,
      facets,
      facetsHeader,
      isAuthenticated,
      isFilterSelected,
      isInCart,
      isInWishlist,
      isProductsLoading,
      isCategoriesLoading,
      pagination,
      productGetters,
      products,
      selectedFilters,
      selectFilter,
      sortBy,
      colorFilter,
      uiHelpers,
      getMagentoImage,
      imageSizes,
      getAttributes,
      return_show,
      show_nav,
      router,
      route,
      // breadUrl,
    };
  },
});
</script>
<style lang="scss" scoped>
#category {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}

.main {
  &.section {
    padding: var(--spacer-xs);
    @include for-desktop {
      padding: 0;
    }
  }
}

.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}

.navbar {
  position: relative;
  display: flex;
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  @include for-desktop {
    border-width: 1px 0 1px 0;
  }

  &.section {
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }

  &__aside,
  &__main {
    display: flex;
    align-items: center;
    padding: var(--spacer-sm) 0;
  }

  &__aside {
    flex: 0 0 15%;
    padding: var(--spacer-sm) var(--spacer-sm);
    border: 1px solid var(--c-light);
    border-width: 0 1px 0 0;
  }

  &__main {
    flex: 1;
    padding: 0;
    justify-content: space-between;
    @include for-desktop {
      padding: var(--spacer-xs) var(--spacer-xl);
    }
  }

  &__title {
    --heading-title-font-weight: var(--font-weight--semibold);
    --heading-title-font-size: var(--font-size--xl);
  }

  &__filters-icon {
    margin: 0 0 0 var(--spacer-xs);
    order: 1;
    @include for-desktop {
      margin: 0 var(--spacer-xs) 0 0;
      order: 0;
    }
  }

  &__filters-button {
    display: flex;
    align-items: center;
    --button-font-size: var(--font-size--base);
    --button-text-decoration: none;
    --button-color: var(--c-link);
    --button-font-weight: var(--font-weight--normal);
    @include for-mobile {
      --button-font-weight: var(--font-weight--medium);
      order: 2;
    }

    svg {
      fill: var(--c-text-muted);
      transition: fill 150ms ease;
    }

    &:hover {
      svg {
        fill: var(--c-primary);
      }
    }
  }

  &__label {
    font-family: var(--font-family--secondary);
    font-weight: var(--font-weight--normal);
    color: var(--c-text-muted);
    @include for-desktop {
      color: var(--c-link);
      margin: 0 var(--spacer-2xs) 0 0;
    }
  }

  &__select {
    --select-width: 220px;
    --select-padding: 0;
    --select-height: auto;
    --select-selected-padding: 0 var(--spacer-lg) 0 var(--spacer-2xs);
    --select-margin: 0;
    --select-option-font-size: var(--font-size-sm);
    --select-error-message-height: 0;

    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size-sm);
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--light);
      margin: 0;
    }

    ::v-deep .sf-select__placeholder {
      --select-option-font-size: var(--font-size-sm);
    }

    @include for-mobile {
      --select-width: 135px;
    }
  }

  &__sort {
    display: flex;
    align-items: center;
    margin: 0 auto 0 var(--spacer-2xl);
    @include for-mobile {
      margin: 0;
      order: 1;
    }
  }

  &__counter {
    font-family: var(--font-family--secondary);
    order: 1;
    @include for-desktop {
      margin: auto 0 auto auto;
      order: 0;
    }
  }

  &__view {
    display: flex;
    align-items: center;
    order: 0;
    @include for-desktop {
      margin: 0 0 0 var(--spacer-2xl);
      order: 0;
    }

    &-icon {
      cursor: pointer;
      margin: 0 var(--spacer-base) 0 0;

      &:last-child {
        margin: 0;
      }
    }

    &-label {
      margin: 0 var(--spacer-sm) 0 0;
      font: var(--font-weight--normal) var(--font-size--base) / 1.6
        var(--font-family--secondary);
      text-decoration: none;
      color: var(--c-link);
    }
  }

  &__view-icon {
    cursor: pointer;

    &--active {
      color: var(--c-primary);
    }
  }
}

.sort-by {
  flex: unset;
  width: 11.875rem;
}

.main {
  display: flex;
}

.sidebar {
  flex: 0 0 15%;
  padding: var(--spacer-sm);
  border: 1px solid var(--c-light);
  border-width: 0 1px 0 0;
}

.sidebar-filters {
  --overlay-z-index: 3;
  --sidebar-title-display: none;
  --sidebar-top-padding: 0;
  @include for-desktop {
    --sidebar-content-padding: 0 var(--spacer-xl);
    --sidebar-bottom-padding: 0 var(--spacer-xl);
  }
}

.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0;

  &__grid {
    justify-content: center;
    @include for-desktop {
      justify-content: flex-start;
    }
  }

  &__grid,
  &__list {
    display: flex;
    flex-wrap: wrap;
  }

  &__product-card {
    --product-card-title-margin: var(--spacer-base) 0 0 0;
    --product-card-title-font-weight: var(--font-weight--medium);
    --product-card-title-margin: var(--spacer-xs) 0 0 0;
    flex: 1 1 50%;
    @include for-desktop {
      --product-card-title-font-weight: var(--font-weight--normal);
      --product-card-add-button-bottom: var(--spacer-base);
      --product-card-title-margin: var(--spacer-sm) 0 0 0;
    }
  }

  &__product-card-horizontal {
    flex: 0 0 100%;
    @include for-mobile {
      ::v-deep .sf-image {
        --image-width: 5.3125rem;
        --image-height: 7.0625rem;
      }
    }

    &__add-to-wishlist {
      @include for-mobile {
        margin: 1rem auto;
      }
      display: block;
    }
  }

  &__slide-enter {
    opacity: 0;
    transform: scale(0.5);
  }

  &__slide-enter-active {
    transition: all 0.2s ease;
    transition-delay: calc(0.1s * var(--index));
  }

  @include for-desktop {
    &__grid {
      margin: var(--spacer-sm) 0 0 var(--spacer-sm);
    }
    &__pagination {
      display: flex;
      justify-content: flex-start;
      margin: var(--spacer-xl) 0 0 0;
    }
    &__product-card-horizontal {
      margin: var(--spacer-lg) 0;
    }
    &__product-card {
      flex: 1 1 25%;
    }
    &__list {
      margin: 0 0 0 var(--spacer-sm);
    }
  }

  @include for-mobile {
    &__display-opt {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    &__show-on-page {
      margin-top: 12px;
    }
  }

  &__show-on-page {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;

    &__label {
      font-family: var(--font-family--secondary);
      font-size: var(--font-size--sm);
    }
  }
}

.loading {
  margin: var(--spacer-3xl) auto;
  @include for-desktop {
    margin-top: 6.25rem;
  }

  &--categories {
    @include for-desktop {
      margin-top: 3.75rem;
    }
  }
}

::v-deep .sf-sidebar__aside {
  --sidebar-z-index: 3;
}

.filters {
  &__title {
    --heading-title-font-size: var(--font-size--xl);
    margin: var(--spacer-xl) 0 var(--spacer-base) 0;

    &:first-child {
      margin: calc(var(--spacer-xl) + var(--spacer-base)) 0 var(--spacer-xs) 0;
    }
  }

  &__colors {
    display: flex;
  }

  &__color {
    margin: var(--spacer-xs) var(--spacer-xs) var(--spacer-xs) 0;
  }

  &__range {
    width: 99px;
  }

  &__chosen {
    color: var(--c-text-muted);
    font-weight: var(--font-weight--normal);
    font-family: var(--font-family--secondary);
    position: absolute;
    right: var(--spacer-xl);
  }

  &__item {
    --radio-container-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    --radio-background: transparent;
    --filter-label-color: var(--c-secondary-variant);
    --filter-count-color: var(--c-secondary-variant);
    --checkbox-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    padding: var(--spacer-sm) 0;
    border-bottom: 1px solid var(--c-light);

    &:last-child {
      border-bottom: 0;
    }

    @include for-desktop {
      --checkbox-padding: 0;
      margin: var(--spacer-sm) 0;
      border: 0;
      padding: 0;
    }
  }

  &__accordion-item {
    --accordion-item-content-padding: 0;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;
  }

  &__buttons {
    margin: var(--spacer-sm) 0;
  }

  &__button-clear {
    --button-background: var(--c-light);
    --button-color: var(--c-dark-variant);
    margin: var(--spacer-xs) 0 0 0;
  }
}
.navbar__view {
  margin-left: inherit;
}
.navbar__aside {
  display: inline-block;
}
</style>

<style lang="scss">
.sf-breadcrumbs__breadcrumb {
  width: 973px;
  height: 17px;
  left: 0px;
  top: 3px;

  /* font-family: 'Source Sans Pro'; */
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  /* or 143% */

  /* Secondary Color Dark Version 1 */

  color: #3c3c3c;
}
</style>