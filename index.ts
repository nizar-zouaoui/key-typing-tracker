import { EVENT_NAME } from "./enums";
import { ITypingEventTracker } from "./interface";
import { EventType, DeletionType } from "./types";

class TypingEventTracker implements ITypingEventTracker {
  private events: EventType[] = [];
  private undoneEvents: EventType[] = [];
  private currentState: string[] = [];
  constructor() {}

  private addElement(str: string) {
    this.events.push({
      value: str,
      type: EVENT_NAME.ADD,
    });
    this.currentState.push(str);
  }

  add(str: string) {
    this.undoneEvents.length = 0;
    this.addElement(str);
  }
  private deleteElements(numberOfCharacters: number) {
    const deletions: DeletionType[] = [];
    while (numberOfCharacters) {
      if (!this.currentState.length) break;
      const el = this.currentState.pop()!;
      if (el.length > numberOfCharacters) {
        const removedChunk = el.slice(el.length - numberOfCharacters);
        this.currentState.push(el.slice(0, el.length - numberOfCharacters));
        deletions.push({
          isFullString: false,
          stringValue: removedChunk,
        });
        break;
      }
      numberOfCharacters -= el.length;
      deletions.push({
        isFullString: true,
        stringValue: el,
      });
    }
    if (!deletions.length) return;
    this.events.push({
      type: EVENT_NAME.DELETE,
      deletions,
      value: numberOfCharacters,
    });
  }

  delete(numberOfCharacters: number) {
    this.undoneEvents.length = 0;
    this.deleteElements(numberOfCharacters);
  }

  get() {
    return this.currentState.join(" ");
  }

  undo() {
    if (!this.events.length) return;
    const event = this.events.pop()!;
    this.undoEvent(event);
    this.undoneEvents.push(event);
  }

  private undoEvent(event: EventType) {
    if (event.type === "ADD") {
      this.undoAddEvent();
    }
    if (event.type === "DELETE") {
      this.undoDeleteEvent(event.deletions);
    }
  }

  private undoAddEvent() {
    this.currentState.pop();
  }
  private undoDeleteEvent(deletions: DeletionType[]) {
    while (deletions.length) {
      const currentEvent = deletions.pop()!;
      if (currentEvent.isFullString) {
        this.currentState.push(currentEvent.stringValue);
      } else {
        this.currentState[this.currentState.length - 1] +=
          currentEvent.stringValue;
      }
    }
  }

  redo() {
    if (!this.undoneEvents.length) return;
    const undoneEvent = this.undoneEvents.pop()!;
    if (undoneEvent.type === "ADD") {
      this.addElement(undoneEvent.value);
    }
    if (undoneEvent.type === "DELETE") {
      this.deleteElements(undoneEvent.value);
    }
  }
}

export default TypingEventTracker;
