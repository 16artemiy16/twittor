<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { UserProfileI } from '~/interfaces/user-profile.interface';

@Component
export default class AppUserImg extends Vue {
  @Prop({ required: true })
  user!: UserProfileI;

  @Prop({ required: true })
  size!: number;

  // TODO: think about the color; move to constants later
  readonly imgFallbackBG: string = 'antiquewhite';

  get styles(): Record<string, string> {
    const bgImg = this.user.img || '';
    return {
      width: `${this.size}px`,
      height: `${this.size}px`,
      fontSize: `${this.size / 2}px`,
      ...bgImg
        ? { backgroundImage: `url(${bgImg})` }
        : { backgroundColor: this.imgFallbackBG }
    };
  }

  get textContent() {
    return !this.user.img ? this.user.fullname[0].toUpperCase() : '';
  }
}
</script>

<template>
  <div class="app-user-img rounded-circle" :style="styles">
    {{ textContent }}
  </div>
</template>

<style scoped lang="scss">
.app-user-img {
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
