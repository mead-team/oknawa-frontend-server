import DaumPostCode from '@/components/DaumPostCode';
import { modalState } from '@/jotai/global/store';
import { Button, Input } from '@nextui-org/react';
import { useAtom } from 'jotai';
import { useFieldArray, useForm } from 'react-hook-form';
import { styled } from 'styled-components';

export default function SearchBody() {
  const [modal, setModal] = useAtom(modalState);

  const { register, setValue, handleSubmit, control, getValues } = useForm({
    defaultValues: {
      userSection: [
        {
          name: '사용자1',
          address: { fullAddress: '', latitude: '', longitude: '' },
        },
        {
          name: '사용자2',
          address: { fullAddress: '', latitude: '', longitude: '' },
        },
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
        address: { fullAddress: '', latitude: '', longitude: '' },
      });
    }
  };

  const handleDeleteBtnClick = (index: number) => {
    remove(index);
  };

  const handleFindBtnClick = (data: any) => {
    console.log('handleFindBtnClick', data);
  };

  const handleSearchAddressBtnClick = (index: number) => {
    setModal({
      ...modal,
      isOpen: true,
      title: '주소 검색',
      contents: <DaumPostCode setValue={setValue} currentIndex={index} />,
    });
  };

  const addressValue = getValues('userSection');

  return (
    <Container onSubmit={handleSubmit(handleFindBtnClick)}>
      <Wrapper>
        {fields.map((field, index) => {
          return (
            <Section key={field.id}>
              <NameInput
                size="sm"
                maxLength={4}
                placeholder={`사용자 ${index + 1}`}
                {...register(`userSection.${index}.name`)}
              />
              <AddressInput
                isReadOnly
                size="sm"
                placeholder="출발지를 입력해주세요."
                value={addressValue[index].address.fullAddress}
                onClick={() => handleSearchAddressBtnClick(index)}
                onClear={() => console.log('input cleared')}
              />
              {index > 1 && (
                <DeleteButton onClick={() => handleDeleteBtnClick(index)}>
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

const NameInput = styled(Input)`
  width: 25%;
`;

const AddressInput = styled(Input)`
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
