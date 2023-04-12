[back to module](../moments_module.md)

# Instant Interface (IInstant)
An instant is a representation of an arbritray moment in time, and can be used in the library whereever a date might otherwise be used.

### Methods
| Method | Params | Return Type | Description |
| ------ | ------ | ----------- | ----------- |
| **toString** | *None* | string | Returns the formatted string for the instant, as determined by the instant's type.  |

### Properties
| Property | Type | Description |
| -------- | ---- | ----------- |
| **value** | *Date \| IInstant* | the instance in time represented by this date |
| **date** | *Date* | the resolved instance in time as a Date |
| **typeName** | *string* | The nebula type for the instance. Its this rather than implementation class that determines what representation of time is held |

### Implementations

[Instant](./instant_class.md) 

---

*included in '/calendar/moment.ts'*