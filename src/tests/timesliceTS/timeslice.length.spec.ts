import { Period, Moment } from "calendar/moment";
import { addDays, startOfToday } from "date-fns";
import { TimeSlice } from "calendar/timeslice";
const startDate = startOfToday();
const endDate = addDays(startDate, 28);

describe("tests for length", () =>{
    test("GIVEN a time slice WHEn length returns length", () =>{
        let parent = new Moment(new Period(startDate, endDate));
        let momentList = [
            new Moment(new Period(startDate, addDays(startDate, 7)), parent),
            new Moment(new Period(addDays(startDate, 8), addDays(startDate, 14)), parent),
            new Moment(new Period(addDays(startDate, 15), addDays(startDate, 21)), parent),
            new Moment(new Period(addDays(startDate, 22), addDays(startDate, 28)), parent),
        ]

        let slice =  new TimeSlice(momentList);

        expect(slice.length).toEqual(4);
    })
})