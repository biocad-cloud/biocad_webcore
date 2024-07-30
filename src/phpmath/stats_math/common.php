<?php

/**
 * Calculate the combination number of [n,k]
 * 
 * @param integer $n
 * @param integer $k
 * 
 * @return double
*/
function combination($n, $k) {
    $result = 1.0;

    for ($i = 0; $i < $k; ++$i) {
        $result *= ($n - $i);
        $result /= ($i + 1);
    }

    return $result;
}