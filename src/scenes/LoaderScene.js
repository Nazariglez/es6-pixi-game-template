import PIXI from 'pixi.js';

let hd = window.devicePixelRatio === 2 ? "@2x" : "";

export default class LoaderScene extends PIXI.Scene{
  name = "loaderScene";
  barWidth = 300;
  barHeight = 16;
  vel = 20; //Progress added per second

  resources = [

  ];

  constructor(){
    super();
    this.loader = PIXI.loader;
    this.loader.add(this.resources);
    this.isStarted = false;
    this.allLoaded = false;
    this.progress = 5;
    this._onLoadCallback = function(){};

    //loadBar
    this.loadBar = new PIXI.Graphics();
    this.drawBar(0.2);
    this.addChild(this.loadBar);
  }

  update(delta){
    super.update(delta);
    if(!this.isStarted)return;

    if(this.progress < this.loader.progress || !this.resources.length){
      this.progress += this.vel*delta;
    }

    if(this.progress >= 100 && !this.allLoaded){
      this.allLoaded = true;
      this._onLoadCallback();
    }else{
      this.drawBar(this.progress);
    }
  }

  drawBar(progress){
    if(progress > 100)progress = 100;
    this.loadBar.clear();
    this.loadBar.beginFill(0xc0c0c0, 0.5);
    this.loadBar.drawRect(-(this.barWidth/2), -(this.barHeight/2), this.barWidth, this.barHeight);
    this.loadBar.endFill();

    if(progress){
      let calc = (progress*this.barWidth)/100;
      this.loadBar.beginFill(0x00f0ff, 0.5);
      this.loadBar.drawRect(-(this.barWidth/2), -(this.barHeight/2), calc, this.barHeight);
      this.loadBar.endFill();
    }

    this.loadBar.lineStyle(2, 0x000000, 1);
    this.loadBar.drawRect(-(this.barWidth/2), -(this.barHeight/2), this.barWidth, this.barHeight);
  }

  load(callback){
    this.isStarted = true;
    if(callback)this._onLoadCallback = callback;
    this.loader.load();
  }
}