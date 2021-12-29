<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import ContainerActionsMenu from '~/components/ContainerActionsMenu.vue';

interface ActionI {
  icon: string;
  text: string;
  onClick?: () => void;
}

@Component({
  components: {
    ContainerActionsMenu,
  },
})
export default class ContentCard extends Vue {
  @Prop(String)
  readonly topText: string | undefined;

  @Prop({ type: String, required: true })
  readonly mainText: string | undefined;

  @Prop(String)
  readonly bottomText: string | undefined;

  @Prop({ type: Array, default: () => [] })
  readonly actions!: ActionI[];
}
</script>


<template>
  <ContainerActionsMenu :actions="actions">
    <article class="card pa-4 d-flex flex-column" data-app>
      <div v-if="topText" class="card__top-text">{{ topText }}</div>
      <div v-if="mainText" class="card__main-text my-1 mx-0 font-weight-bold">{{ mainText }}</div>
      <div v-if="bottomText" class="card__bottom-text">{{ bottomText }}</div>
    </article>
  </ContainerActionsMenu>
</template>

<style scoped lang="scss">
.card {
  cursor: pointer;

  &:hover {
    background: $background-hover-pale;
  }

  &__top-text, &__bottom-text {
    font-size: 0.85em;
  }
}
</style>
