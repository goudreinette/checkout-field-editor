<?php namespace ConditionalCheckoutFields;

// when on checkout,
// get categories,
// show extra fields that belong to product's category

add_filter('woocommerce_after_order_notes', 'ConditionalCheckoutFields\renderExtraFields');


function renderExtraFields ($checkout)
{
    $extraFieldsByCategory = getFields();
    $applicableCategoryNames = [];
   
    // Determine which extra fields need to be displayed for the given cart...
    foreach (array_values(WC()->cart->cart_contents) as $product_in_cart) {
        $categories = wp_get_post_terms($product_in_cart['product_id'], 'product_cat');
        $categoryNames = array_column($categories, 'name');
        $applicableCategoryNames = array_merge($applicableCategoryNames, $categoryNames);
    }

    // Render every applicable category
    foreach ($applicableCategoryNames as $categoryName) {
        // When there are extra fields defined for the category...
        if (in_array($categoryName, array_column($extraFieldsByCategory, 'name')))
            renderCategory(findBy('name', $categoryName, $extraFieldsByCategory));
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
        'type'          => $field['type'],
        'label'         => $field['name'],  // prettify
        'placeholder'   => $field['name'],  // prettify
        'class'         => ['my-field-class form-row-wide']
    ]);
}