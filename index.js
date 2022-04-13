// TODO: Include packages needed for this application
const fs = require("fs")
const inquirer = require("./node_modules/inquirer")
const fn = require("./utils/generateMarkdown")

// TODO: Create an array of questions for user input
class InputQuestion {
    constructor(name, message, type) {
        this.name = name,
        this.message = message,
        this.type = type
    }
}
const questions = [

    // Get Title
    new InputQuestion("title", "What will your title be?", "input"),

    // Get Description
    new InputQuestion("description-motivation", "Description: What was your motivation for creating this project?", "input"),
    new InputQuestion("description-problem", "Description: What problem is this application solving?", "input"),
    new InputQuestion("description-learned", "Description: What did you learn whilst creating this app?", "input"),

    // Usage of Table of Contents
   
    // Get Requirements

    // Get Modules

    // Get Further Implementation

    // Get Badges

    // Get Usage

    // Get Credits

    // Get Lisences

    // Get Contribution

];

// new InputQuestion("", "", "")

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
   
    let htmlTemplate = fn.generateMarkdown(data)
    fs.writeFile(fileName, htmlTemplate, err => err ? console.log(err) : console.log("Your readme has been generated!"))

}

// TODO: Create a function to initialize app
function init() {

    inquirer.prompt(questions)
    .then((answers) => writeToFile("README.md", answers))
    .catch((err) => console.log(err))
    
}

// Function call to initialize app
init();
