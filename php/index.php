<?php


function echoResponse(int $http_response_code, string $echoJson): void
{
    header('Content-Type: application/json');
    http_response_code($http_response_code);
    echo($echoJson);
    die;
}
date_default_timezone_set('Europe/Moscow');
$start_time = microtime(true);
$x = "";
$y = "";
$r = "";
$jsonInput = file_get_contents('php://input');
$data = json_decode($jsonInput, true);
if (!empty($data)) {
    if (isset($data['X']) && isset($data['Y']) && isset($data['R'])) {
        $x = $data['X'];
        $y = $data['Y'];
        $r = $data['R'];
        ini_set('precision', strlen($y));
        if (is_numeric($x) && is_numeric($y) && is_numeric($r)) {
            $x = floatval($x);
            $y = floatval($y);
            $r = floatval($r);
            if (in_array($x, [-5, -4, -3, -2, -1, 0, 1, 2, 3]) && $y >= -3.0 && $y <= 5.0 && in_array($r, [1, 2, 3, 4, 5])) {
                $sector_1 = $x >= 0 && $y >= 0 && ($x) ^ 2 + ($y) ^ 2 <= ($r) ^ 2;
                $sector_2 = false;
                $sector_3 = $x <= 0 && $y <= 0 && abs($x) <= $r && abs($y) <= $r;
                $sector_4 = $x >= 0 && $y <= 0 && $y >= ($x - $r / 2);

                $isHit = $sector_1 || $sector_3 || $sector_4;
                $hitValue = "MISS";
                if ($isHit) {
                    $hitValue = "HIT";
                }
                $currentDateTime = new DateTime('now');
                $currentDateTimeFormatted = $currentDateTime->format('H:i:s');
                $executionTime = (microtime(true) - $start_time);
                $result_array = array(
                    "x" => "<td>" . $x . "</td>",
                    "y" => "<td>" . $y . "</td>",
                    "r" => "<td>" . $r . "</td>",
                    "success" => "<td>" . $hitValue . "</td>",
                    "currentTime" => "<td>" . $currentDateTimeFormatted . "</td>",
                    "executionTime" => "<td>" . number_format((float)$executionTime, 6, '.', '') . "</td>"
                );
                echoResponse(200, json_encode($result_array));
            } else {
                echoResponse(400, json_encode("Parameters are not in their ranges"));
            }
        } else {
            echoResponse(400, json_encode("Parameters are not numeric"));
        }
    } else {
        echoResponse(400, json_encode("Not enough parameters (x, y, r is mandatory)"));
    }
} else {
    echoResponse(400, json_encode("The incoming request was empty"));
}
?>