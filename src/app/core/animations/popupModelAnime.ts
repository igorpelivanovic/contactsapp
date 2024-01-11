import { animate, group, query, style, transition, trigger } from "@angular/animations";

export const popupModelAnime = trigger('popupModelAnime', [
    transition(':enter', [
        style({
            opacity: 0,
        }),
        query('.popup-container', [
            style({
                translate: '0 20px',
            })]),
        group([
            query('.popup-container', [
                animate(300, style({
                    translate: '0 0px'
                }))
            ]),
            animate(300, style({
                opacity: 1,
            }))
        ])
        
        
    ])
])