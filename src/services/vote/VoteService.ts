import { api } from '@/axois';

import { MapIdType } from '../search/types';

export default class VoteService {
  static async setVote(mapId: string, shareKey: string) {
    const { data } = await api.post(
      `/rest/v1/rpc/location_points_vote`,
      {
        map_id: mapId,
        share_key: shareKey
      },
    );

    console.log('vote msg:', data.msg);

    return data;
  }

  static async setVoteConfirm(mapIdInfo: MapIdType, shareKey: string) {
    try {
      const response = await api.patch(
        '/rest/v1/location_result',
        { confirmed: shareKey },
        {
          params: {
            map_id: `eq.${mapIdInfo.mapId}`,
            map_host_id: `eq.${mapIdInfo.mapHostId}`,
          },
          validateStatus: () => true, // 모든 상태코드 수용
        }
      );

      if (response.status === 204) {
        console.log('vote-confirm msg: 약속 지역 확정 완료 (204)');
        return { msg: '약속 지역 확정 완료 (204)' };
      }

      console.log('vote-confirm msg:', response.data?.msg ?? response.data);
      return response.data;
    } catch (error) {
      console.error('vote-confirm error:', error);
      throw error;
    }
  }
}
