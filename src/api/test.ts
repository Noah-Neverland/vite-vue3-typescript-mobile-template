import Request from '@/utils/http';

export const GetGoods = (params: any): Promise<any> => {
  return Request.get('/api/goods-center/goods/getGoods', params);
};
