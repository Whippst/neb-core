import {Moment, Period, Instant} from 'calendar/moment'
import { startOfToday, addDays } from 'date-fns'

const startDate = startOfToday();
const endDate = addDays(startDate, 7);
describe("tests for endsAt", () =>{
    test("GIVEN when is date WHEN endsAt THEN returns startDate", () =>{
      let moment = new Moment(startDate);
      expect(moment.endsAt).toBe(startDate)
    })  
  
    test("GIVEN when is Instant WHEN endsAt THEN returns startDate", () =>{
      let moment = new Moment(new Instant(startDate));
      expect(moment.endsAt as Date).toEqual(startDate)
    })  
  
    test("GIVEN when is fixed Period WHEN endsAt THEN returns endDate", () =>{
      let moment = new Moment(new Period(startDate, endDate));
      expect(moment.endsAt).toBe(endDate)
    })  
  
    test("GIVEN when is open ended Period WHEN endsAt THEN returns undefined", () =>{
        let moment = new Moment(new Period(startDate));
        expect(moment.endsAt).toBe(undefined)
      })  
  })
