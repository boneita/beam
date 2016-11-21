import riot from 'riot';
import Vibrant from 'node-vibrant';
import verseTemplate from '../base/SlideView.jade';

const textStyle = {
  color: 'red',
  // textShadow: '1px 1px 1px #222',
};

const ifTooDark = (color) => {
  const c = color.replace(/\#/ig, '');   // strip #
  const rgb = parseInt(c, 16);   // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff;  // extract red
  const g = (rgb >> 8) & 0xff;  // extract green
  const b = (rgb >> 0) & 0xff;  // extract blue

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

  if (luma === 0) {
    return true;
  }

  if (luma < 40) {
    // pick a different colour
    return false;
  }
  return true;
};

const getSlideStyle = ({ background }) => {
  let lastNum = 0;
  let dominantSwatch = null;

  let style = {
    text: {
      title: 'color: #aaa',
      body: 'background-color: #222',
    },
    background: `
      background-color: #622;
      color: white;
    `
  };

  if (background !== undefined) {
    style.background = `
      /*url(${background})*/
      #444
    `;
    return style;

    const vibrant = new Vibrant.from(background);

    vibrant.getPalette((err, swatches)=> {
      if (swatches == undefined) {
        return;
      }

      for (const swatch in swatches) {
        if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
          const _swatch = swatches[swatch];
          if (_swatch.population > lastNum) {
            if (_swatch.population > lastNum) {
              lastNum = _swatch.population;
              dominantSwatch = _swatch;
            }
          }
        }
      }

      const titleTextColor = dominantSwatch.getTitleTextColor();
      const bodyTextColor = dominantSwatch.getBodyTextColor();
      const textShadow = '1px 1px 3px #111';

      style.text.title = Object.assign({}, this.textStyle.titleStyle, {
        color: titleTextColor,
        textShadow: ifTooDark(titleTextColor) ? 'none' : textShadow
      });

      style.text.body = {
        color: bodyTextColor,
        textShadow: ifTooDark(bodyTextColor) ? 'none' : textShadow
      };
    });
  }

  return style;
};

class BasePresenter extends riot.Tag {
  constructor({ el, template }) {
    super(
      { tmpl: template ? template() : verseTemplate() },
      { root: el || document.getElementById('SlideViewContainer') }
    );

    this.on('mount', this.onMount);
    this.on('unmount', this.onUnMount);
    this.on('before-mount', this.onBeforeMount);

    if (el) {
      el.innerHTML = '';
    } else {
      document.getElementById('SlideViewContainer').innerHTML = '';
    }

    this.unsubscribe = window.store.subscribe(this.onStateChanged.bind(this));
  }

  onStateChanged() {
    const state = window.store.getState();

    this.slide = state.currentSlide;
    this.command = state.command;
    this.style = getSlideStyle(this.slide);
    this.backgroundStyle = JSON.stringify(this.style.background);
    this.update();

    console.log('this.backgroundStyle:%o', this.backgroundStyle);
  }

  onUnMount() {
    this.unsubscribe();
  }
}

module.exports = BasePresenter;
