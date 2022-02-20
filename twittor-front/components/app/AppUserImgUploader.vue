<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: ['value']
})
export default class AppUserImgUploader extends Vue {
  value!: File | string | undefined;

  get imgSrc(): string {
    if (typeof this.value === 'string') {
      return this.value;
    }
    if (!this.value) {
      return '';
    }
    return URL.createObjectURL(this.value);
  }

  readonly imgFallbackBG: string = 'antiquewhite';

  get styles(): Record<string, string> {
    const bgImg = this.imgSrc || '';
    return {
      fontSize: `55px`,
      ...bgImg
        ? { backgroundImage: `url(${bgImg})` }
        : { backgroundColor: this.imgFallbackBG }
    };
  }

  selectFile() {
    (this.$refs.fileInput as any).click();
  }

  handleFileChange(e: Event) {
    const { files } = (e.target as HTMLInputElement);
    if (files?.length) {
      this.$emit('input', files[0]);
    }
  }

  removeImg() {
    this.$emit('input', undefined);
  }
}
</script>

<template>
  <div class="app-user-img-uploader">
    <v-icon
      v-if="imgSrc"
      @click="removeImg"
      class="app-user-img-uploader__remove rounded-circle"
      title="Remove this photo"
    >
      mdi-close
    </v-icon>
    <div
      @click="() => $refs.fileInput.click()"
      class="app-user-img-uploader__selected-img rounded-circle"
      :style="styles"
      title="Click to change the image"
    />
    <input
      @change="handleFileChange"
      accept="image/gif, image/jpeg, image/png"
      class="app-user-img-uploader__input"
      type="file"
      ref="fileInput"
    />
  </div>
</template>

<style scoped lang="scss">
.app-user-img-uploader {
  position: relative;
  width: fit-content;
  height: fit-content;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  &__remove {
    position: absolute;
    color: $background-hover-pale;
    top: 45px;
    right: -10px;
    background: $middle-grey;
  }

  &__selected-img {
    cursor: pointer;
    width: 120px;
    height: 120px;
    border: 1px $middle-grey solid;
  }

  &__input {
    display: none;
  }
}
</style>
