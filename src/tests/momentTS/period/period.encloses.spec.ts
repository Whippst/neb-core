import {Instant, Period} from 'calendar/moment'
import { startOfToday, addDays } from 'date-fns'

const startDate = startOfToday();
const endDate = addDays(startDate, 7 )
describe("tests for encloses", () =>{
    test("GIVEN both periods are open ended WHEN encloses THEN period 1 returns true and period 2 returns false", () =>{
        let period1 = new Period(startDate);
        let period2 = new Period(endDate);
        expect(period1.encloses(period2)).toBe(true);
        expect(period2.encloses(period1)).toBe(false);
    })

    test("GIVEN both periods are open ended and the same WHEN encloses THEN returns true ", () =>{
        let period1 = new Period(startDate);
        let period2 = new Period(startDate);
        expect(period1.encloses(period2)).toBe(true);
        expect(period2.encloses(period1)).toBe(true);
    })

    test("GIVEN both periods are fixed and the same WHEN encloses THEN returns true", () =>{
        let period1 = new Period(startDate, endDate);
        let period2 = new Period(startDate, endDate);
        expect(period1.encloses(period2)).toBe(true);
        expect(period2.encloses(period1)).toBe(true);
    })

    test("GIVEN both periods are fixed and partially intersect WHEN encloses THEN returns false", () =>{
        let period1 = new Period(startDate, endDate);
        let period2 = new Period(addDays(startDate, 2), addDays(endDate, 2));
        expect(period1.encloses(period2)).toBe(false);
        expect(period2.encloses(period1)).toBe(false);
    })

    test("GIVEN both periods are fixed and dont intersect WHEN encloses THEN returns false", () =>{
        let period1 = new Period(startDate, endDate);
        let period2 = new Period(addDays(endDate, 1), addDays(endDate, 2));
        expect(period1.encloses(period2)).toBe(false);
        expect(period2.encloses(period1)).toBe(false);
    })

    test("GIVEN period 1 encloses period 2 WHEN encloses THEN period 1 returns truie and period 2 returns false", () =>{
        let period1 = new Period(startDate, endDate);
        let period2 = new Period(addDays(startDate, 2), addDays(endDate, -2));
        expect(period1.encloses(period2)).toBe(true);
        expect(period2.encloses(period1)).toBe(false);
    })

    test("GIVEN both periods in Instants and period 1 encloses period 2 WHEN encloses THEN period 1 returns true and period 2 returns false", () =>{
        let period1 =   new Period(
                            new Instant(new Instant(startDate)), 
                            new Instant(new Instant(endDate))
                        );

        let period2 =   new Period(
                            new Instant(new Instant(addDays(startDate, 1))), 
                            new Instant(new Instant(addDays(endDate ,-1)))
                        )
        expect(period1.encloses(period2)).toBe(true);
        expect(period2.encloses(period1)).toBe(false);
    })
    test("GIVEN 1 period in Instants and period 1 encloses period 2 WHEN encloses THEN period 1 returns true and period 2 returns false", () =>{
        let period1 =   new Period(
                            new Instant(startDate), 
                            new Instant(endDate)
                        );
                        
        let period2 =   new Period(addDays(startDate,1),addDays(endDate ,-1))
        expect(period1.encloses(period2)).toBe(true);
        expect(period2.encloses(period1)).toBe(false);
    })
})