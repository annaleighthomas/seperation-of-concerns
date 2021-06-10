const pool = require('../utils/pool');

// 1. define the shape of our data
// 2. define methods to access that data (CRUD)
class Order {
  id;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.quantity = row.quantity;
  }

  // static method
  // instance method
  static async insert(quantity) {
    const { rows } = await pool.query(
      'INSERT INTO orders (quantity) VALUES ($1) RETURNING *',
      [quantity]
      
    );

    // rows = [{ id: '1', quantity: 10 }]
    // { id: '1', quantity: 10 }
    return new Order(rows[0]);
  }
}

module.exports = Order;
