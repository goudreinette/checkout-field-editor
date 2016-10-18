<?php namespace CheckoutFieldEditor;

use PHPUnit\Framework\TestCase;

class UtilsTest extends TestCase
{
    function testProcessSave()
    {
        $extraFieldsByCategory = [
            [
                'name' => 'T-shirts',
                'extraFields' => [
                    [
                        'name' => 'order_notes',
                        'type' => 'text',
                        'required' => 'false',
                        'showOnEmails' => 'true'
                    ]
                ]
            ],
            [
                'name' => 'Women'
            ],
            [
                'name' => 'Men',
                'extraFields' => null
            ]
        ];

        $result = Utils::processSave($extraFieldsByCategory);
        $this->assertFalse($result[0]['extraFields'][0]['required'], '"false" means false, mixed up by form data');
        $this->assertEquals($result[1]['extraFields'], [], 'extraFields should always be an array');
        $this->assertEquals($result[2]['extraFields'], []);
    }

    function testFindBy()
    {
        $shoes = [
            [
                'type' => 'sneakers',
                'color' => 'red'
            ],

            [
                'type' => 'boatshoes',
                'color' => 'brown'
            ]
        ];

        $result = Utils::findBy('color', 'red', $shoes);
        $this->assertEquals($result, $shoes[0]);
        $result = Utils::findBy('type', 'boatshoes', $shoes);
        $this->assertEquals($result, $shoes[1]);
        $result = Utils::findBy('color', 'green', $shoes);
        $this->assertNull($result);
    }

    function testGetApplicableCategoryNamesForCart()
    {
        $cartContents = [
            123456 => [
                
            ],

            234567 => [

            ]
        ];
    }
}
