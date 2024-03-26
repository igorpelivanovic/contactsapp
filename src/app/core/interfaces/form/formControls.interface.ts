import { ValidatorFn } from "@angular/forms"
import { DynamicObject } from "../model.interface"
import { FormContentType, FormElementType, FormPrimitiveElementType } from "./formContent"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"


export interface FormControlBaseInterface {
    type: FormElementType
    label?: string
    validation?: ValidatorFn[],
    icon?: string | IconDefinition 
}

export interface GroupControlElementBaseInterface{
    name: string,
}

interface PrimitiveElementBaseInterface<K extends FormPrimitiveElementType> extends FormControlBaseInterface {
    type: K
    defaultValue?: FormContentType[K] | undefined
}   

/// FieldsFormElements

// String

interface StringFormElementBaseInterface extends PrimitiveElementBaseInterface<'text'>{}

export interface GroupContolStringElementInterface extends GroupControlElementBaseInterface, StringFormElementBaseInterface {}
export interface ArrayContolStringElementInterface extends StringFormElementBaseInterface {}


// Number

interface NumberFormElementBaseInterface extends PrimitiveElementBaseInterface<'number'> {}

export interface GroupContolNumberElementInterface extends GroupControlElementBaseInterface, NumberFormElementBaseInterface {}
export interface ArrayContolNumberElementInterface extends NumberFormElementBaseInterface {}


// Telephone

interface PhoneFormElementBaseInterface extends PrimitiveElementBaseInterface<'tel'> {}

export interface GroupControlPhoneElementInterface extends GroupControlElementBaseInterface, PhoneFormElementBaseInterface {}
export interface ArrayControlPhoneElementInterface extends PhoneFormElementBaseInterface {}


// Maill

interface MailFormElementBaseInterface extends PrimitiveElementBaseInterface<'email'> {}

export interface GroupControlMailElementInterface extends GroupControlElementBaseInterface, MailFormElementBaseInterface {}
export interface ArrayControlMailElementInterface extends MailFormElementBaseInterface {}

// Boolean

interface BooleanFormElementBaseInterface extends PrimitiveElementBaseInterface<'boolean'> {}

export interface GroupControlBooleanElementInterface extends GroupControlElementBaseInterface, BooleanFormElementBaseInterface {}
export interface ArrayControlBooleanElementInterface extends BooleanFormElementBaseInterface {}


// Select

interface SelectFormElementOptions {
    label: string,
    value: string
}

export interface SelectFormElementBaseInterface extends PrimitiveElementBaseInterface<'select'> {
    options: SelectFormElementOptions[]
}

export interface GroupControlSelectElementInterface extends GroupControlElementBaseInterface, SelectFormElementBaseInterface {}
export interface ArrayControlSelectElementInterface extends SelectFormElementBaseInterface {}

// TypeOfControl

type GroupControlsFieldsType = GroupContolStringElementInterface | GroupContolNumberElementInterface | GroupControlBooleanElementInterface | GroupControlPhoneElementInterface | GroupControlSelectElementInterface | GroupControlMailElementInterface 
type ArrayControlsFieldsType = ArrayContolStringElementInterface | ArrayContolNumberElementInterface | ArrayControlBooleanElementInterface | ArrayControlPhoneElementInterface | ArrayControlSelectElementInterface | ArrayControlMailElementInterface

/// GroupFormELement

export type GroupControlsType = GroupControlsFieldsType | GroupControlGroupElementInterface | ArrayFormElelmentInterface

interface GorupFormElmementBaseInterface extends FormControlBaseInterface {
    type: 'group'
    controls: [...GroupControlsType[]]
}

export interface GroupControlGroupElementInterface extends GroupControlElementBaseInterface, GorupFormElmementBaseInterface {}
export interface ArrayControlGroupElmentInterface extends GorupFormElmementBaseInterface {}

/// ArrayFormELement

export type ArrayControlsType = ArrayControlsFieldsType | ArrayControlGroupElmentInterface

export interface ArrayFormElelmentInterface extends FormControlBaseInterface, GroupControlElementBaseInterface{
    type: 'array',
    controls: ArrayControlsType
}

/// Form Config

export type FormConfigControls = [...GroupControlsType[]]

export type FormControls = ArrayControlsType | GroupControlsType

export interface FormInitData {
    data?: DynamicObject<any>
    controls: FormConfigControls
}


