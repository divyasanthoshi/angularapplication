import { Constant } from '../../_shared/constant';
import { FormState } from './security-login.enum';
import { trigger, transition, style, query, group, animateChild, animate, keyframes, state, sequence, } from '@angular/animations';



export const btnShrink = trigger('submitLogin', [
  state(FormState.OnHold, style({
  })),

  state(FormState.Submitting, style({
    width: '50px'
  })),
  state(FormState.Submitted, style({
    opacity: '0'
  })),
  transition(`${FormState.OnHold} <=> ${FormState.Submitting}`, [
    animate(`0.5s ${Constant.animation.easeInCubic}`)
  ]),
]);

export const routeFullscreen = trigger('loginRoute', [
    state(FormState.Submitting, style({
    }), {params: {left: 0, top: 0, radius: 0}}),
    state(FormState.Submitted, style({
      height: '100%',
      width: '100%',
      borderRadius: '0',
      top: '0',
      left: '0'
    })),
    state(FormState.OnHold, style({
      opacity: '0'
    })),
    // use scale for the first sequence for the purpose of center align
    transition(`${FormState.Submitting} => ${FormState.Submitted}`, [
      sequence([
        animate(`0.6s ${Constant.animation.easInQuint}`, style({
          top : '{{top}}px',
          left : '{{left}}px',
          height: '{{radius}}px',
          width: '{{radius}}px',
        })),
        animate(`0.1s ${Constant.animation.easeOutQuint}`, style({
          height: '100%',
          width: '100%',
          top: 0,
          left: 0,
          borderRadius: 0,
        })),
     ])
    ]),
    transition(`${FormState.Submitted} => ${FormState.OnHold}`, [
      animate(`1s ${Constant.animation.easInQuint}`, style({
        opacity: '0'
      })),
    ])
]);




