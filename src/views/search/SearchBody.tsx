import { Button, Input } from '@nextui-org/react';
import { useFieldArray, useForm } from 'react-hook-form';
import { styled } from 'styled-components';

export default function SearchBody() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      userSection: [
        { name: '', address: '' },
        { name: '', address: '' },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'userSection',
  });

  const handleAddBtnClick = () => {
    if (fields.length < 4) {
      append({
        name: '',
        address: '',
      });
    }
  };

  const handleDeleteBtnClick = (idx: number) => {
    remove(idx);
  };

  const handleFindBtnClick = (data: any) => {
    console.log('handleFindBtnClick', data);
  };

  return (
    <Container onSubmit={handleSubmit(handleFindBtnClick)}>
      <Wrapper>
        {fields.map((field, idx) => {
          return (
            <Section key={field.id}>
              <UserName
                size="sm"
                maxLength={4}
                radius="md"
                placeholder={`사용자 ${idx + 1}`}
                {...register(`userSection.${idx}.name`)}
              />
              <AddressButton size="lg">출발지를 입력해주세요.</AddressButton>
              {idx > 1 && (
                <DeleteButton onClick={() => handleDeleteBtnClick(idx)}>
                  삭제
                </DeleteButton>
              )}
            </Section>
          );
        })}
        <AddButton onClick={handleAddBtnClick} isDisabled={fields.length > 4}>
          +
        </AddButton>
      </Wrapper>
      <Button color="success" type="submit">
        중간지점 찾기
      </Button>
    </Container>
  );
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: gray;
  padding: 35px 19px 20px;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Section = styled.section`
  position: relative;
  display: flex;
  gap: 50px;
`;

const UserName = styled(Input)`
  width: 25%;
`;

const AddressButton = styled(Button)`
  width: 70%;
`;

const DeleteButton = styled.button`
  position: absolute;
  bottom: 10%;
  left: 24%;
  width: 22px;
  height: 15px;
  font-size: 12px;
  font-weight: bold;
  color: red;
`;

const AddButton = styled(Button)`
  margin-top: 20px;
`;
