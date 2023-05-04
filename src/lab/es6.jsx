const person = {
  name: 'Andy',
  age: 40,
  location: {
    city: 'Auckland',
    postcode: 2012
  }
}

const { name: firstname = 'Anonymous', age, location } = person // default value and rename variable
const { city, postcode: zip } = location // rename variable
