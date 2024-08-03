import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  background-color: #151518;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 99999999;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 72px 20px 0 8px;
`;

export const HomeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;

export const SharingButton = styled.button`
  display: flex;
  gap: 4px;
  align-items: center;
  font-size: 16px;
  color: #d9d9d9;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px;
  gap: 20px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid #1c1c20;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const StationName = styled.p`
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  font-weight: 700;
`;

export const AverageArrivalTime = styled.p`
  font-size: 18px;
`;

export const ArrivalTime = styled.span`
  color: var(--primary);
  font-weight: 700;
`;

export const IndicatorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  margin-top: 17px;
`;

export const Indicator = styled.div`
  color: #777781;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.003em;
`;

export const ChevronButton = styled.div`
  cursor: pointer;
`;

export const PreffertWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const VoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 106px;
  gap: 8px;
`;

export const VoteTitle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;
export const Label = styled.p`
  font-size: 13px;
  color: #777780;
`;
export const Count = styled.p`
  font-size: 13px;
`;

export const LikeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  /* width: 106px; */
`;

export const LikeItem = styled.div`
  /* flex: 1 0 20%; */
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const TailWrapper = styled.div`
  position: absolute;
  bottom: -16px;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 16px;
`;

export const Tail = styled.div`
  display: flex;
  justify-content: center;
  width: 64px;
  background-color: #151518;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  cursor: pointer;
  position: relative;

  svg {
    position: absolute;
    bottom: 0px;
  }
`;
