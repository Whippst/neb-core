[back to interface](./timeslice_interface.md)

# Timeslice Class
basic implementation of interface

it maintains the following invariant:
1) All moments must share a common parent
2) All moments in the slice must be of a common Nebula Type. (this doesn't apply to parent)
3) All moments in the slice must be free from overlap
4) The parent's duration must be completely filled

### Methods
| Method | Params | Return Type | Description |
| ------ | ------ | ----------- | ----------- |
| **ctor** | momentList : *Array<IMoment>* | None | constructs a timeslice from an array of moments. It will sort a list that is out of order, but throw ArgumentException if the invariant is not maintained |

