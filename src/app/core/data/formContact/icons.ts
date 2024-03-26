import { IconDefinition, faEnvelope, faGlobe, faNotdef, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";

export const DataIcon : Map<string, IconDefinition> = new Map([
    ['default', faNotdef],
    ['name', faUser],
    ['phones', faPhone],
    ['mails', faEnvelope],
    ['socials', faGlobe],
])

