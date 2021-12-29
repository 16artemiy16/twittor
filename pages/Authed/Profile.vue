<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

@Component({
  components: {
    ProfileDescriptionSection: () => import('~/components/Profile/ProfileDescriptionSection.vue' /* webpackChunkName: "ProfileDescriptionSection" */),
  },
})
export default class Profile extends Vue {
}
</script>

<template>
  <ProfileDescriptionSection />
</template>

<style scoped lang="scss">

</style>
