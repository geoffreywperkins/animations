import { animationType } from "./globalTypes";
import ParticleAnimator from "./animations/particles/ParticleAnimator";
import FlipAnimator from "./animations/flip/FlipAnimator";
import { Animator } from "./animations/Animator";

const DEFAULT_ANIMATION: animationType = 'flip'

const ANIMATION_TYPE_TO_ANIMATOR_CLASS: {[ANIMATION_TYPE in animationType]: typeof Animator} = {
  'particle': ParticleAnimator,
  'gameOfLife': ParticleAnimator,
  'flip': FlipAnimator,
}

const ANIMATION_TYPE_TO_DISPLAY_NAME: {[ANIMATION_TYPE in animationType]: string} = {
  'particle': 'Particle',
  'gameOfLife': 'Game of Life',
  'flip': 'Flip'
}

export {
  DEFAULT_ANIMATION,
  ANIMATION_TYPE_TO_ANIMATOR_CLASS,
  ANIMATION_TYPE_TO_DISPLAY_NAME
}
