
import { trigger, transition, style, animate, state, keyframes, query, stagger, group } from '@angular/animations';
import { Constant } from 'src/app/_shared/constant';

// slideInOut Animations
export const slideInOut = trigger('slideInOut', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate(`${Constant.animation.pageTransitionTime}s ${Constant.animation.easeOutCubic}`, style({ transform: 'translateX(0)' })),
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0)' }),
    animate(`${Constant.animation.pageTransitionTime}s ${Constant.animation.easeOutCubic}`, style({ transform: 'translateX(-100%)' })),
  ])
]);

// fadeInOut Animations
export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(`${Constant.animation.pageTransitionTime}s ${Constant.animation.easeOutCubic}`, style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate(`${Constant.animation.pageTransitionTime}s ${Constant.animation.easeOutCubic}`, style({ opacity: 0 })),
  ])
]);

// fllyInLeft animations
export const flyInLeft = trigger('flyInLeft', [
  state('false', style({ opacity: 1 })),
  state('true', style({ opacity: 0 })),
  transition('true <=> false', animate(1000))
]);


// flyInLeftStaggerAnimations
export const flyInLeftStaggerAnimation = trigger('flyInLeftStaggerAnimation', [
  transition(':enter', [
    query('ion-img', style({ opacity: 0, transform: 'translateX(-100%)' })),
    query('ion-img', stagger('250ms', [
      animate('250ms 250ms', keyframes([
        style({ opacity: 0.7, transform: 'translateX(60%)', offset: 0.6 }),
        style({ opacity: 1, transform: 'translateX(0)', offset: 0.8 }),
      ]))
    ])),
  ])
]);
// flyUpAnimation
export const flyUpAnimation = trigger('flyUpAnimation', [
  transition(':enter', [
    query('p', style({ opacity: 0, transform: 'translateY(100%)', offset: 0 })),
    query('p', stagger('500ms', [
      animate('250ms 1.5s',
        style({ transform: 'translateY(0)', opacity: 1, offset: 0.4 }),
      )
    ])),
  ])
]);

export const flyUpwithDelayAnimation = trigger('flyUpwithDelayAnimation', [
  transition(':enter', [
    query('ion-button', style({ opacity: 0, transform: 'translateY(100%)', offset: 0 })),
    query('ion-button', stagger('250ms', [
      animate('250ms 1.8s',
        style({ transform: 'translateY(0)', opacity: 1, offset: 1 }),
      )
    ])),
  ])
]);

// fadeOut animation
export const fadeOut = trigger('fadeOut', [
  state('false', style({
    opacity: 1,
  })),
  state('true', style({
    opacity: 0,
  })),
  transition('false => true', animate('300ms')),
]);
