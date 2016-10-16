<?php namespace ConditionalCheckoutFields;

add_action('woocommerce_email_after_order_table', 'ConditionalCheckoutFields\displayCategories');
add_action('woocommerce_thankyou', 'ConditionalCheckoutFields\displayCategories');

function displayCategories ($order_id)
{
    $extraFieldsByCategory   = getFields();
    $order                   = WC()->order_factory->get_order($order_id);
    $items                   = $order->get_items(); 
    $applicableCategoryNames = getApplicableCategoryNamesForCart($items);
    $applicableCategories    = getCategoriesByNames($extraFieldsByCategory, $applicableCategoryNames);

    foreach ($applicableCategories as $category) {
        displayCategory($category);
    }
}

function displayCategory ($category)
{
    echo "<h2>$category[name]</h2>";

}

function displayFields ()
{
    
}

function getOrderMeta ()
{
    
}