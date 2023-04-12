[back to implementations](./moment_implementations.md)

# Moment class
default simple implementation of the interface.

**constructor** : 

**when** : *Date | IInstant | IPeriod* : 
> The time over which the moment describes

**parent** : *IMoment (optional)* : 
>The parent time structure within which the moment is contained

---

contructs an instance of the class based around the when specified. If the optional parent is specified then the when exists within the parent moment and ts resolved dates must lie within the resolved date range of the parent. The moments type is inferred from the type of the provided when. 