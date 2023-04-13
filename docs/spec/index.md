# Nebula Core

## Specification

**Brief**

Nebula Core will hold key datastructures and algorithms for management of Nebula Resources. 

Version 1.0

**Calendar Support**
- manage abstract time periods, based upon a business's internal calendar in a way that can be easily managed and distributed between apps 
- should provide following features
    - creation of tree of structures
    - structures should all be rooted within real date/time as their fundamental value(s)
    - allow easy construction of units 
    - allow conversion between units
    - allow comparison between units regardless of their type
    - allow for units to be a specific moment in time ('timeStamp') or a period of time
    - periods of time may be open ended
    - filling of a parent unit with smaller units 
    - ability to check for overlaps and or containment of any unit by another
    - ability to resize any duration in a manner that takes accounts of any invariants with other units. for instance, if a child, then it must not violate containment by the parent, and if also filling the parent then it cannot overlap siblings. These invariants will need to be further described on a case by case basis
- in addition to core features, support must be provided to facilitate the storage and retrieval of these structures and references to them in data stores

**Identity Support**
- manage the concept of entities that may exist across apps in a consistent manner, such that one system can always find and easuilly access global data
in a safe manner decoupled from changes in so far as possible.   
- the following features such be provided by the system
    - support efficient system access and storage of identity keys
    - support standard and simple querying for objects of the identity in a uniform fashion
    - support the idea of uniqueness across both, but equally allow for partial matches where necessary and return collections
    - type is a nebula type, not a representation type etc. 
    - compare keys where type is the primary. that is the key 1 stored as a PersonId is not the same as the key 1 for a OrderId, but might be the same as the key "1" stored as a PersonId. There is no formal requirement that 1 and "1" are equal however. This is left to the Representation used.
    - support for composite values
    - object and dataset awareness: i.e. that a key is a reference to values within the datastructure it is identifying, these are termed the raw key values. 
    - support for foreign key relationships, this comes into query standardisation below.   

**Query Standardisation**
- provide primitives to allow simple consistent queries to Nebula systems to support the creation of common abstract components to various API endpoints. This shouldn't be prescriptive upon the specific needs of a query and server support for such, rather its a prescription upon the protocol by which they communicate such and thus standardize the interaction. 
- should provide support for
    - queries based upon matches and/or partial matches of a key, multiple search fields are defined through the definition of composite 
    - keys and therefore identity can be locally defined upon a dto for this purpose, that is in so far as querying is concerned Identity need not match identity of a persisted object. Rather it matches onto Nebula Objects and Datasets independent upon server side details. 
    - should provide also for filters based upon composite values defined  
- whilst support for submission of data is planned, it will not be defined at this point cause the requirements are not clear.   

**Scheduled Tasks**
- provide primitives/engine to support the scheduling of events and functions in apps in a manner that can use the Calendar in its scheduling
- should provide regular features such as 
    - repeating tasks, per Calendar unit
    - respeatng tasks every n calendar unit 
    - retry n times every m calendar unit (usually this would be orimitive mins or hours, but calendar should permit custom units if required)
    - history tracking 
    - exception logging 