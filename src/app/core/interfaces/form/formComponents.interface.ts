import { FormGroup } from "@angular/forms";
import { ArrayContolNumberElementInterface, ArrayContolStringElementInterface, ArrayControlBooleanElementInterface, ArrayControlGroupElmentInterface, ArrayControlMailElementInterface, ArrayControlPhoneElementInterface, ArrayControlSelectElementInterface, ArrayFormElelmentInterface,  GroupContolNumberElementInterface, GroupContolStringElementInterface, GroupControlBooleanElementInterface, GroupControlGroupElementInterface, GroupControlMailElementInterface, GroupControlPhoneElementInterface, GroupControlSelectElementInterface } from "./formControls.interface";
import { FormElementType, FormNonPrimitiveElementType } from "./formContent";

export interface FormComponentRef {
    type: FormElementType
    component: any
}


/// Form Component Base

export interface FormComponentBaseInterface {
    elementSelector: string
    parentType: FormNonPrimitiveElementType
    parentGroup: FormGroup
    value?: unknown 
}


/// Form Component Group Base

interface FormComponentGroupParentBaseInterface extends FormComponentBaseInterface {
    parentType: "group"
}


/// Form Component Array Base

interface FormComponentArrayParentBaseInterface extends FormComponentBaseInterface {
    parentType: "array"
    parentName: string
}


/// Form Component Text

interface FormComponentGroupStringIntreface extends GroupContolStringElementInterface, FormComponentGroupParentBaseInterface {}
export interface FormComponentArrayStringIntreface extends ArrayContolStringElementInterface, FormComponentArrayParentBaseInterface {}


/// Form Component Number

interface FormComponentGroupNumberIntreface extends GroupContolNumberElementInterface, FormComponentGroupParentBaseInterface {}
export interface FormComponentArrayNumberIntreface extends ArrayContolNumberElementInterface, FormComponentArrayParentBaseInterface {}


/// Form Component Telephone

export interface FormComponentGroupPhoneIntreface extends GroupControlPhoneElementInterface, FormComponentGroupParentBaseInterface {}
export interface FormComponentArrayPhoneIntreface extends ArrayControlPhoneElementInterface, FormComponentArrayParentBaseInterface {}


/// Form Component Mail

interface FormComponentGroupMailIntreface extends GroupControlMailElementInterface, FormComponentGroupParentBaseInterface {}
export interface FormComponentArrayMailIntreface extends ArrayControlMailElementInterface, FormComponentArrayParentBaseInterface {}


/// Form Component Boolean

interface FormComponentGroupBooleanIntreface extends GroupControlBooleanElementInterface, FormComponentGroupParentBaseInterface {}
export interface FormComponentArrayBooleanIntreface extends ArrayControlBooleanElementInterface, FormComponentArrayParentBaseInterface {}


/// Form Component Select

interface FormComponentGroupSelectIntreface extends GroupControlSelectElementInterface, FormComponentGroupParentBaseInterface {}
export interface FormComponentArraySelectIntreface extends ArrayControlSelectElementInterface, FormComponentArrayParentBaseInterface {}


/// Form Component Group

export interface FormComponentGroupGroupInterface extends FormComponentGroupParentBaseInterface, GroupControlGroupElementInterface {}
export interface FormComponentGroupArrayInterface extends FormComponentArrayParentBaseInterface, ArrayControlGroupElmentInterface {}


/// Form Component Array

export interface FormComponentArrayGroupInterface extends FormComponentGroupParentBaseInterface, ArrayFormElelmentInterface {}


/// Type Component Parent

export type PrimitiveComponentGroupParent = FormComponentGroupStringIntreface | FormComponentGroupNumberIntreface | FormComponentGroupSelectIntreface | FormComponentGroupPhoneIntreface | FormComponentGroupMailIntreface | FormComponentGroupBooleanIntreface
export type PrimitiveComponentArrayParent = FormComponentArrayStringIntreface | FormComponentArrayNumberIntreface | FormComponentArraySelectIntreface | FormComponentArrayPhoneIntreface | FormComponentArrayMailIntreface | FormComponentArrayBooleanIntreface

export type PrimitiveComponent = PrimitiveComponentGroupParent | PrimitiveComponentArrayParent

export type ComponetGroupParentType = PrimitiveComponentGroupParent | FormComponentGroupGroupInterface | FormComponentArrayGroupInterface
export type ComponetArrayParentType = FormComponentArrayStringIntreface | FormComponentArrayNumberIntreface | FormComponentArraySelectIntreface | FormComponentArrayPhoneIntreface | FormComponentArrayMailIntreface | FormComponentArrayBooleanIntreface | FormComponentGroupArrayInterface


/// Type Form Components

export type FormComponentType = ComponetGroupParentType | ComponetArrayParentType

