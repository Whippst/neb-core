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

    get typeName() : string{
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
    private _to? : Date | Instant
    private _descriptor? : PeriodDescriptor
    constructor(    from : Date | Instant, 
                    to? : Date | Instant,
                    descriptor? : PeriodDescriptor
                ){
        
                    if(!this._validateTypeEquality(from, to))
            throw new ArgumentException("to and From must be of the same type")
        
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

    contains(when : Date | Instant) : boolean{
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

    overlaps(period : Period) : boolean{
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
    toString() : string {
        if(this._descriptor){
            return this._descriptor.toString();
        }

        if(this.toDate)
            return `from ${this.fromDate} to ${this.toDate}`
        return `from ${this.fromDate}`
    }
    get typeName(): string{
        if(this._descriptor){
            return this._descriptor.typeString();
        }
        return 'Period'
    }
    private _validateTypeEquality(t1 : Date | Instant, t2? : Date | Instant){
        if(!t2) return true;
        if((t1 instanceof Date && t2 instanceof Instant) 
                ||
            t1 instanceof Instant && t2 instanceof Date
        ) {
            return false;
        }
        if(t1 instanceof Instant){
            let t1type = t1.typeName;
            let t2Type = (t2 as Instant).typeName;
            if(t1type !== t2Type) 
            return false;
        }
        return true;
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
            if(!this.isWithin(parent))
                throw new ArgumentException("must be within range of parent")
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

    get typeName() : string {
        if(this.when instanceof Date){
            return 'Date'
        }
        return this.when.typeName;
    }
    get startsAt() : Date{
        if(this.when instanceof Date)
            return this.when;
        if(this.when instanceof Instant){
            return this.when.date;
        } 
        return this.when.fromDate;
    }
    get endsAt() : Date | undefined{
        if(this.type == MomentType.Duration)
            return (this._when as Period).toDate;
        if(this._when instanceof Date){
            return this._when as Date
        }
        if(this._when instanceof Instant)
            return this._when.date 
    }
    before(test : Moment) : boolean{
        let date = this.endsAt;
        if(!date) return false;
        return date < test.startsAt;
    }
    after(test : Moment) : boolean{
        let date = test.endsAt;
        if(!date) return false;   
        return date < this.startsAt;
    }   
    equals(test : Moment) : boolean{
        if(test.type != this.type) return false
        if(this.type == MomentType.TimeStamp)
        {
            return test.startsAt == this.startsAt
        }
        return test.startsAt == this.startsAt && test.endsAt == this.endsAt
    }
    isWithin(test : Moment) : boolean{
        // a period can never be within a date or instant
        if(this.type == MomentType.Duration && test.type == MomentType.TimeStamp)
            return false;
        if(this.type == MomentType.TimeStamp && test.type == MomentType.TimeStamp){
            return test.equals(this)
        }
        let thisPeriod = this.type === MomentType.Duration ? this._when as Period :
            new Period(this.startsAt, this.endsAt)
        let testPeriod = test.when as Period;
        return testPeriod.encloses(thisPeriod);
    }
    overlaps(test : Moment) : boolean{
        if(test.type === MomentType.TimeStamp && this.type === MomentType.TimeStamp)
            return this.equals(test);
        if(test.type === MomentType.TimeStamp){
            let thisPeriod = this.when as Period;
            return thisPeriod.contains(test.startsAt);
        }
        if(this.type === MomentType.TimeStamp){
            let testPeriod = test.when as Period;
            return testPeriod.contains(this.startsAt);
        }
        let thisPeriod = this.when as Period;
        let testPeriod = test.when as Period;
        return thisPeriod.overlaps(testPeriod);
    }
    get isOpenEnded() : boolean{
        return this.endsAt == undefined;
    }
}