const pool = require('../utils/pool');

class Order {
  id;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.quantity = row.quantity;
  }

  static async insert(quantity) {
    const { rows } = await pool.query(
      'INSERT INTO orders (quantity) ' +
      'VALUES ($1) ' + 
      'RETURNING *',
      [quantity]
    );
    return new Order(rows[0]);
  }

  static async getAllOrders() {
    const { rows } = await pool.query(
      'SELECT * ' +
      'FROM orders'
    );
    const arr = [];
    for(const obj of rows) {
      arr.push(new Order(obj));
    }
    return arr;
  } 

  static async getOrderById(id) {
    const { rows } = await pool.query(
      'SELECT * ' +
      'FROM orders ' +
      'WHERE id = $1'
      , [id]
    );
    return new Order(rows[0]);
  }

  static async updateOrderById(id, quantity) {
    const { rows } = await pool.query(
      'UPDATE orders ' +
    'SET quantity = $1' +
    'WHERE id = $2 ' +
    'RETURNING id, quantity'
      , [quantity, id]
    );
    return new Order(rows[0]);
  }

  static async deleteOrderById(id){
    await pool.query(
      'DELETE FROM orders ' +
      'WHERE id = $1 '
      , [id]
    );
  }

}

module.exports = Order;
