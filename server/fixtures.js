if (Posts.find().count() === 0) {
  var now = new Date().getTime();
  var step = 1;
  Posts.insert({
    title: "CSS Reference | Codrops",
    link: "http://tympanus.net/codrops/css_reference/",
    description: "An extensive CSS reference with all the important properties and info to learn CSS from the basics",
    createdBy: 'Tg59AXAxYGeJxNc7f',
    dateCreated: new Date(now - step++ * 3600 * 1000),
    upvoters: [],
    stars: 0,
    color: "#007fb3"
  });
  Posts.insert({
    title: "CriticalCSS",
    link: "https://github.com/filamentgroup/criticalcss",
    description: "Finds the Above the Fold CSS for your page, and outputs it into a file",
    createdBy: '',
    dateCreated: new Date(now - step++ * 3600 * 1000),
    upvoters: [],
    stars: 0,
    color: "#ffa300"
  });
  Posts.insert({
    title: "CSS polyfills from the future | GSS",
    link: "http://gridstylesheets.org/",
    description: "GSS reimagines CSS layout by using the Cassowary Constraint Solver algorithm",
    createdBy: 'Tg59AXAxYGeJxNc7f',
    dateCreated: new Date(now - step++ * 3600 * 1000),
    upvoters: [],
    stars: 0,
    color: "#002034"
  });
  Posts.insert({
    title: "Basscss",
    link: "http://www.basscss.com/",
    description: "Lightning-Fast Modular CSS with No Side Effects",
    createdBy: 'Tg59AXAxYGeJxNc7f',
    dateCreated: new Date(now - step++ * 3600 * 1000),
    upvoters: [],
    stars: 1,
    color: "#0070dc"
  });
  Posts.insert({
    title: "ungrid",
    link: "http://chrisnager.github.io/ungrid/",
    description: "The simplest responsive css grid",
    createdBy: '',
    dateCreated: new Date(now - step++ * 3600 * 1000),
    upvoters: [],
    stars: 1,
    color: "#c9cbae"
  });
  Posts.insert({
    title: "What the Flexbox?",
    link: "http://flexbox.io",
    description: "A simple, free 20 video course that will help you master CSS Flexbox",
    createdBy: 'Tg59AXAxYGeJxNc7f',
    dateCreated: new Date(now - step++ * 3600 * 1000),
    upvoters: [],
    stars: 0,
    color: "#9f6acc"
  });
  Posts.insert({
    title: "BADA55.io - CSS hex color words for web developers",
    link: "http://bada55.io",
    description: "Finding the most badass leet words for your CSS hex colors",
    createdBy: '',
    dateCreated: new Date(now - step++ * 3600 * 1000),
    upvoters: [],
    stars: 0,
    color: "#ffd584"
  });
  Posts.insert({
    title: "Myth - CSS the way it was imagined.",
    link: "http://www.myth.io/",
    description: "CSS the way it was imagined",
    createdBy: 'Tg59AXAxYGeJxNc7f',
    dateCreated: new Date(now - step++ * 3600 * 1000),
    upvoters: [],
    stars: 0,
    color: "#797bd8"
  });
  Posts.insert({
    title: "Skeleton: Responsive CSS Boilerplate",
    link: "http://getskeleton.com/",
    description: "A dead simple, responsive boilerplate.",
    createdBy: '',
    dateCreated: new Date(now - step++ * 3600 * 1000),
    upvoters: [],
    stars: 0,
    color: "#1c1c1c"
  });
  Posts.insert({
    title: "CSSCV",
    link: "https://github.com/csswizardry/csscv",
    description: "A simple, opinionated stylesheet for formatting semantic HTML to look like a CSS file.",
    createdBy: 'Tg59AXAxYGeJxNc7f',
    dateCreated: new Date(now - step++ * 3600 * 1000),
    upvoters: [],
    stars: 0,
    color: "#002936"
  });
}
