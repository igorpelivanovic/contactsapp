import { SelectFieldOption } from "../../../../../projects/form/src/lib/interfaces/formContent";

export const SelectOptions = new Map<string, SelectFieldOption[]>([
    ['phones', [
        { label: "home", value: "home" },
        { label: "mobile", value: "mobile" },
        { label: "work", value: "work" },
        { label: "other", value: "other" }
    ]],
    ['mails', [
        {label: "home", value: "home"},
        {label: "work", value: "work"},
        {label: "other", value: "other"},
    ]],
    ['socials', [
        { label: "instagram", value: "instagram" },
        { label: "twitter", value: "twitter" },
        { label: "facebook", value: "facebook" },
        { label: "threads", value: "threads" },
        { label: "other", value: "other" }
    ]],
])