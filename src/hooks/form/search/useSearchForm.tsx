import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { array, number, object, string } from 'yup';

const createSearchFormVerifySchema = () => {
  return object().shape({
    userSection: array().of(
      object().shape({
        name: string(),
        address: object().shape({
          fullAddress: string().required('🚨 모든 주소를 입력해주세요! 🚨'),
          latitude: number(),
          longitude: number(),
        }),
      }),
    ),
  });
};

export default function useSearchForm() {
  return useForm({
    defaultValues: {
      userSection: [
        {
          name: '',
          address: { fullAddress: '', latitude: 0, longitude: 0 },
        },
        {
          name: '',
          address: { fullAddress: '', latitude: 0, longitude: 0 },
        },
      ],
    },
    resolver: yupResolver(createSearchFormVerifySchema()),
  });
}
