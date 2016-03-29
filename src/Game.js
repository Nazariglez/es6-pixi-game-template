import PIXI from 'pixi.js';
import LoaderScene from './scenes/LoaderScene';
import GameScene from './scenes/GameScene';

export default class Game {
  constructor(config){
    const Renderer = (config.webgl) ? PIXI.autoDetectRenderer : PIXI.CanvasRenderer;
    this.renderer = new Renderer(config.width || 800, config.height || 600, config.rendererOptions);
    document.body.appendChild(this.renderer.view);

    this.animationLoop = new PIXI.AnimationLoop(this.renderer, new PIXI.SceneManager(this.renderer));
    this.animationLoop.stopOnVisibilityChange = true;
    this.animationLoop.on('prerender', this.update.bind(this));
    this.animationLoop.on('postrender', this._updateManagers.bind(this));
  }

  initialize(){
    this.stage.fixedWidth = 600;
    this.stage.fixedHeight = 800;

    let gameScene = new GameScene();
    this.stage.addScene(gameScene);

    let loaderScene = new LoaderScene();
    loaderScene.load(()=>this.stage.goTo('gameScene'));
    this.stage.addScene(loaderScene);
    this.stage.scene = loaderScene;

    this.start();
  }

  update(){
    if(this.stage.update)this.stage.update(this.animationLoop.delta);
  }

  _updateManagers(){
    PIXI.keyboard.update(this.animationLoop.delta);
    PIXI.tweenManager.update(this.animationLoop.delta);
    PIXI.timerManager.update(this.animationLoop.delta);
  }

  start(){
    this.animationLoop.start();
  }

  stop(){
    this.animationLoop.stop();
  }

  get stage(){
    return this.animationLoop.stage;
  }

  set stage(stage){
    this.animationLoop.stage = stage;
  }
}