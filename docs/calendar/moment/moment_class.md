[back to interface](./moment_interface.md)

# Moment class
default simple implementation of the interface.

### Methods
| Method | Params | Return Type | Description |
| ------ | ------ | ----------- | ----------- |
| ctor |  **when** : *Date \| IInstant \| IPeriod*, **parent** : *IMoment (optional)* | None | contructs an instance of the class based around the when specified. If the optional parent is specified then the when exists within the parent moment and ts resolved dates must lie within the resolved date range of the parent. The moments type is inferred from the type of the provided when. |