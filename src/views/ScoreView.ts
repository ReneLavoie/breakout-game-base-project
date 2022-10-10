import { BaseView } from './BaseView';
import * as PIXI from 'pixi.js';
import { GameApplication } from '../GameApplication';
import { GameEvents } from '../GameEvents';
import { EventDispatcher } from '../EventDispatcher';
import { BrickType } from '../game/level/BrickType';

export class ScoreView extends BaseView {

    

    constructor() {
        super();
    }

    public setScore(score: number) {
    }

    protected init() {
        super.init();
    }

}