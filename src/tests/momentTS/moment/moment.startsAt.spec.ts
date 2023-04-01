import {Moment, Period, Instant} from 'calendar/moment'
import { startOfToday } from 'date-fns'

const startDate = startOfToday();

describe("tests for startsAt", () =>{
    test("GIVEN when is date WHEN startsAt THEN returns date", () =>{
      let moment = new Moment(startDate);
      expect(moment.startsAt).toBe(startDate)
    })  
  
    test("GIVEN when is Instant WHEN startsAt THEN returns date", () =>{
      let moment = new Moment(new Instant(startDate));
      expect(moment.startsAt).toBe(startDate)
    })  
  
    test("GIVEN when is Period WHEN startsAt THEN returns date", () =>{
      let moment = new Moment(new Period(startDate));
      expect(moment.startsAt).toBe(startDate)
    })  
  })
  