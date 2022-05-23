<template>
  <div class="storelocator">
    <div>

      <!-- <AwIcon
icon="marker" size="lg" color="green-primary" viewBox="0 0 24 24" /> -->

      <!-- <input
placeholder="Type name of the street or city"
v-model="location"
type="text"
class="sf-input"

/> -->

      <AwInput
        value=""
        name="name"
        type="text"
        :icon='{"icon":"marker","color":"","size":""}'
        placeholder="Type name of the street or city"
        class="s-input"
      />

      <button class="Awbutton">SEARCH</button>
      <!-- <AwButton>

</AwButton> -->
    </div>

    <div>
      <AwStoreLocator
        tileServerAttribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
        :center="[47.5104387, 19.0444433]"
        :zoom="6"
        :maxZoom="16"
        :markerIconSize="[21, 28]"
        :markerIconAnchor="[10.5, 0]"
        :mapOptions="{}"
        :tileLayerOptions="{}"
        :markerOptions="{}"
        :flyToStoreZoom="15"
      >
        <AwStore
          :latlng="[47.4968864, 19.0531093]"
          name="Store"
          picture="images/image5.png"
          :pictureWidth="82"
          :pictureHeight="112"
          address="Budapest, Deák Ferenc u. 19, 1052"
          phone="(70) 881 9463"
          email="example@email.com"
        />
        </AwStoreLocator>
    </div>
  </div>
</template>

<script>
import AwInput from "@storefront-ui/root/packages/vue/src/components/atoms/AwInput/AwInput.vue";
import AwButton from "@storefront-ui/root/packages/vue/src/components/atoms/AwButton/AwButton.vue";
import AwStoreLocator from "@storefront-ui/root/packages/vue/src/components/organisms/AwStoreLocator/AwStoreLocator.vue";
import AwIcon from "@storefront-ui/root/packages/vue/src/components/atoms/AwIcon/AwIcon.vue";
import { defineComponent, ref } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "StoreLocator",
  components: {
    AwInput,
    AwButton,
    AwStoreLocator,
    AwIcon,
  },

  setup() {
    const location = ref("");

    return {
      location,
    };
  },
});
</script>

<style lang="scss" scoped>
.sf-input {
  height: 1px;
  width: 394px;
  padding: 1rem;
  font-size: 1rem;
  border-top: 0.5rem rgb(3, 3, 3);
  border-left: 0.5rem rgb(3, 3, 3);
  border-right: 0.5rem rgb(3, 3, 3);
  // border-bottom: 0.1rem solid rgb(3, 3, 3);
  float: left;
}
.Awbutton {
  height: 50px;
  width: 168px;
  color: #ffffff;
  background-color: #037ee6;
  border: none;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
}
</style>