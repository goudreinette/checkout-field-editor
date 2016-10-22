<?php namespace CheckoutFieldEditor;

/**
 * Shows the extra fields on the order confirmation page and emails.
 */
class Display
{
    function __construct()
    {
        add_action('woocommerce_email_customer_details', [$this, 'render']);
        add_action('woocommerce_order_details_after_order_table', [$this, 'render']);
    }

    function render($order)
    {
        $extraFieldsByCategory = OptionMeta::getFields();
        $order_meta            = get_post_meta($order->id, OptionMeta::$meta_key, true);
        $notEmpty              = Utils::rejectWithEmptyChildren($order_meta);
        
        foreach ($notEmpty as $categoryName => $category) {
            $this->renderCategory($categoryName, $category);
        }
    }

    function renderCategory($categoryName, $category)
    {
        echo "<h2 style='display: block;'>$categoryName</h2>";
        echo "<ul>";
        foreach ($category as $fieldName => $value) {
            // TODO: if show on email
            $this->renderField($fieldName, $value);
        }
        echo "</ul>";
    }

    function renderField($fieldName, $value)
    {
        $titleCasedName = Utils::titleCase($fieldName);
        if ($value == "")
            $value = " - ";

        echo "<li>";
        echo "<strong>$titleCasedName: </strong> $value";
        echo "</li>";
    }
}
