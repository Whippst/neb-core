import { IDescriptor } from 'calendar/moment';
import {Moment, Period, Instant} from 'calendar/moment'
import { startOfToday, addDays, formatISO } from 'date-fns'

const startDate = startOfToday();
const endDate = addDays(startDate, 7);
describe("tests for toString", () => {

    test("GIVEN a date WHEN tostring THEN returns ISO representation", () => {
      let expectedResult = formatISO(startDate);
      let momentToTest = new Moment(startDate);
      expect(momentToTest.toString()).toBe(expectedResult);
    })

    test("GIVEN an Instant or Period WHEN toString THEN returns the representation by descriptor", () =>{
      
      class TestInstantDescriptor {
        private _value : Date
        constructor(date : Date){
          this._value = date;
        }
        toString(): string {
          return `Effective Date: ${formatISO(this._value)}`
        }
        typeString(): string {
          return "test type"
        }
      };
      
      class TestPeriodDescriptor {
        private _from : Date;
        private _to : Date;
        constructor(from : Date, to : Date ){
          this._from = from;
          this._to = to;
        }
        toString(): string {
          return `from ${this._from} to ${this._to}`
        }
        typeString(): string {
          return "test type"
        }
      };
      
      let instantToTest = new Instant(startDate, new TestInstantDescriptor(startDate));
      let periodToTest = new Period(startDate, endDate, new TestPeriodDescriptor(startDate, endDate));

      let moment1 = new Moment(instantToTest);
      let moment2 = new Moment(periodToTest);

      expect(moment1.toString()).toBe(`Effective Date: ${formatISO(startDate)}`)
      expect(moment2.toString()).toBe(`from ${startDate} to ${endDate}`)
    })
  })