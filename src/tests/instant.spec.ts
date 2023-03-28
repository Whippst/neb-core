import {Instant} from 'calendar/moment'
import {startOfToday} from 'date-fns'

describe("testing value", ()=>{
    test("given date, value is set in ctor", () =>{
        let dateToTest = startOfToday();
        let instant = new Instant(dateToTest);
        expect(instant.value).toBe(dateToTest);
    })
    test("given Instant, value is set in ctor", () =>{
        let dateToTest = startOfToday();
        let parent = new Instant(dateToTest);
        let child = new Instant(parent);
        expect(child.value instanceof Instant).toBe(true);
    })
})
describe("testing date", ()=>{
    test("given date set in ctor, date prop is equal to date set", () =>{
        let dateToTest = startOfToday();
        let instant = new Instant(dateToTest);
        expect(instant.date).toBe(dateToTest);
    })
    test("given instant set in ctor, date is the date of first instant in chain of date type", () =>{
        let dateToTest = startOfToday();
        let grandParent = new Instant(dateToTest);
        let parent = new Instant(grandParent);
        let child = new Instant(parent);
        expect(child.date).toBe(grandParent.value)
    })
})