[back to module](../moments_module.md)

# Moment Interface (IMoment)
A moment is an abstraction over instants and periods which provide the core abstraction within the Nebula library of time. A moment is a bit of time between startsAt and endsAt where for a timestamp (Instant) these are the same and in a duration (Period) they point to the from and to. A Moment has a parent which represents a duration of some parent representation of time (ultimately Date/Time ) within which the child exists. The child must always be contained by the parent. 

moment provides the basic operators to compare moments in time independant of their representation type. 

### Methods
| Method | Params | Return Type | Description |
| ------ | ------ | ----------- | ----------- |
| **before** | test : *IMoment* | boolean | determines if the effective range of this moment is entirely before the test moment |
| **after** | test : *IMoment* | boolean | determines if the effective range of this moment is entirely after the test moment |
| **equals** | test : *IMoment* | boolean  | determines if the effective range of this moment is entirely equal the test moment |
| **overlaps** | test : *IMoment* | boolean | determines if there is any overlap between this moment and test moment |
| **isWithin** | test : *IMoment* | boolean | determines if the effective range of this moment is entirely within the range of test |

### Properties
| Property | Type | Description |
| -------- | ---- | ----------- |
| **startsAt** | *Date* | the earliest date of the Instance/Period/Date referenced by when |
| **endsAt** | *Date \| undefined* | the latest date of the Instant/Period/Date reference by when if the period is open ended then this will be undefined. if an Instant or Date it will be equal to startsAt | 
| **when** | *Date \| IInstant \| IPeriod* | the time value of this moment |
| **type** | *MomentType* | if when is Period then MomentType.Duration otherwise MomentType.Timestamp |
| **parent** | *IMoment \| undefined* | provides a reference to the Moments Parent if it has one
| **typeName** | *string* | provides the typename of the Period/instant or "Date" |
| **isOpenEnded** | *boolean* | true if Moment is duration and endsAt is undefined else false

### Implementations

[Moment](./moment_class.md) 

---

*included within 'calendar/moment.ts'*