import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoursesServiceService } from 'src/app/services/Courses/courses-service.service';
import { StudentsServiceService } from 'src/app/services/Students/students-service.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  selectedCourse:any;
  courses:any=["allCourses","html","css","javascript","angular"];
  
  constructor(public courseService:CoursesServiceService,private MatDailog:MatDialog) { }
  itemsValue:any;
  itemsEditValue:any;
  ngOnInit(): void {
    this.courseService.getallCourses()
  }

  deleteStudent(id:any){
   this.courseService.delete(id).subscribe(()=>{
    this.courseService.getallCourses()
   })
  }


  openDialog(templateRef:TemplateRef<any>){
    this.MatDailog.open(templateRef)
   }
   closeDailog(){
     this.MatDailog.closeAll()
   }

   ModalConfig={
    modal:'Courses',
    type:"addCourse",
    modalTitle: "add Course",
    dismissButtonLabel: "cancel",
    closeButtonLabel: "close"
}
ModalConfigEdit={
  modal:'Courses',
  type:"EditCourse",
  modalTitle: "Edit Course",
  dismissButtonLabel: "cancel",
  closeButtonLabel: "close"
}
@ViewChild('modal') modalComponent:any;

@ViewChild('Editmodal') Editmodal:any;
id:any
openModal(){
  return this.modalComponent.open()
}
close() {
  this.modalComponent.close()
}

openEditModal(){
  return this.Editmodal.open()
}
closeEditModal() {
  this.Editmodal.close()
}

updatestudentsByCourses(){
  if(this.selectedCourse == 'allCourses'){
    this.courseService.filterCourses=this.courseService.allCourses
  }else{
  this.courseService.filterCourses = this.courseService.allCourses.filter((item:any) =>
    item.CourseName + '' === this.selectedCourse + ''
  );
  }
}

}
