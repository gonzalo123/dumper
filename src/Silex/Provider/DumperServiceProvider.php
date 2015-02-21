<?php

namespace Dumper\Silex\Provider;

use Silex\Application;
use Silex\ServiceProviderInterface;
use Dumper\Dumper;
use Silex\Provider\SessionServiceProvider;
use GuzzleHttp\Client;

class DumperServiceProvider implements ServiceProviderInterface
{
    private $wsConnector;
    private $client;

    public function __construct(Client $client, $wsConnector)
    {
        $this->client = $client;
        $this->wsConnector = $wsConnector;
    }

    public function register(Application $app)
    {
        $app->register(new SessionServiceProvider());

        $app['dumper'] = function () use ($app) {
            return new Dumper($this->client, $this->wsConnector, $app['session']->get('uid'));
        };

        $app['dumper.init'] = $app->protect(function ($uid) use ($app) {
            $app['session']->set('uid', $uid);
        });

        $app['dumper.uid'] = function () use ($app) {
            return $app['session']->get('uid');
        };
    }

    public function boot(Application $app)
    {
    }
}