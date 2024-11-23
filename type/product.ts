export interface IProduct {
  docId?: string;
  id: string;
  category: string;
  model: string;
  version: string;
  price_usd?: number;
  price_vnd: string;
  image: string;
  configuration: {
    screen?: string;
    chip?: string;
    ram?: string;
    storage: string[];
    camera?: string;
    battery?: string;
  };
  promotion_online?: boolean;
  colors: {
    color_id?: string;
    color_name?: string;
    color_img?: string;
  }[];
}
