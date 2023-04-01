import {Moment, Period, Instant} from 'calendar/moment'
import { startOfToday, addDays } from 'date-fns'

const startDate = startOfToday();
const endDate = addDays(startDate, 7);

describe("tests for equals", () =>{
    test("GIVEN 2 dates that are equal WHEN sameAs then returns true", () =>{
      let moment1 = new Moment(startDate);
      let moment2 = new Moment(startDate);
      expect(moment1.equals(moment2)).toBe(true);
    })
    test("GIVEN a date and an Instant that are the equal WHEN equals THEN returns true", () =>{
      let moment1 = new Moment(startDate);
      let moment2 = new Moment(new Instant(new Instant(startDate)));
      expect(moment1.equals(moment2)).toBe(true);
    })
    test("GIVEN an Instant and a date that are equal WHEN equals THEN returns true", () =>{
      let moment1 = new Moment(new Instant(new Instant(startDate)));
      let moment2 = new Moment(startDate);
      expect(moment1.equals(moment2)).toBe(true);
    })
    test("GIVEN 2 Instants that are equal WHEN equals Then returns true", () =>{
      let moment1 = new Moment(new Instant(new Instant(startDate)));
      let moment2 = new Moment(new Instant(new Instant(startDate)));
      expect(moment1.equals(moment2)).toBe(true);
    })

    test("GIVEN 2 Fixed Periods that are equal WHEN equals THEN returns true", () =>{
      let moment1 = new Moment(new Period(startDate, endDate));
      let moment2 = new Moment(new Period(startDate, endDate));
      expect(moment1.equals(moment2)).toBe(true);
    })
    test("GIVEN 2 Open Ended Periods that are equal WHEN equals THEN returns true", () =>{
      let moment1 = new Moment(new Period(startDate));
      let moment2 = new Moment(new Period(startDate));
      expect(moment1.equals(moment2)).toBe(true);
    })

    test("GIVEN 2 dates that are not equal WHEN equals THEN returns false", () => {
      let moment1 = new Moment(startDate);
      let moment2 = new Moment(addDays(startDate, 1));
      expect(moment1.equals(moment2)).toBe(false);
      expect(moment2.equals(moment1)).toBe(false);
    })

    test("GIVEN a date and an Instant that are not equal WHEN equals THEN returns false", () => {
      let moment1 = new Moment(startDate);
      let moment2 = new Moment(new Instant(new Instant(addDays(startDate, 1))));
      expect(moment1.equals(moment2)).toBe(false);
      expect(moment2.equals(moment1)).toBe(false);
    })

    test("GIVEN an Instant and a date that are not equal WHEN equals THEN returns false", () => {
      let moment1 = new Moment(new Instant(new Instant(startDate)));
      let moment2 = new Moment(addDays(startDate, 1));
      expect(moment1.equals(moment2)).toBe(false);
      expect(moment2.equals(moment1)).toBe(false);
    })
    test("GIVEN 2 Instants that are not equal WHEN equals THEN returns false", () => {
      let moment1 = new Moment(new Instant(new Instant(startDate)));
      let moment2 = new Moment(new Instant(new Instant(addDays(startDate, 1))));
      expect(moment1.equals(moment2)).toBe(false);
      expect(moment2.equals(moment1)).toBe(false);
    })
    test("GIVEN 2 fixed Periods that are not equal WHEN equals THEN returns false", () =>{
      // distinct
      let moment1 = new Moment(new Period(startDate, endDate))
      let moment2 = new Moment(new Period(addDays(endDate, 1), addDays(endDate,3)));
      expect(moment1.equals(moment2)).toBe(false);
      expect(moment2.equals(moment1)).toBe(false);

      // intersection
      moment2 = new Moment(new Period(addDays(startDate, 1), addDays(endDate, 1)));
      expect(moment1.equals(moment2)).toBe(false);
      expect(moment2.equals(moment1)).toBe(false);

      // enclosure
      moment2 = new Moment(new Period(addDays(startDate, 1), addDays(endDate, -1)));
      expect(moment1.equals(moment2)).toBe(false);
      expect(moment2.equals(moment1)).toBe(false);
    })

    test("GIVEN 2 open ended Periods that are not equal WHEN equals THEN returns false", () =>{
      let moment1 = new Moment(new Period(startDate))
      let moment2 = new Moment(new Period(endDate));
      expect(moment1.equals(moment2)).toBe(false);
      expect(moment2.equals(moment1)).toBe(false);
    })

    test("GIVEN 2 moments of different type WHEN equals THEN returns false", () =>{
      let moment1 = new Moment(startDate);
      let moment2 = new Moment(new Period(startDate, startDate))
       expect(moment1.equals(moment2)).toBe(false);
      expect(moment2.equals(moment1)).toBe(false);
    })
  })
