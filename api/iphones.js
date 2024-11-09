export default function handler(req, res) {
  // Giả lập dữ liệu người dùng
  const data = [
    {
      iphones: [
        {
          id: 1,
          version: "iPhone 15",
          model: "iPhone 15 Pro Max",
          colors: [
            {
              color_id: "#4f5765",
              color_name: "Titan Xanh",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png",
            },
            {
              color_id: "#f2f1ec",
              color_name: "Titan Trắng",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-white-1-2-650x650.png",
            },
            {
              color_id: "#333",
              color_name: "Titan Đen",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305659/s16/iphone-15-pro-max-black-1-2-650x650.png",
            },
          ],
          configuration: {
            screen: "6.7 inch OLED",
            chip: "Apple A17 Pro",
            ram: "8GB",
            storage: ["256GB", "512GB", "1TB"],
            camera: "48MP + 12MP + 12MP",
            battery: "4,400 mAh",
          },
          price_usd: 1399,
          price_vnd: "33.576.000đ",
          promotion_online: true,
          image:
            "https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-gold-1-2-650x650.png",
        },
        {
          id: 2,
          version: "iPhone 15",
          model: "iPhone 15 Pro",
          colors: [
            {
              color_id: "#4f5765",
              color_name: "Titan Xanh",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png",
            },
            {
              color_id: "#f2f1ec",
              color_name: "Titan Trắng",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-white-1-2-650x650.png",
            },
            {
              color_id: "#333",
              color_name: "Titan Đen",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305659/s16/iphone-15-pro-max-black-1-2-650x650.png",
            },
          ],
          configuration: {
            screen: "6.1 inch OLED",
            chip: "Apple A17 Pro",
            ram: "8GB",
            storage: ["256GB", "512GB", "1TB"],
            camera: "48MP + 12MP + 12MP",
            battery: "3,700 mAh",
          },
          price_usd: 1299,
          price_vnd: "31.176.000đ",
          promotion_online: false,
          image:
            "https://cdn.tgdd.vn/Products/Images/42/303831/s16/iphone-15-pro-black-1-2-650x650.png",
        },
        {
          id: 3,
          version: "iPhone 15",
          model: "iPhone 15",
          colors: [
            {
              color_id: "#4f5765",
              color_name: "Titan Xanh",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png",
            },
            {
              color_id: "#f2f1ec",
              color_name: "Titan Trắng",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-white-1-2-650x650.png",
            },
            {
              color_id: "#333",
              color_name: "Titan Đen",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305659/s16/iphone-15-pro-max-black-1-2-650x650.png",
            },
          ],
          configuration: {
            screen: "6.1 inch OLED",
            chip: "Apple A16 Bionic",
            ram: "6GB",
            storage: ["256GB", "512GB", "1TB"],
            camera: "48MP + 12MP",
            battery: "3,800 mAh",
          },
          price_usd: 899,
          price_vnd: "21.576.000đ",
          promotion_online: true,
          image:
            "https://cdn.tgdd.vn/Products/Images/42/303891/s16/iphone-15-plus-blue-1-2-650x650.png",
        },
        {
          id: 4,
          version: "iPhone 15",
          model: "iPhone 15 Plus",
          colors: [
            {
              color_id: "#4f5765",
              color_name: "Titan Xanh",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png",
            },
            {
              color_id: "#f2f1ec",
              color_name: "Titan Trắng",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-white-1-2-650x650.png",
            },
            {
              color_id: "#333",
              color_name: "Titan Đen",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305659/s16/iphone-15-pro-max-black-1-2-650x650.png",
            },
          ],
          configuration: {
            screen: "6.7 inch OLED",
            chip: "Apple A16 Bionic",
            ram: "6GB",
            storage: ["256GB", "512GB", "1TB"],
            camera: "48MP + 12MP",
            battery: "4,300 mAh",
          },
          price_usd: 999,
          price_vnd: "23.976.000đ",
          promotion_online: true,
          image:
            "https://cdn.tgdd.vn/Products/Images/42/303891/s16/iphone-15-plus-blue-1-2-650x650.png",
        },
        {
          id: 5,
          version: "iPhone 14",
          model: "iPhone 14 Pro Max",
          colors: [
            {
              color_id: "#4f5765",
              color_name: "Titan Xanh",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png",
            },
            {
              color_id: "#f2f1ec",
              color_name: "Titan Trắng",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-white-1-2-650x650.png",
            },
            {
              color_id: "#333",
              color_name: "Titan Đen",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305659/s16/iphone-15-pro-max-black-1-2-650x650.png",
            },
          ],
          configuration: {
            screen: "6.7 inch OLED",
            chip: "Apple A16 Bionic",
            ram: "6GB",
            storage: ["256GB", "512GB", "1TB"],
            camera: "48MP + 12MP + 12MP",
            battery: "4,323 mAh",
          },
          price_usd: 1199,
          price_vnd: "28.776.000đ",
          promotion_online: true,
          image:
            "https://cdn.tgdd.vn/Products/Images/42/245545/s16/iphone-14-plus-gold-1-650x650.png",
        },
        {
          id: 6,
          version: "iPhone 14",
          model: "iPhone 14",
          colors: [
            {
              color_id: "#4f5765",
              color_name: "Titan Xanh",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png",
            },
            {
              color_id: "#f2f1ec",
              color_name: "Titan Trắng",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-white-1-2-650x650.png",
            },
            {
              color_id: "#333",
              color_name: "Titan Đen",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305659/s16/iphone-15-pro-max-black-1-2-650x650.png",
            },
          ],
          configuration: {
            screen: "6.1 inch OLED",
            chip: "Apple A15 Bionic",
            ram: "6GB",
            storage: ["256GB", "512GB", "1TB"],
            camera: "12MP + 12MP",
            battery: "3,279 mAh",
          },
          price_usd: 799,
          price_vnd: "19.176.000đ",
          promotion_online: true,
          image:
            "https://cdn.tgdd.vn/Products/Images/42/240259/s16/iphone-14-purple-650x650.png",
        },
        {
          id: 7,
          version: "iPhone 14",
          model: "iPhone 14",
          colors: [
            {
              color_id: "#4f5765",
              color_name: "Titan Xanh",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png",
            },
            {
              color_id: "#f2f1ec",
              color_name: "Titan Trắng",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-white-1-2-650x650.png",
            },
            {
              color_id: "#333",
              color_name: "Titan Đen",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305659/s16/iphone-15-pro-max-black-1-2-650x650.png",
            },
          ],
          configuration: {
            screen: "6.1 inch OLED",
            chip: "Apple A15 Bionic",
            ram: "6GB",
            storage: ["256GB", "512GB", "1TB"],
            camera: "12MP + 12MP",
            battery: "3,279 mAh",
          },
          price_usd: 799,
          price_vnd: "19.176.000đ",
          promotion_online: true,
          image:
            "https://cdn.tgdd.vn/Products/Images/42/240259/s16/iphone-14-purple-650x650.png",
        },
        {
          id: 8,
          version: "iPhone 14",
          model: "iPhone 14",
          colors: [
            {
              color_id: "#4f5765",
              color_name: "Titan Xanh",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png",
            },
            {
              color_id: "#f2f1ec",
              color_name: "Titan Trắng",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-white-1-2-650x650.png",
            },
            {
              color_id: "#333",
              color_name: "Titan Đen",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305659/s16/iphone-15-pro-max-black-1-2-650x650.png",
            },
          ],
          configuration: {
            screen: "6.1 inch OLED",
            chip: "Apple A15 Bionic",
            ram: "6GB",
            storage: ["256GB", "512GB", "1TB"],
            camera: "12MP + 12MP",
            battery: "3,279 mAh",
          },
          price_usd: 799,
          price_vnd: "19.176.000đ",
          promotion_online: true,
          image:
            "https://cdn.tgdd.vn/Products/Images/42/240259/s16/iphone-14-purple-650x650.png",
        },
        {
          id: 9,
          version: "iPhone 14",
          model: "iPhone 14",
          colors: [
            {
              color_id: "#4f5765",
              color_name: "Titan Xanh",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png",
            },
            {
              color_id: "#f2f1ec",
              color_name: "Titan Trắng",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-white-1-2-650x650.png",
            },
            {
              color_id: "#333",
              color_name: "Titan Đen",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305659/s16/iphone-15-pro-max-black-1-2-650x650.png",
            },
          ],
          configuration: {
            screen: "6.1 inch OLED",
            chip: "Apple A15 Bionic",
            ram: "6GB",
            storage: ["256GB", "512GB", "1TB"],
            camera: "12MP + 12MP",
            battery: "3,279 mAh",
          },
          price_usd: 799,
          price_vnd: "19.176.000đ",
          promotion_online: true,
          image:
            "https://cdn.tgdd.vn/Products/Images/42/240259/s16/iphone-14-purple-650x650.png",
        },
        {
          id: 10,
          version: "iPhone 14",
          model: "iPhone 14",
          colors: [
            {
              color_id: "#4f5765",
              color_name: "Titan Xanh",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png",
            },
            {
              color_id: "#f2f1ec",
              color_name: "Titan Trắng",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-white-1-2-650x650.png",
            },
            {
              color_id: "#333",
              color_name: "Titan Đen",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305659/s16/iphone-15-pro-max-black-1-2-650x650.png",
            },
          ],
          configuration: {
            screen: "6.1 inch OLED",
            chip: "Apple A15 Bionic",
            ram: "6GB",
            storage: ["256GB", "512GB", "1TB"],
            camera: "12MP + 12MP",
            battery: "3,279 mAh",
          },
          price_usd: 799,
          price_vnd: "19.176.000đ",
          promotion_online: true,
          image:
            "https://cdn.tgdd.vn/Products/Images/42/240259/s16/iphone-14-purple-650x650.png",
        },
        {
          id: 11,
          version: "iPhone 14",
          model: "iPhone 14",
          colors: [
            {
              color_id: "#4f5765",
              color_name: "Titan Xanh",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png",
            },
            {
              color_id: "#f2f1ec",
              color_name: "Titan Trắng",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-white-1-2-650x650.png",
            },
            {
              color_id: "#333",
              color_name: "Titan Đen",
              color_img:
                "https://cdn.tgdd.vn/Products/Images/42/305659/s16/iphone-15-pro-max-black-1-2-650x650.png",
            },
          ],
          configuration: {
            screen: "6.1 inch OLED",
            chip: "Apple A15 Bionic",
            ram: "6GB",
            storage: ["256GB", "512GB", "1TB"],
            camera: "12MP + 12MP",
            battery: "3,279 mAh",
          },
          price_usd: 799,
          price_vnd: "19.176.000đ",
          promotion_online: true,
          image:
            "https://cdn.tgdd.vn/Products/Images/42/240259/s16/iphone-14-purple-650x650.png",
        },
      ],
    },
  ];

  // Trả về JSON
  res.status(200).json(data);
}
