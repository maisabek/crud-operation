
import { Component, Injectable, Input, OnInit, Output, TemplateRef, ViewChild,EventEmitter, ContentChild } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { StudentsServiceService } from 'src/app/services/Students/students-service.service';
import { CoursesServiceService } from 'src/app/services/Courses/courses-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
@Injectable()
export class ModalComponent implements OnInit {
  @Input() public modalConfig: any;
  @Output() public data:EventEmitter<any> = new EventEmitter<any>();
  @Output() public EditData:EventEmitter<any> = new EventEmitter<any>()
  @Input() public ItemId:any;
  @Input() public CourseId:any;

  @ViewChild('modal') private modalContent: any
  private modalRef: any

  coursesModal:any=["html","css","javascript","angular"]
  buildForm:any
  constructor(private modalService: NgbModal,
    private studentService:StudentsServiceService,
    private courseService:CoursesServiceService) {
    this.buildForm=new FormGroup({
      name:new FormControl('',[Validators.required]),
      grade:new FormControl('',[Validators.required]),
      CourseName:new FormControl('',[Validators.required])
    })
   }

  ngOnInit(): void {}
  addStudent(){
    this.studentService.add(this.buildForm.value).subscribe((res)=>{
      console.log("res =",res)
     this.studentService.getAllStudents()
    })
  }
  EditStudent(){
   this.studentService.edit(this.buildForm.value,this.ItemId).subscribe((res)=>{
    this.studentService.getAllStudents()
   })
  }
  addCourse(){
    this.courseService.add(this.buildForm.value).subscribe((res)=>{
      console.log("res =",res)

      this.courseService.getallCourses()
    })
  }
  EditCourse(){
   this.courseService.edit(this.buildForm.value,this.CourseId).subscribe((res)=>{
    this.courseService.getallCourses()
   })
  }
  ngAfterContentChecked(){
    this.data.emit(this.buildForm.value);
    this.EditData.emit(this.buildForm.value)
  }

  open() {
    this.modalRef = this.modalService.open(this.modalContent)
    this.modalRef.result.then()
  }

  close() {
    this.modalRef.close()
  }

  dismiss() {
    this.modalRef.dismiss()
  }
}
