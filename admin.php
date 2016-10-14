<?php namespace ConditionalCheckoutFields;

add_action('admin_menu', 'ConditionalCheckoutFields\addSubmenu');


function addSubmenu()
{
    add_submenu_page(
        'woocommerce',
        'Checkout Fields',
        'Checkout Fields',
        'manage_woocommerce',
        'checkout_field_editor',
        'ConditionalCheckoutFields\showAdmin'
    );
}


function showAdmin()
{
    echo "<div id='root'></div>";
    wp_enqueue_script('ccf', plugin_dir_url(__FILE__) . 'views/admin/main.js');
    wp_enqueue_style('ccf', plugin_dir_url(__FILE__) . 'views/admin/main.css');
}

function hello ($world)
{
    
}