<template>
  <div class="cartpreview">
    <div
      class="highlighted"
      v-if="route.fullPath === '/default/checkout/payment'"
    >
      <h1>Order Review</h1>

      <template>
        <AwProperty
          :name="$t('Personal detail')"
          class="sf-property"
          type="link"
        />
        <div>
          <ul v-for="array in arr" :key="array.id">
            <li v-for="user in array" :key="user.id">
              {{ user }}
            </li>
          </ul>
        </div>
      </template>
      <template>
        <AwProperty
          :name="$t('shipping detail')"
          class="sf-property--full-width sf-property--large property"
        />
        <ul>
          <li v-for="item in shipp" :key="item.id">
            {{ item }}
          </li>
        </ul>
      </template>
      <template>
        <AwProperty
          :name="$t('billing detail')"
          class="sf-property--full-width sf-property--large property"
        />
        <ul>
          <li v-for="item in shipp" :key="item.id">
            {{ item }}
          </li>
        </ul>
      </template>
      <AwProperty
        :name="$t('Payment method')"
        class="sf-property--full-width sf-property--large property"
      />
    </div>

    <div
      class="highlighted"
      v-if="route.fullPath !== '/default/checkout/payment'"
    >
      <AwHeading
        :level="3"
        :title="$t('Totals')"
        class="sf-heading--left sf-heading--no-underline title"
      />
    </div>
    <div
      class="highlighted"
      v-if="route.fullPath !== '/default/checkout/payment'"
    >
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

      <AwProperty
        v-if="
          route.fullPath == '/default/checkout/billing' ||
          selectedShippingMethod
        "
        :name="$t('Shipping')"
        value="Free"
        class="sf-property--full-width sf-property--large property"
      />
      <AwProperty
        :name="$t('Total ')"
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
import AwHeading from "@storefront-ui/root/packages/vue/src/components/atoms/AwHeading/AwHeading.vue";
import AwProperty from "@storefront-ui/root/packages/vue/src/components/atoms/AwProperty/AwProperty.vue";
import AwCharacteristic from "@storefront-ui/root/packages/vue/src/components/molecules/AwCharacteristic/AwCharacteristic.vue";

import {
  computed,
  ref,
  defineComponent,
  useRoute,
} from "@nuxtjs/composition-api";
import {
  useCart,
  cartGetters,
  useShippingProvider,
} from "@vue-storefront/magento";
import getShippingMethodPrice from "~/helpers/checkout/getShippingMethodPrice";
import CouponCode from "../../components/CouponCode.vue";
import { useUser, userGetters } from "@vue-storefront/magento";
import { useUserBilling, userBillingGetters } from "@vue-storefront/magento";
import { useUserShipping, userShippingGetters } from "@vue-storefront/magento";
// import selectedMethod from "./VsfPaymentProvider.vue";
import { useBilling, useShipping } from "@vue-storefront/magento";

const CHARACTERISTICS = [
  {
    title: "Safety",
    description: "It carefully packaged with a personal touch",
    icon: "safety",
  },
  {
    title: "Easy shipping",
    description: "You’ll receive dispatch confirmation and an arrival date",
    icon: "shipping",
  },
  {
    title: "Changed your mind?",
    description: "Rest assured, we offer free returns within 30 days",
    icon: "return",
  },
];

