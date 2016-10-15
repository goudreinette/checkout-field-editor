<?php namespace ConditionalCheckoutFields;

function getFields ()
{
    $result = get_option('ccf', '[]');
    return json_decode($result);
}

function storeFields ($fiels)
{
    $result = update_option('ccf', json_encode($fiels));
    return $result;
}
