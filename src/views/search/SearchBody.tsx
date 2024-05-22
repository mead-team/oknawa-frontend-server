import { Button, Input } from '@nextui-org/react';
import { useAtom, useSetAtom } from 'jotai';
import { useFieldArray } from 'react-hook-form';
import { styled } from 'styled-components';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

import SearchLoading from './components/SearchLoading';
import Address from '@/components/Address';

import useSearchForm from '@/hooks/form/search/useSearchForm';
import { usePlaceSearchMutation } from '@/hooks/mutation/search';

import {
  bottomSheetState,
  modalState,
  searchState,
} from '@/jotai/global/store';
import { resultState } from '@/jotai/result/store';

import { CloseIcon } from '@/assets/icons/Close';
import { media } from '@/styles/commonStyles';

const initialAddress = {
  fullAddress: '',
  latitude: 0,
  longitude: 0,
};

export default function SearchBody() {
  const setBottomSheet = useSetAtom(bottomSheetState);
  const setResult = useSetAtom(resultState);
  const setSearchState = useSetAtom(searchState);
  const [searchList] = useAtom(searchState);
  const router = useRouter();

  const {
    mutate: placeSearchMutate,
    isPending,
    isSuccess,
  } = usePlaceSearchMutation();

  const {
    register,
    setValue,
    handleSubmit,
    control,
    watch,
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
      contents: <Address setValue={setValue} currentIndex={index} />,
      height: 72,
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

  useEffect(() => {
    const image = new Image();
    image.src = '/loading.gif';
  }, []);

  return (
    <>
      <Container onSubmit={handleSubmit(handleSearchBtnClick)}>
        <Wrapper>
          <Title>{'출발하는 곳을 입력하면\n중간 지점을 추천해드려요!'}</Title>
          {fields.map((field, index) => {
            return (
              <Section key={field.id}>
                <NameInput
                  size="sm"
                  maxLength={4}
                  placeholder={`이름 ${index + 1}`}
                  defaultValue={searchList[index]?.name || ''}
                  {...register(`userSection.${index}.name`)}
                />
                <ClickableArea
                  onClick={() => handleSearchAddressBtnClick(index)}
                >
                  <AddressInput
                    isReadOnly
                    size="sm"
                    placeholder="출발지를 입력해주세요."
                    value={addressValue?.[index].address.regionName}
                  />
                </ClickableArea>
                {index > 1 && (
                  <DeleteButton onClick={() => handleDeleteBtnClick(index)}>
                    <CloseIcon width="13" height="13" color="black" />
                  </DeleteButton>
                )}
              </Section>
            );
          })}
          {fields.length < 10 ? (
            <AddButton
              onClick={handleAddBtnClick}
              isDisabled={fields.length > 10}
            >
              + 추가하기
            </AddButton>
          ) : (
            <MaxPeopleText>최대 10명까지 입력할 수 있어요</MaxPeopleText>
          )}
        </Wrapper>

        {(isPending || isSuccess) && <SearchLoading />}
      </Container>
      <SearchButtonWrapper>
        <SearchButton
          color="success"
          onClick={handleSubmit(handleSearchBtnClick)}
        >
          만나기 편한 장소 추천받기
        </SearchButton>
      </SearchButtonWrapper>
    </>
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
  padding-bottom: 120px;
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
  width: 27%;
`;

const ClickableArea = styled.div`
  width: 100%;
`;

const AddressInput = styled(Input)``;

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
  font-weight: 600;
`;

const MaxPeopleText = styled.p`
  display: flex;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const SearchButtonWrapper = styled.div`
  /* display: flex; */
  width: 100%;
  max-width: 500px;
  justify-content: center;
  position: fixed;
  z-index: 2;
  bottom: 0;
  padding: 10px 20px 40px;

  ${media.mobile} {
    min-width: 100%;
  }
`;

const SearchButton = styled(Button)`
  font-weight: 600;
  width: 100%;
  height: 56px;
`;
