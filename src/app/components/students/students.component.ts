import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentsServiceService } from 'src/app/services/Students/students-service.service';
import { ModalComponent } from 'src/app/shared/component/modal/modal.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  selectedCourse:any;
  courses:any=["allStudents","html","css","javascript","angular"];
  // allStudents:any;
  // isLoading:boolean=true;
  // filterStudents:any
  constructor(public studentService:StudentsServiceService,private MatDailog:MatDialog) { }
  itemsValue:any;
  itemsEditValue:any;
  ngOnInit(): void {
    this.studentService.getAllStudents()
  }
  // getAllStudents(){
  //  this.studentService.getStudent().subscribe((res)=>{
  //    this.allStudents=res;
  //    this.filterStudents=res;
  //    this.isLoading=false
  //  })
  // }
  deleteStudent(id:any){
   this.studentService.delete(id).subscribe(()=>{
    this.studentService.getAllStudents()
   })
  }
  // addStudent(){
  //   this.studentService.add(this.itemsValue).subscribe((res)=>{
  //     console.log("res =",res)

  //     this.getAllStudents()
  //   })
  // }
  // EditStudent(id:any){
  //   console.log("id = ",id)
  //  this.studentService.edit(this.itemsValue,id).subscribe((res)=>{
  //   console.log("res =",res)
  //   this.studentService.getAllStudents()
  //  })
  // }
  id:any
  openDialog(templateRef:TemplateRef<any>){
    this.MatDailog.open(templateRef)
   }
   closeDailog(){
     this.MatDailog.closeAll()
   }

   ModalConfig={
    modal:'students',
    type:'AddStudent',
    modalTitle: "add Student",
    dismissButtonLabel: "cancel",
    closeButtonLabel: "close"
  }
   ModalConfigEdit={
    modal:'students',
    type:'EditStudent',
    modalTitle: "Edit Student",
    dismissButtonLabel: "cancel",
    closeButtonLabel: "close"
  }
@ViewChild('modal') modalComponent:any;

@ViewChild('Editmodal') Editmodal:any;

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
  if(this.selectedCourse == 'allStudents'){
    this.studentService.filterStudents=this.studentService.allStudents
  }else{
  this.studentService.filterStudents = this.studentService.allStudents.filter((item:any) =>
    item.CourseName + '' === this.selectedCourse + ''
  );
  }
}
}
