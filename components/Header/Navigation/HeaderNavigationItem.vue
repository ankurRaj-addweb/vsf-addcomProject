<template>
  <div class="sf-header-navigation-item">
    <div class="sf-header-navigation-item__item sf-header-navigation-item__item--desktop">
      <slot name="desktop-navigation-item">
        <AwLink
          class="sf-header-navigation-item__link"
          :link="link"
        >
          {{
            label
          }}
        </AwLink>
      </slot>
      <slot />
    </div>
  </div>
</template>
<script>
import AwLink from '@storefront-ui/root/packages/vue/src/components/atoms/AwLink/AwLink.vue';

export default {
  name: 'HeaderNavigationItem',
  components: {
    AwLink,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    link: {
      type: [String, Object],
      default: '',
    },
  },
};
</script>
<style scoped>
.sf-header-navigation-item__link{
  margin-top: 10px;
}
</style>

