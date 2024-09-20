import db from '@/lib/db';
import React from 'react';

async function OrderHistory() {
  const orderData = await db.order.findMany({
    where: { isPaid: true },
    include: { OrderItem: { include: { product: true } } },
  });

  if (orderData.length === 0) {
    return (
      <h1 className="text-center font-bold text-3xl text-slate-100 mt-40">
        No item purchased 🪹
      </h1>
    );
  }

  return (
    <div>
      <h1 className="font-bold text-2xl text-center">Order History</h1>
      <table className="w-full text-center">
        <thead>
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Quantity</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody className="divide-y-2">
          {orderData.map((val) => (
            <tr key={val.id}>
              <td>{val.id}</td>
              <td className="text-green-600 font-extrabold">
                {val.isPaid ? 'Paid' : 'Unpaid'}
              </td>
              <td className="p-2">
                {val.OrderItem.map((val) => (
                  <p key={val.id}>{val.quantity}</p>
                ))}
              </td>
              <td className="p-2 border rounded-md">
                {val.OrderItem.map((val) => (
                  <p key={val.id}>{val.product.title}</p>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderHistory;
