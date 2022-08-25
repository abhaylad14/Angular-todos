import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo | undefined;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  // Set dynamic classes
  setClasses(){
    let classes = {
      todo: true,
      'text-decoration-line-through': this.todo?.completed
    }
    return classes; 
  }

  onToggle(todo: any){
    // Toggle in UI
    todo.completed = !todo.completed;
    console.log("toggle");

    // Toggle on server
    this.todoService.toggleCompleted(todo).subscribe((todo:any) => {
      console.log(todo); 
    });
  }

  onDelete(todo: any){
    console.log("delete");
    this.deleteTodo.emit(todo);
  }

}
