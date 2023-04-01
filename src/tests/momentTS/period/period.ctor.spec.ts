import {Instant, InstantDescriptor, Period} from 'calendar/moment'
import { startOfToday, addDays } from 'date-fns'
import { ArgumentException } from 'exceptions/ArgumentException';

const startDate = startOfToday();
const endDate = addDays(startDate, 7 )

describe("tests for ctor : open ended", () => {
    
    test("GIVEN date WHEN ctor, THEN from set", () => {      
        let period = new Period(startDate);
        expect(period.from instanceof Date).toBe(true);
        expect(period.from).toBe(startDate)
    })

    test("GIVEN Instant WHEN ctor THEN from set", () =>{
        let from = new Instant(startDate);
        let period = new Period(from);
        expect (period.from instanceof Instant).toBe(true);
        expect ((period.from as Instant).value).toBe(startDate);
    })
})

describe("Tests for ctor : fixed", () =>{
    test("GIVEN empty WHEN ctor THEN to is undefined", () => {
        let period = new Period(startDate);
        expect(period.to).toBeFalsy();
    })
    test("GIVEN a date WHEN ctor THEN to is set", () =>{
        let period = new Period(startDate, endDate);
        expect(period.to instanceof Date).toBe(true)
        expect(period.to).toBe(endDate);
    })
    test("GIVEN an Instant WHEN ctor THEN to is set", ()=>{
        let from = new Instant(startDate)
        let to = new Instant(endDate);
        let period = new Period(from, to)
        expect(period.to instanceof Instant).toBeTruthy()
        expect((period.to as Instant).date).toBe(endDate);
    })
    test("GIVEN different types WHEN ctor THEN Throws", () =>{
        class fromDescriptor implements InstantDescriptor{
            toString() : string  { return "some string"}  ;
            typeString(): string { return "type 1"};
        }
        class toDescriptor implements InstantDescriptor{
            toString() : string  { return "other string"}  ;
            typeString(): string { return "type 2"};
        }

        let to = new Instant(endDate);
        let from = new Instant(startDate)
  
        let to2 = new Instant(endDate, new fromDescriptor());
        let from2 = new Instant(startDate, new toDescriptor());

        expect(() => new Period(startDate, to)).toThrow(new ArgumentException("to and From must be of the same type"));
        expect(() => new Period(from, endDate)).toThrow(new ArgumentException("to and From must be of the same type"));
        expect(() => new Period(from2, to2)).toThrow(new ArgumentException("to and From must be of the same type"));
    })
    test("GIVEN to before from WHEN ctor THEN throws", ()=>{
        let to = new Instant(startDate);
        let from = new Instant(endDate);
        expect(() => new Period(from, to)).toThrow(new ArgumentException("to cannot be before from"));
        expect(() => new Period(endDate, startDate)).toThrow(new ArgumentException("to cannot be before from"));
    })
})
