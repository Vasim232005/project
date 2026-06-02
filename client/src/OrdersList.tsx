import React from 'react';
import type { Order } from './App';

interface Props {
  orders: Order[];
  selectedStatus: string;
}

const statusLabel: Record<string, string> = {
  received: 'Received',
  in_cleaning: 'In Cleaning',
  ready: 'Ready for Pickup',
  delivered: 'Delivered',
};

export const OrdersList: React.FC<Props> = ({ orders, selectedStatus }) => {
  if (orders.length === 0) {
    return <p>No active orders.</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: 4,
            padding: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong>{order.id}</strong>
            <span>{order.customerName}</span>
          </div>
          <small>Created: {new Date(order.createdAt).toLocaleString()}</small>
          {(() => {
            const filteredGarments =
              selectedStatus === 'all'
                ? order.garments
                : order.garments.filter((g) => g.status === selectedStatus);

            return (
              <ul>
                {filteredGarments.length === 0 ? (
                  <li>No matching garments</li>
                ) : (
                  filteredGarments.map((g) => (
                    <li key={g.id}>
                      {g.description} - <em>{statusLabel[g.status] ?? g.status}</em>
                    </li>
                  ))
                )}
              </ul>
            );
          })()}
        </div>
      ))}
    </div>
  );
};
