<?php

class RequestHandler
{
    public static function processRequest(string $input)
    {
        $start_time = microtime(true);

        preg_match('/"X"\s*:\s*([0-9.-]+),\s*"Y"\s*:\s*([0-9.-]+),\s*"R"\s*:\s*([0-9.-]+)/', $input, $matches);

        if (isset($matches[1]) && isset($matches[2]) && isset($matches[3])) {
            $x = floatval($matches[1]);
            $y = self::buildY($matches[2]);
            $r = floatval($matches[3]);

            if ((new RequestHandler)->validateData($x, $y, $r)) {
                self::echoResponse(200, self::buildResponse($x, $y, $r, $start_time));
            } else {
                self::echoResponse(400, "Provided data is not valid");
            }

        } else {
            self::echoResponse(400, "Not all data is set");
        }
    }

    public static function buildY($rawY): string
    {
        list($whole, $fraction) = explode(".", $rawY);
        $trimmedFraction = substr($fraction, 0, 8);
        return $whole . "." . $trimmedFraction;
    }

    public static function validateData($x, $y, $r): bool
    {
        if (
            is_numeric($x) && is_numeric($y) && is_numeric($r) &&
            in_array($x, [-5, -4, -3, -2, -1, 0, 1, 2, 3]) &&
            $y > -3 && $y < 5 && in_array($r, [1, 2, 3, 4, 5])
        ) {
            return true;
        }
        return false;
    }

    public static function checkHit(int $x, float $y, int $r): string
    {
        $sector1 = $x >= 0 && $y >= 0 && ($x) ^ 2 + ($y) ^ 2 <= ($r) ^ 2;
        $sector3 = $x <= 0 && $y <= 0 && abs($x) <= $r && abs($y) <= $r;
        $sector4 = $x >= 0 && $y <= 0 && $y >= ($x - $r / 2);
        if ($sector1 || $sector3 || $sector4) {
            return "HIT";
        }
        return "MISS";
    }

    public static function buildResponse(int $x, float $y, int $r, $start_time): array
    {
        $hit = self::checkHit($x, $y, $r);
        $currentTime = (new DateTime('now'))->format('H:i:s');
        $scriptTime = microtime(true) - $start_time;
        return array(
            "x" => "<td>" . $x . "</td>",
            "y" => "<td>" . $y . "</td>",
            "r" => "<td>" . $r . "</td>",
            "success" => "<td>" . $hit . "</td>",
            "currentTime" => "<td>" . $currentTime . "</td>",
            "executionTime" => "<td>" . number_format($scriptTime, 6, '.', '') . "</td>"
        );
    }

    public static function echoResponse(int $http_response_code, $response)
    {
        header('Content-Type: application/json');
        http_response_code($http_response_code);
        echo(json_encode($response));
    }

}

date_default_timezone_set('Europe/Moscow');
$jsonInput = file_get_contents('php://input');
if (!empty($jsonInput)) {
    RequestHandler::processRequest($jsonInput);
} else {
    RequestHandler::echoResponse(400, "Empty request");
}
die;
?>