const grpc = require('@grpc/grpc-js');
const protoloader = require('@grpc/proto-loader');
const packageDefinition = protoloader.loadSync('calculator.proto', {});
const calculatorProto = grpc.loadPackageDefinition(packageDefinition).calculator;


function main() {
    const client = new calculatorProto.Calculator('localhost:50051', grpc.credentials.createInsecure());
    client.Add({number1: 5, number2: 5}, function(err, response) {
        if (err) {
            console.error(err);
        } else {
            console.log('Addition result:', response.result);
        }
    })

    client.Multiplication({number1: 5, number2: 5}, function(err, response) {
        if (err) {
            console.error(err);
        } else {
            console.log('Multiplication result:', response.result);
        }
    })

    client.Subtraction({number1: 5, number2: 5}, function(err, response) {
        if (err) {
            console.error(err);
        } else {
            console.log('Subtraction result:', response.result);
        }
    })
}

main();