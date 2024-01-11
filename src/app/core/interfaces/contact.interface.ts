

interface ContactData {
    type: string,
    value: string
}

export interface FormContactData{
    name: string, 
    numbers: ContactData[],
    mails: ContactData[],
    socials: ContactData[]
}

export interface Contact extends FormContactData {
    id: number,
    iconColor: number
}