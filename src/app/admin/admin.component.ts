import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  // variables for control view and data 
  // uploadingImg:string="";
  mainControl: string = "add";
  // variables for data 
  projects = this.formBuilder.group({
    link: [""],
    title: [""],
    id: [new Date().getTime()]
  })
  listArray: any[] = [];
  // item key in database
  globalKey: string = "";
  globalObject: any;

  constructor(private formBuilder: FormBuilder, private dataServ: AdminService) {
    dataServ.getdata("projects").subscribe(data => {
      // for (const key in data) {
      //   this.listArray.push(data[key])
      // }
    })
  }

  ngOnInit(): void {
  }

  // ------------- control the show ---------------
  viewControl(mainControl: string) {
    this.mainControl = mainControl;
  }
  resetView() {
    this.projects.patchValue({
      id: new Date().getTime(),
      title: "",
      link: "",
    })
  }
  //----------------------------------------------
  getData() {
    this.listArray = [];
    this.dataServ.getdata("projects").subscribe(data => {
      for (const key in data) {
        this.listArray.push(data[key])
      }
    })
  }

  // --------------- submit form -----------------
  submit() {
    if (this.mainControl == "add") {
      this.dataServ.create(this.projects.value, "projects", "", this.mainControl).subscribe(() => {
        this.getData()
        this.mainControl = "showData";
      })
    } else {
      this.projects.patchValue({
        id: this.globalObject.id
      })
    }
  }
  //---------------------------------------------

  // -------- find item for Edit or Delete --------
  findItem(item: any) {
    this.globalObject = item
    this.dataServ.getdata("projects").subscribe((data): any => {
      for (const key in data) {
        if (item.id == data[key].id) {
          this.globalKey = key;
          break;
        }
      }
    })
  }
  //---------------------------------------------

  // --------- to impelement the deletion ---------
  deleteTheItem() {
    this.dataServ.delete("projects", this.globalKey).subscribe(() => {
      this.getData()
      this.mainControl = "showData";
    })

  }
  //---------------------------------------------


}
