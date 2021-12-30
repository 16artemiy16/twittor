<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { actions } from '~/store/profile/sandbox';

@Component<any>({
  methods: {
    initProfile: actions.initProfile,
  },
  components: {
    ProfileDescriptionSection: () => import('~/components/Profile/ProfileDescriptionSection.vue' /* webpackChunkName: "ProfileDescriptionSection" */),
  },
})
export default class Profile extends Vue {
  created() {
    (this as any).initProfile()
  }
}
</script>

<template>
  <ProfileDescriptionSection />
</template>

<style scoped lang="scss">

</style>
