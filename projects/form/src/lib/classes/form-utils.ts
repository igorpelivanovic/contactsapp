import { FormGroup } from "@angular/forms";
import { ArrayControlsType, GroupControlsType } from "../interfaces/formControls.interface";
import { ComponetArrayParentType, ComponetGroupParentType } from "../interfaces/formComponents.interface";

export class FormUtilities{
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