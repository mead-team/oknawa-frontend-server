import { searchState } from '@/jotai/global/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { array, number, object, string } from 'yup';

const createSearchFormVerifySchema = () => {
  return object().shape({
    userSection: array().of(
      object().shape({
        name: string(),
        address: object().shape({
          fullAddress: string().required('모든 주소 입력 필요'),
          latitude: number(),
          longitude: number(),
          regionName: string(),
        }),
      }),
    ),
  });
};

export default function useSearchForm() {
  const [searchList] = useAtom(searchState);

  return useForm({
    defaultValues: {
      userSection:
        searchList.length < 2
          ? [
              {
                name: '',
                address: {
                  fullAddress: '',
                  latitude: 0,
                  longitude: 0,
                  regionName: '',
                },
              },
              {
                name: '',
                address: {
                  fullAddress: '',
                  latitude: 0,
                  longitude: 0,
                  regionName: '',
                },
              },
            ]
          : searchList.map((serach, index) => {
              return {
                name: `${searchList[index]?.name}`,
                address: {
                  fullAddress: `${searchList[index]?.address?.fullAddress}`,
                  latitude: searchList[index]?.address?.latitude,
                  longitude: searchList[index]?.address?.longitude,
                  regionName: `${searchList[index]?.address?.regionName}`,
                },
              };
            }),
    },
    resolver: yupResolver(createSearchFormVerifySchema()),
  });
}
