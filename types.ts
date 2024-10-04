import { EVENT_NAME } from "./enums";

export type EventType =
  | { type: EVENT_NAME.ADD; value: string }
  | {
      type: EVENT_NAME.DELETE;
      value: number;
      deletions: DeletionType[];
    };

export type DeletionType = { isFullString: boolean; stringValue: string };
