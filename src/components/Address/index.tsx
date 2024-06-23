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
import { ArrowBackIcon } from '@/assets/icons/ArrowBack';
import { useRouter } from 'next/navigation';
import { Input } from '@nextui-org/react';
import { MapMarkerIcon } from '@/assets/icons/MapMarker';
import { MagnifyIcon } from '@/assets/icons/Magnify';

interface AddressProps {
  setValue: any;
  currentIndex: number;
}

export default function Address({ setValue, currentIndex }: AddressProps) {
  const router = useRouter();
  const resetBottomSheet = useResetAtom(bottomSheetState);
  const [input, setInput] = useState('');
  const [isOpenDropItem, setIsOpenDropItem] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryState);
  // const recentSearchRef = useRef<any>(null);

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

  // const handleOutsideClick = (e: MouseEvent) => {
  //   if (
  //     recentSearchRef.current &&
  //     !recentSearchRef.current.contains(e.target)
  //   ) {
  //     setIsOpenDropItem(false);
  //   }
  // };

  // useEffect(() => {
  //   if (isOpenDropItem) {
  //     document.addEventListener('click', handleOutsideClick);
  //   }

  //   return () => {
  //     document.removeEventListener('click', handleOutsideClick);
  //   };
  // }, [isOpenDropItem]);

  return (
    <Container>
      <SearchForm>
        <TopSection>
          <IconBox onClick={() => resetBottomSheet()}>
            <ArrowBackIcon />
          </IconBox>
          <SearchInput
            isClearable
            value={input}
            placeholder="출발지를 입력해주세요."
            size="sm"
            onChange={handleAddressChange}
            onClick={handleInputClick}
            onClear={() => setInput('')}
          />
        </TopSection>
      </SearchForm>
      {isOpenDropItem && recentSearchesArray.length > 0 && (
        <>
          <RecentSearch>
            검색 히스토리
            {recentSearchesArray.map((item: any, index: any) => {
              return (
                <RecentSearchItem
                  key={index}
                  onClick={() => handleSearchItemClick(item)}
                >
                  <MagnifyIcon />
                  {item.regionName}
                </RecentSearchItem>
              );
            })}
          </RecentSearch>
          <DividerLine />
        </>
      )}
      {places.length > 0 ? (
        <PlacesList>
          {places.map(place => {
            return (
              <Place key={place.id} onClick={() => handlePlaceItemClick(place)}>
                <MapMarkerIcon />
                <div>
                  <Place.Title>{place.place_name}</Place.Title>
                  <Place.SubTitle>
                    {place.road_address_name || place.address_name}
                  </Place.SubTitle>
                </div>
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
  background-color: black;
  padding-top: 20px;
`;

const SearchForm = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 0.8rem 0.5rem;
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: 20px;
`;

const IconBox = styled.div``;

const SearchInput = styled(Input)`
  width: 100%;
`;

const PlacesList = styled.ul`
  display: flex;
  flex-direction: column;
  min-height: 50vh;
  :hover {
    background-color: #35353b;
  }
  cursor: pointer;
`;

const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const RecentSearch = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #82828a;
  font-size: 14px;

  :hover {
    background-color: #f6f6f6;
  }
`;

const RecentSearchItem = styled.p`
  display: flex;
  gap: 15px;
  padding-top: 10px;
  padding: 5px 0 5px 8px;
  border-bottom: solid 1px #35353b;
  color: white;
  cursor: pointer;
  font-size: 15px;
`;

const DividerLine = styled.div`
  width: 100%;
  height: 14px;
  background-color: #424249;
`;
