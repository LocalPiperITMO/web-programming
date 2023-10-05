<?php

class ErrorArray
{
    public static $error_array = array(
        'ERR_EMPTY_REQUEST' => array(400, "Incoming request was empty"),
        'ERR_DATA_NOT_SET' => array(400, "Data is not set"),
        'ERR_DATA_NOT_ALL' => array(400, "Not all data is set"),
        'ERR_DATA_INVALID' => array(400, "Data is not valid"),
        'ERR_DATA_OUT_OF_SCOPE' => array(400, "Data is out of range"),
        'ERR_WHAT_THE_FUCK' => array(500, "Unexpected error occurred")
    );
}

class DataUtils
{
    public static function buildY($rawY): string
    {
        list($whole, $fraction) = explode(".", $rawY);
        $trimmedFraction = substr($fraction, 0, 8);
        return $whole . "." . $trimmedFraction;
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
}

class Validator
{
    public static function checkNumber($input): array
    {
        preg_match('/"X"\s*:\s*([0-9.-]+),\s*"Y"\s*:\s*([0-9.-]+),\s*"R"\s*:\s*([0-9.-]+)/', $input, $matches);
        if (isset($matches[1]) && isset($matches[2]) && isset($matches[3])) {
            return [$matches[1], DataUtils::buildY($matches[2]), $matches[3]];
        }
        return [];
    }

    public static function checkAny($input): int
    {
        preg_match('/"X"\s*:\s*([^,]+),\s*"Y"\s*:\s*([^,]+),\s*"R"\s*:\s*([^,]+)/', $input, $matches);
        if (isset($matches[0]) && isset($matches[1]) && isset($matches[2])) {
            return 2;
        } elseif (isset($matches[0]) || isset($matches[1]) || isset($matches[2])) {
            return 1;
        }
        return 0;
    }

    public static function checkBounds($x, $y, $r): bool
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
}

class ResponseHandler
{
    public static function buildResponse(int $x, float $y, int $r, $start_time): array
    {
        $hit = DataUtils::checkHit($x, $y, $r);
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
        die;
    }
}

class RequestHandler
{
    public static function processRequest(string $input)
    {
        $start_time = microtime(true);
        $numbers = Validator::checkNumber($input);

        if (count($numbers) == 3) {
            list($x, $y, $r) = $numbers;

            if (Validator::checkBounds($x, $y, $r)) {
                $response = ResponseHandler::buildResponse((int)$x, (float)$y, (int)$r, $start_time);
                ResponseHandler::echoResponse(200, $response);
            } else {
                ResponseHandler::echoResponse(ErrorArray::$error_array['ERR_DATA_OUT_OF_SCOPE'][0], ErrorArray::$error_array['ERR_DATA_OUT_OF_SCOPE'][1]);
            }
        } else {
            switch (Validator::checkAny($input)) {
                case 0:
                    ResponseHandler::echoResponse(ErrorArray::$error_array['ERR_DATA_NOT_SET'][0], ErrorArray::$error_array['ERR_DATA_NOT_SET'][1]);
                    break;
                case 1:
                    ResponseHandler::echoResponse(ErrorArray::$error_array['ERR_DATA_NOT_ALL'][0], ErrorArray::$error_array['ERR_DATA_NOT_ALL'][1]);
                    break;
                case 2:
                    ResponseHandler::echoResponse(ErrorArray::$error_array['ERR_DATA_INVALID'][0], ErrorArray::$error_array['ERR_DATA_INVALID'][1]);
                    break;
                default:
                    ResponseHandler::echoResponse(ErrorArray::$error_array['ERR_WHAT_THE_FUCK'][0], ErrorArray::$error_array['ERR_WHAT_THE_FUCK'][1]);
            }
        }
    }


}

date_default_timezone_set('Europe/Moscow');
$jsonInput = file_get_contents('php://input');
if (!empty($jsonInput)) {
    RequestHandler::processRequest($jsonInput);
} else {
    ResponseHandler::echoResponse(ErrorArray::$error_array['ERR_EMPTY_REQUEST'][0], ErrorArray::$error_array['ERR_EMPTY_REQUEST'][1]);
}
?>