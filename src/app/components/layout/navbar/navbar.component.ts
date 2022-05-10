import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CoursesServiceService } from 'src/app/services/Courses/courses-service.service';
import { StudentsServiceService } from 'src/app/services/Students/students-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  path:any;
  filterValue:any;
  constructor(private student:StudentsServiceService,private course:CoursesServiceService) { 
  }

  ngOnInit(): void {
  }
  
  ngAfterViewChecked(){
    this.path=document.location.href
  }
  
  filter(){
    if(this.path == 'http://localhost:4200/#/students'){
      this.student.filterStudents=this.student.allStudents.filter((item:any) =>
        item.CourseName.toLowerCase().includes(this.filterValue.toLowerCase()) || 
        item.CourseName.includes(this.filterValue) ||
        item.CourseName.toUpperCase().includes(this.filterValue.toUpperCase())
      )
     this.filterValue=''
    }else if(this.path == 'http://localhost:4200/#/courses'){
      this.course.filterCourses=this.course.allCourses.filter((item:any) =>
      item.CourseName.toLowerCase().includes(this.filterValue.toLowerCase()) || 
      item.CourseName.includes(this.filterValue) ||
      item.CourseName.toUpperCase().includes(this.filterValue.toUpperCase())
    )
    this.filterValue=''


    }
  }

}
