'use client';

import { Input } from '@nextui-org/react';
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
import Button from '@/components/Button';
import { ArrowBackIcon } from '@/assets/icons/ArrowBack';

const initialAddress = {
  fullAddress: '',
  latitude: 0,
  longitude: 0,
};

interface SearchViewProps {
  type: 'individual' | 'together';
}

export default function SearchView({ type }: SearchViewProps) {
  const setBottomSheet = useSetAtom(bottomSheetState);
  const setResult = useSetAtom(resultState);
  const setSearchState = useSetAtom(searchState);
  const [searchList, setSearchList] = useAtom(searchState);
  const router = useRouter();

  const {
    mutate: placeSearchMutate,
    isPending,
    isSuccess,
  } = usePlaceSearchMutation();

  const { register, setValue, handleSubmit, watch } = useSearchForm();

  const handleSearchAddressBtnClick = (index: number) => {
    setBottomSheet(prevState => ({
      ...prevState,
      isOpen: true,
      contents: <Address setValue={setValue} currentIndex={index} />,
      isFullContents: true,
    }));
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

  useEffect(() => {
    const image = new Image();
    image.src = '/loading.gif';
  }, []);

  const addressValue = watch('address');
  const nameValue = watch('name');
  const titleText = `${searchList.length + 1}번째 출발지 정보를\n입력해주세요.`;
  const buttonText = `${searchList.length + 2}번째 출발지 추가하기`;
  const isButtonDisabled = !nameValue || !addressValue?.fullAddress;

  return (
    <Container onSubmit={handleSubmit(handleSearchBtnClick)}>
      <Wrapper>
        <IconBox onClick={() => router.back()}>
          <ArrowBackIcon />
        </IconBox>
        <TitleBox>
          <Title>{titleText}</Title>
          <PeopleCount>① ②</PeopleCount>
        </TitleBox>
        <Section>
          <Input
            isClearable
            placeholder="이름을 입력해주세요."
            size="sm"
            maxLength={5}
            {...register('name')}
          />
          <ClickableArea
            onClick={() => handleSearchAddressBtnClick(searchList.length)}
          >
            <Input
              isClearable
              placeholder="출발지를 입력해주세요."
              size="sm"
              isReadOnly
              value={addressValue?.regionName || ''}
            />
          </ClickableArea>
        </Section>
        <Button label={buttonText} disabled={isButtonDisabled} type="submit" />
      </Wrapper>
      {(isPending || isSuccess) && <SearchLoading />}
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
  margin-top: 50px;
  padding-bottom: 120px;
`;

const IconBox = styled.div`
  width: 50px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PeopleCount = styled.span`
  font-size: 28px;
`;

// FIXME 공통 스타일
const Title = styled.h1`
  margin-bottom: 16px;
  font-size: 28px;
  font-weight: 700;
  white-space: pre-line;
  line-height: 43px;
`;

const Section = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
`;

const ClickableArea = styled.div`
  width: 100%;
`;
