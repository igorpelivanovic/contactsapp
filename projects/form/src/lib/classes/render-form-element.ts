import { ComponentRef, ViewContainerRef } from "@angular/core";
import { FormComponentRef, FormComponentType } from "../interfaces/formComponents.interface";
import { FORM_COMPONENT_REF, FORM_COMPONENT_REF_DEF } from "../data/formComponentsRef";

export class RenderFormElement {

    private formComponentsRefs : FormComponentRef[] = FORM_COMPONENT_REF

    private _componentRef: any
    private _viewContainer: ViewContainerRef
    private componentConfigData: FormComponentType
    private _component!: ComponentRef<any>
    private defComponent = FORM_COMPONENT_REF_DEF

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
