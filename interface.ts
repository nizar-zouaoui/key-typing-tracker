import { EventType, DeletionType } from "./types";

export interface ITypingEventTracker {
  add(str: string): void;
  delete(numberOfCharacters: number): void;
  get(): string;
  undo(): void;
  redo(): void;
}
