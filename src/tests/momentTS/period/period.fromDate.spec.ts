import {Instant, Period} from 'calendar/moment'
import { startOfToday } from 'date-fns'

const startDate = startOfToday();

describe("tests for FromDate", ()=>{
    test("GIVEN from is Date WHEN fromDate THEN returns from", ()=>{
        let period = new Period(startDate);
        expect(period.fromDate).toBe(startDate);
    })
    test("GIVEN from is Instant WHEN fromDate THEN returns Instant.date", () =>{
        let parent = new Instant(startDate)
        let from = new Instant(parent);
        let period = new Period(from);  
        expect(period.fromDate).toBe(startDate);
    })
})