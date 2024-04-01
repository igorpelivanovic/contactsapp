import { Validators } from "@angular/forms";
import { FormConfigControls } from "../../../../../projects/form/src/lib/interfaces/formControls.interface";
import { isEmptyValidator } from "../../validators/is-empty.validator";
import { selectOptionValidation } from "../../validators/select-option";
import { SelectOptions } from "./optionsOfTypeData";
import { DataIcon } from "./icons";

export const CONTACT_FORM_CONGIF : FormConfigControls = [
    {
      type: 'text',
      name: 'name',
      validation: [
        Validators.required,
        isEmptyValidator()
    ],
      label: "name",
      icon: DataIcon.get('name')
    },
    {
      label: 'number',
      type: 'array',
      name: 'phones',
      icon: DataIcon.get('phones'),
      validation: [],
      controls: {
        type: 'group',
        controls: [
          {
            type: 'tel',
            label: 'number',
            name: 'value',
            validation: [Validators.required, isEmptyValidator(), Validators.minLength(6), Validators.maxLength(14), Validators.pattern("^((\\+91-?)|0)?[0-9]{6,14}$")],
          },
          {
            type: 'select',
            label: 'option',
            name: 'type',
            options: SelectOptions.get('phones') || [],
            validation: [Validators.required, selectOptionValidation(SelectOptions.get('phones') || [])]
          }
        ]
      }
    },
    {
      label: 'mail',
      type: 'array',
      name: 'mails',
      validation: [],
      icon: DataIcon.get('mails'),
      controls: {
        type: 'group',
        controls: [
          {
            type: 'email',
            name: 'value',
            label: 'mail',
            validation: [Validators.required, isEmptyValidator(), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
          },
          {
            type: 'select',
            name: 'type',
            label: 'option',
            options: SelectOptions.get('mails') || [],
            validation: [Validators.required, selectOptionValidation(SelectOptions.get('mails') || [])]
          }
        ]
      }
    },
    {
      label: 'social account',
      type: 'array',
      name: 'socials',
      icon: DataIcon.get('socials'),
      validation: [],
      controls: {
        type: 'group',
        controls: [
          {
            type: 'text',
            label: 'username',
            name: 'value',
            validation: [Validators.required, isEmptyValidator()],
          },
          {
            type: 'select',
            label: 'option',
            name: 'type',
            options: SelectOptions.get('socials') || [],
            validation: [Validators.required, selectOptionValidation(SelectOptions.get('socials') || [])]
          }
        ]
      }
    }
  ]