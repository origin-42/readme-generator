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

  let unformattedTemplate = []
  
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

  // Check steps required and pass to array
  data.forEach(step => {
    if (step.title) {
      unformattedTemplate.push(`# ${step.title}\n\n`)
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
    }
  })

  let htmlTemplate = unformattedTemplate.join("");

  return htmlTemplate;
}

module.exports = {
  generateMarkdown: generateMarkdown
};
