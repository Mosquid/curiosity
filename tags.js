const tags = [
  "wordpress",
  "javascript",
  "woocommerce",
  "js",
  "typescript",
  "seo",
  "react",
  "aws",
  "golang",
  "php",
  "bootstrap",
  "saas"
]

module.exports.tags = tags.map(topic => topic.toLocaleLowerCase().replace(' ', '-'))
