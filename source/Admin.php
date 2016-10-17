<?php namespace CheckoutFieldEditor;

class Admin
{
    function __construct()
    {
        add_action('admin_menu',                        [$this, 'addSubmenu']);
        add_action('wp_ajax_saveCheckoutFields',        [$this, 'saveCheckoutFields']);
        add_action('wp_ajax_nopriv_saveCheckoutFields', [$this, 'saveCheckoutFields']);
    }

    function addSubmenu()
    {
        add_submenu_page(
            'woocommerce',
            'Checkout Fields',
            'Checkout Fields',
            'manage_woocommerce',
            'checkout_field_editor',
            [$this, 'showAdmin']
        );
    }


    function showAdmin()
    {
        echo "<h1>Checkout Fields by Category</h1>";
        echo "<div id='root'></div>";
        wp_enqueue_script('ccf', plugin_dir_url(__FILE__) . '../admin/build/static/js/main.js');
        wp_enqueue_style('ccf', plugin_dir_url(__FILE__) . '../admin/build/static/css/main.css');
        wp_localize_script('ccf', 'categories', Option::getFields());
    }

    function saveCheckoutFields()
    {
        $categories = $_POST['categories'];


        // FIXME ---------------------------------------------

        // --------------------------------------------------

        Option::storeFields($categories);
        wp_send_json(Option::getFields());
    }
}
