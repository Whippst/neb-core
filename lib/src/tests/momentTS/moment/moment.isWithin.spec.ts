import {Moment, Period, Instant} from 'calendar/moment'
import { startOfToday, addDays } from 'date-fns'

const startDate = startOfToday();
const endDate = addDays(startDate, 7);
describe("Tests for isWithin", () =>{
    test("Given 2 dates that are equal WHEN isWithin THEN returns true", () =>{
      let moment1 = new Moment(startDate);
      let moment2 = new Moment(startDate);
      expect(moment1.isWithin(moment2)).toBe(true);
    })
    test("GIVEN a date and an Instant which are equal WHEN isWithin THEN return true", () =>{
      let moment1 = new Moment(startDate);
      let moment2 = new Moment(new Instant(new Instant(startDate)));
      expect(moment1.isWithin(moment2)).toBe(true);
    })

    test("GIVEN an Instant and a date which are equal WHEN isWithin THEN return true", () =>{
      let moment1 = new Moment(new Instant(new Instant(startDate)));
      let moment2 = new Moment(startDate);
      
      expect(moment1.isWithin(moment2)).toBe(true);
    })

    test("GIVEN 2 Instants that are equal WHEN isWithin THEN returns true", () =>{
      let moment1 = new Moment(new Instant(new Instant(startDate)));
      let moment2 = new Moment(new Instant(new Instant(startDate)));
      
      expect(moment1.isWithin(moment2)).toBe(true);
    })

    test("GIVEN 2 dates that are not equal WHEN isWithin THEN returns false", () =>{
      let moment1 = new Moment(startDate);
      let moment2 = new Moment(addDays(startDate, 1));
      expect(moment1.isWithin(moment2)).toBe(false);
      expect(moment2.isWithin(moment1)).toBe(false);
    })
    test("GIVEN a date and an Instant which not are equal WHEN isWithin THEN returns false", () =>{
      let moment1 = new Moment(startDate);
      let moment2 = new Moment(new Instant(new Instant(addDays(startDate, 1))));
      expect(moment1.isWithin(moment2)).toBe(false);
      expect(moment2.isWithin(moment1)).toBe(false);
    })

    test("GIVEN an Instant and a date which not are equal WHEN isWithin THEN returns false", () =>{
      let moment1 = new Moment(new Instant(new Instant(startDate)));
      let moment2 = new Moment(addDays(startDate, 1));
      
      expect(moment1.isWithin(moment2)).toBe(false);
      expect(moment2.isWithin(moment1)).toBe(false);
    })

    test("GIVEN 2 Instants that are not equal WHEN isWithin THEN returns false", () =>{
      let moment1 = new Moment(new Instant(new Instant(startDate)));
      let moment2 = new Moment(new Instant(new Instant(addDays(startDate, 1))));
      
      expect(moment1.isWithin(moment2)).toBe(false);
      expect(moment2.isWithin(moment1)).toBe(false);
    })

    test("GIVEN 2 Fixed Periods that are equal WHEN isWithin THEN returns true", () =>{
      let moment1 = new Moment(new Period(startDate, endDate));
      let moment2 = new Moment(new Period(startDate, endDate));
      expect(moment1.isWithin(moment2)).toBe(true);

    })

    test("GIVEN 2 Open Ended Periods that are equal WHEN isWithin THEN returns true", () =>{
      let moment1 = new Moment(new Period(startDate));
      let moment2 = new Moment(new Period(startDate));
      expect(moment1.isWithin(moment2)).toBe(true);
    })

    test("GIVEN a duration and a timestamp WHEN isWIthin THEN returns false", () =>{
      let periodMoment = new Moment(new Period(startDate, startDate))
      let dateMoment = new Moment(startDate);
      let instantMoment = new Moment(new Instant(new Instant(startDate)));

      expect(periodMoment.isWithin(dateMoment)).toBe(false);
      expect(periodMoment.isWithin(instantMoment)).toBe(false);
    })
    test("GIVEN a timestamp and a duration and timestamp outside duration WHEN isWithin THEN returns false", () =>{
      let periodMoment = new Moment(new Period(addDays(startDate, 1), endDate))
      let dateMoment = new Moment(startDate);
      let instantMoment = new Moment(new Instant(new Instant(startDate)));

      expect(periodMoment.isWithin(dateMoment)).toBe(false);
      expect(periodMoment.isWithin(instantMoment)).toBe(false);

      dateMoment = new Moment(addDays(endDate, 1));
      instantMoment = new Moment(new Instant(new Instant(addDays(endDate, 1))));

      expect(periodMoment.isWithin(dateMoment)).toBe(false);
      expect(periodMoment.isWithin(instantMoment)).toBe(false);
    })

    test("GIVEN a timestamp and a fixed duration and timestamp within duration WHEN isWithin then returns true", () =>{
      let periodMoment = new Moment(new Period(startDate, endDate))
      let dateMoment = new Moment(startDate);
      let instantMoment = new Moment(new Instant(new Instant(startDate)));

      expect(dateMoment.isWithin(periodMoment)).toBe(true);
      expect(instantMoment.isWithin(periodMoment)).toBe(true);
    })

    test("GIVEN 2 fixed duration and one encloses the other WHEN isWithin THEN returns true if enclosed or false ", () =>{
      let period1 = new Moment(new Period(startDate, endDate));
      let period2 = new Moment(new Period(addDays(startDate,1), addDays(endDate, -1)));

      expect (period1.isWithin(period2)).toBe(false);
      expect (period2.isWithin(period1)).toBe(true);
    })

    test("GIVEN 2 open ended Periods which are not equal WHEN isWithin THEN outer returns true and inner returns fale ", () =>{
      let period1 = new Moment(new Period(startDate))
      let period2 = new Moment(new Period(addDays(startDate, 1)))

      expect(period1.isWithin(period2)).toBe(false);
      expect(period2.isWithin(period1)).toBe(true);
    })

  })