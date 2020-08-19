import { trigger, transition, style, query, group, animate, stagger, keyframes } from '@angular/animations';

//  routeAnimations used for routed components in Application module
export const routeAnimations = trigger('routeAnimations',
  // tslint:disable-next-line:max-line-length
  [transition('ProviderprofileContainer => ApplicationOwnershipContainer, ProviderprofileContainer => ServicesContainer,ProviderprofileContainer => ServicesContainer, ApplicationOwnershipContainer => OwnershipPersonnelprofileContainer, ApplicationOwnershipContainer => PeopleContainer, SummaryContainer => CertifyContainer',
  [style({ height: '!' }),
  query(':enter', style({ transform: 'translateX(100%)' })),
  query(':enter ,:leave', style({ position: 'Absolute', top: 0, left: 0, right: 0 })),
  group([
    query(':leave', [animate('0.3s cubic-bezier(.35 ,0,.25, 1)', style({ transform: 'translate(-100%)' }))]),
    query(':enter', [animate('0.3s cubic-bezier(.35 ,0,.25, 1)', style({ transform: 'translate(0)' }))])])]),
// tslint:disable-next-line:max-line-length
transition('SubmittedContainer => SubmitContainer,SubmitContainer => CertifyContainer,SummaryContainer => PeopleContainer ,PeopleContainer => ApplicationOwnershipContainer, ApplicationOwnershipContainer=> ProviderprofileContainer, ServicesContainer => ProviderprofileContainer',
  [style({ height: '!' }),
  query(':enter', style({ transform: 'translateX(-100%)' })),
  query(':enter ,:leave', style({ position: 'Absolute', top: 0, left: 0, right: 0 })),
  group([
    query(':leave', [animate('0.3s cubic-bezier(.35 ,0,.25, 1)', style({ transform: 'translate(100%)' }))]),
    query(':enter', [animate('0.3s cubic-bezier(.35 ,0,.25, 1)', style({ transform: 'translate(0)' }))])])]),
]
);
// moveUpDownAnimation used for arrow in Submit page
export const moveUpDownAnimation = trigger('moveUpDownAnimation', [
    transition(':enter', [
      query('ion-icon', style({ transform: 'translateY(-50%)' })),
      query('ion-icon', stagger('250ms', [
        animate('8000ms 1000ms', keyframes([
          style({ transform: 'translateY(+50%)' }),
          style({ transform: 'translateY(-50%)' }),
          style({ transform: 'translateY(+50%)' }),
          style({ transform: 'translateY(-50%)' }),
          style({ transform: 'translateY(+50%)' }),
          style({ transform: 'translateY(-50%)' }),
        ]))
      ])),
    ])
  ]);

// the moveUpAnimation is used in the submit page
export const moveUpAnimation = trigger('moveUpAnimation', [
    transition(':enter', [
      query('ion-img', style({ transform: 'translateY(+150%)', opacity: 0 })),
      query('ion-img', stagger('3010ms', [
        animate('3000ms 10ms', keyframes([
          style({ transform: 'translateY(-350%)', opacity: 0.7 }),
        ]))
      ])),
    ])
  ]);
