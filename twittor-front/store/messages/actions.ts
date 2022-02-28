import { ActionContext } from 'vuex';
import { MessagesStateI } from '~/store/messages/state';
import { MessagesMutation } from '~/store/messages/mutations';

type MessagesActionContext = ActionContext<MessagesStateI, any>

export enum MessagesAction {
  FetchDialogs = 'fetchDialogs',
}

export default {
  async [MessagesAction.FetchDialogs]({ commit }: MessagesActionContext) {
    commit(MessagesMutation.SetIsLoadingDialogs, true);
    try {
      const dialogs = await this.$msgService.getMyDialogs();
      commit(MessagesMutation.SetDialogs, dialogs)
    } catch (e) {

    } finally {
      commit(MessagesMutation.SetIsLoadingDialogs, false);
    }
  },
} as any;