export default defineComponent({
  name: "CartPreview",

  components: {
    AwHeading,
    AwProperty,
    AwCharacteristic,
    CouponCode,
    // selectedMethod,
  },
  setup() {
    const { cart, removeItem, updateItemQty } = useCart();
    const user = useUser();
    const billing = useBilling();
    const shipping = useShipping();

    const userbilling = useUserBilling();
    const usershipping = useUserShipping();

    const {
      state,
      save: saveShippingProvider,
      error: errorShippingProvider,
      loading: loadingShippingProvider,
      setState,
    } = useShippingProvider();

    const route = useRoute();
    const arr = ref([]);
    //Personal detail
    const uFullName = ref("");
    const uStreet = ref("");
    const uCity = ref("");
    const uState = ref("");
    const uEmail = ref("");
    const uTelephone = ref("");
    // shipping detail
    const shipp = ref([]);
    const sshipStreet = ref("");
    const sshipCity = ref("");
    const sshipCountry = ref("");

    const listIsHidden = ref(false);

    const products = computed(() => cartGetters.getItems(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const discounts = computed(() => cartGetters.getDiscounts(cart.value));
    const hasDiscounts = computed(() => discounts.value.length > 0);
    const discountsAmount = computed(
      () => -1 * discounts.value.reduce((a, el) => el.value + a, 0)
    );
    const selectedShippingMethod = computed(() =>
      cartGetters.getSelectedShippingMethod(cart.value)
    );

    try {
      // user detail

      let fname = user.user.value.firstname;
      let lname = user.user.value.lastname;
      const userFullName =
        user.user.value.firstname + " " + user.user.value.lastname;
      const userStreet = user.user.value.addresses[0].street[0];
      const userCity = user.user.value.addresses[0].city;
      const userState = user.user.value.addresses[0].region.region;
      const userEmail = user.user.value.email;
      const userTelephone = user.user.value.addresses[0].telephone;

      const arr1 = [];
      uFullName.value = userFullName;
      uStreet.value = userStreet;
      uCity.value = userCity;
      uState.value = userState;

      const arr2 = [];
      uEmail.value = userEmail;
      uTelephone.value = userTelephone;

      arr1.push(uFullName.value);
      arr1.push(uStreet.value);
      arr1.push(uCity.value);
      arr1.push(uState.value);
      arr2.push(uEmail.value);
      arr2.push(uTelephone.value);
      arr.value.push(arr1);
      arr.value.push(arr2);
      // console.log(fname,lname,userFullName,userEmail)

      // shipping detail
      const shipFullName =
        shipping.shipping.value.firstname +
        " " +
        shipping.shipping.value.lastname;
      const shipStreet = shipping.shipping.value.street[0];
      const shipCity = shipping.shipping.value.city;
      const shipRegioCode = shipping.shipping.value.region.code;
      const shipPostCode = shipping.shipping.value.postcode;
      const shipTelephone = shipping.shipping.value.telephone;
      const shipCountryCode = shipping.shipping.value.country.code;
      // const shipCountry = shipping.shipping.value.city.region.label;

      sshipStreet.value = shipStreet;
      sshipCity.value = shipCity;
      sshipCountry.value = shipCountryCode;

      shipp.value.push(shipStreet);
      shipp.value.push(shipCity);
      shipp.value.push(shipCountryCode);
    } catch (err) {
      console.log("data is loading ......");
    }

    const Data = computed(() => {
      return store.state.shippingData;
    });
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
      userbilling,
      getShippingMethodPrice,
      characteristics: CHARACTERISTICS,
      arr,
      selectedShippingMethod,
      errorShippingProvider,

      loadingShippingProvider,
      saveShippingProvider,
      route,
      user,
      shipping,
      billing,
      uFullName,
      uEmail,
      uStreet,
      uCity,
      uState,
      // state,
      uTelephone,
      sshipStreet,
      sshipCity,
      shipp,
      sshipCountry,
      Data,
      usershipping,
    };
  },
});
</script>

<style lang="scss" scoped>
.highlighted {
  box-sizing: border-box;
  width: 100%;
  background-color: var(--c-light);
  padding: var(--spacer-xl) var(--spacer-xl) 0;

  &:last-child {
    padding-bottom: var(--spacer-xl);
  }
}
span.sf-property__name {
    display: contents;
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
button.pp {
  margin-left: 233px;
}
.pd {
  border: 1px solid black;
}
ul {
  list-style: none;
}

</style>