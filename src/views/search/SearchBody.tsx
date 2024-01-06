import { Button, Input } from '@nextui-org/react';
import { useSetAtom } from 'jotai';
import { useFieldArray } from 'react-hook-form';
import { styled } from 'styled-components';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import Image from 'next/image';

import DaumPostCode from '@/components/DaumPostCode';

import useSearchForm from '@/hooks/form/search/useSearchForm';
import { usePlaceSearchMutation } from '@/hooks/mutation/search';

import { bottomSheetState, searchState } from '@/jotai/global/store';
import { resultState } from '@/jotai/result/store';

import { CloseIcon } from '@/assets/icons/Close';

const initialAddress = {
  fullAddress: '',
  latitude: 0,
  longitude: 0,
};

export default function SearchBody() {
  const setBottomSheet = useSetAtom(bottomSheetState);
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
    setBottomSheet(prevState => ({
      ...prevState,
      isOpen: true,
      title: '주소를 검색하세요',
      contents: (
        <DaumPostCode
          setValue={setValue}
          currentIndex={index}
          trigger={trigger}
        />
      ),
    }));
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
      toast('모든 주소를 입력해주세요!', {
        duration: 700,
        icon: '❗️',
        style: {
          borderRadius: '12px',
          background: '#300B0B',
          color: '#fff',
          border: '1px solid #FF4D4D',
        },
      });
    }
  }, [errors]);

  return (
    <Container onSubmit={handleSubmit(handleSearchBtnClick)}>
      {isPending && (
        <LoadingContainer>
          <LoadingWrapper>
            <Image
              src="/loading.gif"
              alt="Loading Spinner"
              width={148}
              height={148}
            />
            <LoadingDesc>{'가장 만나기 편한\n장소를 찾고 있어요'}</LoadingDesc>
          </LoadingWrapper>
        </LoadingContainer>
      )}
      <Wrapper>
        <Title>{'출발하는 곳을 입력하면\n중간 지점을 추천해드려요!'}</Title>
        {fields.map((field, index) => {
          return (
            <Section key={field.id}>
              <NameInput
                size="sm"
                maxLength={4}
                placeholder={`이름 ${index + 1}`}
                {...register(`userSection.${index}.name`)}
              />
              <AddressInput
                isReadOnly
                size="sm"
                placeholder="출발지를 입력하세요"
                value={addressValue?.[index].address.fullAddress}
                onClick={() => handleSearchAddressBtnClick(index)}
              />
              {index > 1 && (
                <DeleteButton onClick={() => handleDeleteBtnClick(index)}>
                  <CloseIcon width="13" height="13" color="black" />
                </DeleteButton>
              )}
            </Section>
          );
        })}
        {fields.length < 4 ? (
          <AddButton onClick={handleAddBtnClick} isDisabled={fields.length > 3}>
            + 추가하기
          </AddButton>
        ) : (
          <MaxPeopleText>최대 4명까지 입력할 수 있어요</MaxPeopleText>
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
  margin-top: 45px;
`;

const Title = styled.h1`
  margin-bottom: 11px;
  font-size: 32px;
  font-weight: 700;
  white-space: pre-line;
  text-align: center;
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
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  bottom: 34%;
  right: 2%;
  width: 14px;
  height: 14px;
  background-color: white;
`;

const AddButton = styled(Button)`
  margin-top: 20px;
`;

const MaxPeopleText = styled.p`
  display: flex;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const LoadingWrapper = styled.div`
  display: flex;
  padding: 40px 64px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  background-color: #18c964;
  border-radius: 20px;
`;

const LoadingDesc = styled.h3`
  font-size: 18px;
  line-height: 140%;
  white-space: pre-line;
  text-align: center;
  color: black;
`;
