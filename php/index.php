<?php
function validateData($x, $y, $r): bool
{
    if (
        is_numeric($x) && is_numeric($y) && is_numeric($r) &&
        in_array($x, [-5, -4, -3, -2, -1, 0, 1, 2, 3]) &&
        $y >= -3 && $y <= 5 && in_array($r, [1, 2, 3, 4, 5])
    ) {
        return true;
    }
    return false;
}

function checkHit(int $x, float $y, int $r): string
{
    $sector1 = $x >= 0 && $y >= 0 && ($x) ^ 2 + ($y) ^ 2 <= ($r) ^ 2;
    $sector3 = $x <= 0 && $y <= 0 && abs($x) <= $r && abs($y) <= $r;
    $sector4 = $x >= 0 && $y <= 0 && $y >= ($x - $r / 2);
    if ($sector1 || $sector3 || $sector4) {
        return "HIT";
    }
    return "MISS";
}

function buildResponse(int $x, float $y, int $r, $start_time): array
{
    $hit = checkHit($x, $y, $r);
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

function echoResponse(int $http_response_code, $response)
{
    header('Content-Type: application/json');
    http_response_code($http_response_code);
    echo(json_encode($response));
    die;
}

function processRequest(array $data)
{
    $start_time = microtime(true);
    if (isset($data['X']) && isset($data['Y']) && isset($data['R'])) {
        $x = $data['X'];
        $y = $data['Y'];
        $r = $data['R'];

        if (validateData($x, $y, $r)) {
            echoResponse(200, buildResponse($x, $y, $r, $start_time));
        } else {
            echoResponse(400, "Provided data is not valid");
        }

    } else {
        echoResponse(400, "Not all data is set");
    }
}

date_default_timezone_set('Europe/Moscow');
$jsonInput = file_get_contents('php://input');
$data = json_decode($jsonInput, true);
if (!empty($data)) {
    processRequest($data);
} else {
    echoResponse(400, "Empty request");
}
?>