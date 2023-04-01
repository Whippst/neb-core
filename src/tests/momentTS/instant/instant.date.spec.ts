import {Instant} from 'calendar/moment'
import {startOfToday} from 'date-fns'
const dateToTest = startOfToday();

describe("testing date", ()=>{
    test("GIVEN date set in ctor WHEN date THEN date is date set in ctor", () =>{
        let instant = new Instant(dateToTest);
        expect(instant.date).toBe(dateToTest);
    })
    test("GIVEN INSTANT set in ctor WHEN date THEN date set at top level returned ", () =>{
        let grandParent = new Instant(dateToTest);
        let parent = new Instant(grandParent);
        let child = new Instant(parent);
        expect(child.date).toBe(grandParent.value)
    })
})