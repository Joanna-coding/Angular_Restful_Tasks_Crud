import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  addTask(newTask){
    console.log(newTask);
    return this._http.post('/task',newTask)
  }

  getTask(){
    return this._http.get('/getTasks')
  }

  getEdit(id){
    return this._http.get(`/edit/${id}`)
  }

  taskUpdate(editTask){
    return this._http.put(`/update/` +editTask._id, editTask)
  }

  taskDelete(id){
    return this._http.delete(`/TaskDelete/${id}`, id)
  }
}
