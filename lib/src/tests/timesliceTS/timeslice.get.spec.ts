import { Period, Moment } from "calendar/moment";
import { addDays, startOfToday } from "date-fns";
import { TimeSlice } from "calendar/timeslice";
const startDate = startOfToday();
const endDate = addDays(startDate, 28);

describe("tests for get", () =>{
    test("Given a valid index WHEN get THEN return correct moment", () =>{
        let parent = new Moment(new Period(startDate, endDate));
        let momentList = [
            new Moment(new Period(startDate, addDays(startDate, 7)), parent),
            new Moment(new Period(addDays(startDate, 8), addDays(startDate, 14)), parent),
            new Moment(new Period(addDays(startDate, 15), addDays(startDate, 21)), parent),
            new Moment(new Period(addDays(startDate, 22), addDays(startDate, 28)), parent),
        ]

        let slice =  new TimeSlice(momentList);
        expect(slice.get(0).startsAt).toBe(startDate);
        expect(slice.get(1).startsAt).toEqual(addDays(startDate, 8));
    })

    test("GIVEN an index out of range WHEN get THEN throws", () =>{
        let parent = new Moment(new Period(startDate, endDate));
        let momentList = [
            new Moment(new Period(startDate, addDays(startDate, 7)), parent),
            new Moment(new Period(addDays(startDate, 8), addDays(startDate, 14)), parent),
            new Moment(new Period(addDays(startDate, 15), addDays(startDate, 21)), parent),
            new Moment(new Period(addDays(startDate, 22), addDays(startDate, 28)), parent),
        ]

        let slice =  new TimeSlice(momentList);
        expect(() => slice.get(-1)).toThrow(RangeError)
        expect(() => slice.get(4)).toThrow(RangeError)
    })
})