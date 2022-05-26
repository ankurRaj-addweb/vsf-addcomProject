<template>
  <div class="mainClas">

    <div  class="highlighted" v-if="route.fullPath === '/default/checkout/payment'">
      <h1>Order Review </h1>
      <div class="highlighted" >
       <!-- <billing/>  -->
            <!-- <UserBillingAddresses/> -->
            <!-- <UserAddressDetails/> -->
      </div>
       </div>

    <div class="highlighted" v-if="route.fullPath !== '/default/checkout/payment'">
      <AwHeading
        :level="3"
        :title="$t('Totals')"
        class="sf-heading--left sf-heading--no-underline title"
      />
    </div>
    <div class="highlighted" v-if="route.fullPath !== '/default/checkout/payment'">
      <AwProperty
        :name="$t('Products')"
        :value="totalItems"
        class="sf-property--full-width sf-property--large property"
      />
      <AwProperty
        :name="$t('Subtotal')"
        :value="$fc(totals.subtotal)"
        :class="['sf-property--full-width', 'sf-property--large property']"
      />
      <!-- <AwProperty
        v-if="hasDiscounts"
        :name="$t('Discount')"
        :value="$fc(discountsAmount)"
        class="sf-property--full-width sf-property--small property"
      /> -->
      <AwProperty
        v-if="selectedShippingMethod"
        :name="$t('Shipping')"
        :value="$fc(getShippingMethodPrice(selectedShippingMethod))"
        class="sf-property--full-width sf-property--large property"
      />

      <AwProperty
        :name="$t('Total')"
        :value="$fc(totals.total)"
        class="sf-property--full-width sf-property--large property-total"
      />
    </div>
    <CouponCode class="highlighted" />
    <div class="highlighted">
      <AwCharacteristic
        v-for="characteristic in characteristics"
        :key="characteristic.title"
        :title="characteristic.title"
        :description="characteristic.description"
        :icon="characteristic.icon"
        class="characteristic"
      />
    </div>
  </div>
</template>
<script>
import AwHeading from '@storefront-ui/root/packages/vue/src/components/atoms/AwHeading/AwHeading.vue';
import AwProperty from '@storefront-ui/root/packages/vue/src/components/atoms/AwProperty/AwProperty.vue';
import AwCharacteristic from '@storefront-ui/root/packages/vue/src/components/molecules/AwCharacteristic/AwCharacteristic.vue';

import { computed, ref, defineComponent, useRoute } from '@nuxtjs/composition-api';
import { useCart, cartGetters } from '@vue-storefront/magento';
import getShippingMethodPrice from '~/helpers/checkout/getShippingMethodPrice';
import CouponCode from '../../components/CouponCode.vue';
// import UserAccount from '../../pages/Checkout/UserAccount.vue'
import billing from '../../pages/Checkout/Billing.vue'
import UserBillingAddresses from '../../components/Checkout/UserBillingAddresses.vue'



const CHARACTERISTICS = [
  {
    title: 'Safety',
    description: 'It carefully packaged with a personal touch',
    icon: 'safety',
  },
  {
    title: 'Easy shipping',
    description: 'You’ll receive dispatch confirmation and an arrival date',
    icon: 'shipping',
  },
  {
    title: 'Changed your mind?',
    description: 'Rest assured, we offer free returns within 30 days',
    icon: 'return',
  },
];

export default defineComponent({
  name: 'CartPreview',
  components: {
    AwHeading,
    AwProperty,
    UserBillingAddresses,
    AwCharacteristic,
    CouponCode,
    // UserAccount
    billing
  },
  setup() {
    const { cart, removeItem, updateItemQty } = useCart();
    const route = useRoute();
    const listIsHidden = ref(false);

    const products = computed(() => cartGetters.getItems(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const discounts = computed(() => cartGetters.getDiscounts(cart.value));
    const hasDiscounts = computed(() => discounts.value.length > 0);
    const discountsAmount = computed(
      () => -1 * discounts.value.reduce((a, el) => el.value + a, 0),
    );
    const selectedShippingMethod = computed(() => cartGetters.getSelectedShippingMethod(cart.value));

    return {
      cart,
      discounts,
      discountsAmount,
      hasDiscounts,
      totalItems,
      listIsHidden,
      products,
      totals,
      removeItem,
      updateItemQty,
      cartGetters,
      getShippingMethodPrice,
      characteristics: CHARACTERISTICS,
      selectedShippingMethod,
      route,
      // UserAccount
      billing
    };
  },
});
</script>

<style lang="scss">
.mainClas {
  margin-top: 45px; 
  margin-right: 40px;
}

.highlighted {
  box-sizing: border-box;
  width: 100%;
  
  
  background-color: var(--c-light);
  padding: var(--spacer-xl) var(--spacer-xl) 0;

  &:last-child {
    padding-bottom: var(--spacer-xl);
        margin-top: 29px;
  }
}

.total-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacer-xl);
}

.property {
  margin-bottom: var(--spacer-base);
}

.property-total {
  margin-top: var(--spacer-xl);
  padding-top: var(--spacer-lg);
  font-size: var(--font-size-xl);
  border-top: var(--c-white) 1px solid;
  --property-name-font-weight: var(--font-weight--semibold);
  --property-name-color: var(--c-text);
}

.characteristic {
  &:not(:last-child) {
    margin-bottom: var(--spacer-base);
  }
}
.highlighted:last-child {
    // padding-bottom: var(--spacer-xl);
    margin-top: 0px;
}
</style>
