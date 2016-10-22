<?php namespace CheckoutFieldEditor;


class Utils
{
    /**
     * Find the item where item[key] is value in array
     */
    static function findBy($key, $val, $items)
    {
        foreach ($items as $item) {
            if ($item[$key] == $val)
                return $item;
        }
    }

    /**
     * Get all item's who's key matches one of values
     */
    static function findByEach($key, $values, $items)
    {
        $categories = array_map(
            function ($value) use ($key, $items) {
                return Utils::findBy($key, $value, $items);
            },
            $values
        );

        return array_filter($categories);
    }

    static function titleCase($snake_cased_string)
    {
        $withoutUnderscores = str_replace('_', ' ', $snake_cased_string);
        $titleCased         = ucwords($withoutUnderscores);

        return $titleCased;
    }


    static function array_flatten($array)
    {
        if (!is_array($array)) {
            return false;
        }
        $result = [];
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $result = array_merge($result, $value);
            } else {
                $result[$key] = $value;
            }
        }

        return $result;
    }


    static function getApplicableCategoryNamesForCart($cart_contents)
    {
        $applicableCategoryNames = [];

        foreach (array_values($cart_contents) as $product_in_cart) {
            $categories              = wp_get_post_terms($product_in_cart['product_id'], 'product_cat');
            $categoryNames           = array_column($categories, 'name');
            $applicableCategoryNames = array_merge($applicableCategoryNames, $categoryNames);
        }

        return $applicableCategoryNames;
    }

    static function processSave($categories)
    {
        foreach ($categories as &$category) {
            if (!isset($category['extraFields']))
                $category['extraFields'] = [];
            foreach ($category['extraFields'] as &$field) {
                if ($field['required'] == 'false')
                    $field['required'] = false;
                if ($field['showOnEmails'] == 'false')
                    $field['showOnEmails'] = false;
            }
        }

        return $categories;
    }

    /**
     * Get all defined product categories.
     * @return String[]
     */
    static function getProductCategories()
    {
        $all_categories = get_terms(['taxonomy' => 'product_cat']);

        return array_column($all_categories, 'name');
    }

    /**
     * Filter out
     */
    static function rejectWithEmptyChildren($items)
    {
        return array_filter(
            $items,
            function ($item) {
                foreach ($item as $key => $value) {
                    if (isset($value) && $value != "")
                        return true;
                }
            }
        );
    }
}