var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

router.get('/login', function (req, res, next) {
  
  let connection = req.query?.connection;
  console.log(connection);
  res.oidc.login({
    returnTo: "profile",
    authorizationParams: {
      connection: connection
    }
  })   
});

router.get('/logout', function (req, res, next) {
  
  res.oidc.logout({ returnTo: '/logout-2?test=https://test.com' })
 
});

router.get('/logout-2', function (req, res, next) {
  console.log(req);
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated()
  });
 
});

router.get('/profile', requiresAuth(), function (req, res, next) {
  console.log(req.oidc.accessToken.access_token)
  //req.oidc.user.access_token = req.oidc.accessToken;
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  });
});

module.exports = router;
