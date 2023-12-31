import { Button, Input } from '@nextui-org/react';
import { useAtom, useSetAtom } from 'jotai';
import { useFieldArray } from 'react-hook-form';
import { styled } from 'styled-components';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

import DaumPostCode from '@/components/DaumPostCode';

import useSearchForm from '@/hooks/form/search/useSearchForm';

import { modalState, searchState } from '@/jotai/global/store';
import { usePlaceSearchMutation } from '@/hooks/mutation/search';
import { resultState } from '@/jotai/result/store';

const initialAddress = {
  fullAddress: '',
  latitude: 0,
  longitude: 0,
};

export default function SearchBody() {
  const [modal, setModal] = useAtom(modalState);
  const setResult = useSetAtom(resultState);
  const setSearchState = useSetAtom(searchState);
  const router = useRouter();

  const { mutate: placeSearchMutate, isPending } = usePlaceSearchMutation();

  const {
    register,
    setValue,
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useSearchForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'userSection',
  });

  const handleSearchAddressBtnClick = (index: number) => {
    setModal({
      ...modal,
      isOpen: true,
      title: '주소 검색',
      contents: (
        <DaumPostCode
          setValue={setValue}
          currentIndex={index}
          trigger={trigger}
        />
      ),
    });
  };
  const handleClearAddress = (index: number) => {
    setValue(`userSection.${index}.address`, initialAddress);
  };

  const handleAddBtnClick = () => {
    append({
      name: '',
      address: initialAddress,
    });
  };

  const handleDeleteBtnClick = (index: number) => {
    remove(index);
  };

  const handleSearchBtnClick = (searchForm: any) => {
    placeSearchMutate(searchForm, {
      onSuccess: data => {
        setSearchState(searchForm.userSection);
        router.push('/result');
        setResult(data);
      },
    });
  };

  const addressValue = watch('userSection');

  useEffect(() => {
    if (errors?.userSection) {
      toast.error('모든 주소를 입력해주세요', {
        duration: 700,
      });
    }
  }, [errors]);

  return (
    <Container onSubmit={handleSubmit(handleSearchBtnClick)}>
      <Wrapper>
        {fields.map((field, index) => {
          return (
            <Section key={field.id}>
              <NameInput
                size="sm"
                maxLength={4}
                placeholder={`사용자 ${index + 1}`}
                {...register(`userSection.${index}.name`)}
              />
              <AddressInput
                isReadOnly
                size="sm"
                placeholder="출발지를 입력해주세요."
                value={addressValue?.[index].address.fullAddress}
                onClick={() => handleSearchAddressBtnClick(index)}
                onClear={() => handleClearAddress(index)}
              />
              {index > 1 && (
                <DeleteButton onClick={() => handleDeleteBtnClick(index)}>
                  삭제
                </DeleteButton>
              )}
            </Section>
          );
        })}
        {fields.length < 4 && (
          <AddButton onClick={handleAddBtnClick} isDisabled={fields.length > 3}>
            +
          </AddButton>
        )}
      </Wrapper>
      <Button color="success" type="submit" isLoading={isPending}>
        만나기 편한 장소 추천받기
      </Button>
    </Container>
  );
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 35px 19px 20px;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const Section = styled.section`
  position: relative;
  display: flex;
  gap: 20px;
`;

const NameInput = styled(Input)`
  width: 25%;
`;

const AddressInput = styled(Input)`
  width: 75%;
`;

const DeleteButton = styled.button`
  position: absolute;
  bottom: 10%;
  right: 2%;
  width: 22px;
  height: 15px;
  font-size: 10px;
  font-weight: bold;
  color: red;
`;

const AddButton = styled(Button)`
  margin-top: 20px;
`;
