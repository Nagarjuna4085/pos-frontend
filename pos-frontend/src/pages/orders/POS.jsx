import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getProductsApi } from "../products/productApi";
import { createOrderApi, payOrderApi, completeOrderApi } from "./orderApi";
const POS = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const discount = 1;

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const data = await getProductsApi();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };
  const clearCart = () => {
    setCart([]);
  };
  const handleCreateOrder = async () => {
    try {
      if (cart.length === 0) {
        alert("Cart is empty");
        return;
      }

      const payload = {
        customerName: customer.name || "Walk-in",
        customerPhone: customer.phone || "0000000000",
        customerEmail: customer.email || "test@gmail.com",
        discount: discount,
        tax: tax,
        paymentMethod: "CASH",
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          unitPrice: item.price,
        })),
      };

      const order = await createOrderApi(payload);

      setCurrentOrder(order); // 🔥 store order

      alert("Order Created (Pending Payment)");
    } catch (err) {
      console.log(err);
    }
  };
  const handlePayment = async () => {
    try {
      if (!currentOrder) return;

      await payOrderApi(currentOrder.id);

      alert("Payment Done");
    } catch (err) {
      console.log(err);
    }
  };
  const handleComplete = async () => {
    try {
      if (!currentOrder) return;

      await completeOrderApi(currentOrder.id);

      setCart([]);
      setCurrentOrder(null);

      alert("Order Completed Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.05;
  const grandTotal = subtotal + tax;
  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-80px)] gap-4">
        {/* LEFT: PRODUCTS */}
        <div className="w-2/3 bg-white p-4 overflow-auto rounded shadow">
          <h2 className="text-xl font-bold mb-4">Products</h2>
          <div className="grid grid-cols-3 gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="border p-3 rounded cursor-pointer hover:bg-gray-100"
                onClick={() => addToCart(p)}
              >
                <img
                  src={`http://localhost:8080${p.imageUrl}`}
                  className="h-24 w-full object-cover rounded"
                />

                <h3 className="font-semibold mt-2">{p.name}</h3>

                <p>${p.price}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(p)}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: CART */}
        <div className="w-1/3 bg-white p-4  rounded shadow flex flex-col">
          <h2 className="text-xl font-bold mb-4">Cart</h2>

          <div className="flex-1 overflow-auto">
            <div className="bg-white p-3 rounded shadow mb-3">
              <h3 className="font-bold mb-2">Customer Info</h3>

              <input
                type="text"
                placeholder="Customer Name"
                value={customer.name}
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />

              <input
                type="text"
                placeholder="Phone"
                value={customer.phone}
                onChange={(e) =>
                  setCustomer({ ...customer, phone: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />

              <input
                type="email"
                placeholder="Email (optional)"
                value={customer.email}
                onChange={(e) =>
                  setCustomer({ ...customer, email: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
            </div>
            {cart.length === 0 ? (
              <p className="text-gray-500">No items in cart</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  {/* ITEM INFO */}
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">${item.price}</p>
                  </div>

                  {/* CONTROLS */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-2 text-red-500"
                    >
                      X
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t pt-3 mt-3 space-y-1">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handleCreateOrder}
            className="w-full bg-green-600 text-white p-3 rounded mt-3"
            disabled={cart.length === 0}
          >
            Create Order
          </button>
          <button
            disabled={!currentOrder}
            onClick={handlePayment}
            className="w-full bg-blue-600 text-white p-3 rounded mt-2"
          >
            Pay (Cash)
          </button>
          <button
            disabled={!currentOrder}
            onClick={handleComplete}
            className="w-full bg-green-600 text-white p-3 rounded mt-2"
          >
            Complete Order
          </button>
          <button
            onClick={clearCart}
            className="mt-3 w-full bg-red-500 text-white p-2 rounded"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default POS;
