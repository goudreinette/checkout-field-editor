<?php namespace CheckoutFieldEditor;

class OptionMeta
{
    static $meta_key = 'CFE';

    static function getFields()
    {
        $result = get_option('ccf');

        return $result;
    }

    static function storeFields($fields)
    {
        $result = update_option('ccf', $fields);

        return $result;
    }
}
