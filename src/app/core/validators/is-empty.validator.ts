import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function isEmptyValidator(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string
    if(value.trim().length == 0) return { 'isEmpty': true}
    return null
  }
}