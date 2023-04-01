import {Moment, Period, Instant} from 'calendar/moment'
import { startOfToday, addDays } from 'date-fns'

const startDate = startOfToday();
const endDate = addDays(startDate, 7);

describe("tests for overlaps", () =>{
    test("GIVEN 2 dates which are equal WHEN overlaps THEN return true", () =>{
      let moment1 = new Moment(startDate);
      let moment2 = new Moment(startDate);
      expect (moment1.overlaps(moment2)).toBe(true);
    })
    test("GIVEN a date and an Instant which are equal WHEN overlaps THEN return true", () =>{
      let moment1 = new Moment(startDate);
      let moment2 = new Moment(new Instant(new Instant(startDate)));
      expect (moment1.overlaps(moment2)).toBe(true);
      expect (moment2.overlaps(moment1)).toBe(true);
    })
    test("GIVEN 2 Instants which are equal WHEN overlaps THEN return true", () =>{
      let moment1 = new Moment(new Instant(new Instant(startDate)));
      let moment2 = new Moment(new Instant(new Instant(startDate)));
      expect (moment1.overlaps(moment2)).toBe(true);
    })

    test("GIVEN 2 dates which are not equal WHEN overlaps THEN return false", () =>{
      let moment1 = new Moment(startDate);
      let moment2 = new Moment(addDays(startDate, 1));
      expect (moment1.overlaps(moment2)).toBe(false);
      expect (moment2.overlaps(moment1)).toBe(false);
    })
    test("GIVEN a date and an Instant which not are equal WHEN overlaps THEN return false", () =>{
      let moment1 = new Moment(startDate);
      let moment2 = new Moment(new Instant(new Instant(addDays(startDate, 1))));
      expect (moment1.overlaps(moment2)).toBe(false);
      expect (moment2.overlaps(moment1)).toBe(false);
    })
    test("GIVEN 2 Instants which are not equal WHEN overlaps THEN return false", () =>{
      let moment1 = new Moment(new Instant(new Instant(startDate)));
      let moment2 = new Moment(new Instant(new Instant(addDays(startDate, 1))));
      expect (moment1.overlaps(moment2)).toBe(false);
      expect (moment2.overlaps(moment1)).toBe(false);
    })

    test("GIVEN a date and a fixed Period and date within Period WHEN overlaps THEN returns true", () =>{
      let moment1 = new Moment(startDate);
      let moment2 = new Moment(new Period(startDate, endDate));
      expect(moment1.overlaps(moment2)).toBe(true);
      expect(moment2.overlaps(moment1)).toBe(true);
    })

    test("GIVEN an Instant and a fixed Period and date within Period WHEN overlaps THEN returns true", () =>{
      let moment1 = new Moment(new Instant(new Instant(startDate)));
      let moment2 = new Moment(new Period(startDate, endDate));
      expect(moment1.overlaps(moment2)).toBe(true);
      expect(moment2.overlaps(moment1)).toBe(true);
    })
    test("Given 2 fixed Periods that intersect WHEN overlaps THEN returns true", () =>{
      let moment1 = new Moment(new Period(startDate, endDate))
      let moment2 = new Moment(new Period(addDays(startDate, 1), addDays(endDate, 1)));
      expect(moment1.overlaps(moment2)).toBe(true);
      expect(moment2.overlaps(moment1)).toBe(true);
    })

    test("Given 2 fixed Periods and one encloses the other WHEN overlaps THEN returns true", () =>{
      let moment1 = new Moment(new Period(startDate, endDate))
      let moment2 = new Moment(new Period(addDays(startDate, 1), addDays(endDate, -1)));
      expect(moment1.overlaps(moment2)).toBe(true);
      expect(moment2.overlaps(moment1)).toBe(true);
    })

    test("GIVEN 2 open end periods WHEN Overlaps then returns true", () =>{
      let moment1 = new Moment(new Period(startDate))
      let moment2 = new Moment(new Period(addDays(startDate, 1)));
      expect(moment1.overlaps(moment2)).toBe(true);
      expect(moment2.overlaps(moment1)).toBe(true);
    })

    test("GIVEN a fixed Period and a date outside of period WHEN overlaps THEN return false", () =>{
      let moment1 = new Moment(addDays(startDate, -1));
      let moment2 = new Moment(new Period(startDate, endDate));
      expect(moment1.overlaps(moment2)).toBe(false);
      expect(moment2.overlaps(moment1)).toBe(false);
    })   

    test("GIVEN a fixed Period and an Instant outside of period WHEN overlaps THEN return false", () =>{
      let moment1 = new Moment(new Instant(new Instant(addDays(startDate, -1))));
      let moment2 = new Moment(new Period(startDate, endDate));
      expect(moment1.overlaps(moment2)).toBe(false);
      expect(moment2.overlaps(moment1)).toBe(false);
    })   

    test("GIVEN 2 fixed periods that do not intersect WHEN overlaps THEN return false", () =>{
      let moment1 = new Moment(new Period(startDate, endDate))
      let moment2 = new Moment(new Period(addDays(endDate, 1), addDays(endDate, 3)));
      expect(moment1.overlaps(moment2)).toBe(false);
      expect(moment2.overlaps(moment1)).toBe(false);
    })


  })