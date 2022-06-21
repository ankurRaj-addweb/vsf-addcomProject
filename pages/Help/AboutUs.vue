<template>
  <div class="smart-aboutus">
    <AwTabs :open-tab="1" class="customer_service smartphone_only">
      <AwTab :title="$t('Security')">
        <p>
          This website ("website") is operated by Luma Inc., which includes Luma stores, and Luma Private Sales. This privacy policy only covers information collected at this website, and does not cover any information collected offline by Luma. All Luma websites are covered by this privacy policy.
        </p>
        <label style="font-size: 24px;">Luma Security</label>
        <p>
          Personal information provided on the website and online credit card transactions are transmitted through a secure server. We are committed to handling your personal information with high standards of information security. We take appropriate physical, electronic, and administrative steps to maintain the security and accuracy of personally identifiable information we collect, including limiting the number of people who have physical access to our database servers, as well as employing electronic security systems and password protections that guard against unauthorized access.
        </p>
      </AwTab>
      <AwTab :title="$t('Privacy Policy')">
        <p>
          This website ("website") is operated by Luma Inc., which includes Luma
          stores, and Luma Private Sales. This privacy policy only covers
          information collected at this website, and does not cover any
          information collected offline by Luma. All Luma websites are covered
          by this privacy policy.
        </p>
      </AwTab>
      <AwTab :title="$t('Additional Information')">
        <p>
          This website ("website") is operated by Luma Inc., which includes Luma
          stores, and Luma Private Sales. This privacy policy only covers
          information collected at this website, and does not cover any
          information collected offline by Luma. All Luma websites are covered
          by this privacy policy.
        </p>
      </AwTab>
    </AwTabs>
    
  </div>
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api";
import AwTabs from "@storefront-ui/root/packages/vue/src/components/organisms/AwTabs/AwTabs.vue";

export default defineComponent({
  name: "AboutUs",

  components: {
    AwTabs,
  },
});
</script>

<style lang="scss" scoped>
p{
  font-family: "Source Sans Pro";
  font-style: normal;
  font-weight: 400;
  color: #282828;
  font-size: 18px;
}
</style>
