export interface ToDoList {
    todoList: ToDoItem[]
} 

export interface ToDoItem {
    id: number;
    item: string;
    priority: number;
    finished: boolean;
    editting?: boolean;
}