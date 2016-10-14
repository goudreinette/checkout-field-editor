<?php namespace ConditionalCheckoutFields;

add_action('admin_menu', 'ConditionalCheckoutFields\addSubmenu');
add_action('wp_ajax_saveCheckoutFields', 'ConditionalCheckoutFields\saveCheckoutFields');

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
    wp_enqueue_script('ccf', plugin_dir_url(__FILE__) . 'admin/build/static/js/main.60aacb87.js');
    wp_enqueue_style('ccf', plugin_dir_url(__FILE__) . 'admin/build/static/css/main.3d745e37.css');
    wp_localize_script('ccf', 'data', [
        'ajax_url' => admin_url('admin-ajax.php')
    ]);
}




function saveCheckoutFields()
{
    
}

