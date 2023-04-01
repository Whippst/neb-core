import {Instant} from 'calendar/moment'
import {startOfToday} from 'date-fns'
const dateToTest = startOfToday();

describe("testing ctor", ()=>{
    test("GIVEN date WHEN ctor THEN value is set", () =>{
        
        let instant = new Instant(dateToTest);
        expect(instant.value).toBe(dateToTest);
    })
    test("GIVEN Instant WHEN ctor THEN value is set", () =>{
        let parent = new Instant(dateToTest);
        let child = new Instant(parent);
        expect(child.value instanceof Instant).toBe(true);
    })
})