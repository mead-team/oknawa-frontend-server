import styled from 'styled-components';

interface CenterMarkerProps {
  children: React.ReactNode;
}

export default function CenterMarker({ children }: CenterMarkerProps) {
  return (
    <Container>
      <CenterMarkerText>{children}</CenterMarkerText>
      <CenterMarkerArrow>
        <svg
          width="6"
          height="4"
          viewBox="0 0 6 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Vector 601">
            <path d="M3 4L0 0H6L3 4Z" fill="black" />
            <path d="M3 4L0 0H6L3 4Z" fill="black" fillOpacity="0.2" />
            <path d="M3 4L0 0H6L3 4Z" fill="black" fillOpacity="0.2" />
            <path d="M3 4L0 0H6L3 4Z" fill="black" fillOpacity="0.2" />
          </g>
        </svg>
      </CenterMarkerArrow>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  padding: 6px;
  border-radius: 8px;
  background-color: #000;
`;

const CenterMarkerText = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #fff;
`;

const CenterMarkerArrow = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
`;
