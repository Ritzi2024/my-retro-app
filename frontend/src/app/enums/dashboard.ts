export enum TODOS_CRITERIA {
  "TODAY" = "0",
  "TOMORROW" = "1",
  "WEEKLY" = "7",
  "MONTHLY" = "30",
  "YEARLY" = "365",
  "LIFE" = "-1"
}

export enum TODOS_CATEGORY {
  "FINANCE" = "0",
  "HEALTH" = "1",
  "PROFESSIONAL" = "2",
  "BUSINESS" = "3",
  "FAMILY" = "4"
}

export enum ECHART_TYPE {
  BAR,
  LINE,
  PIE,
  MIX_BAR_LINE_STACK
}

export enum ACTION_TAG{
  delete = 0,
  add = 1,
  create_todo = 2,
  open_todo = 3,
  edit = 4,
  complete = 5
}
