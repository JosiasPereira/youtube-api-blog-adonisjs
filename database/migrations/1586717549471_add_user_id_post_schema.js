'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddUserIdPostSchema extends Schema {
  up () {
    this.table('posts', (table) => {
      table.integer('user_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  down () {
    this.table('posts', (table) => {
      table.dropColumn('user_id')
    })
  }
}

module.exports = AddUserIdPostSchema
