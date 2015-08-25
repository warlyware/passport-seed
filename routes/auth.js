module.exports = function(app, passport) {


  // BASIC ROUTES

  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user: req.user
    });
  });


  // AUTHENTICATION ROUTES

    // LOCAL
    app.get('/login', function(req, res) {
      res.render('login.ejs', {message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
      successRedirect: '/profile',
      failureRedirect: '/login',
      failureFlash: true
    }));

    app.get('/signup', function(req, res) {
      res.render('signup.ejs', {message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
      successRedirect: '/profile',
      failureRedirect: '/signup',
      failureFlash: true
    }));

    // GOOGLE
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/google/callback', passport.authenticate('google', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));

    // TWITTER
    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // GITHUB
    app.get('/auth/github',
      passport.authenticate('github'));

    app.get('/auth/github/callback', passport.authenticate('github', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));

  // AUTHORIZATION ROUTES (LINK)

    // LOCAL
    app.get('/connect/local', function(req, res) {
      res.render('connect-local.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/connect/local', passport.authenticate('local-signup', {
      successRedirect: '/profile',
      failureRedirect: '/connect/local',
      failureFlash: true
    }));

    // GOOGLE
    app.get('/connect/google', passport.authorize('google', { scope: ['profile', 'email'] }));

    app.get('/connect/google/callback', passport.authorize('google', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));

    // TWITTER
    app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

    // handle the callback after twitter has authorized the user
    app.get('/connect/twitter/callback',
        passport.authorize('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // GITHUB
    app.get('/connect/github', passport.authorize('github'));

    // handle the callback after github has authorized the user
    app.get('/connect/github/callback',
        passport.authorize('github', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));


  // UNLINK ACCOUNTS

    // LOCAL
    app.get('/unlink/local', function(req, res) {
      var user = req.user;
      user.local.email = undefined;
      user.local.password = undefined;
      user.save(function(err) {
        res.redirect('/profile');
      });
    });

    // GOOGLE
    app.get('/unlink/google', function(req, res) {
      var user = req.user;
      user.google.token = undefined;
      user.save(function(err) {
        res.redirect('/profile');
      });
    });

    // TWITTER
    app.get('/unlink/twitter', function(req, res) {
      var user = req.user;
      user.twitter.token = undefined;
      user.save(function(err) {
         res.redirect('/profile');
      });
    });


    // GITHUB
    app.get('/unlink/github', function(req, res) {
      var user = req.user;
      user.github.token = undefined;
      user.save(function(err) {
         res.redirect('/profile');
      });
    });


  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }

};
