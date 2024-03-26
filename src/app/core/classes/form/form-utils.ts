import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { DataIcon } from "../../data/formContact/icons";
import { ArrayControlsType, GroupControlsType } from "../../interfaces/form/formControls.interface";
import { FormGroup } from "@angular/forms";
import { ComponetArrayParentType, ComponetGroupParentType } from "../../interfaces/form/formComponents.interface";

export class FormUtilities{
    public static initComponentIcon(param: string | IconDefinition): IconDefinition{
        if(typeof param === 'string'){
            return DataIcon.get(param) || DataIcon.get('default') as IconDefinition
          }
        return param as IconDefinition
    }
    public static initArrayParentComponentData(control: ArrayControlsType, parentGroup: FormGroup, parentSelector: string, elementSelector: string, value: unknown): ComponetArrayParentType{
        return {
            ...control,
            parentGroup: parentGroup,
            parentName: parentSelector,
            parentType: 'array',
            elementSelector: elementSelector,
            value: value
        }
    }
    public static initGroupParentComponentData(control: GroupControlsType, parentGroup: FormGroup, elementSelector: string, value: unknown): ComponetGroupParentType {
        return {
            ...control,
            parentGroup: parentGroup,
            parentType: 'group',
            elementSelector: elementSelector,
            value: value
        }
    }
}