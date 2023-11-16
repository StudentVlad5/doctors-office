import { theme } from 'components/baseStyles/Variables.styled';
import styled from 'styled-components';
import { ReactComponent as copyIcon } from 'images/svg/copy.svg';
import { ReactComponent as wordIcon } from 'images/svg/word.svg';

export const CheckListBox = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  padding-bottom: 55px;

  &::before {
    content: '';
    position: absolute;
    border-bottom: 3px black solid;
    bottom: 50px;
    left: 0;
    width: 100%;
  }
`;

export const CheckListText = styled.p`
  color: ${theme.colors.black};
  /* font-family: Inter; */
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const CheckListBtnBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CheckListBtn = styled.button`
  border-radius: 17px;
  padding: 11px 13px 11px 22px;
  border-color: transparent;
  background: ${theme.colors.darkGreen};

  color: ${theme.colors.white};
  text-align: left;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 18px;
  cursor: pointer;

  &:hover,
  &:focus {
    background: ${theme.colors.lightGreen};
  }

  &:last-child {
    margin-bottom: 0;
    background-color: #00519b;
    &:hover,
    &:focus {
      background: ${theme.colors.darkBlue};
    }
  }
`;

export const CopyIcon = styled(copyIcon)``;

export const WordIcon = styled(wordIcon)``;

export const PatientBox = styled.div``;

export const PatientBoxTitle = styled.h2`
  color: ${theme.colors.black};
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const Table = styled.table`
  border-collapse: collapse;
  margin-top: 20px;

  &:not(:last-child) {
    margin-bottom: 100px;
  }
`;

export const Tr = styled.tr`
  border: 1px solid ${theme.colors.black};
  background-color: ${theme.colors.darkGrey};
`;

export const Td = styled.td`
  border-right: 1px solid ${theme.colors.black};
  padding: 12px 10px 12px 25px;

  width: 676px;
  height: 75px;

  color: ${theme.colors.black};
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const AdditionalInfoBox = styled.div``;

export const AdditionalInfoForm = styled.form`
  position: relative;
  margin-top: 42px;
`;

export const AdditionalInfoFormLable = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AdditionalInfoFormInput = styled.input`
  padding: 20px 257px 20px 25px;
  width: 500px;
  border-radius: 17px;
  border: 1px solid ${theme.colors.black};
  background-color: ${theme.colors.white};

  color: ${theme.colors.black};
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const AdditionalInfoFormText = styled(PatientBoxTitle)`
  font-weight: 400;
`;

export const AdditionalInfoDataBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 60px;
`;

export const AdditionalInfoDataLable = styled.label`
  position: absolute;
  right: 300px;
`;

export const AdditionalInfoDataLable2 = styled.label`
  position: absolute;
  right: 0;
`;

export const AdditionalInfoDataInput = styled(AdditionalInfoFormInput)`
  width: 167px;
  padding: 20px 45px;
  margin-right: 33px;
`;

export const AdditionalInfoDataInput2 = styled(AdditionalInfoFormInput)`
  width: 300px;
  padding: 20px 45px;
`;

export const AdditionalInfoBtn = styled.button`
  position: absolute;
  right: 0;
  padding: 18px 85px;
  margin-top: 42px;

  border-radius: 17px;
  border: 1px solid ${theme.colors.black};
  background: ${theme.colors.darkGreen};

  color: ${theme.colors.white};
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;

  &:hover,
  &:focus {
    background: ${theme.colors.lightGreen};
  }
`;
