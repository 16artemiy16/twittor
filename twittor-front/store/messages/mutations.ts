import { MessagesStateI } from '~/store/messages/state';
import { DialogI } from '~/interfaces/dialog.interface';

export enum MessagesMutation {
  SetDialogs = 'setDialogs',
  SetIsLoadingDialogs = 'setIsLoadingDialogs',
}

export default {
  [MessagesMutation.SetDialogs]: (state: MessagesStateI, dialogs: DialogI[]) => {
    state.dialogs = dialogs;
  },
  [MessagesMutation.SetIsLoadingDialogs]: (state: MessagesStateI, flag: boolean) => {
    state.isLoadingDialogs = flag;
  }
}
