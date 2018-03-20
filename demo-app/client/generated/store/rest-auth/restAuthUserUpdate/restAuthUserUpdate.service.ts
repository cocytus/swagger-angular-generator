/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestAuthService} from '../../../controllers/RestAuth';

@Injectable()
export class RestAuthUserUpdateFormService {
  restAuthForm: FormGroup;
  constructor(
    private restAuthService: RestAuthService,
  ) {
    this.restAuthForm = new FormGroup({
      data: new FormGroup({
        pk: new FormControl(undefined, []),
        username: new FormControl(undefined, [Validators.maxLength(150), Validators.pattern('^[\w.@+-]+$), Validators.required]),
        email: new FormControl(undefined, [Validators.email]),
        first_name: new FormControl(undefined, [Validators.maxLength(30)]),
        last_name: new FormControl(undefined, [Validators.maxLength(150)]),
      }, [Validators.required]),
    });
  }

  restAuth() {
    this.restAuthService.restAuthUserUpdate(this.restAuthForm.value);
  }
}
