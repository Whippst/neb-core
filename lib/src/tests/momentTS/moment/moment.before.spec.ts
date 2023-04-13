import {Moment, Period, Instant} from 'calendar/moment'
import { startOfToday, addDays } from 'date-fns'

const startDate = startOfToday();
const endDate = addDays(startDate, 7);
describe("tests for before", () =>{
    /* test !before using opposite checks */
    test("GIVEN 2 dates and date 1 before date 2 WHEN moment.before(moment 2) THEN moment 1 returns true and moment2 returns false", () =>{
        let moment1 = new Moment(startDate);
        let moment2 = new Moment(addDays(startDate, 1));
        expect(moment1.before(moment2)).toBe(true);
        expect(moment2.before(moment1)).toBe(false);
    })

    test("GIVEN an Instant and a date and instant before date WHEN moment1.before(moment2) THEN moment 1 returns true and moment2 returns false", () =>{
        let moment1 = new Moment(new Instant(startDate));
        let moment2 = new Moment(addDays(startDate, 1));
        expect(moment1.before(moment2)).toBe(true);
        expect(moment2.before(moment1)).toBe(false);
    })

    test("GIVEN a date and an Instant and date before Instant WHEN moment1.before(moment2) THEN moment 1 returns true and moment2 returns false", () =>{
        let moment1 = new Moment(startDate);
        let moment2 = new Moment(new Instant(addDays(startDate, 1)));
        expect(moment1.before(moment2)).toBe(true);
        expect(moment2.before(moment1)).toBe(false);
    })
    test("GIVEN 2 Instants WHEN moment1.before(moment2) THEN returns true", () =>{
        let moment1 = new Moment(new Instant(startDate));
        let moment2 = new Moment(new Instant(addDays(startDate, 1)));
        expect(moment1.before(moment2)).toBe(true);
        expect(moment2.before(moment1)).toBe(false);
    })

    test("GIVEN a date and a Period and date before Period WHEN moment1.before(moment2) moment 1 returns true and moment2 returns false", () =>{
        let moment1 = new Moment(startDate);
        let moment2 = new Moment(new Period(addDays(startDate, 1)));
        expect(moment1.before(moment2)).toBe(true);
        expect(moment2.before(moment1)).toBe(false);
    })
    
    test("GIVEN a fixed Period and a date and period before date WHEN moment1.before(moment2) THEN moment 1 returns true and moment2 returns false", () =>{
        let moment1 = new Moment(new Period(startDate, endDate));
        let moment2 = new Moment(addDays(endDate, 1));
        expect(moment1.before(moment2)).toBe(true);
        expect(moment2.before(moment1)).toBe(false);
    })
    test("GIVEN an Instant and a Period and Instant before Period WHEN moment1.before(moment2) THEN moment 1 returns true and moment2 returns false", () =>{
        let moment1 = new Moment(new Instant(startDate));
        let moment2 = new Moment(new Period(addDays(startDate, 1)));
        expect(moment1.before(moment2)).toBe(true);
        expect(moment2.before(moment1)).toBe(false);
    })
    test("GIVEN a fixed Period and an Instant and period before Instant WHEN moment1.before(moment2) THEN moment 1 returns true and moment2 returns false", () =>{
        let moment1 = new Moment(new Period(startDate, endDate));
        let moment2 = new Moment(new Instant(addDays(endDate, 1)));
        expect(moment1.before(moment2)).toBe(true);
        expect(moment2.before(moment1)).toBe(false);
    })

    test("GIVEN a fixed Period and another period and fixed period before other period WHEN moment1.before(moment2) THEN moment 1 returns true and moment2 returns false", () =>{
        let moment1 = new Moment(new Period(startDate, endDate));
        let moment2 = new Moment(new Period(addDays(endDate, 1)));
        expect(moment1.before(moment2)).toBe(true);
        expect(moment2.before(moment1)).toBe(false);
    })

    /** test equality states are false */

    test("GIVEN 2 dates that are equal WHEN before THEN returns false", () =>{
      let moment1 = new Moment(startDate);
      let moment2 = new Moment(startDate);
      expect(moment1.before(moment2)).toBe(false);
    })

    test("GIVEN a date and an instant and dates equal WHEN before THEN returns false", () =>{
      let moment1 = new Moment(startDate);
      let moment2 = new Moment(new Instant(new Instant(startDate)));
      expect(moment1.before(moment2)).toBe(false);
    })
    test("GIVEN an instant and a date and dates equal WHEN before THEN returns false", () =>{
      let moment1 = new Moment(startDate);
      let moment2 = new Moment(new Instant(new Instant(startDate)));
      expect(moment1.before(moment2)).toBe(false);
    })
    test("GIVEN 2 instant and dates are equal WHEN before THEN returns false", () =>{
      let moment1 = new Moment(new Instant(new Instant(startDate)));
      let moment2 = new Moment(new Instant(new Instant(startDate)));
      expect(moment1.before(moment2)).toBe(false);
    })
    test("GIVEN a date and a fixed period and date = from WHEN before THEN returns false", () =>{
      let moment1 = new Moment(startDate);
      let moment2 = new Moment(new Period(startDate, endDate));
      expect(moment1.before(moment2)).toBe(false);
    })
    test("GIVEN a fixed period and a date and date = to WHEN before THEN returns false", () =>{
      let moment1 = new Moment(new Period(startDate, endDate));
      let moment2 = new Moment(endDate);
      expect(moment1.before(moment2)).toBe(false);
    })
    test("GIVEN an open ended period and a Date and date = from WHEN before THEN returns false ", () => {
      let moment1 = new Moment(new Period(startDate));
      let moment2 = new Moment(startDate);
      expect(moment1.before(moment2)).toBe(false);
    })

    test("GIVEN an Instant and a fixed period and instant = from WHEN before THEN returns false", () =>{
      let moment1 = new Moment(new Instant(new Instant(startDate)));
      let moment2 = new Moment(new Period(startDate, endDate));
      expect(moment1.before(moment2)).toBe(false);
    })
    test("GIVEN a fixed period an Instantand Instant = to WHEN before THEN returns false", () =>{
      let moment1 = new Moment(new Period(startDate, endDate));
      let moment2 = new Moment(new Instant(new Instant(endDate)));
      expect(moment1.before(moment2)).toBe(false);
    }) 
    test("GIVEN an open ended period an Instant and Instant = from WHEN before THEN returns false ", () => {
      let moment1 = new Moment(new Period(startDate));
      let moment2 = new Moment(new Instant(new Instant(startDate)))
      expect(moment1.before(moment2)).toBe(false);
    })

    test("GIVEN 2 fixed periods and first.to = second.from WHEN before THEN returns false", () =>{
      let moment1 = new Moment(new Period(startDate, endDate));
      let moment2 = new Moment(new Period(endDate, addDays(endDate, 2)));
      expect(moment1.before(moment2)).toBe(false);
    })

    // special states not in above classifications

    test("GIVEN 2 fixed periods and intersection WHEN before THEN returns false", () =>{
      let moment1 = new Moment(new Period(startDate, endDate));
      let moment2 = new Moment(new Period(addDays(startDate, 2), addDays(endDate, 2)));
      expect(moment1.before(moment2)).toBe(false);
    }) 
    test("GIVEN an open ended period a Period and second.from >= first.from WHEN before THEN returns false ", () => {
      let moment1 = new Moment(new Period(startDate));
      let moment2 = new Moment(new Period(startDate, addDays(endDate, 2)));
      expect(moment1.before(moment2)).toBe(false);
    })
  })