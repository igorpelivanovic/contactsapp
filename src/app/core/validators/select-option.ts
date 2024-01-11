import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { SelectOption } from "../interfaces/selectOption.interface";

export function selectOptionValidation(options: SelectOption[]): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
        let index = options.findIndex(opt=>opt.value === control.value)
        return index >= 0 ? null : {inValidOption: true} 

    }
}