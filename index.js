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
class InputList {
    constructor(name, message, type, choices) {
        this.name = name,
        this.message = message,
        this.type = type,
        this.choices = choices
    }
}
const questions = {

    description: [
        // Get Title
        new InputQuestion("title", "What will your title be? ", "input"),
        // Get Description
        new InputQuestion("description-motivation", "Description: What was your motivation for creating this project? ", "input"),
        new InputQuestion("description-problem", "Description: What problem is this application solving? ", "input"),
        new InputQuestion("description-learned", "Description: What did you learn whilst creating this app? ", "input"),
    ],

    // Usage of Table of Contents
    "table-of-contents": [
        new InputQuestion("tableofcontents", "Will you need a Table of Contents?", "confirm")
    ],
   
    // Get Installation
    installation: [
        new InputQuestion("installation", "Detail how to install the app.\n Enter each step (`git init [enter]` `git remote add ..[enter]`): ", "input"),
        new InputQuestion("continue", "Add another step?", "confirm")
    ],

    // Get How to Use
    usage: [
        new InputQuestion("addHowToUse", "Would you like to add a 'How to Use' section?", "confirm")
    ],
    howToUseSummary: [
        new InputQuestion("howToUseSummary", "Give a brief summary about how this application is run: ", "input")
    ],
    howToUseImagesPrompt: [
        new InputQuestion("useImages", "Would you like to add images?", "confirm")
    ],
    howToUseImages: [
        new InputQuestion("howToUseImagesText", "Write out a summary for the image you will use: ", "input"),
        new InputQuestion("howToUseImagesTitle", "Add a title to use for your README: ", "input"),
        new InputQuestion("howToUseImagesLink", "Add a link that points to your image location (online or by relative path): ", "input"),
        new InputQuestion("continue", "Add another image? ", "confirm")
    ],
    howToUseVideoPrompt: [
        new InputQuestion("usevideo", "Would you like to add a video?", "confirm")
    ],
    howToUseVideo: [
        new InputQuestion("howToUseVideoText", "Write out a summary for the video you will use: ", "input"),
        new InputQuestion("howToUseVideoTitle", "Add a title to use for your README: ", "input"),
        new InputQuestion("howToUseVideoLink", "Add a link that points to your video location (online or by relative path): ", "input")
    ],

    // Get Credits
    creditsPrompt: [
        new InputQuestion("addCredits", "Are there any credits to add?", "confirm")
    ],
    useCredits: [
        new InputQuestion("creditTitle", "Add a short, descriptive title: ", "input"),
        new InputQuestion("creditLink", "Add a hyperlink to the title: ", "input"),
        new InputQuestion("creditDescr", "Add a short description to those creditted: ", "input"),
        new InputQuestion("additionalCredit", "Add another credit? ", "confirm")
    ],

    // Get Lisences
    lisencesPrompt: [
        new InputQuestion("addLisences", "Will you add lisences?\n(Lisences dictate how others can use or contribute to your project)\nBe sure to check with moderator or software README file for contibuting to work of others to find recommended lisence ", "confirm")
    ],
    useCustomLisences: [
        new InputQuestion("promptCustomLisences", "Add a custom lisence?\n(skip to choose a from a list of common lisences) ", "confirm")
    ],
    customLisences: [
        new InputQuestion("customLisenceName", "Add lisences name", "input"),
        new InputQuestion("customLisenceLink", "Add lisences link", "input"),
        new InputQuestion("additionalCustomLisence", "Add another lisence? ", "confirm")
    ],
    addLisences: [
        new InputQuestion("promptLisences", "Choose from a list of lisences? ", "confirm")
    ],
    lisenceList: [
        new InputList("choicesLisence", "Select which one to add", "list", [new inquirer.Separator("Preservation of copyright & lisence notices\nhttps://choosealicense.com/licenses/mit/"), "MIT Lisence", new inquirer.Separator("Contributors provide an express grant of patent rights & includes copyright & lisence preservation\nhttps://choosealicense.com/licenses/gpl-3.0/"), "GNU General Public License"])
    ]

    // Get Badges

    // Get Contribution

    // Get How to Contibute

    // Extras

};

// new InputQuestion("", "", "")

// TODO: Create a function to write README file
function writeToFile(data) {
   
    let htmlTemplate = fn.generateMarkdown(data)
    fs.writeFile(`README.md`, htmlTemplate, err => err ? console.log(err) : console.log("Your readme has been generated!"))

}

// Hold Q&A
let answersArr = [];

