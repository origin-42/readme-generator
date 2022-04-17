// TODO: Include packages needed for this application
const fs = require("fs")
const inquirer = require("./node_modules/inquirer")
const fn = require("./utils/generateMarkdown")

// Inert Utilities
let yellow = '\x1b[33m%s\x1b[0m'; //Confirmations and info prompts
let redText = "\x1b[31m"; // Invalid input

// TODO: Create an array of questions for user input
class InputQuestion {
    constructor(name, message, type, prefix, validate) {
        this.name = name,
        this.message = message,
        this.type = type,
        this.prefix = prefix,
        this.validate = validate
    }
}
class InputChoices {
    constructor(name, message, type, prefix, choices) {
        this.name = name,
        this.message = message,
        this.type = type,
        this.prefix = prefix,
        this.choices = choices
    }
}
// Handle Exceptions
const handleExceptions = (input, message, type) => {
    input = input.trim();
    if (type == "email") {
        if (!input.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            console.log(redText, "Email invalid");
            return false;
        } else if (!input) {
            console.log(redText, message)
            return false;
        } else {
            return true;
        }
    } else if (type == "link") {
        if (input.indexOf("http://") == 0) {
            console.log("\n" + yellow, "Be cautious using unsecure communication protocols (http))");
            return false;
        } else if (input.indexOf("/") == 0) {
            console.log("\n" + yellow, "Omitting dot notation may result in unexpected behaviour when trying to link via relative path after uploading files online");
            return false;
        } else if (!input) {
            console.log(redText, message)
            return false;
        } else {
            return true;
        }
    } else if (input) {
        return true;
    } else {
        console.log(redText, message)
        return false;
    }
}
const questions = {

    description: [
        // Get Title
        new InputQuestion("title", "What will your title be: ", "input", "Title: ", function (input) {
            return handleExceptions(input, "No title entered");
        }),
        // Get Description
        new InputQuestion("description-motivation", "What was your motivation for creating this project? ", "input", "Description: ", function (input) {
            return handleExceptions(input, "No description entered");
        }),
        new InputQuestion("description-problem", "What problem is this application solving? ", "input", "Description: ", function (input) {
            return handleExceptions(input, "No problems information entered");
        }),
        new InputQuestion("description-learned", "What did you learn whilst creating this app? ", "input", "Description: ", function (input) {
            return handleExceptions(input, "No details entered");
        }),
    ],

    // Get Further Development Details
    furtherDevelopment: [
        new InputQuestion("addDevelopment", "Will you be updating features?\n (Here you might detail how you will update your appliciation in the future)", "confirm", "Further Development: ")
    ],

    developmentDetails: [
        new InputQuestion("development", "Add information regarding further additions to this project: ", "input", "Further Development: ", function (input) {
            return handleExceptions(input, "No further additions entered");
        }),
        new InputQuestion("additionalDevelopment", "Add another addition? ", "confirm", "Further Development: ")
    ],

    changesDetails: [
        new InputQuestion("changes", "Add information regarding further changes to this project: ", "input", "Further Development: ", function (input) {
            return handleExceptions(input, "No changes information entered");
        }),
        new InputQuestion("additionalChanges", "Add additional changes? ", "confirm", "Further Development: ")
    ],

    // Get Required Info
    requiredPrompt: [
        new InputQuestion("requirementsSection", "Does this application require this section? ", "confirm", "Required: ")
    ],
    requiredPrograms: [
        new InputQuestion("required", "Detail what is required to run this application for the average user: ", "input", "Required: ", function (input) {
            return handleExceptions(input, "No 'required information' entered");
        })
    ],

    // Usage of Table of Contents
    "table-of-contents": [
        new InputQuestion("tableofcontents", "Will you need a Table of Contents?", "confirm", "Table of Contents: ")
    ],
   
    // Get Installation
    installation: [
        new InputQuestion("installation", "Detail how to install the app.\n Enter each step (`git init [enter]` `git remote add ..[enter]`): ", "input", "Installation: ", function (input) {
            return handleExceptions(input, "You missed a step");
        }),
        new InputQuestion("continue", "Add another step?", "confirm", "Installation: ")
    ],

    // Get How to Use
    usage: [
        new InputQuestion("addHowToUse", "Would you like to add a 'How to Use' section?", "confirm", "How to Use: ")
    ],
    howToUseSummary: [
        new InputQuestion("howToUseSummary", "Give a brief summary about how this application is run: ", "input", "How to Use: ", function (input) {
            return handleExceptions(input, "Summary missing");
        })
    ],
    howToUseImagesPrompt: [
        new InputQuestion("useImages", "Would you like to add images?", "confirm", "How to Use: ")
    ],
    howToUseImages: [
        new InputQuestion("howToUseImagesText", "Write out a summary for the image you will use: ", "input", "How to Use: ", function (input) {
            return handleExceptions(input, "Summary missing for image");
        }),
        new InputQuestion("howToUseImagesTitle", "Add a title to use for your README: ", "input", "How to Use: ", function (input) {
            return handleExceptions(input, "Detected title omission");
        }),
        new InputQuestion("howToUseImagesLink", "Add a link that points to your image location (online or by relative path): ", "input", "How to Use: ", function (input) {
            return handleExceptions(input, "Image location missing", "link");
        }),
        new InputQuestion("continue", "Add another image? ", "confirm", "How to Use: ")
    ],
    howToUseVideoPrompt: [
        new InputQuestion("usevideo", "Would you like to add a video?", "confirm", "How to Use: ")
    ],
    howToUseVideo: [
        new InputQuestion("howToUseVideoText", "Write out a summary for the video you will use: ", "input", "How to Use: ", function (input) {
            return handleExceptions(input, "Summary missing for video");
        }),
        new InputQuestion("howToUseVideoTitle", "Add a title to use for your README: ", "input", "How to Use: ", function (input) {
            return handleExceptions(input, "Readme title missing");
        }),
        new InputQuestion("howToUseVideoLink", "Add a link that points to your video location (online or by relative path): ", "input", "How to Use: ", function (input) {
            return handleExceptions(input, "Video link missing", "link");
        })
    ],

    // Get Credits
    creditsPrompt: [
        new InputQuestion("addCredits", "Are there any credits to add?", "confirm", "Credits: ")
    ],
    useCredits: [
        new InputQuestion("creditTitle", "Add a short, descriptive title: ", "input", "Credits: ", function (input) {
            return handleExceptions(input, "Description omission detected");
        }),
        new InputQuestion("creditLink", "Add a hyperlink to the title: ", "input", "Credits: ", function (input) {
            return handleExceptions(input, "No link added", "link");
        }),
        new InputQuestion("creditDescr", "Add a short description to those creditted: ", "input", "Credits: ", function (input) {
            return handleExceptions(input, "No description added");
        }),
        new InputQuestion("additionalCredit", "Add another credit? ", "confirm", "Credits: ")
    ],

    // Get Licenses
    licensesPrompt: [
        new InputQuestion("addLicenses", "Will you add licenses?\n(Licenses dictate how others can use or contribute to your project)\nBe sure to check with moderator or software README file for contibuting to work of others to find recommended license ", "confirm", "Licenses: ")
    ],
    useCustomLicenses: [
        new InputQuestion("promptCustomLicenses", "Add a custom license?\n(skip to choose from a list of common licenses) ", "confirm", "Licenses: ")
    ],
    customLicenses: [
        new InputQuestion("customLicenseName", "Add licenses name", "input", "Licenses: ", function (input) {
            return handleExceptions(input, "No license name");
        }),
        new InputQuestion("customLicenseLink", "Add licenses link", "input", "Licenses: ", function (input) {
            return handleExceptions(input, "No lisense link", "link");
        }),
        new InputQuestion("additionalCustomLicense", "Add another license? ", "confirm", "Licenses: ")
    ],
    addLicenses: [
        new InputQuestion("promptLicenses", "Choose from a list of licenses? ", "confirm", "Licenses: ")
    ],
    licenseList: [
        new InputChoices("choicesLicense", "Select which one to add", "list", "Licenses: ", [new inquirer.Separator("Preservation of copyright & license notices\nhttps://choosealicense.com/licenses/mit/"), "MIT License", new inquirer.Separator("Contributors provide an express grant of patent rights & includes copyright & license preservation\nhttps://choosealicense.com/licenses/gpl-3.0/"), "GNU General Public License"])
    ],

    // Get Badges
    promptBadges: [
        new InputQuestion("addBadges", "Are there any badges to add?\n\nA list of badges can be found here https://github.com/aleen42/badges ", "confirm", "Badges: ")
    ],
    createBadges: [
        new InputQuestion("customBadgeName", "Add badge name", "input", "Badges: ", function (input) {
            return handleExceptions(input, "Must enter a badge name");
        }),
        new InputQuestion("customBadgeIconLink", "Add badge Icon Link", "input", "Badges: ", function (input) {
            return handleExceptions(input, "Link not added", "link");
        }),
        new InputQuestion("customBadgeDescrLink", "Add badge Description Link", "input", "Badges: ", function (input) {
            return handleExceptions(input, "Please enter a badge description", "link");
        }),
        new InputQuestion("additionalBadge", "Add another badge? ", "confirm", "Badges: ")
    ],

    // Get Contribution
    promptContribution: [
        new InputQuestion("addContribution", "Would you like to allow other developers to contribute to the development of this application? ", "confirm", "Contribution: "),
    ],
    promptContributionBadge: [
        new InputQuestion("addBadge", "Would you like to add a badge for the contributor covenant to display in your README.md file? ", "confirm", "Contribution: ")
    ],
    // Get How to Contibute
    howToContributeDesc: [
        new InputQuestion("contributionDescription", "Specify how other developers can go about contributing to this repository\n Outline steps to fork and download the content\n Firstly,  give a brief description of what they might help with: ", "input", "Contribution: ", function (input) {
            return handleExceptions(input, "You've entered no description");
        })
    ],
    howToContributeDetails: [
        new InputQuestion("contributionStep", "Detail how individual developers can fork this repository or help with the workload, step by step: ", "input", "Contribution: ", function (input) {
            return handleExceptions(input, "Steps will appear strange if they aren't entered or blank");
        }),
        new InputQuestion("continue", "Add another step?", "confirm", "Contribution: ")
    ],
    // Get Features
    promptFeatures: [
        new InputQuestion("addFeatures", "Would you like to add a features section?\n (If your project has a lot of features, list them here)", "confirm", "Features: ")
    ],
    addFeatures: [
        new InputQuestion("featureTitle", "Create a title for this feature: ", "input", "Features: ", function (input) {
            return handleExceptions(input, "Title omitted");
        }),
        new InputQuestion("featureDescr", "Create a description for this feature: ", "input", "Features: ", function (input) {
            return handleExceptions(input, "Feature requires description");
        }),
        new InputQuestion("continue", "Add another feature?", "confirm", "Features: ")
    ],
    // Get Tests
    promptTests: [
        new InputQuestion("addTests", "Have you written any tests?\n Here you can describe to users how to run your tests ", "confirm", "Tests: ")
    ],
    addTests: [
        new InputQuestion("testTitle", "What is this tests title? ", "input", "Tests: ", function (input) {
            return handleExceptions(input, "Tests title missing");
        }),
        new InputQuestion("testDescr", "Add a description of this test: ", "input", "Tests: ", function (input) {
            return handleExceptions(input, "requires description");
        }),
        new InputQuestion("testRun", "Add steps to run this test (assuming user has fully installed the application)\n Separate each step like so (>>): ", "input", "Tests: ", function (input) {
            return handleExceptions(input, "Step missing");
        }),
        new InputQuestion("promptMoreTests", "Are there other tests you would add? ", "confirm", "Tests: ")
    ],
    // Questions
    promptQuestions: [
        new InputQuestion("addQuestionsInfo", "Where should users direct any questions?\n Here you can detail your contact information ", "confirm", "Questions: "),
    ],
    addQuestionsSection: [
        new InputQuestion("userName", "Add your Gitihub username: ", "input", "Questions: ", function (input) {
            return handleExceptions(input, "No github username");
        }),
        new InputQuestion("userEmail", "Add your Email Address: ", "input", "Questions: ", function (input) {
            return handleExceptions(input, "No email entered", "email");
        })
    ],
    // Extras
    promptExtras: [
        new InputQuestion("addExtras", "Would you like to add any additional information or sections?\n (A title for Extras will be passed to the README.md file created to enter additional information) ", "confirm", "Extras: "),
    ],
    promptHomePage: [
        new InputQuestion("addHomePage", "It is recommended if you have an online web page to add an image and link for it. Add now? ", "confirm", "Extras: "),
    ],
    promptHomeLink: [
        new InputQuestion("addHomePageTitle", "Create a title describing the location or relevance of this image: ", "input", "Extras: ", function (input) {
            return handleExceptions(input, "You did not add anything here");
        }),
        new InputQuestion("addHomePageLink", "Add the image link: ", "input", "Extras: ", function (input) {
            return handleExceptions(input, "Link missing", "link");
        })
    ]
};

