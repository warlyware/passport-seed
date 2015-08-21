module.exports = {
  'googleAuth': {
    // 'clientID': '1098573959131-h0ot926rn50lvk4gh4iqc3kviv2jethl.apps.googleusercontent.com',
    // 'clientSecret': 'AoeDlLw1nlHsgd-x1E2ph3XH',
    'clientID': process.env.GOOGLE_ID,
    'clientSecret': process.env.GOOGLE_SECRET,
    'callbackURL': 'http://localhost:3000/auth/google/callback'
  }
};
