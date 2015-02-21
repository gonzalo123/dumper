<?php

include __DIR__ . '/../vendor/autoload.php';

use Silex\Application;
use Silex\Provider\TwigServiceProvider;
use Dumper\Silex\Provider\DumperServiceProvider;
use GuzzleHttp\Client;

$app = new Application([
    'debug' => true
]);

$app->register(new DumperServiceProvider(new Client(), 'http://192.168.1.104:26300'));

$app->register(new TwigServiceProvider(), [
    'twig.path' => __DIR__ . '/../views',
]);

$app->get("/", function (Application $app) {
    $uid = uniqid();

    $app['dumper.init']($uid);

    return $app['twig']->render('index.twig', [
        'uid' => $uid
    ]);
});

$app->get('/api/hello', function (Application $app) {
    $app['dumper']->error("Hello world1");
    $app['dumper']->info([1,2,3]);

    return $app->json('OK');
});


$app->run();