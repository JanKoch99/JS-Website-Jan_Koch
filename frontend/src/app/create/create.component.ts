import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiserviceService} from "../apiservice.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service:ApiserviceService, private router:ActivatedRoute) { }

  errormsg: any
  successmsg: any
  getParamId: any

  ngOnInit(): void {
    this.getParamId = this.router.snapshot.paramMap.get('id')
    if (this.getParamId) {
      this.getSingleUser()
    }
  }

  userForm = new FormGroup({
    'fullname':new FormControl('', Validators.required),
    'email':new FormControl('', Validators.required),
    'mobile':new FormControl('', Validators.required)


  })

  userSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value)
      this.service.createData(this.userForm.value).subscribe((res)=> {
        console.log(res, 'res==>')
        this.userForm.reset()
        this.successmsg = res.message
      })
    } else {
      this.errormsg = 'all fields are required'
    }
  }

  userUpdate() {
    if (this.userForm.valid) {
      this.service.updateData(this.userForm.value, this.getParamId).subscribe((res)=> {
        this.successmsg = res.message
      })
    } else {
      this.errormsg = 'all fields are required'
    }
  }

  getSingleUser() {
    this.service.getSingleData(this.getParamId).subscribe((res) => {
      this.userForm.patchValue({
        fullname: res.data[0].fullname,
        email: res.data[0].email,
        mobile: res.data[0].mobile
      })
    })
  }
}
