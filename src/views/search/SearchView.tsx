'use client';

import { Input } from '@nextui-org/react';
import { useAtom, useSetAtom } from 'jotai';
import { styled } from 'styled-components';
import { useRouter } from 'next/navigation';

import Address from '@/components/Address';

import useSearchForm from '@/hooks/form/search/useSearchForm';

import { bottomSheetState, searchState } from '@/jotai/global/store';

import Button from '@/components/Button';
import { ArrowBackIcon } from '@/assets/icons/ArrowBack';

const numberConfig: { [key: number]: string } = {
  1: '첫',
  2: '두',
  3: '세',
  4: '네',
  5: '다섯',
  6: '여섯',
  7: '일곱',
  8: '여덟',
  9: '아홉',
  10: '열',
};

interface SearchViewProps {
  type: 'individual' | 'together';
}

export default function SearchView({ type }: SearchViewProps) {
  const router = useRouter();

  const setBottomSheet = useSetAtom(bottomSheetState);
  const [searchList, setSearchList] = useAtom(searchState);

  const { register, setValue, handleSubmit, watch, reset } = useSearchForm();

  const handleSearchAddressBtnClick = (index: number) => {
    setBottomSheet(prevState => ({
      ...prevState,
      isOpen: true,
      contents: <Address setValue={setValue} currentIndex={index} />,
      isFullContents: true,
    }));
  };

  const handleSearchBtnClick = (searchForm: any) => {
    setSearchList(prevState => [...prevState, searchForm]);

    if (searchList.length >= 1) {
      router.push('/search/list');
    } else {
      reset();
    }
  };

  const addressValue = watch('address');
  const nameValue = watch('name');
  const titleText = `${
    numberConfig[searchList.length + 1]
  }번째 출발지 정보를\n입력해주세요.`;
  const buttonText =
    searchList.length >= 1
      ? '등록하기'
      : `${numberConfig[searchList.length + 2]}번째 출발지 추가하기`;
  const isButtonDisabled = !nameValue || !addressValue?.fullAddress;

  const handleClearName = () => setValue('name', '');
  const handleClearAddress = () =>
    setValue('address', {
      fullAddress: '',
      regionName: '',
      latitude: 0,
      longitude: 0,
    });

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
            size="lg"
            maxLength={5}
            {...register('name')}
            onClear={handleClearName}
            value={nameValue}
          />
          <ClickableArea
            onClick={() => handleSearchAddressBtnClick(searchList.length)}
          >
            <Input
              isClearable
              placeholder="출발지를 입력해주세요."
              size="lg"
              isReadOnly
              value={addressValue?.regionName || ''}
              onClear={handleClearAddress}
            />
          </ClickableArea>
        </Section>
        <Button
          label={buttonText}
          disabled={isButtonDisabled}
          $widthFull
          size="large"
          type="submit"
        />
      </Wrapper>
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
