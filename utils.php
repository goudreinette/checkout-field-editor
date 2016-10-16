<?php namespace ConditionalCheckoutFields;

function findBy ($key, $val, $array)
{
    foreach ($array as $item) {
        if ($item[$key] == $val)
            return $item;
    }
}

function titleCase ($snake_cased_string)
{
    $withoutUnderscores = str_replace('_', ' ', $snake_cased_string);
    $titleCased         = ucwords($withoutUnderscores);
    return $titleCased;
}