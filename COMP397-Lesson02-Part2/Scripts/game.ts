﻿/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />


// Game Framework Variables
var canvas = document.getElementById("canvas");
var stage: createjs.Stage;
var assets: createjs.LoadQueue;


// Game Variables
var helloLabel: createjs.Text; // create a reference
var pinkButton: createjs.Bitmap;


function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this);
    assets.loadManifest([
        { id: "pinkButton", src: "assets/images/pinkButton.png" },
        { id: "clicked", src: "assets/audio/clicked.wav" }
    ]);
}

function init() {
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60); // framerate for the game
    createjs.Ticker.on("tick", gameLoop);

    main();
}

// Our Main Game Loop - refreshed 60 fps
function gameLoop() {
    stage.update();
}

function pinkButtonClicked(event: createjs.MouseEvent) {
    createjs.Sound.play("clicked");
}

function pinkButtonOver() {
    pinkButton.alpha = 0.8;
}

function pinkButtonOut() {
    pinkButton.alpha = 1.0;
}

// Our Main Game Function
function main() {
    console.log("Game is Running");
    helloLabel = new createjs.Text("Hello World!", "40px Consolas", "#000000");
    helloLabel.regX = helloLabel.getMeasuredWidth() * 0.5;
    helloLabel.regY = helloLabel.getMeasuredHeight() * 0.5;
    helloLabel.x = 160;
    helloLabel.y = 190;
    stage.addChild(helloLabel);

    pinkButton = new createjs.Bitmap(assets.getResult("pinkButton"));
    pinkButton.regX = pinkButton.getBounds().width * 0.5;
    pinkButton.regY = pinkButton.getBounds().height * 0.5;
    pinkButton.x = 160;
    pinkButton.y = 270;
    stage.addChild(pinkButton);
    pinkButton.on("click", pinkButtonClicked);
    pinkButton.on("mouseover", pinkButtonOver);
    pinkButton.on("mouseout", pinkButtonOut);
}