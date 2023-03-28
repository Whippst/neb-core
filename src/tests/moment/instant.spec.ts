import {Instant} from 'calendar/moment'
import {startOfToday} from 'date-fns'

describe("testing value", ()=>{
    test("GIVEN date WHEN ctor THEN value is set", () =>{
        let dateToTest = startOfToday();
        let instant = new Instant(dateToTest);
        expect(instant.value).toBe(dateToTest);
    })
    test("GIVEN Instant WHEN ctor THEN value is set", () =>{
        let dateToTest = startOfToday();
        let parent = new Instant(dateToTest);
        let child = new Instant(parent);
        expect(child.value instanceof Instant).toBe(true);
    })
})
describe("testing date", ()=>{
    test("GIVEN date set in ctor WHEN date THEN date is date set in ctor", () =>{
        let dateToTest = startOfToday();
        let instant = new Instant(dateToTest);
        expect(instant.date).toBe(dateToTest);
    })
    test("GIVEN INSTANT set in ctor WHEN date THEN date set at top level returned ", () =>{
        let dateToTest = startOfToday();
        let grandParent = new Instant(dateToTest);
        let parent = new Instant(grandParent);
        let child = new Instant(parent);
        expect(child.date).toBe(grandParent.value)
    })
})