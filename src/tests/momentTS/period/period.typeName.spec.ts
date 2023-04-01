import { Period, PeriodDescriptor} from 'calendar/moment'
import { startOfToday, addDays } from 'date-fns'

const startDate = startOfToday();
const endDate = addDays(startDate, 7 )
describe("tests for typeName", () =>{
    test("GIVEN no descriptor WHEN typeName THEN returns 'Period'", () =>{
        expect(new Period(startDate).typeName).toBe('Period');
    })
    test("GIVEN a period with descriptor WHEN typeName THEN returns descriptor string", () =>{
        class TestPeriodDescriptor implements PeriodDescriptor
        {
            toString(): string {
                return "test string"
            }
            typeString(): string {
                return "test type"
            }
        }
        expect(new Period(startDate, endDate, new TestPeriodDescriptor()).typeName).toBe('test type');
    })
})