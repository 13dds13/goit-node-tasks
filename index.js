const readline = require("readline");
require("colors");
const contacts = require("./contacts.js");

//*Ниже есть закомментированный вариант кода с comander'ом , как по улсовию дз//

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function invokeAction(action) {
  switch (action) {
    case "list":
      contacts.listContacts();
      break;

    case "get":
      rl.question("Enter id: ".yellow, contacts.getContactById);
      break;

    case "add":
      rl.question(
        "Enter new data (name email number): ".yellow,
        contacts.addContact
      );
      break;

    case "remove":
      rl.question("Enter id: ".yellow, contacts.removeContact);
      break;

    case "backup":
      contacts.backupCopy();
      break;

    case "restore":
      contacts.getDefaultContactsList();
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
      startApp();
  }
}

function startApp() {
  rl.question("Enter action: ".yellow, invokeAction);
}

startApp();

//===============================================================//

// const { Command } = require("commander");
// const contacts = require("./contacts.js");

// const program = new Command();
// program
//   .option("-a, --action <type>", "choose action")
//   .option("-b, --action <type>", "choose action")
//   .option("-r, --action <type>", "choose action")
//   .option("-i, --id <type>", "user id")
//   .option("-n, --name <type>", "user name")
//   .option("-e, --email <type>", "user email")
//   .option("-p, --phone <type>", "user phone");

// program.parse(process.argv);

// const argv = program.opts();

// function invokeAction({ action, id, name, email, phone }) {
//   switch (action) {
//     case "list":
//       contacts.listContacts();
//       break;

//     case "get":
//       contacts.getContactById(id);
//       break;

//     case "add":
//       contacts.addContact(name, email, phone);
//       break;

//     case "remove":
//       contacts.removeContact(id);
//       break;

//     case "backup":
//       contacts.backupCopy();
//       break;

//     case "restore":
//       contacts.getDefaultContactsList();
//       break;

//     default:
//       console.warn("\x1B[31m Unknown action type!");
//   }
// }

// invokeAction(argv);
