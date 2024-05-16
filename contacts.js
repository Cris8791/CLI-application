// contacts.js
import { readFile, writeFile } from "node:fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";
import colors from "colors";
import { randomUUID } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));

// console.log(__dirname);
const contactsPath = `${__dirname}\\db\\contacts.json`;
// console.log(contactsPath);

// CRUD

// Read

export async function listContacts() {
  try {
    console.log("GET Contacts".bgBlue);
    const contents = await readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(contents);
    console.table(contacts);
  } catch (err) {
    console.log("There is an error".bgRed.white);
    console.error(err.message);
  }
}

// Create
/*
{
    "id": "Z5sbDlS7pCzNsnAHLtDJd",
    "name": "Reuben Henry",
    "email": "pharetra.ut@dictum.co.uk",
    "phone": "(715) 598-5792"
  },
*/

export async function addContact(contact) {
  try {
    const contents = await readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(contents);
    const newContactId = randomUUID();

    const isValid = contact?.name && contact?.email && contact?.phone;
    if (!isValid) {
      throw new Error(
        "Error: The product does not have all required parameters!"
      );
    }

    const newContact = {
      id: newContactId,
      ...contact,
    };

    console.dir(newContact);
    contacts.push(newContact);
    const parsedContacts = JSON.stringify(contacts);
    await writeFile(contactsPath, parsedContacts);

    console.log("The product has been created succesfully".bgGreen.white);
  } catch (err) {
    console.log("There is an error".bgRed.white);
    console.error(err.message);
  }
}

// Read a contact by ID

export async function getContactById(contactId) {
  try {
    const contents = await readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(contents);
    const contact = contacts.find((c) => c.id === contactId);
    if (!contact) {
      throw new Error("Contact not found!");
    }
    console.log(`GET Contact by ID: ${contactId}`.bgBlue);
    console.table(contact);
  } catch (err) {
    console.log("There is an error".bgRed.white);
    console.error(err.message);
  }
}

// Remove a contact

export async function removeContact(contactId) {
  try {
    const contents = await readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(contents);
    const filteredContacts = contacts.filter((c) => c.id !== contactId);
    if (contacts.length === filteredContacts.length) {
      throw new Error("Contact not found, no deletion occurred!");
    }
    await writeFile(contactsPath, JSON.stringify(filteredContacts));
    console.log(
      `The contact with ID: ${contactId} has been removed successfully`.bgGreen
        .white
    );
  } catch (err) {
    console.log("There is an error".bgRed.white);
    console.error(err.message);
  }
}
