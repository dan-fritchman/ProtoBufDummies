
var protobuf = require("protobufjs");


const stuff = root => {
    const PhoneType = root.lookupEnum("tutorial.PhoneType");
    const AddressBook = root.lookupType("tutorial.AddressBook");
    const PhoneNumber = root.lookupType("tutorial.PhoneNumber");
    
    let payload = {
        type: PhoneType.MOBILE,
        number: "123456789"
    };

    // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
    var errMsg = PhoneNumber.verify(payload);
    if (errMsg)
        throw Error(errMsg);

        payload = {
            bad:3
        };
    
    var errMsg2 = PhoneNumber.verify({number:null});
    console.log(errMsg2);
    if (errMsg2)
        throw Error(errMsg2);
    
            

    // Create a new message
    // or use .fromObject if conversion is necessary
    const message = PhoneNumber.create(payload); 
    console.log(message);
    

    // Encode a message to an Uint8Array (browser) or Buffer (node)
    var buffer = PhoneNumber.encode(message).finish();
    // ... do something with buffer
    console.log(buffer);

    // Decode an Uint8Array (browser) or Buffer (node) to a message
    const decodedMessage = PhoneNumber.decode(buffer);
    // ... do something with message
    console.log(decodedMessage);

    // Maybe convert the message back to a plain object
    const decodedObject = PhoneNumber.toObject(message, {
        longs: Number,
        enums: Number,
        bytes: String,
    });
    console.log(decodedObject);
};

protobuf.load("addressbook.proto")
    .then(stuff)
    .catch(err => console.log(err));
