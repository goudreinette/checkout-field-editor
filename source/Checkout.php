<?php namespace CheckoutFieldEditor;

/**
 * Responsile for displaying the extra checkout fields.
 * Checkout fields shown depends on the categories of the cart contents
 */
class Checkout
{
    function __construct()
    {
        add_filter('woocommerce_after_order_notes', 'CheckoutFieldEditor\renderExtraFields');
        add_action('woocommerce_checkout_process', 'CheckoutFieldEditor\validate');
        add_action('woocommerce_checkout_update_order_meta', 'CheckoutFieldEditor\handleSave');
    }

    function handleSave()
    {
        $categoryNames = Utils::getApplicableCategoryNamesForCart(WC()->cart->cart_contents);
        $extraFieldsByCategory = Option::getFields();

        foreach ($categoryNames as $key => $value) {
            # code...
        }
    }


    function validate()
    {
        $extraFieldsByCategory   = Option::getFields();
        $applicableCategoryNames = Utils::getApplicableCategoryNamesForCart(WC()->cart->cart_contents);
        $applicableCategories    = Utils::getCategoresByNames($extraFieldsByCategory, $applicableCategoryNames);
        $applicableFields        = Utils::array_flatten(array_column($applicableCategories, 'extraFields'));

        if (!$_POST['my_field_name'])
            wc_add_notice(__('Please enter something into this new shiny field.'), 'error');
    }


    function renderExtraFields($checkout)
    {
        // Determine which extra fields need to be displayed for the given cart...
        $extraFieldsByCategory   = Option::getFields();
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
        woocommerce_form_field($field['name'], [
            'type'        => strtolower($field['type']), // TODO: <select/>
            'label'       => Utils::titleCase($field['name']),
            'placeholder' => Utils::titleCase($field['name']),
            'class'       => ['my-field-class form-row-wide'],
            'required'    => $field['required']]);
    }
}
