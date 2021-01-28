const puppeteer = require("puppeteer")
const home = "http://curiosity.ga"

let browser
let page
let launchParams = { headless: true }
let cycles = 0

if (process.env.EXEC_PATH) {
  launchParams.executablePath = process.env.EXEC_PATH
  launchParams.args = [
    "--incognito",
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--ignore-certificate-errors",
  ]
}

function pageEvaluationCode(link) {
  const a = document.querySelector("a")

  a.setAttribute("href", link)
  window.history.pushState("", "", "featured-from-medium")
  a.click()
}

module.exports.visit = async (link) => {
  try {
    cycles++

    if (cycles > 10) {
      cycles = 0
      await browser.close()

      browser = null
    }

    if (!browser) {
      console.log("launching a browser")
      browser = await puppeteer.launch(launchParams)
    }

    page = await browser.newPage()

    await page.goto(home, { waitUntil: "domcontentloaded", timeout: 35000 })
    const data = await page.evaluate(pageEvaluationCode, link)

    return data
  } catch (error) {
    page && (await page.close())

    console.error(error)

    return false
  }
}

module.exports.browser = () => browser
