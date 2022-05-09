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
  allCourses:any;
  selectedCourse:any;
  courses:any=["allCourses","html","css","javascript","angular"];
  isLoading:boolean=true;
  filterCourses:any
  constructor(private courseService:CoursesServiceService,private MatDailog:MatDialog) { }
  itemsValue:any;
  itemsEditValue:any;
  ngOnInit(): void {
    this.getallCourses()
  }
  getallCourses(){
   this.courseService.getCourses().subscribe((res)=>{
     this.allCourses=res;
     this.filterCourses=res;
     this.isLoading=false
   })
  }
  deleteStudent(id:any){
   this.courseService.delete(id).subscribe(()=>{
    this.getallCourses()
   })
  }
  addCourse(){
    this.courseService.add(this.itemsValue).subscribe((res)=>{
      console.log("res =",res)

      this.getallCourses()
    })
  }
  EditStudent(id:any){
    console.log("id = ",id)
   this.courseService.edit(this.itemsValue,id).subscribe((res)=>{
    console.log("res =",res)
    this.getallCourses()
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
    modalTitle: "add Course",
    dismissButtonLabel: "cancel",
    closeButtonLabel: "close"
}
ModalConfigEdit={
  modal:'Courses',
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
    this.filterCourses=this.allCourses
  }else{
  this.filterCourses = this.allCourses.filter((item:any) =>
    item.CourseName + '' === this.selectedCourse + ''
  );
  }
}

}
