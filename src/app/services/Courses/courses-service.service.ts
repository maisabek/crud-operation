import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesServiceService {
    apiUrl=environment.apiUrl;
  constructor(private http:HttpClient) { }
  getCourses():Observable<any>{
    return this.http.get(`${this.apiUrl}/Courses`)
  }

  add(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/Courses`,data)
  }

  edit(data:any,id:any):Observable<any>{
    return this.http.put(`${this.apiUrl}/Courses/${id}`,data)
  }

  delete(id:any):Observable<any>{
    return this.http.delete(`${this.apiUrl}/Courses/${id}`)
  }
}
