import { ACTION_TAG } from "../enums/dashboard";

export interface IActionSheetBtn {
  icon: string,
  title: string,
  type: ACTION_TAG,
  click?: Function
}
