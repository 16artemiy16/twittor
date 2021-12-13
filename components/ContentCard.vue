<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

interface ActionI {
  icon: string;
  text: string;
  onClick?: () => void;
}

@Component
export default class ContentCard extends Vue {
  @Prop(String)
  readonly topText: string | undefined;

  @Prop({ type: String, required: true })
  readonly mainText: string | undefined;

  @Prop(String)
  readonly bottomText: string | undefined;

  @Prop({ type: Array, default: () => [] })
  readonly actions!: ActionI[];

  get hasActions(): boolean {
    return !!this.actions.length;
  }

  onActionClick(action: ActionI) {
    if (action.onClick) {
      action.onClick();
    }
  }
}
</script>


<template>
  <article class="card" data-app>
    <div v-if="topText" class="card__top-text">{{ topText }}</div>
    <div v-if="mainText" class="card__main-text">{{ mainText }}</div>
    <div v-if="bottomText" class="card__bottom-text">{{ bottomText }}</div>
    <v-menu v-if="hasActions" bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="actions-menu"
          text
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-dots-horizontal</v-icon>
        </v-btn>
      </template>
      <v-list light>
        <v-list-item
          v-for="(action, index) in actions"
          :key="index"
          @click="onActionClick(action)"
        >
          <v-list-item-icon>
            <v-icon>{{ action.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ action.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </article>
</template>

<style scoped lang="scss">
.card {
  position: relative;
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

.v-list-item__icon {
  padding-right: 1rem;
}
</style>
