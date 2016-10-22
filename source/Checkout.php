<?php namespace CheckoutFieldEditor;

/**
 * Responsile for displaying the extra checkout fields.
 * Checkout fields shown depends on the categories of the cart contents
 */
class Checkout
{
    function __construct()
    {
        add_filter('woocommerce_after_order_notes', [$this, 'renderExtraFields']);
        add_action('woocommerce_checkout_process', [$this, 'validate']);
        add_action('woocommerce_checkout_update_order_meta', [$this, 'handleSave']);
    }

    function handleSave($order_id)
    {
        $categoryNames         = Utils::getApplicableCategoryNamesForCart(WC()->cart->cart_contents);
        $extraFieldsByCategory = OptionMeta::getFields();
        $order_meta            = [];

        foreach ($categoryNames as $categoryName) {
            $order_meta[$categoryName] = [];
            $category                  = Utils::findBy('name', $categoryName, $extraFieldsByCategory);

            foreach ($category['extraFields'] as $field) {
                $order_meta[$categoryName][$field['name']] = $_POST[$field['name']];
            }
        }

        update_post_meta($order_id, OptionMeta::$meta_key, $order_meta);
    }


    function validate()
    {
        $extraFieldsByCategory   = OptionMeta::getFields();
        $applicableCategoryNames = Utils::getApplicableCategoryNamesForCart(WC()->cart->cart_contents);
        $applicableCategories    = Utils::findByEach('name', $applicableCategoryNames, $extraFieldsByCategory);
        $applicableFields        = Utils::array_flatten(array_column($applicableCategories, 'extraFields'));


        foreach ($applicableFields as $field) {
            if (!$_POST[$field['name']] && $field['required']) {
                $titleCasedName = Utils::titleCase($field['name']);
                wc_add_notice("The field $titleCasedName is required.", 'error');
            }
        }
    }


    function renderExtraFields($checkout)
    {
        // Determine which extra fields need to be displayed for the given cart...
        $extraFieldsByCategory   = OptionMeta::getFields();
        $applicableCategoryNames = Utils::getApplicableCategoryNamesForCart(WC()->cart->cart_contents);

        // Render every applicable category
        foreach ($applicableCategoryNames as $categoryName) {
            // When there are extra fields defined for the category...
            $category = Utils::findBy('name', $categoryName, $extraFieldsByCategory);
            if (isset($category))
                $this->renderCategory($category);
        }
    }

    function renderCategory($category)
    {
        echo "<div>";
        echo "<h3>$category[name]</h3>";
        foreach ($category['extraFields'] as $field) {
            $this->renderField($field);
        }
        echo "</div>";
    }

    function renderField($field)
    {
        woocommerce_form_field($field['name'],
            [
                'type'        => strtolower($field['type']), // TODO: <select/>
                'label'       => Utils::titleCase($field['name']),
                'placeholder' => Utils::titleCase($field['name']),
                'class'       => ['my-field-class form-row-wide'],
                'required'    => $field['required']]);
    }
}
