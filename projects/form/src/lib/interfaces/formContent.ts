export type FormContentType = {
    text: string,
    number: number,
    select: string | number,
    tel: string,
    email: string
}

export type FormPrimitiveElementType = keyof FormContentType

export type FormNonPrimitiveElementType = 'group' | 'array'

export type FormElementType = FormPrimitiveElementType | FormNonPrimitiveElementType

export type SelectFieldOption = Record<'label' | 'value', string>
