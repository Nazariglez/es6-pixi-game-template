import PIXI from 'pixi.js';

export default class GameScene extends PIXI.Scene{
  name = "gameScene";
  constructor(){
    super();
  }

  init(){
    let ww = this.manager.fixedWidth/2;
    let hh = this.manager.fixedHeight/2;

    this.background = new PIXI.Graphics()
      .beginFill(0x000000)
      .drawRect(-ww, -hh,this.manager.fixedWidth, this.manager.fixedHeight)
      .endFill();

    this.addChild(this.background);
  }
}