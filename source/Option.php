<?php namespace CheckoutFieldEditor;

class Option
{
    static function getFields ()
    {
        $result = get_option('ccf');
        return $result;
    }

    static function storeFields ($fields)
    {
        $result = update_option('ccf', $fields);
        return $result;
    }
}
