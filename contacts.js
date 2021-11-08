const fs = require("fs").promises;
const path = require("path");
require("colors");

const contactsPath = path.resolve("./db/contacts.json");
const backupPath = path.resolve("./db/backup.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8")
    .then((data) => console.table(JSON.parse(data)))
    .catch((err) => console.log(err.message.red));
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const contact = JSON.parse(data).find(
        (contact) => contact.id === Number(contactId)
      );
      if (!contact) {
        throw new Error("Contact with such id does not exist");
      }
      console.table(contact);
    })
    .catch((err) => console.log(err.message.red));
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const contactsList = JSON.parse(data).filter(
        (contact) => contact.id !== Number(contactId)
      );
      const contactsListToAdd = JSON.stringify(contactsList);
      if (data === contactsListToAdd) {
        throw new Error("Contact with such id does not exist");
      }
      fs.writeFile(contactsPath, contactsListToAdd, "utf8");
    })
    .then(() => console.log("Contact has been successfully removed".green))
    .catch((err) => console.log(err.message.red));
}

function addContact(dataToAdd) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const [newName, newEmail, newPhone] = dataToAdd.split(" ");
      const contactsList = JSON.parse(data);
      const isAlreadyExist = contactsList.some(
        ({ name, email, phone }) =>
          name === newName || email === newEmail || phone === Number(newPhone)
      );
      if (isAlreadyExist) {
        throw new Error("Contact with such data already exist");
      }
      const id = contactsList.length + 1;
      contactsList.push({
        name: newName,
        email: newEmail,
        phone: newPhone,
        id,
      });
      fs.writeFile(contactsPath, JSON.stringify(contactsList), "utf8");
    })
    .then(() => console.log("New contact has been successfully added".green))
    .catch((err) => console.log(err.message.red));
}

function backupCopy() {
  fs.readFile(contactsPath, "utf8")
    .then((data) => fs.writeFile(backupPath, data, "utf8"))
    .then(() => console.log("Backup file has been created".green))
    .catch((err) => console.log(err.message.red));
}

function getDefaultContactsList() {
  fs.readFile(backupPath, "utf8")
    .then((data) => fs.writeFile(contactsPath, data, "utf8"))
    .then(fs.unlink(backupPath))
    .then(() => console.log("Contacts data has been restored".green))
    .catch((err) => console.log(err.message.red));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  backupCopy,
  getDefaultContactsList,
};
