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
`;

export const Station = {
  Container: styled.span`
    margin-right: 1px;
    font-weight: 500;
  `,
  BoldText: styled.span`
    font-weight: 700;
  `,
};

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

export const PreffertWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const VoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  width: 106px;
`;

export const LikeItem = styled.div`
  flex: 1 0 20%;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
export const ButtonLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 12px 16px 16px;
  height: 44px;
  border-radius: 8px;
  gap: 4px;
  font-weight: 700;
  color: #777780;
  border: 1px solid #777780;
  cursor: pointer;
`;
export const ButtonPrimary = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  border-radius: 8px;
  padding: 16px;
  font-weight: 700;
  background-color: #18c964;
  color: #101012;
  cursor: pointer;
`;
