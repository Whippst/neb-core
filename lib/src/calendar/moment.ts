import { ArgumentException } from "../exceptions/ArgumentException";
import {formatISO } from 'date-fns'

export interface IDescriptor{
    toString() : string;
    typeString() : string;
} 

export interface IInstant{
    get value() : Date | IInstant;
    get date() : Date;
    toString() : string;
    get typeName() : string;
}

export interface IPeriod{
    get from() : Date | IInstant;
    get to() : Date | IInstant | undefined;
    get fromDate() : Date;
    get toDate() : Date | undefined;
    contains(when : Date | IInstant) : boolean;
    overlaps(period : IPeriod) : boolean;
    encloses(period : IPeriod) : boolean;
    toString() : string ;
    get typeName(): string;
}

export enum MomentType{
    TimeStamp = 1, Duration, Empty    
}

export interface IMoment {
    get when() : Date | IInstant | IPeriod 
    get type() : MomentType
    get parent() : IMoment | undefined
    toString() : string
    get typeName() : string
    get startsAt() : Date
    get endsAt() : Date | undefined;
    before(test : IMoment) : boolean
    after(test : IMoment) : boolean;
    equals(test : IMoment) : boolean;
    isWithin(test : IMoment) : boolean;
    overlaps(test : IMoment) : boolean;
    get isOpenEnded() : boolean;
}


// Inbuilt Implementations

export class Instant {
    private _when : Date | IInstant
    private _descriptor? : IDescriptor
    constructor(when : Date | IInstant, desciptor? : IDescriptor){
        this._when = when;
        this._descriptor = desciptor;
    }

    private _resolveDate() : Date | Instant {   
        if(this._when instanceof Date)
            return this._when as Date
        else    
            return this._when.date;
    }

    get value() : Date | IInstant{
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



export class Period{
    private _from : Date | IInstant 
    private _to? : Date | IInstant
    private _descriptor? : IDescriptor
    constructor(    from : Date | IInstant, 
                    to? : Date | IInstant,
                    descriptor? : IDescriptor
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

    get from() : Date | IInstant{
        return this._from;
    }
    get to() : Date | IInstant | undefined{
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

    contains(when : Date | IInstant) : boolean{
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

    overlaps(period : IPeriod) : boolean{
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
    encloses(period : IPeriod) : boolean{
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
    private _validateTypeEquality(t1 : Date | IInstant, t2? : Date | IInstant){
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


export class Moment{
    private _when : Date | IInstant | IPeriod 
    private _type : MomentType
    private _parent? : Moment

    constructor(when : Date | IInstant | IPeriod, parent? : Moment){
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

    get when() : Date | IInstant | IPeriod {
        return this._when;
    }   

    get type() : MomentType{
        return this._type;
    }

    get parent() : IMoment | undefined {
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
        if("date" in this.when){
            return this.when.date;
        } 
        if("fromDate" in this.when)
            return this.when.fromDate;    
        return this.when;
    }
    get endsAt() : Date | undefined{
        if(this.type == MomentType.Duration)
            return (this._when as IPeriod).toDate;
        if("date" in this._when)
            return this._when.date;
        return this._when as Date;
    }
    before(test : IMoment) : boolean{
        let date = this.endsAt;
        if(!date) return false;
        return date < test.startsAt;
    }
    after(test : IMoment) : boolean{
        let date = test.endsAt;
        if(!date) return false;   
        return date < this.startsAt;
    }   
    equals(test : IMoment) : boolean{
        if(test.type != this.type) return false
        if(this.type == MomentType.TimeStamp)
        {
            return test.startsAt == this.startsAt
        }
        return test.startsAt == this.startsAt && test.endsAt == this.endsAt
    }
    isWithin(test : IMoment) : boolean{
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
    overlaps(test : IMoment) : boolean{
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
