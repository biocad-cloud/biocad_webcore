<?php

include_once __DIR__ . "/../stats_math/fisher.php";

/**
 * read xml model file for enrich analysis
 * 
 * @param string $file the file path of the target xml model file.
 *
 * @return array a tuple list array that contains the background model data:
 *   1. n_size: the background total element counts
 *   2. terms: a list of the terms and then element clusters inside the term
 *   3. name: the name or display title of the model  
*/
function read_background($file) {

}

/**
 * enrichment based on gcmodeller background model
 * 
 * @param string[] $idset a array of the id for run the enrichment.
 * @param string $model usually be the file path to the background model xml file.
 * 
 * @return array the enrichment result for each term that inside
 *    the given model file.
*/
function enrich($idset, $model) {
    if (is_string($model)) {
        $model = read_background($model);
    }

    $terms = $model["terms"];
    $N = $model["n_size"];
    $result = [];

    foreach($terms as $term) {

    }

    return $result;
}