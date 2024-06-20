// next-sitemap.config.js
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://boldena.com',
    generateRobotsTxt: true,
    robotsTxtOptions: {
      additionalSitemaps: [
        `${process.env.SITE_URL || 'https://boldena.com'}/server-sitemap.xml`,
      ],
    },
    exclude: ['/server-sitemap.xml'],
  }