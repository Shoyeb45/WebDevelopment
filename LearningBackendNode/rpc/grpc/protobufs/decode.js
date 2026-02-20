import proto from "protobufjs";
import fs from "fs";


proto.load("message.proto").then(root => {
    // obtain the person message type
    const Person = root.lookup('Person');

    if (!Person) throw new Error('No Person message type found.');

    const person = { name: 'Shoyeb', age: 21 };

    // serialize person to a buffer
    const buffer = Person.encode(person).finish();

    // write buffer to file
    fs.writeFileSync("person.bin", buffer);

    // also write json into file
    fs.writeFileSync("person.json", JSON.stringify(person));

    console.log('Person serialized and saved to person.bin');

    // read back from the file
    const data = fs.readFileSync('person.bin');
    const deserializedPerson = Person.decode(data);
    
    // deserialize buffer back to a person object
    console.log('Person deserialized from person.bin', deserializedPerson);
    
}).catch(console.error);