var animals = [
    {name: "Leroy", species:"dog"},
    {name: "Clyde", species:"dog"},
    {name: "Ozzy", species:"cat"},
    {name: "BLAH", species: "alien"}
]
var dogs = animals.filter((animals) => (animals.species === "dog"))
console.log(dogs)

var names = animals.map((animals) => animals.name)
console.log(names)


var orders = [
    {amount: 300},
    {amount: 100},
    {amount : 200}
]

var total = orders.reduce( ((sum, orders) => sum+= orders.amount), 0)
console.log(total)