/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LogoutService} from '../../controllers/Logout';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
})

export class LogoutComponent implements OnInit {
  LogoutForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private logoutService: LogoutService,
  ) {}

  ngOnInit() {
    this.LogoutForm = this.formBuilder.group({
    }, {updateOn: 'change'});
  }

  logout() {
    this.logoutService.logout(this.LogoutForm.value);
  }

}