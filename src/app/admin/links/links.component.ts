import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent {
  // variables for control view and data 
  // uploadingImg:string="";
  mainControl: string = "add";
  // variables for data 
  projects = this.formBuilder.group({
    link: [""],
    description: [""],
    title: [""],
    id: [new Date().getTime()]
  })
  listArray: any[] = [];
  // item key in database
  globalKey: string = "";
  globalObject: any;

  constructor(private formBuilder: FormBuilder, private dataServ: AdminService) {
    dataServ.getdata("projects").subscribe(data => {
      for (const key in data) {
        this.listArray.push(data[key])
      }
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
      description: "",
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
      this.dataServ.create(this.projects.value, "projects", this.globalKey, this.mainControl).subscribe(() => {
        this.getData()
        this.mainControl = "showData";
      })
    }
  }
  //---------------------------------------------

  // -------- find item for Edit or Delete --------
  findItem(item: any) {
    this.globalObject = item;
    this.projects.patchValue({
      id: item.id,
      link: item.link,
      description: item.description,
      title: item.title,
    })
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
