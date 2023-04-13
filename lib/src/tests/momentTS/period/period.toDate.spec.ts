import {Instant, Period, } from 'calendar/moment'
import { startOfToday, addDays } from 'date-fns'

const startDate = startOfToday();
const endDate = addDays(startDate, 7 )

describe("Tests for ToDate ", () =>{
    test("GIVEN to is open ended WHEN toDate THEN toDate is undefined", () =>{
        let period = new Period(startDate);
        expect(period.toDate).toBe(undefined);
    })
    test("GIVEN to is Date WHEN toDate THEN to returned", () =>{
        let period = new Period(startDate, endDate);
        expect(period.toDate).toBe(endDate);
    })

    test("GIVEN to is an Instant WHEN toDate THEN to.date is returned", () =>{
        let fromInstant = new Instant(startDate)
        let parentInstant = new Instant(endDate);
        let childInstant = new Instant(parentInstant);
        let period = new Period(fromInstant, childInstant);
        expect(period.toDate).toBe(endDate);
    })
})
