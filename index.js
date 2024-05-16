// index.js
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} from "./contacts.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv))
  .option("action", {
    alias: "a",
    describe: "The action to perform",
    choices: ["list", "get", "add", "remove"],
    demandOption: true,
    type: "string",
  })
  .option("id", {
    describe: "ID of the contact for get or remove actions",
    type: "string",
  })
  .option("name", {
    describe: "Name of the new contact for add action",
    type: "string",
  })
  .option("email", {
    describe: "Email of the new contact for add action",
    type: "string",
  })
  .option("phone", {
    describe: "Phone number of the new contact for add action",
    type: "string",
  })
  .help().argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;
    case "get":
      if (!id) {
        console.error("Please provide an ID for the get action.");
        return;
      }
      getContactById(id);
      break;
    case "add":
      if (!(name && email && phone)) {
        console.error(
          "Please provide name, email, and phone for the add action."
        );
        return;
      }
      addContact({ name, email, phone });
      break;
    case "remove":
      if (!id) {
        console.error("Please provide an ID for the remove action.");
        return;
      }
      removeContact(id);
      break;
    default:
      console.error("Unsupported action. Use one of: list, get, add, remove.");
      break;
  }
}

invokeAction(argv);
