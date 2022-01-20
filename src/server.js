import { createServer, Model } from "miragejs";
import faker from "faker";
import avatar from "./avatar.png";

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,
    models: {
      employee: Model,
    },
    seeds(server) {
      for (let i = 0; i < 10; i++) {
        server.create("employee", {
          id: faker.datatype.uuid(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          phone: faker.phone.phoneNumber(),
          bio: faker.lorem.paragraph(),
          avatar: avatar,
          address: {
            streetAddress: `${faker.address.streetAddress()} ${faker.address.streetName()}`,
            city: faker.address.city(),
            state: faker.address.stateAbbr(),
            zipCode: faker.address.zipCode(),
          },
        });
      }
    },
    routes() {
      this.namespace = "api";
      this.get(
        "/employees",
        (schema) => {
          return schema.employees.all();
        },
        { timing: 1000 }
      );
      this.patch(
        "/employees/:id",
        (schema, request) => {
          const attrs = JSON.parse(request.requestBody);
          const employee = schema.employees.find(request.params.id);
          return employee.update(attrs);
        },
        { timing: 300 }
      );
      this.delete(
        "/employees/:id",
        (schema, request) => {
          const employee = schema.employees.find(request.params.id);
          employee.destroy();
          return new Response();
        },
        { timing: 300 }
      );
    },
  });
  return server;
}
