<?php namespace CheckoutFieldEditor;

use PHPUnit\Framework\TestCase;

class UtilsTest extends TestCase
{
    function test_process_save()
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
}
