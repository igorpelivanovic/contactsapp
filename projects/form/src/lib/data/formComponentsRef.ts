import { LibFormArrayComponent } from "../components/form-array/form-array.component";
import { LibFormFieldInputComponent } from "../components/form-field/form-field-input/form-field-input.component";
import { LibFormFieldSelectComponent } from "../components/form-field/form-field-select/form-field-select.component";
import { LibFormGroupComponent } from "../components/form-group/form-group.component";
import { FormComponentRef } from "../interfaces/formComponents.interface";

export const FORM_COMPONENT_REF : FormComponentRef[] = [
    {
        type: 'text',
        component: LibFormFieldInputComponent,
    },
    {
        type: 'tel',
        component: LibFormFieldInputComponent,
    },
    {
        type: 'number',
        component: LibFormFieldInputComponent
    },
    {
        type: 'select',
        component: LibFormFieldSelectComponent
    },
    {
        type: 'group',
        component: LibFormGroupComponent,
    },
    {
        type: 'array',
        component: LibFormArrayComponent,
    }
]
export const FORM_COMPONENT_REF_DEF = LibFormFieldInputComponent
