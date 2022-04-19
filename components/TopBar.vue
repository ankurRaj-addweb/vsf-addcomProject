<template>
  <AwTopBar class="topbar">
    <template #left>
      <AwButton class="sf-button--text" style="width:82px; color:#037EE6">
        {{ $t('Help & FAQs') }}
      </AwButton>
    </template>
    <template #center>
      <p>{{ $t('Download our application. ') }}</p>
      <AwButton class="topbar__button sf-button--text">
        {{ $t('Find out more') }}
      </AwButton>
    </template>
    <template #right>
      <CurrencySelector />
      <StoreSwitcher />
    </template>
  </AwTopBar>
</template>

<script>
import { SfButton, SfTopBar } from '@storefront-ui/vue';
import CurrencySelector from './CurrencySelector';
import StoreSwitcher from './StoreSwitcher';
import AwButton from '@storefront-ui/root/packages/vue/src/components/atoms/AwButton/AwButton.vue';
import AwTopBar from '@storefront-ui/root/packages/vue/src/components/organisms/AwTopBar/AwTopBar.vue';
export default {
  components: {
    CurrencySelector,
    SfTopBar,
    AwButton,
    AwTopBar,
    SfButton,
    StoreSwitcher,
  },
};

</script>
<style lang="scss" scoped>
.topbar {
  position: relative;
  z-index: 2;
  &__button {
    margin: 0 0 0 var(--spacer-xs);
  }
}
.sf-button--text{
  width: 92px;
  height: 22px;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  // font-family: Source Sans Pro;
}
p{
  width: 178px;
  height: 22px;
  left: 580px;
  top: 9px;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  // font-family: Source Sans Pro;
}
</style>
