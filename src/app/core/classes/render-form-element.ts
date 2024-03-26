import { ComponentRef, ViewContainerRef } from "@angular/core";
import { FormArrayComponent } from "../../components/form/form-array/form-array.component";
import { FormGroupComponent } from "../../components/form/form-group/form-group.component";
import { FormFieldNumberComponent } from "../../components/form/form-field/form-field-input/form-field-number.component";
import { FormFieldSelectComponent } from "../../components/form/form-field/form-field-select/form-field-select.component";
import { FormFieldTextComponent } from "../../components/form/form-field/form-field-input/form-field-text.component";
import { FormComponentRef, FormComponentType } from "../interfaces/form/formComponents.interface";

export class RenderFormElement {

    private formComponentsRefs : FormComponentRef[] = [
        {
            type: 'text',
            component: FormFieldTextComponent,
        },
        {
            type: 'tel',
            component: FormFieldTextComponent,
        },
        {
            type: 'number',
            component: FormFieldNumberComponent
        },
        {
            type: 'select',
            component: FormFieldSelectComponent
        },
        {
            type: 'group',
            component: FormGroupComponent,
        },
        {
            type: 'array',
            component: FormArrayComponent,
        }
    ]

    private _componentRef: any
    private _viewContainer: ViewContainerRef
    private componentConfigData: FormComponentType
    private _component!: ComponentRef<any>
    private defComponent = FormFieldTextComponent

    constructor(viewContainer: ViewContainerRef, componentConfigData: FormComponentType){
        this._viewContainer = viewContainer
        this.componentConfigData = componentConfigData
    }

    get generateComponent(): ComponentRef<any>{
        this.getComponentRef()
        this.renderComponent()
        this.initInputParams()
        return this._component
    }

    private getComponentRef(): void{
        this._componentRef = this.formComponentsRefs.find(el=>el.type === this.componentConfigData.type)?.component || this.defComponent 
    }

    private renderComponent(): void{
        this._component = this._viewContainer.createComponent(this._componentRef)
    }

    private initInputParams(): void{
        this._component.setInput('componentConfig', this.componentConfigData)
   }

}
