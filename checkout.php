<?php namespace ConditionalCheckoutFields;

// when on checkout,
// get categories,
// show extra fields that belong to product's category

add_filter('woocommerce_checkout_fields', function ($fields) {
   
    $extraFieldsByCategory = getFields();
    $applicableCategoryNames = [];
   
    // Determine which extra fields need to be displayed for the given cart...
    foreach (array_values(WC()->cart->cart_contents) as $product_in_cart) {
        $categories = wp_get_post_terms($product_in_cart['product_id'], 'product_cat');
        $categoryNames = array_column($categories, 'name');
        $applicableCategoryNames = array_merge($applicableCategoryNames, $categoryNames);
    }

    foreach ($applicableCategoryNames as $categoryName) {
        if (in_array($categoryName, array_column($extraFieldsByCategory, 'name')))
            $fields[$categoryName] = findBy('name', $categoryName, $extraFieldsByCategory)['extraFields'];
    }

    return $fields;
});
