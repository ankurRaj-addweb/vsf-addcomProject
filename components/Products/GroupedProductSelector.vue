<template>
  <div
    v-if="!productLoading"
  >
    <AwList class="grouped_items">
      <AwListItem
        v-for="(groupedItem, index) in groupedItems"
        :key="index"
        class="grouped_items--item"
      >
        <nuxt-img
          :src="getMagentoImage(productGetters.getProductThumbnailImage(groupedItem.product))"
          :alt="productGetters.getName(groupedItem.product)"
          :width="151"
          :height="119"
        />
        <div>
          <p>{{ productGetters.getName(groupedItem.product) }}</p>
          <AwPrice
            :regular="$fc(productGetters.getPrice(groupedItem.product).regular)"
            :special="productGetters.getPrice(groupedItem.product).special && $fc(productGetters.getPrice(groupedItem.product).special)"
          />
        </div>
        <AwQuantitySelector
          v-model="groupedItem.qty"
          :disabled="loading || !canAddToCart"
        />
      </AwListItem>
    </AwList>
    <AwButton
      v-e2e="'product_add-to-cart'"
      :disabled="loading || !canAddToCart"
      class="color-primary sf-button grouped_items--add-to-cart"
      @click="addToCart"
    >
      Add to Cart
    </AwButton>
  </div>
</template>
<script>

import AwList from '@storefront-ui/root/packages/vue/src/components/organisms/AwList/AwList.vue';
import AwPrice from '@storefront-ui/root/packages/vue/src/components/atoms/AwPrice/AwPrice.vue';
import AwQuantitySelector from '@storefront-ui/root/packages/vue/src/components/atoms/AwQuantitySelector/AwQuantitySelector.vue';

import AwButton from '@storefront-ui/root/packages/vue/src/components/atoms/AwButton/AwButton.vue';
import { productGetters, useCart } from '@vue-storefront/magento';
import {
  computed, watch, ref, defineComponent,
} from '@nuxtjs/composition-api';
import { productData } from '~/helpers/product/productData';
import { useImage } from '~/composables';

export default defineComponent({
  name: 'GroupedProductSelector',
  components: {
    AwList,
    AwPrice,
    AwButton,
    AwQuantitySelector,
  },
  props: {
    canAddToCart: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  emits: ['update-price'],
  setup(props, { emit }) {
    const { product, loading: productLoading } = productData();
    const { addItem } = useCart();
    const loading = ref(false);
    const groupedItems = computed(() => productGetters.getGroupedProducts(product.value));

    const addToCart = async () => {
      try {
        loading.value = true;

        const groupedItemsFiltered = groupedItems.value.filter((p) => p.qty);
        if (groupedItemsFiltered.length > 0) {
          // eslint-disable-next-line no-restricted-syntax
          for (const p of groupedItemsFiltered) {
            // eslint-disable-next-line no-await-in-loop
            await addItem({ product: p.product, quantity: p.qty });
          }
        }
        loading.value = false;
      } catch {
        loading.value = false;
      }
    };

    watch(groupedItems, (newValue) => {
      const getProductPrice = (p) => {
        const { regular, special } = productGetters.getPrice(p);

        return regular > special ? regular : special;
      };

      const price = newValue.reduce((acc, curr) => curr.qty * getProductPrice(curr.product) + acc, 0);

      emit('update-price', price);
    }, {
      deep: true,
    });

    const { getMagentoImage } = useImage();

    return {
      addToCart,
      groupedItems,
      loading,
      productLoading,
      product,
      productGetters,
      getMagentoImage,
    };
  },
});
</script>
<style lang="scss">
.grouped_items {
  padding: 0 10px;

  &--item {
    display: grid;
    grid-template-columns: fit-content(70px) auto fit-content(100%);
    grid-template-rows: auto;
    align-items: center;
    justify-items: start;
    column-gap: var(--spacer-base);
    padding: var(--spacer-base) 0;
    border-bottom: 1px solid var(--c-text-muted);

    .sf-quantity-selector {
      justify-self: end;
    }
  }

  &--add-to-cart {
    width: 100%;
    margin-top: var(--spacer-lg);
  }
}
</style>
