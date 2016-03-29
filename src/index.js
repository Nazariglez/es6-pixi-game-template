import plugins from './plugins';
import config  from './config';
import PIXI from 'pixi.js';
import Game from './Game';

let game = new Game(config);
game.initialize();
