[back to methods](./moment_methods.md)

# ctor
**params** : 

**when** : *Date | Instant | Period* : 
> The time over which the moment describes

**parent** : *Moment (optional)* : 
>The parent time structure within which the moment is contained

**return type** : 
>none

**description** :
> contructs an instance of the class based around the when specified. If the optional parent is specified then the when exists within the parent moment and ts resolved dates must lie within the resolved date range of the parent. The moments type is inferred from the type of the provided when. 