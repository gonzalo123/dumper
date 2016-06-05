# Dumper

PHP Dumper using Websockets

## Install
```
npm install
```

## Grunt available tastks
```
Available tasks
           php  Start a PHP-server *
         build  create js dist files.
            js  jshint js files.
         serve  Start a PHP-server and watch tasks.
```

## Start the socket.io server
```
node io/server.js
```

## Start the PHP server
```
grunt serve
```

# Silex integration

```php
$app->get('/api/hello', function (Application $app) {
    $app['dumper']->error("Hello world1");
    $app['dumper']->info([1,2,3]);

    return $app->json('OK');
});
```
