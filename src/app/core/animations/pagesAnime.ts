import { animate, query, style, transition, trigger } from "@angular/animations";

export const pagesAnime = trigger('pagesAnime', [
    transition('add => home', [
        query(':leave', [
            style({
                position: 'absolute',
                zIndex: 1,
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                translate: "0% 0",
                boxShadow: "-3px 0 8px -4px black"
            }),
        ]),
        query(':leave', [
            animate("300ms ease-in-out", style({
                translate: "100% 0",
                boxShadow: "-3px 0 8px -4px black"
            }))
        ])
    ]),
    transition('home => add', [
        query(':enter', [
            style({
                position: 'absolute',
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                translate: "100% 0",
                boxShadow: "-3px 0 8px -4px black"
            }),
        ]),
        query(':enter, :leave', [
            animate("300ms ease-in-out", style({
                translate: "0% 0",
                boxShadow: "-3px 0 8px -4px black"
            }))
        ])
    ]),
    
])