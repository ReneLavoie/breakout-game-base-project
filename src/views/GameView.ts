import * as PIXI from "pixi.js";
import { GameApplication } from "../GameApplication";
import { BaseView } from './BaseView';
import { GameObject } from '../game/GameObject';
import { PaddleBehavior } from '../game/behavior/PaddleBehavior';
import { BallBehavior } from '../game/behavior/BallBehavior';
import { LevelFactory } from '../game/level/LevelFactory';
import { EventDispatcher } from "../EventDispatcher";
import { GameEvents } from '../GameEvents';

export class GameView extends BaseView {

    private gameObjects: Map<string, GameObject>;
    private levelFactory: LevelFactory;

    public show() {
        super.show();

        this.activate();
    }

    public hide() {
        super.hide();

        this.deactivate();
    }

    public getGameObjectById(id: string): GameObject | null | undefined {
        if (!this.gameObjects.has(id)) {
            console.warn("getGameObjectById() " + id + " does not exist");
            return null;
        }

        return this.gameObjects.get(id);
    }

    public registerGameObject(id: string, gameObj: GameObject) {
        gameObj.setId(id);
        this.gameObjects.set(id, gameObj);
        this.addChild(gameObj);
    }

    public unregisterGameObject(id: string) {
        const gameObject: GameObject = this.getGameObjectById(id);

        if (!gameObject) {
            console.warn("unregisterGameObject() " + id + " does not exist");
            return;
        }

        this.removeChild(gameObject);
        this.gameObjects.delete(id);
        gameObject.destroy();
    }

    protected init() {
        super.init();

        this.gameObjects = new Map<string, GameObject>();
        this.hide();
        this.createGameObjects();

        this.levelFactory = new LevelFactory(this);
    }

    private activate() {
        this.activateGameObjects();
        GameApplication.getApp().ticker.add(this.update, this);
    }

    private deactivate() {
        this.deactivateGameObjects();
        GameApplication.getApp().ticker.remove(this.update, this);
    }

    protected createBackground() {
        this.background = new PIXI.Graphics();
        this.background.beginFill(0x000000);
        this.background.lineStyle({ width: 2, color: 0xffffff });
        this.background.drawRect(0, 0, GameApplication.STAGE_WIDTH, GameApplication.STAGE_HEIGHT);
        this.background.endFill();

        this.addChild(this.background);
    }

    private createGameObjects() {
        this.createPaddle();
        this.createBall();
    }

    private createPaddle() {

    }

    private createBall() {

    }

    private activateGameObjects() {
        this.gameObjects.forEach((obj, id) => {
            obj.activate();
        });
    }

    private deactivateGameObjects() {
        this.gameObjects.forEach((obj, id) => {
            obj.deactivate();
        });
    }

    private update(deltaTime: number) {
        this.gameObjects.forEach((obj, id) => {
            obj.update(deltaTime);
        });
    }
}