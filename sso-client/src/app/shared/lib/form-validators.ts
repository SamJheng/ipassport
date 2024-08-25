import { AbstractControl, ValidatorFn } from "@angular/forms";


// password match Validator Function
export function passwordMatchValidator(controlName: string, confirmControlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.get(controlName);
    const confirmPassword = control.get(confirmControlName);

    if (!password || !confirmPassword) {
      return null; // Return null if controls are not yet initialized
    }

    return password.value === confirmPassword.value ? null : { 'mismatch': true };
  }
}
export function regexValidator(passwordRegex: RegExp, validName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!passwordRegex.test(value)) {
      return { [validName]: true };
    }
    return null;
  }
}



