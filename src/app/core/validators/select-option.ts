import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { SelectFieldOption } from "../../../../projects/form/src/lib/interfaces/formContent";

export function selectOptionValidation(options:  SelectFieldOption[]): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
        let index = options.findIndex(opt=>opt.value === control.value)
        return index >= 0 ? null : {inValidOption: true} 
    }
}