import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import { useResetAtom } from 'jotai/utils';
import debounce from 'lodash/debounce';

import Place from './components/Place';

import useKakaoPlaceService from '@/hooks/common/useKakaoPlaceService';

import { KakaoPlace } from './types';

import { bottomSheetState } from '@/jotai/global/store';

interface AddressProps {
  setValue: UseFormSetValue<FieldValues>;
  currentIndex: number;
}

export default function Address({ setValue, currentIndex }: AddressProps) {
  const resetBottomSheet = useResetAtom(bottomSheetState);
  const [input, setInput] = useState('');

  const { places, setPlaces, kakaoPlaceService, searchPlaceCB } =
    useKakaoPlaceService();

  const debouncedSearch = debounce(address => {
    if (address && kakaoPlaceService) {
      kakaoPlaceService.keywordSearch(address, searchPlaceCB);
    } else {
      setPlaces([]);
    }
  }, 100);

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    debouncedSearch(e.target.value);
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

  return (
    <Container>
      <SearchForm>
        <SearchInput
          value={input}
          onChange={handleAddressChange}
          placeholder="출발지를 입력해주세요."
        />
      </SearchForm>
      {places.length > 0 ? (
        <PlacesList>
          {places.map(place => {
            return (
              <Place key={place.id} onClick={() => handlePlaceItemClick(place)}>
                <Place.Title>{place.place_name}</Place.Title>
                <Place.SubTitle>
                  {place.road_address_name || place.address_name}
                </Place.SubTitle>
              </Place>
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

const SearchForm = styled.section`
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  background-color: #f6f6f6;
  border-radius: 0.5rem;
  color: black;
`;

const PlacesList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0.8rem;
  min-height: 50vh;
  :hover {
    background-color: #f6f6f6;
  }
  cursor: pointer;
`;

const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.5);
  height: 50vh;
`;
