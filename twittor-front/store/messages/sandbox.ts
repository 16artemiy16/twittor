import { createNamespacedHelpers } from 'vuex';
import { MessagesAction } from '~/store/messages/actions';

const { mapState, mapActions } = createNamespacedHelpers('messages')

export const computed = {
  ...mapState([
    'dialogs',
    'isLoadingDialogs',
  ]),
} as Record<'dialogs' | 'isLoadingDialogs', any>;

export const actions = {
  ...mapActions([
    MessagesAction.FetchDialogs,
  ]),
} as Record<MessagesAction.FetchDialogs, Function>
