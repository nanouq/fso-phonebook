const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Pass the password as an argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://kaitlynhdev:${password}@cluster0.1pzkgif.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})



const Person = mongoose.model('Person', personSchema)
if (process.argv[3]) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    person.save().then(result => {
    console.log('Person added:', result.name, result.number)
    mongoose.connection.close()
})
}
else {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}
// const person = new Person({
//     name: 'Example Name',
//     number: '123-456-7890',
// })

