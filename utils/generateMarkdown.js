// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  console.log(data)

  let unformattedTemplate = [];
  let badgesSection = [`<div align="center">`];
  let renderBadges = false;
  
  
  // Add Table of Contents info
  const generateTable = () => {
    let table = [`## Table of Contents\n\n`, `* [Installation](#installation)\n`]

    data.forEach(step => {
      if (step.howToUse) {
        table.push(`* [How to Use](#how-to-use)\n`);
      } else if (step.addCredInfo) {
        table.push(`* [Credits](#credits)\n`);
      } else if (step.addContr) {
        table.push(`* [Contribution](#contribution)\n`);
      } else if (step.addFeatures) {
        table.push(`* [Features](#features)\n`);
      } else if (step.addExtras) {
        table.push(`* [Extras](#extras)\n`);
      }
    });

    return table.join("")
  }
  // Add Requirements Steps
  const handleRequirements = () => {
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
    let devSection = [`## Further Developments\n\n`];
    let developments = [`### Additional Features\n\n`];
    let changes = [`### Further Changes\n\n`];
    data.forEach(step => {
      if (step.addDevInfo) {
        step.furtherDev.forEach(dev => {
          developments.push(`- ${dev.furtherDev}\n\n`);
        });
      }
      if (step.addDevInfo) {
        step.furtherChanges.forEach(change => {
          changes.push(`- ${change.furtherChange}\n\n`);
        });
      }
    });
    devSection.push(developments.join(""));
    devSection.push(changes.join(""));
    return devSection.join("");
  }
  // Add formatted Installation steps
  const addInstallation = () => {
    let installation = ["## Installation\n\n", "```\n"];
    data.forEach(step => {
      if (step.installation) {
        step.installation.forEach(installStep => {
          installation.push(`${installStep}\n`)
        })
      }
    })
    installation.push("```\n\n")

    return installation.join("");
  }
  // Add formatted How to Use Section
  const addHowToUse = () => {
    let howToUse = ["## How to Use\n\n"];
    data.forEach(step => {
      if (step.addHowtoUse) {
        howToUse.push(`${step.usageSummary}\n\n`)
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
          creditsArr.push(`[${cred.creditTitle}]`)
          creditsArr.push(`(${cred.creditLink}): `)
          creditsArr.push(`${cred.creditDescr}\n\n`)
        })
      }
    })
    return creditsArr.join("");
  }
  // Add information for Licenses
  const handleLicences = () => {
    data.forEach(step => {
      if (step.addLisenceInfo) {
        handleBadges([step.licenses.listLicenses.badge])
      }
    })
  }
  // Handle Badge Section
  const handleBadgeSection = () => {
    data.forEach(step => {
      if (step.addBadges) {
        step.badges.forEach(badge => {
          handleBadges([`[![${badge.name}](${badge.iconLink})](${badge.descrLink})`]);
        })
      }
    })
  }
  // Handle Contribution Section
  const handleContribution = () => {
    let contributionArr = [`## Contribution\n\n`];
    data.forEach(step => {
      if (step.addContr) {
        if (step.addBadge) {
          handleBadges([`[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)`])
        }
        contributionArr.push(`${step.contrDescr}\n\n`);
        contributionArr.push("### How to Contribute\n\n");
        contributionArr.push("```\n");
        step.contribution.forEach(step => {
          contributionArr.push(`${step}\n`)
        })
        contributionArr.push("```\n\n");
      }
    })
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
      }
    })
    featuresArr.push(featureArr.join(""));
    return featuresArr.join("");
  }
  // Handle orientation of badges in README.md
  const handleBadges = (badges) => {
    if (!renderBadges) {
      renderBadges = true;
    }
    badges.forEach(badge => {
      badgesSection.push(`${badge} `)
    })
  }
  const handleHomePage = () => {
    let homePageArr = [];
    data.forEach(step => {
      if (step.addhomePage) {
        homePageArr.push(`[${step.homePageTitle}](${step.homePageLink})\n`);
        homePageArr.push(`![snippet](${step.homePageLink})\n\n`);
      }
    })
    return homePageArr.join("")
  }

  // Check steps required and pass to render
  data.forEach(step => {
    if (step.title) {
      unformattedTemplate.push(`# <div align="center">${step.title}<div>\n\n`)
      unformattedTemplate.push(`${step["description-motivation"]}\n\n`)
      unformattedTemplate.push(`${step["description-problem"]}\n\n`)
      unformattedTemplate.push(`${step["description-learned"]}\n\n`)

      // Optional Step: Handle Requirements
    } else if (step.addRequired) {
      unformattedTemplate.push(handleRequirements());

      // Optional Step: Handle Development
    } else if (step.addDevInfo) {
      unformattedTemplate.push(handleDevelopment());

      // Installation
    } else if (step.tableofcontents) {
      unformattedTemplate.push(`${generateTable()}\n`);

    } else if (step.addInstallSteps) {
      unformattedTemplate.push(addInstallation());

      // Optional Step: How to Use
    } else if (step.addHowtoUse) {
      unformattedTemplate.push(addHowToUse());

      // Optional Step: Add Credits
    } else if (step.addCredInfo) {
      unformattedTemplate.push(handleCredits());

      // Optional Step: Add Licenses
    } else if (step.addLisenceInfo) {
      unformattedTemplate.push(handleLicences());

      // Optional Step: Add Custom Badges
    } else if (step.addBadges) {
      unformattedTemplate.push(handleBadgeSection());

      // Optional Step: Add Contribution
    } else if (step.addContr) {
      unformattedTemplate.push(handleContribution());

      // Optional Step: Add Features
    } else if (step.addFeatures) {
      unformattedTemplate.push(handleFeatures());

      // Optional Step: Add Extras
    } else if (step.addExtras) {
      unformattedTemplate.push(`## Extras\n\n`);

      // Optional Step: Add Home Page Image
    } else if (step.addhomePage) {
      unformattedTemplate.push(handleHomePage());
    }
  })

  if (renderBadges) {
    badgesSection.push("</div>");
    let formattedBadges = badgesSection.join("");
    unformattedTemplate.splice(1, 0, `${formattedBadges}\n\n\n`);
  }
  let htmlTemplate = unformattedTemplate.join("");

  return htmlTemplate;
}

module.exports = {
  generateMarkdown: generateMarkdown
};
