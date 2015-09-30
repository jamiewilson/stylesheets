Package.describe({
  name: "rss",
  summary: "RSS feed generator",
  version: '0.1.0'
});

Npm.depends({rss: '1.0.0'});

Package.onUse(function (api) {
  api.versionsFrom('0.9.4');
  api.addFiles('rss.js', 'server');
  api.export('RSS');
});
