(function (expressConfig) {

  const cookieParser = require('cookie-parser');
  const bodyParser   = require('body-parser');
  const helmet       = require('helmet');
  const Logger       = require('../modules/common/services/Logger');

  expressConfig.init = function (app, express) {

    app.use(helmet());
    app.use(helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self"],
        styleSrc: ["'self", 'maxcdn.bootstrapcdn.com']
      }
    }));
  
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    
    app.use(function(req, res, next) {
      res.ok = function(body) {
        Logger.log('debug', res.req.method + ' ' + req.originalUrl + ' response', body);
        res.status(200);
        res.json(body);
      }
      res.error = function(error) {
        Logger.log('error', res.req.method + ' ' + req.originalUrl + ' response', error);
        res.status(error.status);
        res.json({ errors: [error.error] });
      }
      next();
    });

  };

})(module.exports);
