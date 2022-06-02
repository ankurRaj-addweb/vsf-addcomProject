<template>
    <AwFooter :column="4" multiple class="footer foo" >
    <AwFooterColumn :title="$t('About us')" class="about_us">
      <AwList>
        <AwListItem v-for="item in aboutUs" :key="item" :style="{'--list-item-margin':'15px 0'}">
          <AwMenuItem :label="$t(item)" />
        </AwListItem>
      </AwList>
    </AwFooterColumn>
    <AwFooterColumn :title="$t('Departments')" class="department" >
      <AwList>
        <AwListItem v-for="item in departments" :key="item" :style="{'--list-item-margin':'15px 0'}">
          <AwMenuItem :label="$t(item)" />
        </AwListItem>
      </AwList>
    </AwFooterColumn>
    <AwFooterColumn :title="$t('Help')" class=" help">
      <AwList>
        <AwListItem v-for="item in help" :key="item" :style="{'--list-item-margin':'15px 0'}">
          <AwMenuItem :label="$t(item)" @click="handleClickOnHelp(item)"/>
        </AwListItem>
      </AwList>
    </AwFooterColumn>
    <AwFooterColumn :title="$t('Payment & Delivery')" class=" payment_delivery">
      <AwList>
        <AwListItem v-for="item in paymentsDelivery" :key="item" :style="{'--list-item-margin':'15px 0'}">
          <AwMenuItem :label="$t(item)" />
        </AwListItem>
      </AwList>
    </AwFooterColumn>
    <AwFooterColumn title="Social" class="social">
      <div class="footer__socials">
        <AwImage
          v-for="item in social"
          :key="item"
          class="footer__social-image"
          :src="addBasePath('/icons/' + item + '.svg')"
          :alt="item"
          width="32"
          height="32"
        />
      </div>
    </AwFooterColumn>
    <div class="footer-logo smartphone-only">
      <HeaderLogo />
    </div>
    
    <AwFooterColumn title="Language" class=" language">
      <AwButton
        class="sf-button--pure"
        style="display: flex; align-self: end; color: white; margin-top: 22px"
      >
        <AwImage
          :src="addBasePath('/icons/english.svg')"
          alt="flag of the USA"
          :width="20"
          :height="20"
          style="margin-right: 10px; margin-top:20px;"
        />
        <span style="margin-top:20px;">English</span>
      </AwButton>
      
    </AwFooterColumn>
    
    <AwFooterColumn >
      <div class="footer__subscribe ">
        <AwInput
          class="sf-input--outline"
          type="text"
          placeholder="Type your email address"
        />
        <AwButton class="subscribe__button" style="width: 116px; font-size: 12px; height: 32px; ">
          Subscribe
        </AwButton>
      </div>
    </AwFooterColumn>
  </AwFooter>
</template>

<script>
import {
  useRouter,
  useContext,
} from "@nuxtjs/composition-api";
import AwFooter from "@storefront-ui/root/packages/vue/src/components/organisms/AwFooter/AwFooter.vue";
import AwFooterColumn from "@storefront-ui/root/packages/vue/src/components/organisms/AwFooter/_internal/AwFooterColumn.vue";
import AwList from "@storefront-ui/root/packages/vue/src/components/organisms/AwList/AwList.vue";
import AwImage from "@storefront-ui/root/packages/vue/src/components/atoms/AwImage/AwImage.vue";
import AwMenuItem from "@storefront-ui/root/packages/vue/src/components/molecules/AwMenuItem/AwMenuItem.vue";
import AwInput from "@storefront-ui/root/packages/vue/src/components/atoms/AwInput/AwInput.vue";
import AwButton from "@storefront-ui/root/packages/vue/src/components/atoms/AwButton/AwButton.vue";
import { addBasePath } from "@vue-storefront/core";
import HeaderLogo from "~/components/HeaderLogo.vue";

export default {
  components: {
    AwFooter,
    AwList,
    AwImage,
    AwMenuItem,
    AwInput,
    AwButton,
    AwFooterColumn,
    HeaderLogo,
  },
  setup() {
    const router = useRouter();
    const { app } = useContext();
      const   handleClickOnHelp = async (title) => {
      const slugifiedTitle = (title || "").toLowerCase().replace(" ", "-");
      const transformedPath = `/help/${slugifiedTitle}`;
      await router.push(`${app.localePath(transformedPath)}`);
    };
    return {
      addBasePath,
      handleClickOnHelp
    };
  },
  data() {
    return {
      aboutUs: ["Who we are", "Quality in the details", "Customer Reviews"],
      departments: ["Women fashion", "Men fashion", "Kidswear", "Home"],
      help: ["Customer service", "Size guide", "Contact us"],
      paymentsDelivery: ["Purchase terms", "Guarantee"],
      social: ["facebook", "pinterest", "google", "twitter", "youtube"],
      isMobile: false,
      desktopMin: 1024,
    };
  },
};
</script>

<style lang="scss" scoped>
.footer {
  margin-bottom: 3.75rem;
  @include for-desktop {
    margin-bottom: 0;
  }
  &__socials {
    display: flex;
    justify-content: space-between;
    margin: 0 auto var(--spacer-lg);
    padding: var(--spacer-base) var(--spacer-xl);
    @include for-desktop {
      justify-content: flex-start;
      padding: var(--spacer-xs) 0;
      margin: 0 auto;
    }
  }
  &__social-image {
    margin: 0 var(--spacer-2xs) 0 0;
    background-color: #fff;
    border-radius: 100%;
    padding: 6px;
  }
  &__subscribe{
    height: 32px;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  margin-bottom: 38px;
  position: absolute;
  left: 828px;
  }
}
.sf-footer {
  @include for-desktop {
    border-top: var(--spacer-xs) solid var(--c-primary);
    padding-bottom: 0;
    margin-top: var(--spacer-2xl);
  }
  &__container {
    margin: var(--spacer-sm);
    @include for-desktop {
      max-width: 69rem;
      margin: 0 auto;
    }
  }
}
.footer-logo {
  background:  #3C3C3C;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>