import {Instant, Period} from 'calendar/moment'
import { startOfToday, addDays } from 'date-fns'

const startDate = startOfToday();
const endDate = addDays(startDate, 7 )
describe("tests for contains", () =>{
    test("GIVEN period is open ended and date equals from WHEN isWithin THEN returns true", () =>{
        let test = startDate;
        let periodToTest = new Period(startDate);
        expect(periodToTest.contains(test)).toBe(true);
    })

    test("GIVEN period is open ended and date after from WHEN isWithin THEN returns true", () =>{
        let test = addDays(startDate, 1);
        let periodToTest = new Period(startDate);
        expect(periodToTest.contains(test)).toBe(true);
    })

    test("GIVEN period is open ended and date before from WHEN isWithin THEN returns false", () =>{
        let test = addDays(startDate, -1);
        let periodToTest = new Period(startDate);
        expect(periodToTest.contains(test)).toBe(false);
    })

    test("GIVEN period is fixed and date equals from WHEN isWithin THEN returns true", () =>{
        let test = startDate;
        let periodToTest = new Period(startDate, endDate);
        expect(periodToTest.contains(test)).toBe(true);
    })

    test("GIVEN period is fixed and date after from but before to WHEN isWithin THEN returns true", () =>{
        let test = addDays(startDate, 1);
        let periodToTest = new Period(startDate, endDate);
        expect(periodToTest.contains(test)).toBe(true);
    })

    test("GIVEN period is fixed and date equals to WHEN isWithin THEN returns true", () =>{
        let test = endDate;
        let periodToTest = new Period(startDate, endDate);
        expect(periodToTest.contains(test)).toBe(true);
    })

    test("GIVEN period is fixed and date before from WHEN isWithin THEN returns false", () =>{
        let test = addDays(startDate, -1);
        let periodToTest = new Period(startDate, endDate);
        expect(periodToTest.contains(test)).toBe(false);
    })

    test("GIVEN period is fixed and date after to WHEN isWithin THEN returns false", () =>{
        let test = addDays(endDate, 1);
        let periodToTest = new Period(startDate, endDate);
        expect(periodToTest.contains(test)).toBe(false);
    })

    test("GIVEN period using instants and date within WHEN isWithin returns true" , () =>{
        let test = startDate;
        let periodToTest = new Period(new Instant(startDate), new Instant(endDate));
        expect(periodToTest.contains(test)).toBe(true);
    })

    test("GIVEN period using instants and date outside WHEN isWithin returns false" , () =>{
        let test = addDays(startDate, -1);
        let periodToTest = new Period(new Instant(startDate), new Instant(endDate));
        expect(periodToTest.contains(test)).toBe(false);
    })

    test("GIVEN period using instants and Instant within WHEN isWithin returns true" , () =>{
        let test = new Instant(startDate);
        let periodToTest = new Period(new Instant(startDate), new Instant(endDate));
        expect(periodToTest.contains(new Instant(test))).toBe(true);
    })
    test("GIVEN period using instants and Instant outside WHEN isWithin returns false" , () =>{
        let test = new Instant(addDays(endDate, 1));
        let periodToTest = new Period(new Instant(startDate), new Instant(endDate));
        expect(periodToTest.contains(new Instant(test))).toBe(false);
    })
})