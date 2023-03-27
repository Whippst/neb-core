import {Moment, Period } from './moment'

export class Event {
    private _when : Moment
    constructor (when : Moment ){
        this._when = when;
    }

}