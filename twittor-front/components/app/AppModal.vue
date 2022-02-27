<script lang="ts">
import Component from 'vue-class-component';
import { Emit, Prop, Vue } from 'vue-property-decorator';

interface ActionI {
  text: string;
  handler: () => void;
  disabled?: boolean;
}

@Component
export default class AppModal extends Vue {
  @Prop({ type: String })
  headerText: string | undefined;

  @Prop({ default: false, type: Boolean })
  isLoading!: boolean;

  @Prop({ default: [], type: Array })
  actions!: ActionI[];

  @Emit('close')
  close() { return; }
}
</script>

<template>
  <v-card class="app-modal">
    <!-- Header -->

    <v-layout justify-space-between align-center class="app-modal__header pa-2">
      <v-btn icon text @click="close" :disabled="isLoading">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <div class="app-modal__header-text ml-2" v-if="headerText">
        {{ headerText }}
      </div>

      <v-spacer></v-spacer>
      <v-btn
        v-for="action in actions"
        :key="action.text"
        :disabled="action.disabled || isLoading"
        @click="action.handler"
      >
        {{ action.text }}
      </v-btn>
    </v-layout>

    <v-divider></v-divider>

    <!-- Progress Bar -->

    <template>
      <v-progress-linear
        v-if="isLoading"
        indeterminate
        color="cyan"
      ></v-progress-linear>
      <!--
        When progressbar appears from nowhere the layout jumps,
        this spacer replaces the progressbar when it's absent,
        making its appearance smooth
      -->
      <div class="mb-1" v-else></div>
    </template>

    <!--  Main  -->

    <main class="modal__main">
      <slot></slot>
    </main>
  </v-card>
</template>

<style scoped lang="scss">
.app-modal {
  &__header-text {
    font-size: 1.25rem;
    font-weight: 500;
    letter-spacing: 0.0125em;
  }
}
</style>