// Prompt user for description details
const promptDescription = () => {
    inquirer.prompt(questions.description)
    .then((answers) => {
        answersArr.push(answers)
        promptTablOCon()
    })
}
// Prompt user if they need a Table of Contents
const promptTablOCon = () => {
    inquirer.prompt(questions["table-of-contents"])
    .then((answers) => {
        answersArr.push(answers)
        promptInstallation()
    })
}
// Prompt user for Installation Details
const installationArray = {    
    continue: false,
    installation: []
};
const promptInstallation = () => {
    inquirer.prompt(questions.installation)
    .then((answers) => {
        if (answers) {
            installationArray.continue = answers.continue
            installationArray.installation.push(answers.installation)
            if (installationArray.continue) {
                promptInstallation()
            } else {
                installationArray.addInstallSteps = true;
                answersArr.push(installationArray)
                addHowToUse()
            }
        } else {
            console.log("Please enter some installation instructions")
            promptInstallation()
        }
        
    })
}
// Usage Section Data
const usageSection = {
    howToUse: false,
    continueImages: false,
    usageDetails: {
        photos: [],
        video: []
    }
}
// Prompt user if they want to add a how to use section
const addHowToUse = () => {
    inquirer.prompt(questions.usage)
    .then((answers) => {
        if (answers.addHowToUse) {
            usageSection.addHowtoUse = true;
            howToUseSummary()
        } else {
            usageSection.addHowtoUse = false;
            promptCredits();
        }
    })
}
let howToUseSummary = () => {
    inquirer.prompt(questions.howToUseSummary)
    .then((answers) => {
        if (answers) {
            usageSection.usageSummary = answers.howToUseSummary
            howToUseImagesPrompt()
        } else {
            console.log("Please enter a usage summary")
            howToUseSummary()
        }
    })
}
let howToUseImagesPrompt = () => {
    inquirer.prompt(questions.howToUseImagesPrompt)
    .then((answers) => {
        if (answers.useImages) {
            howToUseImages();
        } else {
            howToUseVideoPrompt();
        }
    })
}
let howToUseImages = () => {
    inquirer.prompt(questions.howToUseImages)
    .then((answers) => {
        usageSection.continueImages = answers.continue;
        usageSection.usageDetails.photos.push({
            howToUseImagesText: answers.howToUseImagesText,
            howToUseImagesTitle: answers.howToUseImagesTitle,
            howToUseImagesLink: answers.howToUseImagesLink
        });
        if (usageSection.continueImages) {
            howToUseImages();
        } else {
            howToUseVideoPrompt();
        }
    })
}
let howToUseVideoPrompt = () => {
    inquirer.prompt(questions.howToUseVideoPrompt)
    .then((answers) => {
        if (answers.usevideo) {
            howToUseVideo();
        } else {
            answersArr.push(usageSection)
            promptCredits();
        }
    })
}
let howToUseVideo = () => {
    inquirer.prompt(questions.howToUseVideo)
    .then((answers) => {
        usageSection.usageDetails.video.push({
            howToUseVideoText: answers.howToUseVideoText,
            howToUseVideoTitle: answers.howToUseVideoTitle,
            howToUseVideoLink: answers.howToUseVideoLink
        });
        answersArr.push(usageSection)
        promptCredits();
    })
}
// Request credits Info
const creditsInfo = {
    addCredInfo: false,
    addMoreCredits: true,
    listcredits: [] 
}
let promptCredits = () => {
    inquirer.prompt(questions.creditsPrompt)
    .then((answers) => {
        if (answers.addCredits) {
            creditsInfo.addCredInfo = true;
            useCredits();
        } else {
            lisencesPrompt();
        }
    })
}
let useCredits = () => {
    inquirer.prompt(questions.useCredits)
    .then((answers) => {
        creditsInfo.addMoreCredits = answers.additionalCredit;
        creditsInfo.listcredits.push({
            creditTitle: answers.creditTitle,
            creditLink: answers.creditLink,
            creditDescr: answers.creditDescr
        });
        if (creditsInfo.addMoreCredits) {
            useCredits();
        } else {
            answersArr.push(creditsInfo)
            lisencesPrompt();
        }
    })
}
const lisenceInfo = {
    addLisenceInfo: false,
    lisences: {
        listLisences: {},
        customLisences: []
    }
}
// Add lisence info
let lisencesPrompt = () => {
    inquirer.prompt(questions.lisencesPrompt)
    .then((answers) => {
        if (answers.addLisences) {
            lisenceInfo.addLisenceInfo = true;
            useCustomLisences();
        } else {
            console.log("Be sure to check out https://choosealicense.com/no-permission/ for omitting a lisence on your project")
            // badgesPrompt();
        }
    })
}
let useCustomLisences = () => {
    inquirer.prompt(questions.useCustomLisences)
    .then((answers) => {
        if (answers.promptCustomLisences) {
            customLisences();
        } else {
            console.log("Check out non-Software Lisences here https://choosealicense.com/non-software/\n or additional lisences not mentioned https://choosealicense.com/licenses/")
            addLisences();
        }
    }) 
}
let customLisences = () => {
    inquirer.prompt(questions.customLisences)
    .then((answers) => {
        lisenceInfo.lisences.customLisences.push({
            customLisenceName: answers.customLisenceName,
            customLisenceLink: answers.customLisenceLink
        })
        if (answers.additionalCustomLisence) {
            customLisences();
        } else {
            addLisences();
        }
    }) 
}
let addLisences = () => {
    inquirer.prompt(questions.addLisences)
    .then((answers) => {
        if (answers.promptLisences) {
            lisenceList();
        } else {
            answersArr.push(lisenceInfo);
            // badgesPrompt();
        }
    }) 
}
let lisenceList = () => {
    inquirer.prompt(questions.lisenceList)
    .then((answers) => {
        lisenceInfo.lisences.listLisences.name = answers.choicesLisence
        if (lisenceInfo.lisences.listLisences.name == "MIT Lisence") {
            lisenceInfo.lisences.listLisences.badge = "[![License: MIT](https://img.shields.io/github/license/adonisjs/adonis-framework?style=for-the-badge)](https://opensource.org/licenses/MIT)";
        } else if (lisenceInfo.lisences.listLisences.name == "GNU General Public License") {
            lisenceInfo.lisences.listLisences.badge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
        }
        answersArr.push(lisenceInfo);
        writeToFile(answersArr)
        // badgesPrompt();
    }) 
}
// TODO: Create a function to initialize app
function init() {
    
    promptDescription()

}

// Function call to initialize app
init();
