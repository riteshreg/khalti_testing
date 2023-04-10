"use client";
import KhaltiCheckout from "khalti-checkout-web";
import { Product } from "@/libs/Product";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

 const  Khalti = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function handleBuyClick(id: number) {
    const product = Product[id - 1];
    if (product.id == null) {
      return null;
    }

    const config = {
      publicKey: "test_public_key_d0d13cdd43e9470281a4cf8827561780",
      // "public_key": "live_public_key_546eb6da05544d7d88961db04fdb9721",
      // mobile: "9746977612",
      // transaction_pin: "0009",
      amount: product.price,
      product_identity: product.brand,
      product_name: product.title,
      product_url: product.thumbnail,
      eventHandler: {
        onSuccess(payload: any) {
          router.push(`/khalti/${payload.idx}/success`);
          console.log(payload);
        },
        // onError handler is optional
        onError(error: any) {
          // handle errors
          console.log(error);
        },
        onClose() {
          console.log("widget is closing");
        },
      },
      paymentPreference: [
        "KHALTI",
        "EBANKING",
        "MOBILE_BANKING",
        "CONNECT_IPS",
        "SCT",
      ],
    };
    let checkout = new KhaltiCheckout(config);
    checkout.show({
      amount: product.price * 100,
      productName: product.title,
      productUrl: product.thumbnail,
      productIdentity: product.brand,
    });
  }
 

  return (
    isMounted && (
      <>
        <div className="grid grid-cols-4 max-w-5xl mx-auto pb-20">
          {Product?.map(({ id, images, title, description, price }) => (
            <div key={id} className="p-6 border border-green-300">
              <div className=" overflow-hidden">
                <Image
                  className="h-52 w-60 overflow-hidden"
                  alt={title}
                  src={images[1]}
                  height={720}
                  width={720}
                />
              </div>
              <div className="p-1">
                <h1 className="font-semibold text-lg">{title}</h1>
                <p className="mt-1 line-clamp-2 ">{description}</p>
              </div>
              <div>NRP. {price}</div>
              <div>
                <button
                  onClick={() => handleBuyClick(id)}
                  className="bg-green-400 px-4 py-1 text-black mt-1 rounded-md"
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  );
};

export default Khalti