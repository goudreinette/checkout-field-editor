<?php namespace ConditionalCheckoutFields;

const optionKey = 'conditionalCheckoutFields'; 

function getFields ()
{
    return get_option(optionKey, []);
}

function storeFields ($fiels)
{
    update_option(optionKey, $fields);
}
