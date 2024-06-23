import { useForm } from 'react-hook-form';
import { number, object, string } from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

const createSearchFormVerifySchema = () => {
  return object().shape({
    name: string().required('이름을 입력해주세요.'),
    address: object().shape({
      fullAddress: string().required('주소를 입력해주세요.'),
      latitude: number(),
      longitude: number(),
      regionName: string(),
    }),
  });
};

export default function useSearchForm() {
  return useForm({
    defaultValues: {
      name: '',
      address: {
        fullAddress: '',
        latitude: 0,
        longitude: 0,
        regionName: '',
      },
    },
    resolver: yupResolver(createSearchFormVerifySchema()),
  });
}
