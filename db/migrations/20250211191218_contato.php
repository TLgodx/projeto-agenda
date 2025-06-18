<?php

use Phinx\Migration\AbstractMigration;

class Contato extends AbstractMigration
{
    public function change()
    {
        $table = $this->table('contato');
        $table->addColumn(
            'pessoa_id',
            'integer'
        )
        ->addColumn(
            'tipo',
            'string',
            [
                'limit' => 2
            ]
        )
            ->addColumn(
                'descricao',
                'string',
                [
                    'limit' => 100
                ]
        )
            ->addColumn(
                'valor',
                'string',
                [
                    'limit' => 255
                ]
        )
            ->addForeignKey(
                'pessoa_id',
                'pessoa',
                'id',
                [
                    'delete' => 'CASCADE',
                ]
        )
            ->create();

    }
}
