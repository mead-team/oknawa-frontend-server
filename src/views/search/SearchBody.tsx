import DaumPostCode from '@/components/DaumPostCode';
import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { styled } from 'styled-components';

export default function SearchBody() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpenAddressModal, setIsOpenAddressModal] = useState(false);

  const { register, setValue, handleSubmit, control, watch, getValues } =
    useForm({
      defaultValues: {
        userSection: [
          {
            name: '',
            address: { fullAddress: '', latitude: '', longitude: '' },
          },
          {
            name: '',
            address: { fullAddress: '', latitude: '', longitude: '' },
          },
        ],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'userSection',
  });

  const handleAddressSearchBtnClick = (index: number) => {
    setCurrentIndex(index);
    setIsOpenAddressModal(true);
  };

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

  const addressValue = getValues('userSection');

  console.log('userSection Value', watch('userSection'));

  return (
    <Container onSubmit={handleSubmit(handleFindBtnClick)}>
      {isOpenAddressModal && (
        <DaumPostCode setValue={setValue} currentIndex={currentIndex} />
      )}
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
                onClick={() => handleAddressSearchBtnClick(index)}
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
