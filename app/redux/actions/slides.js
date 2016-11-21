export const SELECT_SLIDE = 'SELECT_SLIDE';
export const SET_CURRENT_SLIDE = 'SET_CURRENT_SLIDE';

export function selectSlide(index) {
  window.store.dispatch(setCurrentSlide(index));
  return { type: SELECT_SLIDE, index };
}

export function setCurrentSlide(index) {
  return { type: SET_CURRENT_SLIDE, index };
}
