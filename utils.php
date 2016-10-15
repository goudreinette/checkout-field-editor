<?php namespace ConditionalCheckoutFields;

function findBy ($key, $val, $array)
{
    foreach ($array as $item) {
        if ($item[$key] == $val)
            return $item;
    }
}