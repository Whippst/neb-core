import { ArgumentException } from "../exceptions/ArgumentException";
import {formatISO } from 'date-fns'

export interface InstantDescriptor{
    toString() : string;
    typeString() : string;
} 

export class Instant {
    private _when : Date | Instant
    private _descriptor? : InstantDescriptor
    constructor(when : Date | Instant, desciptor? : InstantDescriptor){
        this._when = when;
        this._descriptor = desciptor;
    }

    private _resolveDate() : Date | Instant {
        if(this._when instanceof Date)
            return this._when as Date
        else    
            return this._when._resolveDate();
    }

    get value(){
        return this._when;
    }

    get date() : Date{
        return this._resolveDate() as Date;
    }

    toString() : string{
        if(this._descriptor){
            return this._descriptor.toString();
        }
        return formatISO(this.date);
    }

    typeName() : string{
        if(this._descriptor){
            return this._descriptor.typeString();
        }
        return "Instant";
    }
}

export interface PeriodDescriptor{
    toString() : string;
    typeString() : string;
}

export class Period{
    private _from : Date | Instant 
    private _to : Date | Instant | undefined
    private _descriptor? : PeriodDescriptor
    constructor(    from : Date | Instant, 
                    to : Date | Instant | undefined,
                    descriptor? : PeriodDescriptor
                ){
        
        let f : Date
        let t: Date | undefined
        if(from instanceof Date){
            f = from;
        }
        else{
            f = from.date;
        }
        if (to instanceof Date){
            t = to;
        }
        else{
            t = to?.date;
        }
        if(t && t < f){
            throw new ArgumentException("to cannot be before from");
        }

        this._from = from;
        this._to = to;
        this._descriptor = descriptor;
    }

    get from() : Date | Instant{
        return this._from;
    }
    get to() : Date | Instant | undefined{
        return this._to;
    }

    get fromDate() : Date{
        if (this._from instanceof Date)
            return this._from;
        return this._from.date;
    } 
    get toDate() : Date | undefined{
        if(!this._to)
            return undefined;
        if(this._to instanceof Date){
            return this._to;
        }
        return this._to.date;
    }

    isWithin(when : Date | Instant) : boolean{
        let w : Date
        if (when instanceof Date){
            w = when
        }
        else{
            w = when.date;
        }

        let from : Date;
        if(this._from instanceof Date){
            from = this._from
        }
        else{
            from = this._from.date;
        }

        let to : Date | undefined
        if(!this._to) 
            to = undefined;
        else if (this._to instanceof Date)
            to = this._to
        else
            to = this._to.date;

        if (w >= from &&  (to === undefined || to >= w)) {
            return true;
        }       
        return false;
    }

    intersects(period : Period) : boolean{
        let from1 = this.fromDate;
        let from2 = period.fromDate;
        let to1 = this.toDate;
        let to2 = period.toDate;

        if (!to2 && from2 <= from1 )
            return true;
        if(!to1 && from1 <= from2)
            return true;
        if(to2 && from1 >= from2 && from1 <= to2)
            return true;
        if(to1 && from2 >= from1 && from2 <= to1)
            return true;
        return false;
    }
    encloses(period : Period) : boolean{
        let from1 = this.fromDate;
        let from2 = period.fromDate;
        let to1 = this.toDate;
        let to2 = period.toDate;

        if(!to1 && from2 >= from1){
            return true;
        }
        if (to2 && to1 && from2 >= from1 && to2 <= to1 )
            return true;

        return false;
    }
    toString() : string{
        if(this._descriptor){
            return this._descriptor.toString();
        }

        if(this.toDate)
            return `from ${this.fromDate} to ${this.toDate}`
        return `from ${this.fromDate}`
    }
    typeName(): string{
        if(this._descriptor){
            return this._descriptor.typeString();
        }
        return 'Period'
    }
}

export enum MomentType{
    TimeStamp = 1, Duration     
}

export class Moment{
    private _when : Date | Instant | Period 
    private _type : MomentType
    private _parent? : Moment

    constructor(when : Date | Instant | Period, parent? : Moment){
        this._when = when;
        this._type =  when instanceof Period ? MomentType.Duration : MomentType.TimeStamp; 
        this._parent = parent;
        if(parent ){
            if(parent.type !== MomentType.Duration)
                throw new ArgumentException("parent moment must be a period");
            let testPeriod = parent.when as Period;
            if(this._type == MomentType.TimeStamp){
                if(!testPeriod.isWithin(when as Date | Instant)){
                    throw new ArgumentException("Moment must be within parent period")
                }
            }
            else{
                if(!testPeriod.encloses(when as Period)){
                    throw new ArgumentException("Moment must be enclosed within Parnt")
                }
            }
        }
    }

    get when() : Date | Instant | Period {
        return this._when;
    }   

    get type() : MomentType{
        return this._type;
    }

    get parent() : Moment | undefined {
        return this._parent;
    }
    toString() : string {
        if(this.when instanceof Date){
            return formatISO(this.when)
        }
        return this.when.toString();
    }

    typeName() : string {
        if(this.when instanceof Date){
            return 'Date'
        }
        return this.when.typeName();
    }
    startsAt() : Date{
        if(this.when instanceof Date)
            return this.when;
        if(this.when instanceof Instant){
            return this.when.date;
        } 
        return this.when.fromDate;
    }
    endsAt() : Date | undefined{
        if(this.type == MomentType.Duration)
            return this.startsAt();
        let period = this.when as Period;
        return period.toDate;
    }
    before(test : Moment) : boolean{
        var date = this.endsAt();
        if(!date) return false;
        return date < test.startsAt();
    }
    after(test : Moment) : boolean{
        var date = test.endsAt();
        if(!date) return false;   
        return date < this.startsAt();
    }   
}