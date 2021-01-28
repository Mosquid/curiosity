require("dotenv").config()

const { topics } = require("./topics")
const { getTopicData } = require("./source-data")
const { visit, browser } = require("./promote")

async function main() {
  const links = []
  for (let topic of topics) {
    const data = await getTopicData(topic)
    if (data && data.length) links.push(...data)
  }

  for (let link of links) {
    await visit(link)
  }

  browser().close()
}

main()

// const getTopicArticles =
