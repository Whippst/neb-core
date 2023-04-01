import { InstantDescriptor } from 'calendar/moment';
import { PeriodDescriptor } from 'calendar/moment';
import {Moment, Period, Instant} from 'calendar/moment'
import { startOfToday, addDays, formatISO } from 'date-fns'

const startDate = startOfToday();
const endDate = addDays(startDate, 7);
describe("tests for typeName", () => {
    test("GIVEN a date WHEN typeName THEN return 'Date'", () =>{
      let momentToTest = new Moment(startDate);
      expect(momentToTest.typeName).toBe("Date");
    })
    test("GIVEN an Instant or a Period WHEN typeName then return when.typeName", () =>{
      class TestInstantDescriptor implements InstantDescriptor{
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
      
      class TestPeriodDescriptor implements PeriodDescriptor{
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

      expect(moment1.typeName).toBe("test type")
      expect(moment2.typeName).toBe("test type")

    })



  })