import {Moment, Period, Instant} from 'calendar/moment'
import { startOfToday, addDays } from 'date-fns'

const startDate = startOfToday();
const endDate = addDays(startDate, 7);

describe("Tests for isOpenEnded", () =>{
    test("GIVEN an open ended moment WHEN isOpenEnded THEN returns true", () =>{
        let moment = new Moment(new Period(startDate));
        expect(moment.isOpenEnded).toBe(true);
    })

    test("GIVEN an fixed period moment WHEN isOpenEnded THEN returns false", () =>{
        let moment = new Moment(new Period(startDate, endDate));
        expect(moment.isOpenEnded).toBe(false);
    })
})