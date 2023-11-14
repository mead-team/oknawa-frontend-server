import { api } from '@/axois';

export default class HotPlaceService {
  static async getHotPlaces() {
    const res = await api.get('/location/point/place', {
      params: {},
    });
  }
}
