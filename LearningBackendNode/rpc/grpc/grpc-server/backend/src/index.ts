import path from "path";
import * as grpc from "@grpc/grpc-js";
import type { GrpcObject, ServiceClientConstructor } from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import type { ProtoGrpcType } from "./generated/a.js";
import type { AddressBookServiceHandlers } from "./generated/AddressBookService.js";
import { callbackify } from "util";
import { Status } from "@grpc/grpc-js/build/src/constants.js";

const packageDefinition = protoLoader.loadSync(
  path.join(process.cwd(), "a.proto"),
);

const personProto = grpc.loadPackageDefinition(
  packageDefinition,
) as unknown as ProtoGrpcType;

const PERSONS = [
  { name: "Shoyeb", age: 21 },
  { name: "Alice", age: 22 },
];

const handler: AddressBookServiceHandlers = {
  AddPerson: (call, callback) => {
    let person = {
      name: call.request.name,
      age: call.request.age,
    };
    PERSONS.push(person);
    callback(null, person);
  },
  GetPersonByName: (call, callback) => {
    let person = PERSONS.find((person) => person.name === call.request.name);
    if (person) {
      callback(null, person);
    } else {
      callback(
        {
          code: Status.NOT_FOUND,
          details: `Person with name ${call.request.name} not found.`,
        },
        null,
      );
    }
  },
};

const server = new grpc.Server();

server.addService(personProto.AddressBookService.service, handler);
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    // server.start();
    console.log("SErver started");
  },
);
