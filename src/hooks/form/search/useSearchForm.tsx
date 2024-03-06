import { searchState } from '@/jotai/global/store';
import { SearchFormType } from '@/services/search/types';
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

  const hasInputValue = searchList.length < 2;

  const defaultUserSection = {
    name: '',
    address: {
      fullAddress: '',
      latitude: 0,
      longitude: 0,
      regionName: '',
    },
  };

  const getDefaultValues = (): SearchFormType => {
    return {
      userSection: hasInputValue
        ? Array(2).fill(defaultUserSection)
        : searchList.map(search => ({
            name: search?.name || '',
            address: {
              fullAddress: search?.address?.fullAddress || '',
              latitude: search?.address?.latitude || 0,
              longitude: search?.address?.longitude || 0,
              regionName: search?.address?.regionName || '',
            },
          })),
    };
  };

  return useForm({
    defaultValues: getDefaultValues(),
    resolver: yupResolver(createSearchFormVerifySchema()),
  });
}
