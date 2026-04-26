import { CarryOnLuggage } from './models/CarryOnLuggage'
import { FragileLuggage } from './models/FragileLuggage'
import { ListOfLuggages } from './models/ListOfLuggages'
import { RegularLuggage } from './models/RegularLuggage'
import { Priority } from './types/Priority'

const fragileLuggage = new FragileLuggage(
  10,
  'Box with fragile items',
  Priority.Normal,
  100,
)
const regularLuggage = new RegularLuggage(
  30,
  'Luggage full of clothes',
  Priority.Priority,
)
const carryOnLuggage = new CarryOnLuggage(
  6,
  'Luggage with personal items',
  Priority.Urgent,
)

const list = new ListOfLuggages()
list.insertLuggage(fragileLuggage)
list.insertLuggage(regularLuggage)

list.printAllLuggages()
list.priceOfEachLuggage()

console.log(list.totalPrice())
console.log(list.getFragileLuggageWithInsurance())
