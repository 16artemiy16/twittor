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
    <article class="card" data-app>
      <div v-if="topText" class="card__top-text">{{ topText }}</div>
      <div v-if="mainText" class="card__main-text">{{ mainText }}</div>
      <div v-if="bottomText" class="card__bottom-text">{{ bottomText }}</div>
    </article>
  </ContainerActionsMenu>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 1rem;

  &:hover {
    background: $background-hover-pale;
  }

  &__main-text {
    font-weight: bold;
    margin: 0.25em 0;
  }

  &__top-text, &__bottom-text {
    font-size: 0.85em;
  }
}

.actions-menu {
  position: absolute;
  right: .5rem;
  top: .5rem;
}

.v-list-item {
  &:hover {
    background: $background-hover-pale;
  }
}
</style>
