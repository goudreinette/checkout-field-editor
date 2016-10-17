<?php namespace CheckoutFieldEditor;

// when on checkout,
// get categories,
// show extra fields that belong to product's category

add_filter('woocommerce_after_order_notes', 'CheckoutFieldEditor\renderExtraFields');
add_action('woocommerce_checkout_process', 'CheckoutFieldEditor\validate');
add_action('woocommerce_checkout_update_order_meta', 'CheckoutFieldEditor\handleSave');


function handleSave ()
{
    return;
}


function validate ()
{
    $extraFieldsByCategory   = getFields();
    $applicableCategoryNames = getApplicableCategoryNamesForCart(WC()->cart->cart_contents);
    $applicableCategories    = getCategoresByNames($extraFieldsByCategory, $applicableCategoryNames);
    $applicableFields        = array_flatten(array_column($applicableCategories, 'extraFields'));
    
    if ( ! $_POST['my_field_name'] )
        wc_add_notice( __( 'Please enter something into this new shiny field.' ), 'error' );
}


function renderExtraFields ($checkout)
{
    // Determine which extra fields need to be displayed for the given cart...
    $extraFieldsByCategory = getFields();
    $applicableCategoryNames = getApplicableCategoryNamesForCart(WC()->cart->cart_contents);
   
    // Render every applicable category
    foreach ($applicableCategoryNames as $categoryName) {
        // When there are extra fields defined for the category...
        $category = findBy('name', $categoryName, $extraFieldsByCategory);
        if (isset($category))
            renderCategory($category);
    }
}

function renderCategory ($category)
{   
    echo "<div>";
    echo "<h3>$category[name]</h3>";
    foreach ($category['extraFields'] as $field) {
        renderField($field);
    }
    echo "</div>";
}

function renderField ($field)
{
    woocommerce_form_field($field['name'], [
        'type'          => strtolower($field['type']), // TODO: <select/>
        'label'         => titleCase($field['name']),
        'placeholder'   => titleCase($field['name']),
        'class'         => ['my-field-class form-row-wide'],
        'required'      => $field['required']
    ]);
}

function getApplicableCategoryNamesForCart ($cart_contents)
{
    $applicableCategoryNames = [];

    foreach (array_values($cart_contents) as $product_in_cart) {
        $categories = wp_get_post_terms($product_in_cart['product_id'], 'product_cat');
        $categoryNames = array_column($categories, 'name');
        $applicableCategoryNames = array_merge($applicableCategoryNames, $categoryNames);
    }

    return $applicableCategoryNames;
}