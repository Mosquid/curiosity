const axios = require("axios")
const parseString = require("xml2js").parseStringPromise

module.exports.getTopicData = async (topic) => {
  try {
    const url = `https://medium.com/feed/tag/${topic}`
    const { data } = await axios.get(url)
    const parsed = await parseString(data)
    return getTopicStories(parsed)
  } catch (error) {
    return null
  }
}

function getTopicStories(list) {
  try {
    const stories = list.rss.channel[0].item
    return stories.map((story) => story.link[0].split("?")[0])
  } catch (error) {
    return null
  }
}
