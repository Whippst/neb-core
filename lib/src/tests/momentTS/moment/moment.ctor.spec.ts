import {Moment, Period, Instant, MomentType} from 'calendar/moment'
import { startOfToday, addDays } from 'date-fns'
import { ArgumentException } from 'exceptions/ArgumentException';

const startDate = startOfToday();
const endDate = addDays(startDate, 7);

describe ("tests for ctor", () =>{
    test("GIVEN an date and no Parent WHEN ctor THEN when is date, type is TimeStamp and Parent is undefined", () =>{
        let moment = new Moment(startDate);
        expect(moment.when).toBe(startDate);
        expect(moment.type).toBe(MomentType.TimeStamp)
        expect(moment.parent).toBe(undefined)
    })
    test("GIVEN an Instant and no Parent WHEN ctor THEN when is Instant, type is TimeStamp and Parent is undefined", () =>{
        let moment = new Moment(new Instant(startDate));
        expect((moment.when as Instant).date).toBe(startDate);
        expect(moment.type).toBe(MomentType.TimeStamp)
        expect(moment.parent).toBe(undefined)
    })

    test("GIVEN an Period and no Parent WHEN ctor THEN when is Period, type is Duration and Parent is undefined", () =>{
        let moment = new Moment(new Period(startDate));
        expect((moment.when as Period).from).toBe(startDate);
        expect(moment.type).toBe(MomentType.Duration)
        expect(moment.parent).toBe(undefined)
    })
    test("GIVEN a date and a Parent WHEN ctor THEN when is date, type is timestamp and parent is parent", () =>{
        let parent = new Moment(new Period(startDate, endDate))
        let moment = new Moment(startDate, parent)
        expect(moment.when).toBe(startDate);
        expect(moment.type).toBe(MomentType.TimeStamp)
        expect(moment.parent).toBe(parent)
    })
    test("GIVEN a parent that is not a Period WHEN ctor THEN throws", () =>{
        let parent1 = new Moment(startDate);
        let parent2 = new Moment(new Instant(startDate));

        expect(() => new Moment(startDate, new Moment(new Period(startDate, endDate)))).not.toThrow(ArgumentException)
        expect(() => new Moment(startDate, parent1)).toThrow(new ArgumentException("parent moment must be a period"));
        expect(() => new Moment(startDate, parent2)).toThrow(new ArgumentException("parent moment must be a period"));
    })
    test("GIVEN a moment that is not within parent range WHEN ctor THEN throws", () =>{
        let parent = new Moment(new Period(startDate, endDate))
        expect(() => new Moment(addDays(startDate,-1), parent)).toThrow(new ArgumentException("must be within range of parent"));
    })
})