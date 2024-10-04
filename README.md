# key-typing-tracker

This is a library that provides a class to track the typing events on the keyboard by storing the adds and deletions in an events array and then using the undo and redo to make use of its tracker feature.

## Usage example

```ts
const typingEventTracker = new TypingEventTracker();

typingEventTracker.add("Hello,");
typingEventTracker.add("Im");
typingEventTracker.get(); // "Hello, Im"

typingEventTracker.add("new");
typingEventTracker.add("here!");
typingEventTracker.get(); // "Hello, Im new here!"

typingEventTracker.undo();
typingEventTracker.get(); // "Hello, Im new"

typingEventTracker.redo();
typingEventTracker.get(); // "Hello, Im new here!"

typingEventTracker.undo();
typingEventTracker.add("there!");
typingEventTracker.get(); // "Hello, Im new there!"
typingEventTracker.redo(); // Once add or delete methods are called the undone events will be deleted and thus loosing all preceding trace

typingEventTracker.get(); // "Hello, Im new there!"
typingEventTracker.delete(7); // deletes the last 7 characters of the words inserted "w"=1 + "there!"=6
typingEventTracker.get(); // "Hello, Im ne"
typingEventTracker.undo();
typingEventTracker.get(); // "Hello, Im new there!"
```
