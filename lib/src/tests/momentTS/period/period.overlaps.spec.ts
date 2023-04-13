import {Instant, Period} from 'calendar/moment'
import { startOfToday, addDays } from 'date-fns'

const startDate = startOfToday();
const endDate = addDays(startDate, 7 )
describe("tests for overlaps", () =>{
    test("GIVEN both periods are open ended WHEN intersects THEN returns true", () =>{
      let period1 = new Period(startDate);
      let period2 = new Period(endDate);
      expect(period1.overlaps(period2)).toBe(true);
      expect(period2.overlaps(period1)).toBe(true);
    })  
    test("GIVEN period 1 to = period 2 from WHEN intersects THEN returns true", () =>{
      let period1 = new Period(startDate, endDate);
      let period2 = new Period(endDate);
      expect(period1.overlaps(period2)).toBe(true);
      expect(period2.overlaps(period1)).toBe(true);
    })
  
    test("GIVEN period 1 to after period 2 from WHEN intersects THEN returns true", () =>{
      let period1 = new Period(startDate, addDays(endDate, 1));
      let period2 = new Period(endDate);
      expect(period1.overlaps(period2)).toBe(true);
      expect(period2.overlaps(period1)).toBe(true);
    })
  
    test("GIVEN period 1 encloses period 2 WHEN intersects THEN returns true", () =>{
      let period1 = new Period(startDate, endDate);
      let period2 = new Period(addDays(startDate, 1), addDays(endDate, -1) );
      expect(period1.overlaps(period2)).toBe(true);
      expect(period2.overlaps(period1)).toBe(true);
    })
    test("GIVEN no overlap WHEN intersects THEN returns false", () =>{
      let period1 = new Period(startDate, endDate);
      let period2 = new Period(addDays(endDate, 1), addDays(endDate, 2) );
      expect(period1.overlaps(period2)).toBe(false);
      expect(period2.overlaps(period1)).toBe(false);
    })
  
    test("GIVEN both periods in Instants and OVERLAP THEN returns true", () =>{
      let period1 = new Period(new Instant(new Instant(startDate)));
      let period2 = new Period(new Instant(new Instant(endDate)));
      expect(period1.overlaps(period2)).toBe(true);
      expect(period2.overlaps(period1)).toBe(true);
    })
  
    test("GIVEN both periods in Instants and no OVERLAP THEN returns false", () =>{
      let period1 = new Period(new Instant(new Instant(startDate)), new Instant(new Instant(endDate)));
      let period2 = new Period(new Instant(new Instant(addDays(endDate,1))));
      expect(period1.overlaps(period2)).toBe(false);
      expect(period2.overlaps(period1)).toBe(false);
    })
  
    test("GIVEN one period in Instants and OVERLAP THEN returns true", () =>{
      let period1 = new Period(new Instant(new Instant(startDate)));
      let period2 = new Period(endDate);
      expect(period1.overlaps(period2)).toBe(true);
      expect(period2.overlaps(period1)).toBe(true);
    })
  
    test("GIVEN one period in Instants and no OVERLAP THEN returns false", () =>{
      let period1 = new Period(new Instant(new Instant(startDate)), new Instant(new Instant(endDate)));
      let period2 = new Period(addDays(endDate,1));
      expect(period1.overlaps(period2)).toBe(false);
      expect(period2.overlaps(period1)).toBe(false);
    })
  
  })