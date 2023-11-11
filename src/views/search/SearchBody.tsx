import { Button, Input } from '@nextui-org/react';
import { useAtom } from 'jotai';
import { useFieldArray } from 'react-hook-form';
import { styled } from 'styled-components';

import DaumPostCode from '@/components/DaumPostCode';

import useSearchForm from '@/hooks/form/search/useSearchForm';

import { modalState } from '@/jotai/global/store';

const initialAddress = {
  fullAddress: '',
  latitude: 0,
  longitude: 0,
};

export default function SearchBody() {
  const [modal, setModal] = useAtom(modalState);

  const {
    register,
    setValue,
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useSearchForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'userSection',
  });

  const handleSearchAddressBtnClick = (index: number) => {
    setModal({
      ...modal,
      isOpen: true,
      title: '주소 검색',
      contents: (
        <DaumPostCode
          setValue={setValue}
          currentIndex={index}
          trigger={trigger}
        />
      ),
    });
  };
  const handleClearAddress = (index: number) => {
    setValue(`userSection.${index}.address`, initialAddress);
  };

  const handleAddBtnClick = () => {
    append({
      name: '',
      address: initialAddress,
    });
  };

  const handleDeleteBtnClick = (index: number) => {
    remove(index);
  };

  const handleFindBtnClick = (data: any) => {
    console.log('handleFindBtnClick', data);
  };

  const addressValue = watch('userSection');

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
                value={addressValue?.[index].address.fullAddress}
                onClick={() => handleSearchAddressBtnClick(index)}
                onClear={() => handleClearAddress(index)}
              />
              {index > 1 && (
                <DeleteButton onClick={() => handleDeleteBtnClick(index)}>
                  삭제
                </DeleteButton>
              )}
            </Section>
          );
        })}
        <AddButton onClick={handleAddBtnClick} isDisabled={fields.length > 3}>
          +
        </AddButton>
        {errors?.userSection && (
          <ErrorMessage>🚨 모든 주소를 입력해주세요! 🚨</ErrorMessage>
        )}
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

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
`;
