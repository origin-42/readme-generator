// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {

  let unformattedTemplate = [];
  let badgesSection = [`<div align="center">\n\n`];
  let renderBadges = false;
  let requirementsRun = false;
  let developmentRun = false;
  
  // Add Table of Contents info
  const generateTable = () => {
    let table = [`## Table of Contents\n\n`, `* [Installation](#installation)\n`];

    data.forEach(step => {
      if (step.howToUse) {
        table.push(`* [How to Use](#how-to-use)\n`);
      } else if (step.addCredInfo) {
        table.push(`* [Credits](#credits)\n`);
      } else if (step.addLicenses) {
        table.push(`* [Licenses](#licenses)\n`);
      } else if (step.addContr) {
        table.push(`* [Contribution](#contribution)\n`);
      } else if (step.addFeatures) {
        table.push(`* [Features](#features)\n`);
      } else if (step.addExtras) {
        table.push(`* [Extras](#extras)\n`);
      } else if (step.addTests) {
        table.push(`* [Tests](#tests)\n`);
      } else if (step.addQuestions) {
        table.push(`* [Questions](#questions)\n`);
      };
    });
    return table.join("")
  }
  // Add Requirements Steps
  const handleRequirements = () => {
    requirementsRun = true;
    let requirements = [];
    data.forEach(step => {
      if (step.addRequired) {
        requirements.push(`## Requirements\n\n${step.requirements}\n\n`);
      }
    })
    return requirements;
  }
  // Add Further Development Steps
  const handleDevelopment = () => {
    developmentRun = true;
    let devSection = [`## Further Developments\n\n`];
    let developments = [`### Additional Features\n\n`];
    let changes = [`### Further Changes\n\n`];
    data.forEach(step => {
      if (step.addDevInfo) {
        step.furtherDev.forEach(dev => {
          developments.push(`- ${dev.furtherDev}\n\n`);
        });
      };
      if (step.addDevInfo) {
        step.furtherChanges.forEach(change => {
          changes.push(`- ${change.furtherChange}\n\n`);
        });
      };
    });
    devSection.push(developments.join(""));
    devSection.push(changes.join(""));
    return devSection.join("");
  };
  // Add formatted Installation steps
  const addInstallation = () => {
    let installation = ["## Installation\n\n", "```\n"];
    data.forEach(step => {
      if (step.installation) {
        step.installation.forEach(installStep => {
          installation.push(`${installStep}\n`)
        });
      };
    });
    installation.push("```\n\n");

    return installation.join("");
  }
  // Add formatted How to Use Section
  const addHowToUse = () => {
    let howToUse = ["## How to Use\n\n"];
    data.forEach(step => {
      if (step.addHowtoUse) {
        howToUse.push(`${step.usageSummary}\n\n`);
        step.usageDetails.photos.forEach(photo => {
          howToUse.push(`### ${photo.howToUseImagesTitle}\n\n`);
          howToUse.push(`${photo.howToUseImagesText}\n\n`);
          howToUse.push(`![snippet](${photo.howToUseImagesLink})\n\n`);
        })
        step.usageDetails.video.forEach(video => {
          howToUse.push(`### ${video.howToUseVideoTitle}\n\n`);
          howToUse.push(`${video.howToUseVideoText}\n\n`);
          howToUse.push(`![snippet](${video.howToUseVideoLink})\n\n`);
        })
      }
    })
    return howToUse.join("");
  }
  // Add information on credits
  const handleCredits = () => {
    let creditsArr = [`## Credits\n\n`];
    data.forEach(step => {
      if (step.addCredInfo) {
        step.listcredits.forEach(cred => {
          creditsArr.push(`[${cred.creditTitle}]`);
          creditsArr.push(`(${cred.creditLink}): `);
          creditsArr.push(`${cred.creditDescr}\n\n`);
        })
      }
    })
    return creditsArr.join("");
  };
  // Add information for Licenses
  const handleLicenses = () => {
    let licenses = [`## Lisences\n\n`];
    data.forEach(step => {
      if (step.addLicenseInfo) {
        step.licenses.customLicenses.forEach(license => {
          licenses.push(`* [${license.customLicenseName}](${license.customLicenseLink})\n\n`);
        })
        handleBadges([step.licenses.listLicenses.badge])
      };
    });
    return licenses.join("");
  };
  // Handle Badge Section
  const handleBadgeSection = () => {
    data.forEach(step => {
      if (step.addBadges) {
        step.badges.forEach(badge => {
          handleBadges([`[![${badge.name}](${badge.iconLink})](${badge.descrLink})`]);
        });
      };
    });
  };
  // Handle Contribution Section
  const handleContribution = () => {
    let contributionArr = [`## Contribution\n\n`];
    data.forEach(step => {
      if (step.addContr) {
        if (step.addBadge) {
          handleBadges([`[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)`])
        };
        contributionArr.push(`${step.contrDescr}\n\n`);
        contributionArr.push("### How to Contribute\n\n");
        contributionArr.push("```\n");
        step.contribution.forEach(step => {
          contributionArr.push(`${step}\n`)
        });
        contributionArr.push("```\n\n");
      };
    });
    return contributionArr.join("");
  }
  // Handle Features Section
  const handleFeatures = () => {
    let featuresArr = [`## Features\n\n`];
    let featureArr = [];
    data.forEach(step => {
      if (step.addFeatures) {
        step.features.forEach(feature => {
          featureArr.push(`### ${feature.featureTitle}\n\n${feature.featureDescr}\n\n`);
        });
        featureArr.push(`\n\n`);
      };
    });
    featuresArr.push(featureArr.join(""));
    return featuresArr.join("");
  }
  // Handle Tests Section
  const handleTests = () => {
    let testsArr = [`## Tests\n\n`];
    data.forEach(step => {
      if (step.addTests) {
        step.tests.forEach(test => {
          testsArr.push(`### ${test.testTitle}\n\n${test.testDescr}\n\n` + "```\n");
          let splitTestsArr = test.testSteps.split(">>");
          splitTestsArr.forEach(testSplit => {
            testsArr.push(`${testSplit}\n`);
          })
          testsArr.push("```\n\n");
        });
      };
    });
    return testsArr.join("");
  }
  // Handle Questions Section
  const handleQuestions = () => {
    let questionsArr = [`## Questions\n\nDirect any questions too;\n\n`];
    data.forEach(step => {
      if (step.addQuestions) {
        questionsArr.push(`- [${step.userName}](https://github.com/${step.userName})\n`);
        questionsArr.push(`- ${step.userEmail}\n\n`);
      };
    });
    return questionsArr.join("");
  };
  // Handle orientation of badges in README.md
  const handleBadges = (badges) => {
    if (!renderBadges) {
      renderBadges = true;
    };
    badges.forEach(badge => {
      badgesSection.push(`${badge} `);
    });
  };
  const handleHomePage = () => {
    let homePageArr = [];
    data.forEach(step => {
      if (step.addExtras === false) {
        unformattedTemplate.push(`## Extras\n\n`);
      };
      if (step.addhomePage) {
        homePageArr.push(`[${step.homePageTitle}](${step.homePageLink})\n\n`);
        homePageArr.push(`![snippet](${step.homePageLink})\n\n`); 
      };
    });
    return homePageArr.join("");
  };

  // Check steps required and pass to render
  data.forEach(step => {
    if (step.title) {
      unformattedTemplate.push(`<div align="center">\n\n# ${step.title}\n\n</div>\n\n\n`);
      unformattedTemplate.push(`## Further Development\n\n ### Motivation\n\n${step["description-motivation"]}\n\n`);
      unformattedTemplate.push(`### Problem\n\n${step["description-problem"]}\n\n`);
      unformattedTemplate.push(`### Information\n\n${step["description-learned"]}\n\n`);

      // Optional Step: Handle Requirements
    } else if (step.addRequired) {
      unformattedTemplate.push(handleRequirements());

      // Optional Step: Handle Development
    } else if (step.addDevInfo) {
      unformattedTemplate.push(handleDevelopment());

      // Installation
    } else if (step.tableofcontents) {
      if (requirementsRun && developmentRun) {
        unformattedTemplate.splice(6, 0, `${generateTable()}\n`);
      } else if (requirementsRun && !developmentRun || !requirementsRun && developmentRun) {
        unformattedTemplate.splice(5, 0, `${generateTable()}\n`);
      } else {
        unformattedTemplate.splice(4, 0, `${generateTable()}\n`);
      }

    } else if (step.addInstallSteps) {
      unformattedTemplate.push(addInstallation());

      // Optional Step: How to Use
    } else if (step.addHowtoUse) {
      unformattedTemplate.push(addHowToUse());

      // Optional Step: Add Credits
    } else if (step.addCredInfo) {
      unformattedTemplate.push(handleCredits());

      // Optional Step: Add Licenses
    } else if (step.addLicenseInfo) {
      unformattedTemplate.push(handleLicenses());

      // Optional Step: Add Custom Badges
    } else if (step.addBadges) {
      unformattedTemplate.push(handleBadgeSection());

      // Optional Step: Add Contribution
    } else if (step.addContr) {
      unformattedTemplate.push(handleContribution());

      // Optional Step: Add Features
    } else if (step.addFeatures) {
      unformattedTemplate.push(handleFeatures());

      // Optional Step: Add Tests
    } else if (step.addTests) {
      unformattedTemplate.push(handleTests());

      // Optional Step: Add Questions
    } else if (step.addQuestions) {
      unformattedTemplate.push(handleQuestions());

      // Optional Step: Add Extras
    } else if (step.addExtras) {
      unformattedTemplate.push(`## Extras\n\n`);

      // Optional Step: Add Home Page Image
    } else if (step.addhomePage) {
      unformattedTemplate.push(handleHomePage());
    }
  })

  if (renderBadges) {
    badgesSection.push("\n\n</div>");
    let formattedBadges = badgesSection.join("");
    unformattedTemplate.splice(1, 0, `${formattedBadges}\n\n\n`);
  }
  let htmlTemplate = unformattedTemplate.join("");

  return htmlTemplate;
}

module.exports = {
  generateMarkdown: generateMarkdown
};
