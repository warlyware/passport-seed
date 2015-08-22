module.exports = {
  'googleAuth': {
    'clientID': process.env.GOOGLE_ID,
    'clientSecret': process.env.GOOGLE_SECRET,
    'callbackURL': 'http://localhost:3000/auth/google/callback'
  },
  'githubAuth': {
    'clientID': process.env.GITHUB_CLIENT_ID,
    'clientSecret': process.env.GITHUB_CLIENT_SECRET,
    'callbackURL': "http://localhost:3000/auth/github/callback"
  }
};
