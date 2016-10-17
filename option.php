<?php namespace CheckoutFieldEditor;

function getFields ()
{
    $result = get_option('ccf');
    return $result;
}

function storeFields ($fields)
{
    $result = update_option('ccf', $fields);
    return $result;
}