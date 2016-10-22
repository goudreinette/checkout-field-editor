<?php namespace CheckoutFieldEditor;

/*
Plugin Name: Checkout Field Editor
Plugin URI: https://github.com/reinvdwoerd/checkout-field-editor
Description: Customize the Woocommerce Checkout, one Category at a time.
Version: 1.0
Author: reinvdwoerd
Author URI: reinvdwoerd.herokuapp.com
License: -
*/

require __DIR__ . '/vendor/autoload.php';


new Admin();
new Checkout();
new Display();
