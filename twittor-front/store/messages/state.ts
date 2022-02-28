import { DialogI } from '~/interfaces/dialog.interface';

export interface MessagesStateI {
  dialogs: DialogI[];
  isLoadingDialogs: boolean;
}

export default (): MessagesStateI => ({
  dialogs: [],
  isLoadingDialogs: false,
});
