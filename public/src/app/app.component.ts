import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  newTask: any;
  // Tasks: any[];
  Tasks = [];
  editTask = [];

  constructor(private _HttpService: HttpService){ }

  ngOnInit(){
    this.newTask = {title:"", description: ""}
    this.showTask();
    // this.Tasks=[]
  }

  onSubmit(){
      let Observable = this._HttpService.addTask(this.newTask)
      Observable.subscribe(response=>{
          console.log(response)
          this.showTask();
      })
  }

  showTask(){
      let Observable = this._HttpService.getTask()
      Observable.subscribe(response =>{
        this.Tasks = response['usersInterface'];
        console.log(this.Tasks)
      })
      
  }

  editButton(id){
    const Observable = this._HttpService.getEdit(id)
    Observable.subscribe(response=>{
      console.log("response",response);
      this.editTask = response['userTasks']
      
    })
  }

  updateTask(){
    
    const Observable = this._HttpService.taskUpdate(this.editTask)
    Observable.subscribe(response=>{
      console.log(response)
     })
     this.showTask()
  }

  deleteButton(id){
    const Observable = this._HttpService.taskDelete(id)
    Observable.subscribe(response=>{
      console.log(response);
    })
    this.showTask();
  }
}




