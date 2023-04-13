[back to module](../moments_module.md)

# Period Interface (IPeriod)
A period represents a time span between from and to, where to can be undefined and thus the period can stretch for an indefinite period. 

### Methods
| Method | Params | Return Type | Description |
| ------ | ------ | ----------- | ----------- |
| **contains** | when : *Date \| IInstant* | boolean | tests if when is within this period inclusive of from and to |
| **overlaps** | period : *IPeriod* | boolean | tests if the periods overlap each other inclusive of from and to | 
| **encloses** | period : *IPeriod* | boolean | tests if period is entirely within the range of this period inclsive of from and to |
| **toString** | None | string | returns the formatted string representation of this period |

### Properties
| Property | Type | Description |
| -------- | ---- | ----------- |
| **from** | *Date \| IInstant* | returns the representation of the start of the period |
| **to** | *Date \| IInstant \| undefined* | returns the representation of the end of the period, if open-ended then this will be undefined |
| **fromDate** | Date | returns the Date representation of the start of the period |
| **toDate** | *Date \| undefined* | returns the date representation of the end of the period, if open-ended then this will be undefined |
| **typeName** | *string* | returns the Nebula Type of the Period |

### Implementations

[Period](./period_class.md)

---

*included in '/calendar/moment.ts'*