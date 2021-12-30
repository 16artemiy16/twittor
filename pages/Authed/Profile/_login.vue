<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { actions, computed } from '~/store/profile/sandbox';

@Component<any>({
  computed: {
    isLoadingProfile: computed.isLoadingProfileInfo
  },
  methods: {
    initProfile: actions.initProfile,
  },
  components: {
    ProfileDescriptionSection: () => import('~/components/Profile/ProfileDescriptionSection.vue' /* webpackChunkName: "ProfileDescriptionSection" */),
    ProfileDescriptionSectionSkeleton: () => import('~/components/Profile/ProfileDescriptionSectionSkeleton.vue' /* webpackChunkName: "ProfileDescriptionSectionSkeleton" */),
  },
})
export default class Profile extends Vue {
  created() {
    (this as any).initProfile()
  }
}
</script>

<template>
  <ProfileDescriptionSection v-if="!isLoadingProfile" />
  <ProfileDescriptionSectionSkeleton v-else />
</template>

<style scoped lang="scss">

</style>
