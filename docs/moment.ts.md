# date and range abstraction module.

This module contains the classes necessary to abstract times and durations into a single Moment class that can be used to represent them in date arbitrary structures wihtin the rest of the library and client. All classes are immutable and provide no mechanisms with which to create copies. 

## Moment Class
A moment is an abstraction over instants and periods which provide the core abstraction within the Nebula library of time. A moment is a bit of time between startsAt and endsAt where for a timestamp (Instant) these are the same and in a duration (Period) they point to the from and to. A Moment has a parent which represents a duration of some parent representation of time (ultimately Date/Time ) within which the child exists. The child must always be contained by the parent. 

moment provides the basic operators to compare moments in time independant of their representation type. 

### methods

### ctor
#### params : 
    when : Date | Instant | Period : The time over which the moment describes
    parent : Moment (optional) : The parent time structure within which the moment is contained
#### return type : 
    none
#### description :
    contructs an instance of the class based around the when specified. If the optional parent is specified then the when exists within the parent moment and ts resolved dates must lie within the resolved date range of the parent. The moments type is inferred from the type of the provided when. 
 

### properties

### startsAt : Date : 
     the earliest date of the Instance/Period/Date referenced by when 
### endsAt : Date | undefined :
    the latest date of the Instant/Period/Date held in when , if the period is open ended then this will be undefined. if an Instant or Date it will be equal to startsAt  
### when : Date | instant | Period 
    the When provided in the ctor. 
### type : MomentType
    if when is Period then MomentType.Duration otherwise MomentType.Timestamp
### parent : Moment | undefined
    provides a reference to the Moments Parent if it has ne
### typeName : string 
    provides the typename of the Period/instant or "Date"
## Period Class
A period represents a time span between from and to, where to can be undefined and thus the period can stretch for an indefinite period. 

## Instant Class
An instant is a representation of an arbritray moment in time, and can be used in the library whereever a date might otherwise be used.