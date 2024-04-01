import { animate, style, transition, trigger } from "@angular/animations";

export const libSelectOptContainerAnime = trigger("selectOptsAnime", [
    transition(':enter', [
        style({
            maxHeight: "0px",
            opacity: 0
        }),
        animate(200, style({
            maxHeight: "100px",
            opacity: 1
        }))
    ])
])