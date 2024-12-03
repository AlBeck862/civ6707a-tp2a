// import {Deck} from './node_modules/@deck.gl/core/dist/index.js';
// import {PathLayer} from './node_modules/@deck.gl/layers/dist/index.js';

import {Deck} from '@deck.gl/core';
import {PathLayer} from '@deck.gl/layers';

const layer = new PathLayer({
  id: 'PathLayer',
  data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-lines.json',

  getColor: d => {
    const hex = d.color;
    // convert to RGB
    return hex.match(/[0-9a-f]{2}/g).map(x => parseInt(x, 16));
  },
  getPath: d => d.path,
  getWidth: 100,
  pickable: true
});

new Deck({
  initialViewState: {
    longitude: -122.4,
    latitude: 37.74,
    zoom: 11
  },
  controller: true,
  getTooltip: ({object}) => object && object.name,
  layers: [layer]
});