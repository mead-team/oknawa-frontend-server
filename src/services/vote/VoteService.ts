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
  static async setVoteConfirm(mapIdInfo: MapIdType, shareKey: string) {
    const { data } = await api.post(
      `/location/points/${mapIdInfo.mapId}/confirm`,
      { mapIdInfo },
      {
        params: {
          map_host_id: mapIdInfo.mapHostId,
          share_key: shareKey,
        },
      },
    );

    console.log('vote-confirm msg:', data.msg);

    return data;
  }
}
