<?php namespace ConditionalCheckoutFields;

function getFields ()
{
    $result = get_option('ccf', '[]');
    return json_decode($result);
}

function storeFields ($fields)
{
    $result = update_option('ccf', json_encode($fields));
    return $result;
}