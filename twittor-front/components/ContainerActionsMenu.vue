<script lang="ts">
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Vue from 'vue';

interface ActionI {
  icon: string;
  text: string;
  onClick?: () => void;
}

@Component
export default class ContainerActionsMenu extends Vue {
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
  <div style="position: relative">
    <slot />
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
  </div>
</template>

<style scoped lang="scss">
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
