import {Instant, Period} from 'calendar/moment'
import { startOfToday } from 'date-fns'
describe("tests for from", () => {
    test("GIVEN date WHEN ctor, THEN from set", () => {
        let testDate = startOfToday();
        let period = new Period(testDate);
        expect(period.from instanceof Date).toBe(true);
        expect(period.from).toBe(testDate)
    })

    test("GIVEN Instant WHEN ctor THEN from set", () =>{
        let testDate = startOfToday();
        let from = new Instant(testDate);
        let period = new Period(from);
        expect (period.from instanceof Instant).toBe(true);
        expect ((period.from as Instant).value).toBe(testDate);
    })
})

describe("tests for FromDate", ()=>{
    test("Given from is Date WHEN fromDate THEN returns from", ()=>{
        let testDate = startOfToday();
        let period = new Period(testDate);
        expect(period.fromDate).toBe(testDate);
    })
    test("Given from is Instant WHEN fromDate THEN returns Instant.date", () =>{
        let testDate = startOfToday();
        let parent = new Instant(testDate)
        let from = new Instant(parent);
        let period = new Period(from);  
        expect(period.fromDate).toBe(testDate);
    })
})