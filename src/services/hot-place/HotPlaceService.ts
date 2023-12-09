import { api } from '@/axois';
import { HotPlace, HotPlaceCategory, HotPlacePoint } from './types';

export default class HotPlaceService {
  static async fetchHotPlace(
    category: HotPlaceCategory,
    point: HotPlacePoint,
  ): Promise<HotPlace[]> {
    const res = await api.get(`/location/point/place/${category}`, {
      params: {
        x: point.x,
        y: point.y,
        radius: 500,
        page: 1,
        size: 15,
        sort: 'accuracy',
      },
    });

    return res.data.documents;
  }
}
