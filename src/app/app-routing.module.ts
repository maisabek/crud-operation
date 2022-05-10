import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { StudentsComponent } from './components/students/students.component';

const routes: Routes = [
  {path:'',redirectTo:'/students',pathMatch:'full'},
  {path:'students',component:StudentsComponent},
  {path:'courses',component:CoursesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
