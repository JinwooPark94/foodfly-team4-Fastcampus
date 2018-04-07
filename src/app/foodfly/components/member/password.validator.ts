import { AbstractControl } from '@angular/forms';

export class PasswordValidator {

  static match(form: AbstractControl) {
    const password = form.get('userpassword').value;
    const confirmPassword = form.get('userconfirmPassword').value;

    if (password !== confirmPassword) {
      return { match: { password, confirmPassword } };
    } else {
      return null;
    }
  }
}
