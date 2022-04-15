// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  console.log(data)

  let unformattedTemplate = [];
  let badgesSection = [`<div align="center">`];
  
  // Add Table of Contents info
  const generateTable = () => {
    let table = [`## Table of Contents\n\n`, `[Installation](#Installation)\n`]

    data.forEach(step => {
      if (step.usage) {
        table.push(`[How to Use](#How to Use)\n`)
      } else if (step.credits) {
        table.push(`[Credits](#Credits)\n`)
      } else if (step.lisences) {
        table.push(`[Lisences](#Lisences)\n`)
      } else if (step.badges) {
        table.push(`[Badges](#Badges)\n`)
      } else if (step.contribution) {
        table.push(`[Contribution](#Contribution)\n`)
      } else if (step.howToContibute) {
        table.push(`[How to Contribute](#How to Contribute)\n`)
      } 
    })

    return table.join("")
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
          howToUse.push(`${photo.howToUseImagesText}\n\n`)
          howToUse.push(`![snippet](${photo.howToUseImagesLink})\n`)
          howToUse.push(`### ${photo.howToUseImagesTitle}\n\n`)
        })
        step.usageDetails.video.forEach(video => {
          howToUse.push(`${video.howToUseVideoText}\n\n`)
          howToUse.push(`![snippet](${video.howToUseVideoLink})\n`)
          howToUse.push(`### ${video.howToUseVideoTitle}\n\n`)
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
  // Add information for Lisences
  const handleLisences = () => {
    data.forEach(step => {
      if (step.addLisenceInfo) {
        handleBadges([step.lisences.listLisences.badge])
      }
    })
  }
  // Handle Badge Section
  const handleBadgeSection = () => {
    data.forEach(step => {
      if (step.addBadges) {
        step.badges.forEach(badge => {
          handleBadges([`[![${badge.customBadgeName}](${badge.customBadgeIconLink})](${badge.customBadgeDescrLink})`]);
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
  // Handle orientation of badges in README.md
  const handleBadges = (badges) => {
    badges.forEach(badge => {
      badgesSection.push(`${badge} `)
    })
  }

  // Check steps required and pass to render
  data.forEach(step => {
    if (step.title) {
      unformattedTemplate.push(`# <div align="center">${step.title}<div>\n\n`)
      unformattedTemplate.push(`${step["description-motivation"]}\n\n`)
      unformattedTemplate.push(`${step["description-problem"]}\n\n`)
      unformattedTemplate.push(`${step["description-learned"]}\n\n`)

      // Optional Step: Installation
    } else if (step.tableofcontents) {
      unformattedTemplate.push(`${generateTable()}\n`)

    } else if (step.addInstallSteps) {
      unformattedTemplate.push(addInstallation())

      // Optional Step: How to Use
    } else if (step.addHowtoUse) {
      unformattedTemplate.push(addHowToUse())

      // Optional Step: Add Credits
    } else if (step.addCredInfo) {
      unformattedTemplate.push(handleCredits())

      // Optional Step: Add Lisences
    } else if (step.addLisenceInfo) {
      unformattedTemplate.push(handleLisences())

      // Optional Step: Add Custom Badges
    } else if (step.addBadges) {
      unformattedTemplate.push(handleBadgeSection())

      // Optional Step: Add Contribution
    } else if (step.addContr) {
      unformattedTemplate.push(handleContribution())
    }
  })

  badgesSection.push("</div>");
  let formattedBadges = badgesSection.join("");
  unformattedTemplate.splice(1, 0, `${formattedBadges}\n\n`);
  let htmlTemplate = unformattedTemplate.join("");

  return htmlTemplate;
}

module.exports = {
  generateMarkdown: generateMarkdown
};
