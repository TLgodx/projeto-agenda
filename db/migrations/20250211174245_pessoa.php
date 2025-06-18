<?php

use Phinx\Migration\AbstractMigration;

class Pessoa extends AbstractMigration
{
    /**
     * https://book.cakephp.org/phinx/0/en/migrations.html
     */
    public function change()
    {
        $table = $this->table(
            'pessoa',
            ['id' => false,
                'primary_key' => ['id']]
        );
        $table->addColumn(
            'id',
            'integer',
            [
                'identity' => true
            ]
        )

        ->addColumn(
            'nome',
            'string',
            [
                'limit' => 255
            ]
        )
            ->addColumn(
                'tipo',
                'string',
                [
                    'limit' => 50
                ]
        )
            ->create();
    }
}
