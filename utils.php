<?php namespace ConditionalCheckoutFields;

function findBy ($key, $val, $array)
{
    foreach ($array as $item) {
        if ($item[$key] == $val)
            return $item;
    }
}

function titleCase ($snake_cased_string)
{
    $withoutUnderscores = str_replace('_', ' ', $snake_cased_string);
    $titleCased         = ucwords($withoutUnderscores);
    return $titleCased;
}

function getCategoriesByNames ($extraFieldsByCategory, $categoryNames)
{
    $categories = array_map(function ($categoryName) {
        return findBy('name', $categoryName, $extraFieldsByCategory);
    }, $categoryNames);

    $notNull = array_filter($categories, function ($categoryName) {
        return isset($categoryName);
    });

    return $notNull;
}


function array_flatten($array) { 
  if (!is_array($array)) { 
    return false; 
  } 
  $result = array(); 
  foreach ($array as $key => $value) { 
    if (is_array($value)) { 
      $result = array_merge($result, $value); 
    } else { 
      $result[$key] = $value; 
    } 
  } 
  return $result; 
}