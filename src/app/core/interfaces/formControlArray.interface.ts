import { ValidatorFn } from "@angular/forms";

export interface FormControlArray {
    name: string,
    value: string | boolean | number | null | any[],
    validation?: ValidatorFn[]
}