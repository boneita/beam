import { SET_CURRENT_SLIDE } from '../actions/slides';

export default function slidesReducer(currnetSlide = {}, action) {
  switch (action.type) {

    case SET_CURRENT_SLIDE:
      return {
        ...window.store.getState().slides[action.index]
      };

    default:
      return currnetSlide;
  }
}
