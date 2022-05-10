
import { Component, Injectable, Input, OnInit, Output, SimpleChanges, ViewChild,EventEmitter, ContentChild } from '@angular/core'
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
   studentId:any
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


  ngOnInit(): void {

  }
  addStudent(){
    this.studentService.add(this.buildForm.value).subscribe((res)=>{
      this.buildForm.reset()
     this.studentService.getAllStudents()
    })
  }
  EditStudent(){
   this.studentService.edit(this.buildForm.value,this.ItemId).subscribe((res)=>{
    this.buildForm.reset()
    this.studentService.getAllStudents()
   })
  }
  StudentData:any

  addCourse(){
    this.courseService.add(this.buildForm.value).subscribe((res)=>{
      this.buildForm.reset()
      this.courseService.getallCourses()
    })
  }
  EditCourse(){
   this.courseService.edit(this.buildForm.value,this.CourseId).subscribe((res)=>{
    this.buildForm.reset()
    this.courseService.getallCourses()
   })
  }


  open(){
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
