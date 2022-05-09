
import { Component, Injectable, Input, OnInit, Output, TemplateRef, ViewChild,EventEmitter, ContentChild } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { FormControl, FormGroup,Validators } from '@angular/forms';

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

  @ViewChild('modal') private modalContent: any
  private modalRef: any

  coursesModal:any=["html","css","javascript","angular"]
  buildForm:any
  constructor(private modalService: NgbModal) {
    this.buildForm=new FormGroup({
      name:new FormControl('',[Validators.required]),
      grade:new FormControl('',[Validators.required]),
      CourseName:new FormControl('',[Validators.required])
    })
   }

  ngOnInit(): void { 
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