// TODO: Create a function to write README file
function writeToFile(data) {
   
    let htmlTemplate = fn.generateMarkdown(data)
    fs.writeFile(`README.md`, htmlTemplate, err => err ? console.log(err) : console.log(yellow, "Your readme has been generated!"))

}

// Hold Q&A
let answersArr = [];

// Prompt user for description details
const promptDescription = () => {
    inquirer.prompt(questions.description)
    .then((answers) => {
        answersArr.push(answers);
        console.log("\n");
        console.log(yellow, "Add information pertaining to any requirements for this application to run");
        console.log(yellow, "(Here you can specify to a user (not specifically a developer), what is required to run this application, if they so desire and it is permissible)");
        console.log(yellow, "(Note these requirements and consider adding badges later to indicate these requirements)");
        requirements();
    });
}
// Prompt user for requirements
const requireSection = {
    addRequired: false,
    requirements: ""
}
const requirements = () => {
    inquirer.prompt(questions.requiredPrompt)
    .then((answers) => {
        if (answers.requirementsSection) {
            requireSection.addRequired = true;
            addRequiredSection();
        } else {
            console.log("\n");
            furtherDevelopment();
        }
    })
}
const addRequiredSection = () => {
    inquirer.prompt(questions.requiredPrograms)
    .then((answers) => {
        requireSection.requirements = answers.required;
        answersArr.push(requireSection);
        console.log("\n");
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
            console.log("\n");
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
            console.log("\n");
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
            answersArr.push(answers);
            console.log("\n");
            promptInstallation()
        } else {
            tableDenied = false;
            answersArr.push(answers);
            console.log("\n");
            promptInstallation();
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
        if (answers.installation) {
            installationArray.continue = answers.continue;
            installationArray.installation.push(answers.installation);
            if (installationArray.continue) {
                promptInstallation()
            } else {
                installationArray.addInstallSteps = true;
                answersArr.push(installationArray);
                console.log("\n");
                addHowToUse();
            }
        } else {
            console.log(yellow, "No installation Instructions entered for previous step");
            promptInstallation();
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
            console.log("\n");
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
            console.log(yellow, "Please enter a usage summary");
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
            answersArr.push(usageSection);
            console.log("\n");
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
        answersArr.push(usageSection);
        console.log("\n");
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
            console.log("\n");
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
            answersArr.push(creditsInfo);
            console.log("\n");
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
// Add license info
let licensesPrompt = () => {
    inquirer.prompt(questions.licensesPrompt)
    .then((answers) => {
        if (answers.addLicenses) {
            licenseInfo.addLicenseInfo = true;
            useCustomLicenses();
        } else {
            console.log(yellow, "Be sure to check out https://choosealicense.com/no-permission/ for omitting a license on your project");
            console.log("\n");
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
            console.log(yellow, "Check out non-Software Licenses here https://choosealicense.com/non-software/\n or additional licenses not mentioned https://choosealicense.com/licenses/")
            addLicenses();
        }
    }) 
}
let customLicenses = () => {
    inquirer.prompt(questions.customLicenses)
    .then((answers) => {
        licenseInfo.licenses.customLicenses.push({
            customLicenseName: answers.customLicenseName,
            customLicenseLink: answers.customLicenseLink,
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
            console.log("\n");
            addBadges();
        }
    }) 
}
let licenseList = () => {
    inquirer.prompt(questions.licenseList)
    .then((answers) => {
        licenseInfo.licenses.listLicenses.name = answers.choicesLicense
        if (licenseInfo.licenses.listLicenses.name == "MIT License") {
            licenseInfo.licenses.listLicenses.badge = "[![License: MIT](https://img.shields.io/github/license/adonisjs/adonis-framework?style=for-the-badge)](https://opensource.org/licenses/MIT)";
        } else if (licenseInfo.licenses.listLicenses.name == "GNU General Public License") {
            licenseInfo.licenses.listLicenses.badge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
        }
        answersArr.push(licenseInfo);
        console.log("\n");
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
            createBadge();
        } else {
            console.log("\n");
            addContribution();
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
            createBadge();
        } else {
            answersArr.push(badgesInfo);
            console.log("\n");
            addContribution();
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
            promptContributionBadge();
        }  else {
            console.log("\n");
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
            console.log("\n");
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
            console.log("\n");
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
            console.log("\n");
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
            console.log("\n");
            promptQuestions();
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
            console.log("\n");
            promptQuestions();
        }
    }) 
}
// Get Questions Information
const questionsInfo = {
    addQuestions: false,
}
const promptQuestions = () => {
    inquirer.prompt(questions.promptQuestions)
    .then((answers) => {
        if (answers.addQuestionsInfo) {
            questionsInfo.addQuestions = true;
            addQuestions();
        } else {
            console.log("\n");
            extraSections();
        }
    }) 
}
const addQuestions = () => {
    inquirer.prompt(questions.addQuestionsSection)
    .then((answers) => {
        questionsInfo.userName = answers.userName;
        questionsInfo.userEmail = answers.userEmail;
        answersArr.push(questionsInfo);
        console.log("\n");
        extraSections();
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
// Get Extras Information
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
            console.log("\n");
            console.log("\n");
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
        console.log("\n");
        checkTable();
    }) 
}
// Double Check user won't add a Contents Section
const checkTable = () => {
    if (!tableDenied) {
        console.log(yellow, ` Table of contents is helpful for long README files. Are you happy to omit the table of contents?`);
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

// TODO: Create a function to initialize app
function init() {
    promptDescription();
};

// Function call to initialize app
init();
