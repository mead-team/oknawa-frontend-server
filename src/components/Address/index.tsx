import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@nextui-org/react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

import { useResetAtom } from 'jotai/utils';

import { bottomSheetState } from '@/jotai/global/store';
import { KakaoPlace, KakaoPlacesSearchStatus } from './types';

interface AddressProps {
  setValue: UseFormSetValue<FieldValues>;
  currentIndex: number;
}

export default function Address({ setValue, currentIndex }: AddressProps) {
  const resetBottomSheet = useResetAtom(bottomSheetState);

  const [kakaoPlaceService, setKakaoPlaceService] =
    useState<kakao.maps.services.Places | null>(null);
  const [input, setInput] = useState('');
  const [places, setPlaces] = useState<KakaoPlace[]>([]);

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleAddressSearchBtnClick = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return null;

    if (kakaoPlaceService)
      return kakaoPlaceService.keywordSearch(input, searchPlaceCB);
  };

  const searchPlaceCB = (
    data: KakaoPlace[],
    status: KakaoPlacesSearchStatus,
  ) => {
    if (status === kakao.maps.services.Status.OK) {
      console.log('places', data);
      setPlaces(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      return setPlaces([]);
    } else if (status === kakao.maps.services.Status.ERROR) {
      return alert('검색 결과 중 오류가 발생했습니다.');
    }
  };

  const handlePlaceItemClick = (place: KakaoPlace) => {
    const { address_name, x, y, place_name } = place;

    setValue(`userSection.${currentIndex}.address`, {
      fullAddress: address_name,
      latitude: y,
      longitude: x,
      regionName: place_name,
    });

    resetBottomSheet();
  };

  useEffect(() => {
    kakao.maps.load(() => {
      const ps = new kakao.maps.services.Places();
      setKakaoPlaceService(ps);
    });
  }, []);

  return (
    <Container>
      <SearchForm onSubmit={handleAddressSearchBtnClick}>
        <SearchInput
          value={input}
          onChange={handleAddressChange}
          placeholder="출발지를 입력해주세요."
        />
        <SearchButton color="success" type="submit">
          검색
        </SearchButton>
      </SearchForm>
      {places.length > 0 ? (
        <PlacesList>
          {places.map(place => {
            return (
              <Place.Container
                key={place.id}
                onClick={() => handlePlaceItemClick(place)}
              >
                <Place.Name>{place.place_name}</Place.Name>
                <Place.SubName>
                  {place.road_address_name || place.address_name}
                </Place.SubName>
              </Place.Container>
            );
          })}
        </PlacesList>
      ) : (
        <NoData>검색 결과가 없습니다.</NoData>
      )}
    </Container>
  );
}

const Container = styled.div`
  background-color: white;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
`;

const SearchInput = styled.input`
  width: 90%;
  padding: 0.8rem;
  background-color: #f6f6f6;
  border-radius: 0.5rem;
  color: black;
`;

const SearchButton = styled(Button)`
  height: 49px;
  margin-left: 0.8rem;
  font-weight: 600;
`;

const PlacesList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0.8rem;
  :hover {
    background-color: #f6f6f6;
  }
  cursor: pointer;
`;

const Place = {
  Container: styled.li`
    border-bottom: solid 1px rgba(0, 0, 0, 0.1);
    &:last-child {
      border-bottom: none;
    }
  `,
  Name: styled.h2`
    font-size: 16px;
    color: #000;
  `,
  SubName: styled.h3`
    margin-bottom: 0.3rem;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
  `,
};

const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.5);
  height: 32vh;
`;
