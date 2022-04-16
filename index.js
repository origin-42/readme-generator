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

    // Get Further Development Details
    furtherDevelopment: [
        new InputQuestion("addDevelopment", "Will you be updating features?\n (Here you might detail how you will update your appliciation in the future)", "confirm")
    ],

    developmentDetails: [
        new InputQuestion("development", "Add information regarding further additions to this project: ", "input"),
        new InputQuestion("additionalDevelopment", "Add additonal developments? ", "confirm")
    ],

    changesDetails: [
        new InputQuestion("changes", "Add information regarding further changes to this project: ", "input"),
        new InputQuestion("additionalChanges", "Add additional changes? ", "confirm")
    ],

    // Get Required Info
    requiredPrompt: [
        new InputQuestion("requirementsSection", "Does this application require this section? ", "confirm")
    ],
    requiredPrograms: [
        new InputQuestion("required", "Detail what is required to run this application for the average user: ", "input")
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

    // Get Licenses
    licensesPrompt: [
        new InputQuestion("addLicenses", "Will you add licenses?\n(Licenses dictate how others can use or contribute to your project)\nBe sure to check with moderator or software README file for contibuting to work of others to find recommended lisence ", "confirm")
    ],
    useCustomLicenses: [
        new InputQuestion("promptCustomLicenses", "Add a custom lisence?\n(skip to choose a from a list of common licenses) ", "confirm")
    ],
    customLicenses: [
        new InputQuestion("customLisenceName", "Add licenses name", "input"),
        new InputQuestion("customLisenceLink", "Add licenses link", "input"),
        new InputQuestion("additionalCustomLisence", "Add another lisence? ", "confirm")
    ],
    addLicenses: [
        new InputQuestion("promptLicenses", "Choose from a list of licenses? ", "confirm")
    ],
    lisenceList: [
        new InputList("choicesLisence", "Select which one to add", "list", [new inquirer.Separator("Preservation of copyright & lisence notices\nhttps://choosealicense.com/licenses/mit/"), "MIT Lisence", new inquirer.Separator("Contributors provide an express grant of patent rights & includes copyright & lisence preservation\nhttps://choosealicense.com/licenses/gpl-3.0/"), "GNU General Public License"])
    ],

    // Get Badges
    promptBadges: [
        new InputQuestion("addBadges", "Are there any badges to add? ", "confirm")
    ],
    createBadges: [
        new InputQuestion("customBadgeName", "Add badge name", "input"),
        new InputQuestion("customBadgeIconLink", "Add badge Icon Link", "input"),
        new InputQuestion("customBadgeDescrLink", "Add badge Description Link", "input"),
        new InputQuestion("additionalBadge", "Add another badge? ", "confirm")
    ],

    // Get Contribution
    promptContribution: [
        new InputQuestion("addContribution", "Would you like to allow other developers to contribute to the development of this application? ", "confirm"),
    ],
    promptContributionBadge: [
        new InputQuestion("addBadge", "Would you like to add a badge for the contributor covenant to display in your README.md file? ", "confirm")
    ],
    // Get How to Contibute
    howToContributeDesc: [
        new InputQuestion("contributionDescription", "Specify how other developers can go about contributing to this repository\n Outline steps to fork and download the content\n Firstly,  give a brief description of what they might help with: ", "input")
    ],
    howToContributeDetails: [
        new InputQuestion("contributionStep", "Detail how individual developers can fork this repository or help with the workload, step by step: ", "input"),
        new InputQuestion("continue", "Add another step?", "confirm")
    ],
    // Get Features
    promptFeatures: [
        new InputQuestion("addFeatures", "Would you like to add a features section?\n (If your project has a lot of features, list them here)", "confirm")
    ],
    addFeatures: [
        new InputQuestion("featureTitle", "Create a title for this feature: ", "input"),
        new InputQuestion("featureDescr", "Create a description for this feature: ", "input"),
        new InputQuestion("continue", "Add another feature?", "confirm")
    ],
    // Get Tests
    promptTests: [
        new InputQuestion("addTests", "Have you written any tests?\n Here you can describe to users how to run your tests ", "confirm")
    ],
    addTests: [
        new InputQuestion("testTitle", "What is this tests title? ", "input"),
        new InputQuestion("testDescr", "Add a description of this test: ", "input"),
        new InputQuestion("testRun", "Add steps to run this test (assuming user has fully installed the application)\nSeparate each step like so (>>): ", "input"),
        new InputQuestion("promptMoreTests", "Are there other tests you would add? ", "confirm")
    ],
    // Questions
    promptQuestions: [
        new InputQuestion("addQuestionsInfo", "Where should users direct any questions?\n Here you can detail your contact information ", "confirm"),
        // Add Users USERname
        // Add Users github URL link
        // Add Users email
        new InputQuestion("promptTitle", "Would you like to add a placeholder for this email? ", "confirm"),
        // Add placeholder
    ],
    // Extras
    promptExtras: [
        new InputQuestion("addExtras", "Would you like to add any additional information or sections?\n (A title for Extras will be passed to the README.md file created to enter additional information) ", "confirm"),
    ],
    promptHomePage: [
        new InputQuestion("addHomePage", "It is recommended if you have an online web page to add an image and link for it. Add now? ", "confirm"),
    ],
    promptHomeLink: [
        new InputQuestion("addHomePageTitle", "Create a title describing the location or relevance of this image: ", "input"),
        new InputQuestion("addHomePageLink", "Add the image link: ", "input")
    ]

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
        console.log(" Add information pertaining to any requirements for this application to run");
        console.log(" (Here you can specify to a user (not specifically a developer), what is required to run this application, if they so desire and it is permissible)");
        console.log(" (Note these requirements and consider adding badges later to indicate these requirements)");
        requirements()
    })
}
const requireSection = {
    addRequired: false,
    requirements: ""
}
// Prompt user for requirements
const requirements = () => {
    inquirer.prompt(questions.requiredPrompt)
    .then((answers) => {
        if (answers.requirementsSection) {
            requireSection.addRequired = true;
            addRequiredSection();
        } else {
            furtherDevelopment();
        }
    })
}
const addRequiredSection = () => {
    inquirer.prompt(questions.requiredPrograms)
    .then((answers) => {
        requireSection.requirements = answers.required;
        answersArr.push(requireSection)
        furtherDevelopment();
    })
}
// Prompt Further Development Details
const developmentInfo = {
    addDevInfo: false,
    furtherDev: [],
    furtherChanges: []
}
const furtherDevelopment = () => {
    inquirer.prompt(questions.furtherDevelopment)
    .then((answers) => {
        if (answers.addDevelopment) {
            developmentInfo.addDevInfo = true;
            developmentDetails();
        } else {
            promptTablOCon();
        }
    })
}
const developmentDetails = () => {
    inquirer.prompt(questions.developmentDetails)
    .then((answers) => {
        developmentInfo.furtherDev.push({
            furtherDev: answers.development,
        });
        if (answers.additionalDevelopment) {
            developmentDetails();
        } else {
            changesDetails();
        }
    })
}
const changesDetails = () => {
    inquirer.prompt(questions.changesDetails)
    .then((answers) => {
        developmentInfo.furtherChanges.push({
            furtherChange: answers.changes,
        });
        if (answers.additionalChanges) {
            changesDetails();
        } else {
            answersArr.push(developmentInfo);
            promptTablOCon();
        }
    })
}
let tableDenied = true;
// Prompt user if they need a Table of Contents
const promptTablOCon = () => {
    inquirer.prompt(questions["table-of-contents"])
    .then((answers) => {
        if (answers.tableofcontents) {
            answersArr.push(answers)
            promptInstallation()
        } else {
            tableDenied = false;
            answersArr.push(answers)
            promptInstallation()
        }
    })
}
// Prompt user for Installation Details
const installationArray = {   
    addInstallation: true, 
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
            licensesPrompt();
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
            licensesPrompt();
        }
    })
}
const licenseInfo = {
    addLicenseInfo: false,
    licenses: {
        listLicenses: {},
        customLicenses: []
    }
}
// Add lisence info
let licensesPrompt = () => {
    inquirer.prompt(questions.licensesPrompt)
    .then((answers) => {
        if (answers.addLicenses) {
            licenseInfo.addLicenseInfo = true;
            useCustomLicenses();
        } else {
            console.log("Be sure to check out https://choosealicense.com/no-permission/ for omitting a lisence on your project")
            addBadges();
        }
    })
}
let useCustomLicenses = () => {
    inquirer.prompt(questions.useCustomLicenses)
    .then((answers) => {
        if (answers.promptCustomLicenses) {
            customLicenses();
        } else {
            console.log("Check out non-Software Licenses here https://choosealicense.com/non-software/\n or additional licenses not mentioned https://choosealicense.com/licenses/")
            addLicenses();
        }
    }) 
}
let customLicenses = () => {
    inquirer.prompt(questions.customLicenses)
    .then((answers) => {
        licenseInfo.licenses.customLicenses.push({
            customLicenseName: answers.customLicenseName,
            customLicenseLink: answers.customLicenseLink
        })
        if (answers.additionalCustomLicense) {
            customLicenses();
        } else {
            addLicenses();
        }
    }) 
}
let addLicenses = () => {
    inquirer.prompt(questions.addLicenses)
    .then((answers) => {
        if (answers.promptLicenses) {
            licenseList();
        } else {
            answersArr.push(licenseInfo);
            addBadges();
        }
    }) 
}
let licenceList = () => {
    inquirer.prompt(questions.licenseList)
    .then((answers) => {
        licenseInfo.licenses.listLicenses.name = answers.choicesLicense
        if (licenseInfo.licenses.listLicenses.name == "MIT License") {
            licenseInfo.licenses.listLicenses.badge = "[![License: MIT](https://img.shields.io/github/license/adonisjs/adonis-framework?style=for-the-badge)](https://opensource.org/licenses/MIT)";
        } else if (licenseInfo.licenses.listLicenses.name == "GNU General Public License") {
            licenseInfo.licenses.listLicenses.badge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
        }
        answersArr.push(licenseInfo);
        addBadges();
    }) 
}
// Collect Badges Info
const badgesInfo = {
    addBadges: false,
    badges: []
}
let addBadges = () => {
    inquirer.prompt(questions.promptBadges)
    .then((answers) => {
        if (answers.addBadges) {
            badgesInfo.addBadges = true;
            createBadge()
        } else {
            addContribution()
        }
    }) 
}
let createBadge = () => {
    inquirer.prompt(questions.createBadges)
    .then((answers) => {
        badgesInfo.badges.push({
            name: answers.customBadgeName,
            iconLink: answers.customBadgeIconLink,
            descrLink: answers.customBadgeDescrLink
        })
        if (answers.additionalBadge) {
            createBadge()
        } else {
            answersArr.push(badgesInfo);
            addContribution()
        }
    }) 
}
const constributionInfo = {    
    addContr: false,
    addBadge: false,
    contribution: []
};
//  Collect Contribution Info
let addContribution = () => {
    inquirer.prompt(questions.promptContribution)
    .then((answers) => {
        if (answers.addContribution) {
            constributionInfo.addContr = true;
            promptContributionBadge()
        }  else {
            promptFeatures();
        }
    }) 
}
const promptContributionBadge = () => {
    inquirer.prompt(questions.promptContributionBadge)
    .then((answers) => {
        if (answers.addBadge) {
            constributionInfo.addBadge = true;
            howToContributeDesc();
        } else {
            howToContributeDesc();
        }
    }) 
}
const howToContributeDesc = () => {
    inquirer.prompt(questions.howToContributeDesc)
    .then((answers) => {
        constributionInfo.contrDescr = answers.contributionDescription;
        howToContributeDetails();
    }) 
}
const howToContributeDetails = () => {
    inquirer.prompt(questions.howToContributeDetails)
    .then((answers) => {
        constributionInfo.contribution.push(answers.contributionStep)
        if (answers.continue) {
            howToContributeDetails();
        } else {
            answersArr.push(constributionInfo);
            promptFeatures();
        }
    })
}
const featuresInfo = {
    addFeatures: false,
    features: []
}
const promptFeatures = () => {
    inquirer.prompt(questions.promptFeatures)
    .then((answers) => {
        if (answers.addFeatures) {
            featuresInfo.addFeatures = true;
            addFeatures();
        } else {
            testsSection(); 
        }
    }) 
}
const addFeatures = () => {
    inquirer.prompt(questions.addFeatures)
    .then((answers) => {
        featuresInfo.features.push({
            featureTitle: answers.featureTitle,
            featureDescr: answers.featureDescr
        })
        if (answers.continue) {
            addFeatures()
        } else {
            answersArr.push(featuresInfo);
            testsSection(); 
        }
    }) 
}
const testsInfo = {
    addTests: false,
    tests: []
}
const testsSection = () => {
    inquirer.prompt(questions.promptTests)
    .then((answers) => {
        if (answers.addTests) {
            testsInfo.addTests = true;
            addTestsSection();
        } else {
            extraSections();
        }
    }) 
}
const addTestsSection = () => {
    inquirer.prompt(questions.addTests)
    .then((answers) => {
        testsInfo.tests.push({
            testTitle: answers.testTitle,
            testDescr: answers.testDescr,
            testSteps: answers.testRun
        });
        if (answers.promptMoreTests) {
            addTestsSection();
        } else {
            answersArr.push(testsInfo);
            extraSections();
        }
    }) 
}
const extraSections = () => {
    inquirer.prompt(questions.promptExtras)
    .then((answers) => {
        if (answers.addExtras) {
            answersArr.push({addExtras: true});
            addHomePage();
        } else {
            answersArr.push({addExtras: false});
            addHomePage();
        }
    }) 
}
const homePageInfo = {
    addhomePage: false
}
const addHomePage = () => {
    inquirer.prompt(questions.promptHomePage)
    .then((answers) => {
        if (answers.addHomePage) {
            homePageInfo.addhomePage = true;
            addHomeLink();
        } else {
            checkTable();
        }
    }) 
}
const addHomeLink = () => {
    inquirer.prompt(questions.promptHomeLink)
    .then((answers) => {
        homePageInfo.homePageTitle = answers.addHomePageTitle;
        homePageInfo.homePageLink = answers.addHomePageLink;
        answersArr.push(homePageInfo);
        checkTable();
    }) 
}
const checkTable = () => {
    if (!tableDenied) {
        console.log(`Table of contents is helpful for long README files. Are you happy to omit the table of contents?`);
        inquirer.prompt(questions["table-of-contents"])
        .then((answers) => {
            if (answers.tableofcontents) {
                answersArr.push(answers);
                writeToFile(answersArr);
            } else {
                writeToFile(answersArr);
            }
        })
    } else {
        writeToFile(answersArr);
    }
}

const handleException = () => {
    // Handle incorrect data submission or accidental data submission
}
// TODO: Create a function to initialize app
function init() {
    
    promptDescription()

}

// Function call to initialize app
init();
