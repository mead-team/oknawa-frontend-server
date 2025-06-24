'use client';

import { Input } from '@nextui-org/react';
import { useAtom, useSetAtom } from 'jotai';
import { styled } from 'styled-components';
import { useRouter, useSearchParams } from 'next/navigation';

import Address from '@/components/Address';
import useSearchForm from '@/hooks/form/search/useSearchForm';
import { bottomSheetState, searchState } from '@/jotai/global/store';
import Button from '@/components/Button';
import { ArrowBackIcon } from '@/assets/icons/ArrowBack';
import {
  useMakeRoomMutation,
  useSubmitDeparturePointMutation,
} from '@/hooks/mutation/search';
import { roomState } from '@/jotai/global/room';

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
  const shareRoomId = useSearchParams().get('roomId');

  const setBottomSheet = useSetAtom(bottomSheetState);
  const [searchList, setSearchList] = useAtom(searchState);
  const [storageRoomData, setStorageRoomData] = useAtom(roomState);

  const { register, setValue, handleSubmit, watch, reset } = useSearchForm();
  const { mutate: makeRoomMutate } = useMakeRoomMutation();
  const { mutate: submitDeparturePointMutate } =
    useSubmitDeparturePointMutation();

  const isIndividualView = type === 'individual';

  const handleSearchAddressBtnClick = (index: number, e: any) => {
    e.preventDefault();
    setBottomSheet(prevState => ({
      ...prevState,
      isOpen: true,
      contents: <Address setValue={setValue} currentIndex={index} />,
      isFullContents: true,
    }));
  };

  const handleSearchBtnClick = (searchForm: any) => {
    if (isIndividualView) {
      setSearchList(prevState => [...prevState, searchForm]);
    }

    if (!isIndividualView) {
      if (shareRoomId) {
        submitDeparturePointMutate(
          {
            requestBody: {
              room_id: shareRoomId,
              name: searchForm.name,
              region_name: searchForm.address.regionName,
              start_x: searchForm.address.latitude,
              start_y: searchForm.address.longitude,
            }
          },
          {
            onSuccess: () => {
              setStorageRoomData({ roomId: shareRoomId, hostId: '' });
              router.push('/search/list-together');
            },
          },
        );
      } else if (storageRoomData.roomId && searchList.length > 0) {
        submitDeparturePointMutate(
          {
            requestBody: {
              room_id: storageRoomData.roomId,
              name: searchForm.name,
              region_name: searchForm.address.regionName,
              start_x: searchForm.address.latitude,
              start_y: searchForm.address.longitude,
            }
          },
          {
            onSuccess: () => {
              router.push('/search/list-together');
            },
          },
        );
      } else {
        makeRoomMutate(searchForm, {
          onSuccess: data => {
            setStorageRoomData({
              roomId: data?.room_id,
              hostId: data?.room_host_id,
            });
            router.push('/search/list-together');
          },
        });
      }

      return;
    }

    if (searchList.length >= 1) {
      router.push('/search/list');
    } else {
      reset();
    }
  };

  const getTitleText = (orderNums: number) => {
    if (isIndividualView) {
      return `${numberConfig[orderNums + 1]}번째 출발지 정보를\n입력해주세요.`;
    } else {
      if (orderNums > 0) {
        return `${
          numberConfig[orderNums + 1]
        }번째 출발지 정보를\n입력해주세요.`;
      } else {
        return '먼저 자신의 출발지 정보를\n입력해주세요.';
      }
    }
  };

  const addressValue = watch('address');
  const nameValue = watch('name');
  const titleText = getTitleText(searchList.length);
  const buttonText =
    searchList.length >= 1
      ? '등록하기'
      : `${numberConfig[searchList.length + 2]}번째 출발지 추가하기`;
  const isButtonDisabled = !nameValue || !addressValue?.fullAddress;

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
        <IconBox onClick={() => router.push('/')}>
          <ArrowBackIcon />
        </IconBox>
        <TitleBox>
          <Title>{titleText}</Title>
        </TitleBox>
        <Section>
          <Input
            isClearable
            placeholder="이름을 입력해주세요."
            size="sm"
            maxLength={5}
            {...register('name')}
            onClear={() => setValue('name', '')}
            value={nameValue}
          />
          <ClickableArea
            onClick={e => handleSearchAddressBtnClick(searchList.length, e)}
          >
            <Input
              isClearable
              placeholder="출발지를 입력해주세요."
              size="sm"
              isReadOnly
              value={addressValue?.regionName || ''}
              onClear={handleClearAddress}
            />
          </ClickableArea>
        </Section>
        {isIndividualView ? (
          <Button
            label={buttonText}
            disabled={isButtonDisabled}
            type="submit"
            $widthFull
          />
        ) : (
          <Button
            label="등록하기"
            type="submit"
            disabled={isButtonDisabled}
            $widthFull
          />
        )}
      </Wrapper>
    </Container>
  );
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 35px 19px 20px;
  min-height: 100dvh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
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
