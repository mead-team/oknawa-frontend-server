import { api } from '@/axois';
import { HotPlace, HotPlaceCategory, HotPlacePoint } from './types';

export default class HotPlaceService {
  static async fetchHotPlace(
    category: HotPlaceCategory,
    point: HotPlacePoint,
    page = 1,
    size = 5,
  ) {
    const res = await api.get(`/functions/v1/location-point-place/${category}`, {
      params: {
        x: point.x,
        y: point.y,
        radius: 500,
        page,
        size,
        sort: 'accuracy',
      },
    });

    return res.data;
  }
}
