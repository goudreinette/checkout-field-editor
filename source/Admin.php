<?php namespace CheckoutFieldEditor;

/**
 * Responsible for showing the Checkout Field Editor,
 * providing the saved extraFields and classNames, and saving the extra fields.
 */
class Admin
{
    function __construct()
    {
        add_action('admin_menu', [$this, 'addSubmenu']);
        add_action('wp_ajax_saveCheckoutFields', [$this, 'saveCheckoutFields']);
        add_action('wp_ajax_nopriv_saveCheckoutFields', [$this, 'saveCheckoutFields']);
    }


    function addSubmenu()
    {
        add_submenu_page('woocommerce',
                         'Checkout Field Editor',
                         'Checkout Field Editor',
                         'manage_woocommerce',
                         'checkout_field_editor',
                         [
                             $this,
                             'showAdmin'
                         ]);
    }


    function showAdmin()
    {
        echo "<h1>Checkout Field Editor</h1>";
        echo "<div id='root'></div>";
        wp_enqueue_script('ccf', plugin_dir_url(__FILE__) . '../admin/build/static/js/main.js');
        wp_enqueue_style('ccf', plugin_dir_url(__FILE__) . '../admin/build/static/css/main.css');
        wp_localize_script('ccf', 'categories', OptionMeta::getFields());
        wp_localize_script('ccf', 'categoryNames', Utils::getProductCategories());
    }

    function saveCheckoutFields()
    {
        $categories = $_POST['categories'];
        $categories = Utils::processSave($categories);
        OptionMeta::storeFields($categories);
        wp_send_json(OptionMeta::getFields());
    }
}
