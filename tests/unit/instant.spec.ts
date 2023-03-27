import {Instant} from "calendar/moment"

describe("sample test", () =>{
    test("some test", () =>{
        let x = new Instant(new Date());
        let testVal = x.value == x.value
        expect(testVal).toEqual(true)
    })
})