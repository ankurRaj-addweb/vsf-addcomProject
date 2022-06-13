<template>
  <div class="categorysidebar">
    <slot v-if="loading" name="loading" :loading="loading" />
    <slot v-else name="category" :category-tree="categoryTree" :active-category="activeCategory">
      <AwAccordion :open="activeCategory" :show-chevron="true">
        <AwAccordionItem
          v-for="(cat, i) in categoryTree && categoryTree.items"
          :key="i"
          :header="cat.label"
        >
          <!-- <h1>{{cat}}</h1> -->

          <AwList class="list">
            <AwListItem class="list__item">
              <AwMenuItem :count="cat.count || ''" :label="cat.label">
                <template #label>
                  <nuxt-link
                    :to="localePath(th.getAgnosticCatLink(cat))"
                    :class="cat.isCurrent ? 'sidebar--cat-selected' : ''"
                  >All</nuxt-link>
                </template>
              </AwMenuItem>
            </AwListItem>
            <AwDivider v-if="cat.items.length> 0" />
            <AwListItem v-for="(subCat, j) in cat.items" :key="j" class="list__item" >
              <AwMenuItem :label="subCat.label">
                <template #label="{ label }">{{ label }}</template>
              </AwMenuItem>
              <template>
                <span
                  class="sf-chevron--right sf-chevron"
                  @click="toggle(subCat.label)"
                  :id="subCat.label+'toggleId'"
                >
                  <span class="sf-chevron__bar sf-chevron__bar--left" />
                  <span class="sf-chevron__bar sf-chevron__bar--right" />
                </span>
              </template>
              <div class="sub-cat display_none" :id="subCat.label">
                <AwMenuItem
                  v-for="(subSubCat, z) in subCat.items && subCat.items"
                  :key="z"
                  :count="subSubCat.count || ''"
                  :label="subSubCat.label"
                  class="list__item__sub"
                >
                  <template #label="{ label }">
                    <nuxt-link
                      :to="localePath(th.getAgnosticCatLink(subSubCat))"
                      :class="subSubCat.isCurrent ? 'sidebar--cat-selected' : ''"
                    >{{ label }}</nuxt-link>
                  </template>
                </AwMenuItem>
              </div>
            </AwListItem>
          </AwList>
        </AwAccordionItem>
      </AwAccordion>
    </slot>
  </div>
</template>

<script>
import findDeep from "deepdash/findDeep";
import AwList from "@storefront-ui/root/packages/vue/src/components/organisms/AwList/AwList.vue";
import AwMenuItem from "@storefront-ui/root/packages/vue/src/components/molecules/AwMenuItem/AwMenuItem.vue";
import AwAccordion from "@storefront-ui/root/packages/vue/src/components/organisms/AwAccordion/AwAccordion.vue";
import AwDivider from "@storefront-ui/root/packages/vue/src/components/atoms/AwDivider/AwDivider.vue";
import { computed, defineComponent, ref } from "@nuxtjs/composition-api";
import { categoryGetters, useCategory } from "@vue-storefront/magento";
import { onSSR } from "@vue-storefront/core";
import { useUrlResolver } from "~/composables/useUrlResolver.ts";
import { useUiHelpers } from "~/composables";

export default defineComponent({
  name: "CategorySidebarMenu",
  components: {
    AwList,
    AwMenuItem,
    AwAccordion,
    AwDivider
  },
  props: {
    resolveUrl: Boolean,
    noFetch: Boolean
  },
  setup(props) {
    const isToggle = ref(false);
    const th = useUiHelpers();
    const { path, result, search: resolveUrl } = useUrlResolver();
    const { categories, search, loading } = useCategory(`categoryList:${path}`);

    const categoryTree = computed(() =>
      categoryGetters.getCategoryTree(
        categories.value?.[0],
        result.value?.entity_uid,
        false
      )
    );

    const activeCategory = computed(() => {
      const items = categoryTree.value?.items;

      if (!items) {
        return "";
      }
      const categoryLabel = ref();
      const parent = findDeep(items, (value, key, parentValue, _deepCtx) => {
        if (key === "isCurrent" && value) {
          // eslint-disable-next-line no-underscore-dangle
          categoryLabel.value = _deepCtx.obj[_deepCtx._item.path[0]].label;
        }
        return key === "isCurrent" && value;
      });

      return categoryLabel.value || parent?.category?.label || items[0]?.label;
    });
      // using popup for top and bottom 
    const toggle = (id) => {
      
      const displayIs = document.getElementById(id).classList.contains('display_none');
      if(!displayIs){
        document.getElementById(id).classList.add('display_none')
        document.getElementById(id+'toggleId').classList.remove('rotate')
      }else{
        document.getElementById(id).classList.remove('display_none')
        document.getElementById(id+'toggleId').classList.add('rotate')
      }
    }

    onSSR(async () => {
      if (props.resolveUrl) {
        await resolveUrl();
      }

      if (!props.noFetch) {
        await search({
          pageSize: 20
        });
      }
    });

    return {
      th,
      loading,
      categoryTree,
      activeCategory,
      isToggle,
      toggle
    };
  }
});
</script>

 <style lang="scss" scoped>
.sf-divider {
  margin-bottom: var(--spacer-xs);
}
.list {
  --menu-item-font-size: var(--font-size--sm);

  &__item {
    &:first-child {
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }

    &:not(:last-of-type):not(:first-child) {
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }

    &__sub {
      padding: var(--spacer-xs) 0 0 var(--spacer-sm);
    }
    .nuxt-link-exact-active {
      text-decoration: underline;
    }
  }
}
span.sf-chevron--right.sf-chevron {
  position: relative;
  left: 158px;
  top: -21px;
}
.rotate {
  transform: rotate(90deg);
}
.display_none {
  display: none;
}
</style>
