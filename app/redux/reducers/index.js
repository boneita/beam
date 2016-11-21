import { combineReducers } from 'redux';
// import { routerReducer as routing } from 'react-router-redux';
import slides from './slides';
import command from './command';
import currentSlide from './currentSlide';

const rootReducer = combineReducers({
  // routing,
  slides,
  currentSlide,
  command
});

export default rootReducer;
