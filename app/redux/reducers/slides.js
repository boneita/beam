import { SELECT_SLIDE } from '../actions/slides';

export default function slidesReducer(slides = {}, action) {
  switch (action.type) {

    case SELECT_SLIDE:
      return slides.map((slide, index) => {
        const active = index === action.index;
        return Object.assign({}, slide, { active });
      });

    default:
      return slides;
  }
}
