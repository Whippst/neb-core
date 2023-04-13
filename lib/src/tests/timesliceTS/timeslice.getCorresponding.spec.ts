import { Period, Moment, Instant } from "calendar/moment";
import { addDays, startOfToday } from "date-fns";
import { TimeSlice } from "calendar/timeslice";
const startDate = startOfToday();
const endDate = addDays(startDate, 28);

describe("Tests for getCorresponding", () =>{

    test("GIVEN a date within slice WHEN getCorresponding THEN returns correct moment", () =>{
        let parent = new Moment(new Period(startDate, endDate));
        let momentList = [
            new Moment(new Period(startDate, addDays(startDate, 7)), parent),
            new Moment(new Period(addDays(startDate, 8), addDays(startDate, 14)), parent),
            new Moment(new Period(addDays(startDate, 15), addDays(startDate, 21)), parent),
            new Moment(new Period(addDays(startDate, 22), addDays(startDate, 28)), parent),
        ]

        let slice =  new TimeSlice(momentList);

        expect(slice.getCorresponding(addDays(startDate, 1))?.startsAt).toEqual(startDate);
        expect(slice.getCorresponding(addDays(startDate, 18))?.startsAt).toEqual(addDays(startDate, 15));
    })

    test("GIVEN a date outside slice WHEN getCorresponding THEN returns undefined", () =>{
        let parent = new Moment(new Period(startDate, endDate));
        let momentList = [
            new Moment(new Period(startDate, addDays(startDate, 7)), parent),
            new Moment(new Period(addDays(startDate, 8), addDays(startDate, 14)), parent),
            new Moment(new Period(addDays(startDate, 15), addDays(startDate, 21)), parent),
            new Moment(new Period(addDays(startDate, 22), addDays(startDate, 28)), parent),
        ]

        let slice =  new TimeSlice(momentList);

        expect(slice.getCorresponding(addDays(startDate, -1))?.startsAt).toEqual(undefined);
        expect(slice.getCorresponding(addDays(startDate, 29))?.startsAt).toEqual(undefined);
    })

    test("GIVEN an Instant within slice WHEN getCorresponding THEN returns correct moment", () =>{
        let parent = new Moment(new Period(startDate, endDate));
        let momentList = [
            new Moment(new Period(startDate, addDays(startDate, 7)), parent),
            new Moment(new Period(addDays(startDate, 8), addDays(startDate, 14)), parent),
            new Moment(new Period(addDays(startDate, 15), addDays(startDate, 21)), parent),
            new Moment(new Period(addDays(startDate, 22), addDays(startDate, 28)), parent),
        ]

        let slice =  new TimeSlice(momentList);

        expect(slice.getCorresponding(new Instant(addDays(startDate, 1)))?.startsAt).toEqual(startDate);
        expect(slice.getCorresponding(new Instant(addDays(startDate, 18)))?.startsAt).toEqual(addDays(startDate, 15));
    })

    test("GIVEN an Instant outside slice WHEN getCorresponding THEN returns undefined", () =>{
        let parent = new Moment(new Period(startDate, endDate));
        let momentList = [
            new Moment(new Period(startDate, addDays(startDate, 7)), parent),
            new Moment(new Period(addDays(startDate, 8), addDays(startDate, 14)), parent),
            new Moment(new Period(addDays(startDate, 15), addDays(startDate, 21)), parent),
            new Moment(new Period(addDays(startDate, 22), addDays(startDate, 28)), parent),
        ]

        let slice =  new TimeSlice(momentList);

        expect(slice.getCorresponding(new Instant(addDays(startDate, -1)))?.startsAt).toEqual(undefined);
        expect(slice.getCorresponding(new Instant(addDays(startDate, 29)))?.startsAt).toEqual(undefined);
    })

    test("GIVEN a Moment duration that starts within slice WHEN getCorresponding THEN returns moment of startsAt", () =>{
        let parent = new Moment(new Period(startDate, endDate));
        let momentList = [
            new Moment(new Period(startDate, addDays(startDate, 7)), parent),
            new Moment(new Period(addDays(startDate, 8), addDays(startDate, 14)), parent),
            new Moment(new Period(addDays(startDate, 15), addDays(startDate, 21)), parent),
            new Moment(new Period(addDays(startDate, 22), addDays(startDate, 28)), parent),
        ]

        let slice =  new TimeSlice(momentList);

        expect(slice.getCorresponding(new Moment(new Period(addDays(startDate, 1))))?.startsAt).toEqual(startDate);
        expect(slice.getCorresponding(new Moment(new Period(addDays(startDate, 18))))?.startsAt).toEqual(addDays(startDate, 15));
    })

    test("GIVEN a Moment duration that starts outside slice WHEN getCorresponding THEN returns undefined", () =>{
        let parent = new Moment(new Period(startDate, endDate));
        let momentList = [
            new Moment(new Period(startDate, addDays(startDate, 7)), parent),
            new Moment(new Period(addDays(startDate, 8), addDays(startDate, 14)), parent),
            new Moment(new Period(addDays(startDate, 15), addDays(startDate, 21)), parent),
            new Moment(new Period(addDays(startDate, 22), addDays(startDate, 28)), parent),
        ]

        let slice =  new TimeSlice(momentList);

        expect(slice.getCorresponding(new Moment(new Period(addDays(startDate, -1))))?.startsAt).toEqual(undefined);
        expect(slice.getCorresponding(new Moment(new Period(addDays(startDate, 29))))?.startsAt).toEqual(undefined);
    })

})