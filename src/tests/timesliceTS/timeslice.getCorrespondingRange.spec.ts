
import { Period, Moment, Instant } from "calendar/moment";
import { addDays, startOfToday } from "date-fns";
import { TimeSlice } from "calendar/timeslice";
const startDate = startOfToday();
const endDate = addDays(startDate, 28);

describe("tests for get corresponding range", () =>{
    test("GIVEN a period within timeslice WHEN getCorrespondingRange THEN returns overlapping moments", ()=>{
        let slice =  createSampleMonthTimeSlice();   
        let testPeriod = new Period(addDays(startDate, 1), addDays(startDate, 16));

        let resultRange = slice.getCorrespondingRange(testPeriod);

        expect(resultRange.length).toBe(3);
        expect(resultRange[0].startsAt).toEqual(startDate);
        expect(resultRange[1].startsAt).toEqual(addDays(startDate, 8));
        expect(resultRange[2].startsAt).toEqual(addDays(startDate, 15));
    })

    test("GIVEN a duration within timeslice WHEN getCorrespondingRange THEN returns overlapping moments", ()=>{
        let slice =  createSampleMonthTimeSlice();    
        let testMoment = new Moment(new Period(addDays(startDate, 1), addDays(startDate, 16)));

        let resultRange = slice.getCorrespondingRange(testMoment);

        expect(resultRange.length).toBe(3);
        expect(resultRange[0].startsAt).toEqual(startDate);
        expect(resultRange[1].startsAt).toEqual(addDays(startDate, 8));
        expect(resultRange[2].startsAt).toEqual(addDays(startDate, 15));
    })

    test("GIVEN a timestamp within timeslice WHEN getCorrespondingRange THEN returns overlapping moments", ()=>{
        let slice =  createSampleMonthTimeSlice();
        let testMoment = new Moment(addDays(startDate, 9));

        let resultRange = slice.getCorrespondingRange(testMoment);

        expect(resultRange.length).toBe(1);
        expect(resultRange[0].startsAt).toEqual(addDays(startDate, 8));
    })

    test("GIVEN a period overlapping at start WHEN getCorrespondingRange THEN returns overlapping moments", ()=>{
        let slice =  createSampleMonthTimeSlice();      
        let testPeriod = new Period(addDays(startDate, -1), addDays(startDate, 16));

        let resultRange = slice.getCorrespondingRange(testPeriod);

        expect(resultRange.length).toBe(3);
        expect(resultRange[0].startsAt).toEqual(startDate);
        expect(resultRange[1].startsAt).toEqual(addDays(startDate, 8));
        expect(resultRange[2].startsAt).toEqual(addDays(startDate, 15));
    })

    test("GIVEN a duration overlapping at start WHEN getCorrespondingRange THEN returns overlapping moments", ()=>{
        let slice =  createSampleMonthTimeSlice();     
        let testPeriod = new Moment(new Period(addDays(startDate, -1), addDays(startDate, 16)));

        let resultRange = slice.getCorrespondingRange(testPeriod);

        expect(resultRange.length).toBe(3);
        expect(resultRange[0].startsAt).toEqual(startDate);
        expect(resultRange[1].startsAt).toEqual(addDays(startDate, 8));
        expect(resultRange[2].startsAt).toEqual(addDays(startDate, 15));
    })

    test("GIVEN a period that overlaps end WHEN getCorrespondingRange THEN returns overlapping moments", () =>{
        let slice =  createSampleMonthTimeSlice();
        let testPeriod = new Period(addDays(endDate, -1), addDays(endDate, 10))

        let resultRange = slice.getCorrespondingRange(testPeriod);

        expect(resultRange.length).toBe(1);
        expect(resultRange[0].startsAt).toEqual(addDays(startDate, 22));
    })

    test("GIVEN a duration that overlaps end WHEN getCorrespondingRange THEN returns overlapping moments", () =>{
        let slice =  createSampleMonthTimeSlice();
        let testMoment = new Moment(new Period(addDays(endDate, -1), addDays(endDate, 10)))

        let resultRange = slice.getCorrespondingRange(testMoment);

        expect(resultRange.length).toBe(1);
        expect(resultRange[0].startsAt).toEqual(addDays(startDate, 22));
    })
    test("GIVEN a timestamp that overlaps end WHEN getCorrespondingRange THEN returns overlapping moments", () =>{
        let slice =  createSampleMonthTimeSlice();
        let testMoment = new Moment(addDays(endDate, -1))

        let resultRange = slice.getCorrespondingRange(testMoment);

        expect(resultRange.length).toBe(1);
        expect(resultRange[0].startsAt).toEqual(addDays(startDate, 22));
    })

    test("GIVEN a period before close WHEN getCorrespondingRange THEN returns empty list",() =>{
        let slice =  createSampleMonthTimeSlice();
        let testPeriod = new Period(addDays(startDate,-7), addDays(startDate, -1));

        let resultRange = slice.getCorrespondingRange(testPeriod);

        expect(resultRange.length).toBe(0);

    })
    test("GIVEN a duration before close WHEN getCorrespondingRange THEN returns empty list",() =>{
        let slice =  createSampleMonthTimeSlice();
        let testMoment = new Moment(new Period(addDays(startDate,-7), addDays(startDate, -1)));

        let resultRange = slice.getCorrespondingRange(testMoment);

        expect(resultRange.length).toBe(0);

    })
    test("GIVEN a timestamp before close WHEN getCorrespondingRange THEN returns all afterwards",() =>{
        let slice =  createSampleMonthTimeSlice();
        let testMoment = new Moment(addDays(startDate, -1));

        let resultRange = slice.getCorrespondingRange(testMoment);

        expect(resultRange.length).toBe(0);

    })

    test("GIVEN a period after close WHEN getCorrespondingRange THEN returns empty list",() =>{
        let slice =  createSampleMonthTimeSlice();
        let testPeriod = new Period(addDays(endDate,1), addDays(endDate, 7));

        let resultRange = slice.getCorrespondingRange(testPeriod);

        expect(resultRange.length).toBe(0);

    })
    test("GIVEN a duration after close WHEN getCorrespondingRange THEN returns empty list",() =>{
        let slice =  createSampleMonthTimeSlice();
        let testMoment = new Moment(new Period(addDays(endDate,1), addDays(endDate, 7)));

        let resultRange = slice.getCorrespondingRange(testMoment);

        expect(resultRange.length).toBe(0);

    })
    test("GIVEN a timestamp after close WHEN getCorrespondingRange THEN returns all afterwards",() =>{
        let slice =  createSampleMonthTimeSlice();
        let testMoment = new Moment(addDays(endDate, 1));

        let resultRange = slice.getCorrespondingRange(testMoment);

        expect(resultRange.length).toBe(0);

    })

})

function createSampleMonthTimeSlice() : TimeSlice{
    let parent = new Moment(new Period(startDate, endDate));
    let momentList = [
        new Moment(new Period(startDate, addDays(startDate, 7)), parent),
        new Moment(new Period(addDays(startDate, 8), addDays(startDate, 14)), parent),
        new Moment(new Period(addDays(startDate, 15), addDays(startDate, 21)), parent),
        new Moment(new Period(addDays(startDate, 22), addDays(startDate, 28)), parent),
    ]

    return new TimeSlice(momentList); 

}