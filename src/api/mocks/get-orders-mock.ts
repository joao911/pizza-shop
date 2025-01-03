import { http, HttpResponse, HttpHandler } from "msw";
import type { getOrderResponse } from "../get-order";

type Orders = getOrderResponse["orders"];
type OrdersStatus = getOrderResponse["orders"][number]["status"];
const statuses: OrdersStatus[] = [
  "pending",
  "canceled",
  "processing",
  "delivering",
  "delivered",
];

const order: Orders = Array.from({ length: 60 }).map((_, index) => {
  return {
    orderId: `order-${index + 1}`,
    customerName: `customer-${index + 1}`,
    createdAt: new Date().toISOString(),
    total: 2400,
    status: statuses[index % 5],
  };
});

export const getOrdersMock: HttpHandler = http.get<
  never,
  never,
  getOrderResponse
>("/orders", async ({ request }) => {
  const { searchParams } = new URL(request.url);

  const pageIndex = searchParams.get("pageIndex")
    ? Number(searchParams.get("pageIndex"))
    : 0;

  const customerName = searchParams.get("customerName");
  const orderId = searchParams.get("orderId");
  const status = searchParams.get("status");

  let filteredOrders = order;

  if (customerName) {
    filteredOrders = filteredOrders.filter((order) =>
      order.customerName.includes(customerName),
    );
  }
  if (orderId) {
    filteredOrders = filteredOrders.filter((order) =>
      order.orderId.includes(orderId),
    );
  }
  if (status) {
    filteredOrders = filteredOrders.filter((order) => order.status === status);
  }

  const paginatedOrders = filteredOrders.slice(
    pageIndex * 10,
    (pageIndex + 1) * 10,
  );

  return HttpResponse.json({
    orders: paginatedOrders,
    meta: {
      pageIndex,
      perPage: 10,
      totalCount: filteredOrders.length,
    },
  });
});