[back to module](./moments_module.md)

# Moment Class
A moment is an abstraction over instants and periods which provide the core abstraction within the Nebula library of time. A moment is a bit of time between startsAt and endsAt where for a timestamp (Instant) these are the same and in a duration (Period) they point to the from and to. A Moment has a parent which represents a duration of some parent representation of time (ultimately Date/Time ) within which the child exists. The child must always be contained by the parent. 

moment provides the basic operators to compare moments in time independant of their representation type. 

---
### [methods](./moment_methods.md)
### [properties](./moment_properties)
