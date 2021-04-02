const titleCase = (str) =>
  str.toLowerCase().split` `.map((word) =>
    word.replace(word[0], word[0].toUpperCase())
  ).join` `;

module.exports = {
  titleCase,
};
