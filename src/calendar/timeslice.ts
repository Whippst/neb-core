import { ArgumentException } from "exceptions/ArgumentException";
import { IMoment, Moment, IPeriod, IInstant, MomentType } from "./moment"
import { isEqual, addDays } from "date-fns";

export interface ITimeSlice{
    get length () : number;
    get(index : number) : IMoment;
    get first() : IMoment;
    get last() : IMoment;
    getCorresponding(selection : Date | IMoment | IInstant) : IMoment | undefined;
    getCorrespondingRange(selection : IPeriod | IMoment ) : ITimeSlice
}


export class TimeSlice{
    private _momentList : Array<IMoment>;
    private _parent : IMoment;
    constructor(momentList : Array<IMoment>){
        if(momentList.length == 0) 
            throw new ArgumentException("Moment list cannot be empty.")
        this._validateParent(momentList)

        this._momentList = new Array<IMoment>();
        momentList.forEach(m => this._momentList.push(m));
        this._momentList.sort((m1, m2) => {
            if (m1.before(m2)) return -1;
            if ((m2.before(m1))) return 1;
            return 0;
        })
        this._parent = momentList[0].parent as IMoment;
        this._validateRange();
    }

    private _validateParent(list : Array<IMoment>){
        let commonParent = list[0].parent;
        if(!commonParent)
            throw new ArgumentException("Moments must have a common parent.")

        let result = list.every(m => m.parent == commonParent);
        if(!result)
            throw new ArgumentException("Moments must have a common parent.")
    }

    private _validateRange(){
        if(!isEqual(this.first.startsAt, this._parent.startsAt))
            throw new ArgumentException("All of parent range must be filled.")

        if(this._parent.isOpenEnded){
            if(!this.last.isOpenEnded)
                throw new ArgumentException("All of parent range must be filled.")
        }
        else{
            if(!isEqual(this.last.endsAt as Date, this._parent.endsAt as Date))
                throw new ArgumentException("All of parent range must be filled.")
        }

        let listRef = this._momentList;
        for (let i = 0, j = 1; j < this.length; i++, j++){
            if(!isEqual(addDays(listRef[i].endsAt as Date, 1), listRef[j].startsAt))
                throw new ArgumentException("Moments must be contiguous.")
        }
    }

    get length () : number{
        return this._momentList.length;
    }

    get(index : number) : IMoment{
        if(index < 0 || index > this.length -1)
            throw new RangeError();
        return this._momentList[index];
    }

    get first() : IMoment{
        return this._momentList[0];
    }

    get last() : IMoment{
        return this._momentList[this.length-1]
    }

    getCorresponding(selection : Date | IMoment | IInstant) : IMoment | undefined{

        if("startsAt" in selection)
            selection.type == MomentType.Duration ? selection = new Moment(selection.startsAt) : selection;
        else{
            selection = new Moment(selection);
        }

        if (selection.before(this.first) || selection.after(this.last))
            return undefined;    

        return this._momentList.find(m => m.overlaps(selection as Moment))
    }

    getCorrespondingRange(selection : IPeriod | IMoment ) : ITimeSlice {
        if("to" in selection){
            selection = new Moment(selection);
        }

        return new CorrespondingRange(this._momentList.filter(x => x.overlaps(selection as IMoment)));
    }
}

class CorrespondingRange {
    private _momentList : Array<IMoment>;
    constructor(list : Array<IMoment>){
        this._momentList = list;
    }
    get length () : number{
        return this._momentList.length;
    }

    get(index : number) : IMoment{
        if(index < 0 || index > this.length -1)
            throw new RangeError();
        return this._momentList[index];
    }

    get first() : IMoment{
        return this._momentList[0];
    }

    get last() : IMoment{
        return this._momentList[this.length-1]
    }

    getCorresponding(selection : Date | IMoment | IInstant) : IMoment | undefined{

        if("startsAt" in selection)
            selection.type == MomentType.Duration ? selection = new Moment(selection.startsAt) : selection;
        else{
            selection = new Moment(selection);
        }

        if (selection.before(this.first) || selection.after(this.last))
            return undefined;    

        return this._momentList.find(m => m.overlaps(selection as Moment))
    }

    getCorrespondingRange(selection : IPeriod | IMoment ) : ITimeSlice {
        if("to" in selection){
            selection = new Moment(selection);
        }

        return new CorrespondingRange(this._momentList.filter(x => x.overlaps(selection as IMoment)));
    }
}