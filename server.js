const grpc = require('@grpc/grpc-js');
const protoloader = require('@grpc/proto-loader');
const packageDefinition = protoloader.loadSync('calculator.proto', {});
const calculatorProto = grpc.loadPackageDefinition(packageDefinition).calculator;

function add(call, callback) {
    const result = call.request.number1 + call.request.number2;
    callback(null, {result});
}

function subtraction(call, callback) {
    const result = call.request.number1 - call.request.number2;
    callback(null, {result});
}

function multiplication(call, callback) {
    const result = call.request.number1 * call.request.number2;
    callback(null, {result});
}

const server = new grpc.Server();
const serverAddr = '0.0.0.0:50051';


// Add all services in a single object
const services = {
    Add: add,
    Subtraction: subtraction,
    Multiplication: multiplication,
};
server.addService(calculatorProto.Calculator.service, services);

server.bindAsync(serverAddr, grpc.ServerCredentials.createInsecure(), () => {
    server.start()
    console.log("Server running at " + serverAddr)
});