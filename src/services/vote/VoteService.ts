import { api } from '@/axois';

import { MapIdType } from '../search/types';

export default class VoteService {
  static async setVote(mapIdInfo: MapIdType, shareKey: string) {
    const { data } = await api.post(
      `/location/points/${mapIdInfo.mapId}/vote`,
      { mapIdInfo },
      { params: { share_key: shareKey } },
    );

    console.log('vote msg:', data.msg);

    return data;
  }
}
