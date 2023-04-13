import { Period, Moment } from "calendar/moment";
import { addDays, startOfToday } from "date-fns";
import { TimeSlice } from "calendar/timeslice";
import { ArgumentException } from "exceptions/ArgumentException";
const startDate = startOfToday();
const endDate = addDays(startDate, 28);

describe("tests for ctor", () =>{
    test("GIVEN a valid array of moments WHEN ctor THEN Timeslice created", () =>{
        let parent = new Moment(new Period(startDate, endDate));
        let momentList = [
            new Moment(new Period(startDate, addDays(startDate, 7)), parent),
            new Moment(new Period(addDays(startDate, 8), addDays(startDate, 14)), parent),
            new Moment(new Period(addDays(startDate, 15), addDays(startDate, 21)), parent),
            new Moment(new Period(addDays(startDate, 22), addDays(startDate, 28)), parent),
        ]

        expect(() => new TimeSlice(momentList)).not.toThrow();

    })
    test("GIVEN an empty array of moments WHEN ctor THEN throws", () =>{
        let momentList = new Array<Moment>();
        expect(() => new TimeSlice(momentList)).toThrow(new ArgumentException("Moment list cannot be empty."))
    })
    test("GIVEN a list of moments without parents WHEN ctor THEN throws", () =>{
        let momentList = [
            new Moment(new Period(startDate, addDays(startDate, 7))),
            new Moment(new Period(addDays(startDate, 8), addDays(startDate, 14))),
            new Moment(new Period(addDays(startDate, 15), addDays(startDate, 21))),
            new Moment(new Period(addDays(startDate, 22), addDays(startDate, 28))),
        ]
        expect(() => new TimeSlice(momentList)).toThrow(new ArgumentException("Moments must have a common parent."))
    })

    test("GIVEN a list of moment without a common parent WHEN ctor THEN throws", () => {
        let parent1 = new Moment(new Period(startDate, endDate));
        let parent2 = new Moment(new Period(startDate, endDate));
        let momentList = [
            new Moment(new Period(startDate, addDays(startDate, 7)), parent1),
            new Moment(new Period(addDays(startDate, 8), addDays(startDate, 14)), parent1),
            new Moment(new Period(addDays(startDate, 15), addDays(startDate, 21)), parent2),
            new Moment(new Period(addDays(startDate, 22), addDays(startDate, 28)), parent2),
        ]
        expect(() => new TimeSlice(momentList)).toThrow(new ArgumentException("Moments must have a common parent."))
    })

    test("GIVEN a list of valid momments WHEN ctor THEN immutable ", () =>{
        let parent = new Moment(new Period(startDate, endDate));
        let momentList = [
            new Moment(new Period(startDate, addDays(startDate, 7)), parent),
            new Moment(new Period(addDays(startDate, 8), addDays(startDate, 14)), parent),
            new Moment(new Period(addDays(startDate, 15), addDays(startDate, 21)), parent),
            new Moment(new Period(addDays(startDate, 22), addDays(startDate, 28)), parent)
        ];

        let slice = new TimeSlice(momentList);
        momentList.push( new Moment(new Period(addDays(startDate, 22), addDays(startDate, 28))))

        expect(slice.length).toBe(4);
    })

    test("GIVEN a list of moments that do not fill parent's range WHEN ctor THEN throws", () =>{
        let parent = new Moment(new Period(startDate, endDate));
        let momentList = [
            new Moment(new Period(addDays(startDate, 1), addDays(startDate, 7)), parent),
            new Moment(new Period(addDays(startDate, 8), addDays(startDate, 14)), parent),
            new Moment(new Period(addDays(startDate, 15), addDays(startDate, 21)), parent),
            new Moment(new Period(addDays(startDate, 22), addDays(startDate, 27)), parent),
        ]
        expect(() => new TimeSlice(momentList)).toThrow(new ArgumentException("All of parent range must be filled."))
    })

    test("Given a list of moments that are not contiguous WHEN ctor THEN throws", () =>{
        let parent = new Moment(new Period(startDate, endDate));
        let momentList = [
            new Moment(new Period(startDate, addDays(startDate, 7)), parent),
            new Moment(new Period(addDays(startDate, 9), addDays(startDate, 14)), parent),
            new Moment(new Period(addDays(startDate, 15), addDays(startDate, 21)), parent),
            new Moment(new Period(addDays(startDate, 22), addDays(startDate, 28)), parent),
        ]
        expect(() => new TimeSlice(momentList)).toThrow(new ArgumentException("Moments must be contiguous."))
    })

    test("GIVEN and open ended parent when last moment is not open ended WHEN ctor THEN throws", () =>{
        let parent = new Moment(new Period(startDate));
        let momentList = [
            new Moment(new Period(addDays(startDate, 1), addDays(startDate, 7)), parent),
            new Moment(new Period(addDays(startDate, 8), addDays(startDate, 14)), parent),
            new Moment(new Period(addDays(startDate, 15), addDays(startDate, 21)), parent),
            new Moment(new Period(addDays(startDate, 22), addDays(startDate, 27)), parent),
        ]
        expect(() => new TimeSlice(momentList)).toThrow(new ArgumentException("All of parent range must be filled."))
    })

    test("GIVEN and open ended parent when last moment is open ended WHEN ctor THEN creates moment", () =>{
        let parent = new Moment(new Period(startDate));
        let momentList = [
            new Moment(new Period(startDate, addDays(startDate, 7)), parent),
            new Moment(new Period(addDays(startDate, 8), addDays(startDate, 14)), parent),
            new Moment(new Period(addDays(startDate, 15), addDays(startDate, 21)), parent),
            new Moment(new Period(addDays(startDate, 22)), parent),
        ]
        expect(() => new TimeSlice(momentList)).not.toThrow(new ArgumentException("All of parent range must be filled."));
    })

    test("GIVEN a moment list out of order WHEN ctor THEN sorts", ()=>{
        let parent = new Moment(new Period(startDate));
        let momentList = [
            new Moment(new Period(addDays(startDate, 8), addDays(startDate, 14)), parent),
            new Moment(new Period(startDate, addDays(startDate, 7)), parent),
            new Moment(new Period(addDays(startDate, 22)), parent),
            new Moment(new Period(addDays(startDate, 15), addDays(startDate, 21)), parent),
        ]
        let slice = new TimeSlice(momentList);
        expect(slice.first.startsAt).toEqual(startDate);
        expect(slice.last.startsAt).toEqual(addDays(startDate, 22));
    })

})