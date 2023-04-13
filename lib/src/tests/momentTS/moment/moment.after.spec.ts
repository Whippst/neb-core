import {Moment, Period, Instant} from 'calendar/moment'
import { startOfToday, addDays } from 'date-fns'

const startDate = startOfToday();
const endDate = addDays(startDate, 7);
describe("Tests for after", () =>{
    /* test !after using opposite checks */
    test("GIVEN 2 dates and first later than second WHEN after THEN moment 1 returns true and moment2 returns false", () =>{
      let moment1 = new Moment(addDays(startDate, 1));
      let moment2 = new Moment(startDate);
      expect(moment1.after(moment2)).toBe(true); 
      expect(moment2.after(moment1)).toBe(false);
    })
    test("GIVEN a date and an Instant and first later than second WHEN after THEN moment 1 returns true and moment2 returns false", () =>{
      let moment1 = new Moment(addDays(startDate, 1));
      let moment2 = new Moment(new Instant(new Instant(startDate)));
      expect(moment1.after(moment2)).toBe(true); 
      expect(moment2.after(moment1)).toBe(false);
    })
    test("GIVEN an instant and a date and first later than second WHEN after THEN moment 1 returns true and moment2 returns false", () =>{
      let moment1 = new Moment(new Instant(new Instant(addDays(startDate, 1))));
      let moment2 = new Moment(startDate);
      expect(moment1.after(moment2)).toBe(true); 
      expect(moment2.after(moment1)).toBe(false);
    })
    test("GIVEN 2 instants and first later than second WHEN after THEN moment 1 returns true and moment2 returns false", () =>{
      let moment1 = new Moment(new Instant(new Instant(addDays(startDate, 1))));
      let moment2 = new Moment(new Instant(new Instant(startDate)));
      expect(moment1.after(moment2)).toBe(true); 
      expect(moment2.after(moment1)).toBe(false);
    })

    test("GIVEN a date and a fixed Period and date after to WHEN after THEN moment 1 returns true and moment2 returns false", () =>{
      let moment1 = new Moment(addDays(endDate, 1));
      let moment2 = new Moment(new Period(startDate, endDate));
      expect(moment1.after(moment2)).toBe(true); 
      expect(moment2.after(moment1)).toBe(false);
    })
    test("GIVEN a Period and a date and from after date WHEN after THEN returns true", () =>{
      let moment1 = new Moment(new Period(startDate, endDate));
      let moment2 = new Moment(addDays(startDate, -1));
      expect(moment1.after(moment2)).toBe(true); 
      expect(moment2.after(moment1)).toBe(false);
    })

    test("GIVEN an Instant and a fixed Period and Instant after to WHEN after THEN moment 1 returns true and moment2 returns false", () =>{
      let moment1 = new Moment(new Instant(new Instant(addDays(endDate, 1))));
      let moment2 = new Moment(new Period(startDate, endDate));
      expect(moment1.after(moment2)).toBe(true); 
      expect(moment2.after(moment1)).toBe(false);
    })
    test("GIVEN a Period and an Instant and from after Instant WHEN after THEN moment 1 returns true and moment2 returns false", () =>{
      let moment1 = new Moment(new Period(startDate, endDate));
      let moment2 = new Moment(new Instant(new Instant(addDays(startDate, -1))));
      expect(moment1.after(moment2)).toBe(true); 
      expect(moment2.after(moment1)).toBe(false);
    })
    test("GIVEN 2 fixed Periods and first.from after second.to WHEN after THEN moment 1 returns true and moment2 returns false", () =>{
      let moment1 = new Moment(new Period(addDays(endDate, 1), addDays(endDate, 2)));
      let moment2 = new Moment(new Period(startDate, endDate));
      expect(moment1.after(moment2)).toBe(true); 
      expect(moment2.after(moment1)).toBe(false);
    })

    /* equality checks to ensure false*/

    test("GIVEN 2 dates that are equal WHEN after THEN returns false", () => {
      let moment1 = new Moment(startDate);
      let moment2 = new Moment(startDate);
      expect(moment1.after(moment2)).toBe(false);
    })
    
    test("GIVEN a date and an Instant that are equal WHEN after THEN returns false", () => {
      let moment1 = new Moment(startDate);
      let moment2 = new Moment(new Instant(new Instant(startDate)));
      expect(moment1.after(moment2)).toBe(false);
    })

    test("GIVEN an Instant and a date that are equal WHEN after THEN returns false", () => {
      let moment1 = new Moment(new Instant(new Instant(startDate)));
      let moment2 = new Moment(startDate);
      expect(moment1.after(moment2)).toBe(false);
    })
    test("GIVEN 2 Instants that are equal WHEN after THEN returns false", () => {
      let moment1 = new Moment(new Instant(new Instant(startDate)));
      let moment2 = new Moment(new Instant(new Instant(startDate)));
      expect(moment1.after(moment2)).toBe(false);
    })
    test("GIVEN a date and a fixed Period and date = to WHEN after THEN return false", () =>{
      let moment1 = new Moment(endDate);
      let moment2 = new Moment(new Period(startDate, endDate))
      expect(moment1.after(moment2)).toBe(false);
    })
    test("GIVEN a period and a date and from = date WHEN after THEN returns false", () =>{
      let moment1 = new Moment(new Period(startDate));
      let moment2 = new Moment(startDate);
      expect(moment1.after(moment2)).toBe(false);
    })

    test("GIVEN an Instant and a fixed Period and date = to WHEN after THEN return false", () =>{
      let moment1 = new Moment(new Instant(new Instant(endDate)));
      let moment2 = new Moment(new Period(startDate, endDate))
      expect(moment1.after(moment2)).toBe(false);
    })
    test("GIVEN a period and an Instant and from = date WHEN after THEN returns false", () =>{
      let moment1 = new Moment(new Period(startDate));
      let moment2 = new Moment(new Instant(new Instant(startDate)));
      expect(moment1.after(moment2)).toBe(false);
    })
    test("GIVEN 2 fixed Periods and an intersection WHEN after THEN both return false", () =>{
      let moment1 = new Moment(new Period(startDate, endDate))
      let moment2 = new Moment(new Period(addDays(startDate, 2), addDays(endDate, 2)));
      expect(moment1.after(moment2)).toBe(false); 
      expect(moment2.after(moment1)).toBe(false);
    })
    test("GIVEN 2 fixed Periods and an enclosure WHEN after THEN both return false", () =>{
      let moment1 = new Moment(new Period(startDate, endDate))
      let moment2 = new Moment(new Period(addDays(startDate, -2), addDays(endDate, 2)));
      expect(moment1.after(moment2)).toBe(false); 
      expect(moment2.after(moment1)).toBe(false);
    })

    // other checks 
    test("GIVEN a date and an open ended period WHEN after THEN returns false", () =>{
      let moment1 = new Moment(endDate);
      let moment2 = new Moment(new Period(startDate));
      expect(moment1.after(moment2)).toBe(false); 
    })

    test("GIVEN an Instant and an open ended period WHEN after THEN returns false", () =>{
      let moment1 = new Moment(new Instant(new Instant(endDate)));
      let moment2 = new Moment(new Period(startDate));
      expect(moment1.after(moment2)).toBe(false); 
    })

    test("GIVEN an Open Ended Period and a Period WHEN after then returns false", () =>{
      let moment1 = new Moment(new Period(endDate));
      let moment2 = new Moment(new Period(startDate));
      expect(moment1.after(moment2)).toBe(false); 
    })
  })