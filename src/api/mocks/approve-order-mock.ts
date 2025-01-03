import { http, HttpResponse, HttpHandler } from "msw";
import { ApproveOrderParams } from "../aprove-order";

export const approveOrderMock: HttpHandler = http.patch<
  ApproveOrderParams,
  never,
  never
>("/orders/:orderId/approve", async ({ params }) => {
  if (params.orderId === "error-order-id") {
    return new HttpResponse(null, {
      status: 404,
    });
  }

  return new HttpResponse(null, {
    status: 204,
  });
});