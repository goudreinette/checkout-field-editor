<?php namespace ConditionalCheckoutFields;

add_action('admin_menu', 'ConditionalCheckoutFields\addSubmenu');
add_action('wp_ajax_saveCheckoutFields', 'ConditionalCheckoutFields\saveCheckoutFields');
add_action('wp_ajax_nopriv_saveCheckoutFields', 'ConditionalCheckoutFields\saveCheckoutFields');


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
    echo "<h1>Checkout Fields by Category</h1>";
    echo "<div id='root'></div>";
    wp_enqueue_script('ccf', plugin_dir_url(__FILE__) . 'admin/build/static/js/main.js');
    wp_enqueue_style('ccf', plugin_dir_url(__FILE__) . 'admin/build/static/css/main.css');
    wp_localize_script('ccf', 'categories', getFields());
}




function saveCheckoutFields()
{
    $categories = $_POST['categories'];
    

    // FIXME ---------------------------------------------
    foreach ($categories as &$category) {
        if ($category['extraFields'] == null || !isset($category['extraFields']))
            $category['extraFields'] = [];
        foreach ($category['extraFields'] as &$field) {
            if ($field['required'] == 'false')
                $field['required'] = false;
            if ($field['showOnEmails'] == 'false')
                $field['showOnEmails'] = false;
        }
    }
    // ---------------------------------------------------
    
    storeFields($categories);
    wp_send_json(getFields());
}
