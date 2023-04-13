[back to calendar](../calendar.md)

# TimeSlice Interface (ITimeSlice)
A time slice is a contiguous set of moments completely filling the the duration of a common parent moment. The parent must therefore be a duration. this simple 2 level tree structure is therefore a unit which can allow intersections of a set of moments to be assessed. as well as to allow a parent to be broken down into smaller units. 

### Methods
| Method | Params | Return Type | Description |
| ------ | ------ | ----------- | ----------- |
| **get** | index : *number* | IMoment | returns the moment at specified index position in the slice |
| **getCorresponding** | selection : *Date \| IMoment \| IInstant* | IMoment \| undefined | returns the moment in the slice that corresponds to the to the date or startsAt property of the selection or undefined if the selction lies outside the slice |
| **getCorrespondingRange** | selection : *IPeriod \| IMoment* | ITimeSlice \| undefined | returns a TimeSlice  that correspond to an overlap with selection or undefined if there is no overlap |

### Properties
| Property | Type | Description |
| -------- | ---- | ----------- |
| **length** | number | the number of child moments in the time slice |
| **first** | IMoment | the first child moment in the slice |
| **last**  | IMoment | the last child moment in the slice |
### Implementations

[TimeSlice](timeslice_class.md)
---

*included in calendar/timeslice.ts*