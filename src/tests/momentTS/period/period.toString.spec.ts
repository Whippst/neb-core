import {Instant, Period, PeriodDescriptor} from 'calendar/moment'
import { startOfToday, addDays } from 'date-fns'

const startDate = startOfToday();
const endDate = addDays(startDate, 7 )
describe("tests for toString", () => {
    test("GIVEN an open ended Period with date WHEN toString THEN returns correctly formatted value", () =>{
        let periodToTest = new Period(startDate);
        expect(periodToTest.toString()).toBe(`from ${startDate}`)
    })

    test("GIVEN an fixed Period with date WHEN toString THEN returns correctly formatted value", () =>{
        let periodToTest = new Period(startDate, endDate);
        expect(periodToTest.toString()).toBe(`from ${startDate} to ${endDate}`)
    })

    test("GIVEN an open ended Period with Instant and no descriptor WHEN toString THEN returns correctly formatted value", () =>{
        let periodToTest = new Period(new Instant(new Instant(startDate)));
        expect(periodToTest.toString()).toBe(`from ${startDate}`)
    })

    test("GIVEN an fixed Period with Instant WHEN toString THEN returns correctly formatted value", () =>{
        let periodToTest = new Period(new Instant(startDate), new Instant(endDate));
        expect(periodToTest.toString()).toBe(`from ${startDate} to ${endDate}`)
    })

    test("GIVEN a period with a descriptor WHEN toString THEN returns descriptor string ", () => {
        class TestPeriodDescriptor implements PeriodDescriptor
        {
            toString(): string {
                return "test string"
            }
            typeString(): string {
                return "test type"
            }
        }

        var periodToTest = new Period(startDate, endDate, new TestPeriodDescriptor())
        expect(periodToTest.toString()).toBe('test string');
    })
})