import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import { useResetAtom } from 'jotai/utils';
import debounce from 'lodash/debounce';

import Place from './components/Place';

import useKakaoPlaceService from '@/hooks/common/useKakaoPlaceService';

import { KakaoPlace } from './types';

import { bottomSheetState } from '@/jotai/global/store';
import { useAtom } from 'jotai';
import { searchHistoryState } from '@/jotai/search/store';

interface AddressProps {
  setValue: UseFormSetValue<FieldValues>;
  currentIndex: number;
}

export default function Address({ setValue, currentIndex }: AddressProps) {
  const resetBottomSheet = useResetAtom(bottomSheetState);
  const [input, setInput] = useState('');
  const [isOpenDropItem, setIsOpenDropItem] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryState);
  const recentSearchRef = useRef<any>(null);

  const { places, setPlaces, kakaoPlaceService, searchPlaceCB } =
    useKakaoPlaceService();

  const recentSearches = localStorage.getItem('searchHistory');
  const recentSearchesArray = recentSearches ? JSON.parse(recentSearches) : [];

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
    setIsOpenDropItem(false);
  };

  const handlePlaceItemClick = (place: KakaoPlace) => {
    const { address_name, x, y, place_name } = place;

    setValue(`userSection.${currentIndex}.address`, {
      fullAddress: address_name,
      latitude: y,
      longitude: x,
      regionName: place_name,
    });

    setSearchHistory([
      {
        fullAddress: address_name,
        latitude: y,
        longitude: x,
        regionName: place_name,
      },
      ...searchHistory,
    ]);

    resetBottomSheet();
  };

  const handleInputClick = () => {
    setIsOpenDropItem(true);
  };

  const handleSearchItemClick = (item: any) => {
    const { fullAddress, latitude, longitude, regionName } = item;

    setValue(`userSection.${currentIndex}.address`, {
      fullAddress,
      latitude,
      longitude,
      regionName,
    });

    resetBottomSheet();
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      recentSearchRef.current &&
      !recentSearchRef.current.contains(e.target)
    ) {
      setIsOpenDropItem(false);
    }
  };

  useEffect(() => {
    if (isOpenDropItem) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpenDropItem]);

  return (
    <Container>
      <SearchForm>
        <SearchInput
          value={input}
          onChange={handleAddressChange}
          onClick={handleInputClick}
          placeholder="출발지를 입력해주세요."
          ref={recentSearchRef}
        />
        {/* TODO 컴포넌트 분리 */}
        {isOpenDropItem && (
          <RecentSearch>
            {recentSearchesArray.map((item: any, index: any) => {
              return (
                <RecentSearchItem
                  key={index}
                  onClick={() => handleSearchItemClick(item)}
                >
                  {item.regionName}
                </RecentSearchItem>
              );
            })}
          </RecentSearch>
        )}
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
  position: relative;
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

const RecentSearch = styled.div`
  position: absolute;
  top: 75%;
  left: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: calc(100% - 2rem);
  padding: 0.5rem 0.8rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  border: 1px solid gray;
  background-color: white;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);

  :hover {
    background-color: #f6f6f6;
  }
`;

const RecentSearchItem = styled.p`
  color: black;
  cursor: pointer;
`;
