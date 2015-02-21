<?php

namespace Dumper;

use GuzzleHttp\Client;
use Psr\Log\LoggerInterface;

class Dumper implements LoggerInterface
{
    private $uid;
    private $wsConenctor;
    private $client;

    const EMERGENCY = 'emergency';
    const ALERT = 'alert';
    const CRITICAL = 'critical';
    const ERROR = 'error';
    const WARNING = 'warning';
    const NOTICE = 'notice';
    const INFO = 'info';
    const DEBUG = 'debug';

    public function __construct(Client $client, $wsConnector, $uid)
    {
        $this->wsConenctor = $wsConnector;
        $this->uid         = $uid;
        $this->client      = $client;
    }

    public function log($level, $message, array $context = [])
    {
        $this->client->get($this->wsConenctor . "/{$level}/{$this->uid}/" . json_encode($message));
    }

    public function emergency($message, array $context = [])
    {
        $this->log(self::EMERGENCY, $message, $context);
    }

    public function alert($message, array $context = [])
    {
        $this->log(self::ALERT, $message, $context);
    }

    public function critical($message, array $context = [])
    {
        $this->log(self::CRITICAL, $message, $context);
    }

    public function error($message, array $context = [])
    {
        $this->log(self::ERROR, $message, $context);
    }

    public function warning($message, array $context = [])
    {
        $this->log(self::WARNING, $message, $context);
    }

    public function notice($message, array $context = [])
    {
        $this->log(self::NOTICE, $message, $context);
    }

    public function info($message, array $context = [])
    {
        $this->log(self::INFO, $message, $context);
    }

    public function debug($message, array $context = [])
    {
        $this->log(self::DEBUG, $message, $context);
    }
}