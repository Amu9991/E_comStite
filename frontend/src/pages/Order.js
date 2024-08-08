import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import moment from "moment";
import displayINRCurrency from "../helpers/displayCurrency";

const Order = () => {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: "include",
    });

    const responseData = await response.json();

    setData(responseData.data);
    console.log("order list", responseData);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="md:p-4">
      {!data[0] && <p>No Orders</p>}
      <div className="">
        {data.map((item, index) => {
          return (
            <div key={item.userId + index} className=" space-y-2 mt-4 lg:mb-4">
              <p className=" font-medium text-lg">
                {moment(item.createdA).format("LL")}
              </p>
              <div className=" grid gap-3">
                {item?.productDetails.map((product, index) => {
                  return (
                    <div
                      key={product.productId + index}
                      className=" flex gap-3 bg-white border border-[#0fcae2] rounded-md"
                    >
                      <img
                        alt=""
                        src={product.image[0]}
                        className=" w-28 h-28 object-scale-down p-2 mix-blend-multiply"
                      />
                      <div>
                        <div className=" font-medium text-lg text-ellipsis line-clamp-1">
                          {product.name}
                        </div>
                        <div className=" flex items-center gap-5 mt-1">
                          <div className=" text-lg text-red-500">
                            {displayINRCurrency(product.price)}
                          </div>
                          <p>Quantity: {product.quantity}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className=" flex flex-col gap-4">
                <div className=" bg-white border border-[#0fcae2] rounded-md">
                  <div className=" text-lg font-medium bg-[#0fcae2] ">
                    Payment Details :
                  </div>
                  <p>
                    Payment method: {item.paymentDetails.payment_method_type[0]}
                  </p>
                  <p>Payment Status: {item.paymentDetails.payment_status}</p>

                  <div className="bg-white border border-[#0fcae2] rounded-md">
                    <div className=" text-lg font-medium bg-[#0fcae2]">
                      Shipping Details :
                    </div>
                    {item.shipping_options.map((shipping, index) => {
                      return (
                        <div
                          key={shipping.shipping_rate}
                          className=" text-blue-800"
                        >
                          Shipping Amount:{" "}
                          {displayINRCurrency(shipping.shipping_amount)}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className=" font-semibold border border-[#0fcae2] bg-white rounded-md shadow-lg shadow-[#0fcae2]">
                  Total Amount: {displayINRCurrency(item.totalAmount)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
