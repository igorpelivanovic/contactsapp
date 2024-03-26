export type ContactFormDataContentType = Record<'type' | 'value', string>

export interface ContactFormDataInterface {
    name: string,
    phones: ContactFormDataContentType[]
    mails: ContactFormDataContentType[]
    socials: ContactFormDataContentType[]
}

export interface ContactFormContentInterface extends ContactFormDataInterface{
    iconColor: number
}

export interface ContactInterface extends ContactFormContentInterface {
    id: number,
}

export interface GroupContactsInterface {
    key: string,
    values: ContactInterface[]
}