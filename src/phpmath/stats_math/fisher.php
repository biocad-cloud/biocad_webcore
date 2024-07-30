<?php

/**
 * hypergeometric distribution 
 * 
 * @param integer $a
 * @param integer $b
 * @param integer $c
 * @param integer $d
 * 
 * @return double
*/
function hypergeometric($a, $b, $c, $d) {
    return combination($a +$b, $a) * 
        combination($c + $d,$c) / 
        combination($a +$b + $c +$d, $a +$c);
}

/**
 * fisher exact test
 * 
 * @param integer $a
 * @param integer $b
 * @param integer $c
 * @param integer $d
 * 
 * @return array a tuple array that contains the two slot 
 *    value: ``odds_ratio`` and ``pvalue``.
*/
function fisher_test($a, $b, $c, $d) {
    $oddsRatio = ($a * $d) / ($b * $c); 
    $max = max($a, $b,$c, $d);
    $sum =$a + $b +$c + $d;
    $pValue = 0;

    for ($i = max(0,$a + $c -$sum); $i <= min($a, $max);$i++) {
        $pValue += hypergeometric($i, $a +$c - $i,$a - $i,$sum - $a -$c + $i);
    }

    return ['odds_ratio' => $oddsRatio, 
        'pvalue' =>$pValue];
}