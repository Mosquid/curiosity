require("dotenv").config()

const { tags } = require("./tags")
const { getTopicData } = require("./source-data")
const { visit, browser } = require("./promote")
async function main() {
  const links = []
  for (let tag of tags) {
    const data = await getTopicData(tag)
    console.log(data)
    if (data && data.length) links.push(...data)
  }

  console.log(links.length)
  for (let link of links) {
    await visit(link)
  }
  browser().close()
}

main()
