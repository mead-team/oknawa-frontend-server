'use client';

import { Card, CardBody, Avatar, Divider } from '@nextui-org/react';
import styled from 'styled-components';

export default function DistanceSummary() {
  return (
    <Container>
      <Card>
        <CardBody>
          <h1>서울역</h1>
          <h2>평균이동시간: 10분</h2>
          <Box>
            <User className="text-small">
              <Avatar name="안" size="sm" color="primary" />
              <TravelTime>8분</TravelTime>
              <Divider className="h-4" orientation="vertical" />
              <span>신림역 출발</span>
            </User>
            <User className="text-small">
              <Avatar name="김" size="sm" color="secondary" />
              <TravelTime>8분</TravelTime>
              <Divider className="h-4" orientation="vertical" />
              <span>장지역 출발</span>
            </User>
            <User className="text-small">
              <Avatar name="배" size="sm" color="danger" />
              <TravelTime>10분</TravelTime>
              <Divider className="h-4" orientation="vertical" />
              <span>구성역 출발</span>
            </User>
            <User className="text-small">
              <Avatar name="장" size="sm" color="warning" />
              <TravelTime>10분</TravelTime>
              <Divider className="h-4" orientation="vertical" />
              <span>영등포역 출발</span>
            </User>
          </Box>
        </CardBody>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 8px;
  margin: 0 8px;
  z-index: 10;
`;

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 50%;
  margin-top: 8px;
`;

const TravelTime = styled.span`
  text-align: center;
  width: 30px;
`;
