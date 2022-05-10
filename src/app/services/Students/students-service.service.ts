import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentsServiceService {

  apiUrl=environment.apiUrl;
  constructor(private http:HttpClient) { }
  getStudent():Observable<any>{
    return this.http.get(`${this.apiUrl}/students`)
  }

  getStudentById(id:any):Observable<any>{
   return this.http.get(`${this.apiUrl}/students/${id}`)
  }

  add(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/students`,data)
  }

  edit(data:any,id:any):Observable<any>{
    return this.http.put(`${this.apiUrl}/students/${id}`,data)
  }

  delete(id:any):Observable<any>{
    return this.http.delete(`${this.apiUrl}/students/${id}`)
  }
  allStudents:any;
  isLoading:boolean=true;
  filterStudents:any
  getAllStudents(){
    this.getStudent().subscribe((res)=>{
      this.allStudents=res;
      this.filterStudents=res;
      this.isLoading=false
    })
   }
}
