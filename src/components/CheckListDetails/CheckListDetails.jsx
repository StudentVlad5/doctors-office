import { Container } from 'components/baseStyles/CommonStyle.styled';
import {
  AdditionalInfoBox,
  AdditionalInfoBtn,
  AdditionalInfoDataBox,
  AdditionalInfoDataInput,
  AdditionalInfoDataInput2,
  AdditionalInfoDataLable,
  AdditionalInfoDataLable2,
  AdditionalInfoForm,
  AdditionalInfoFormInput,
  AdditionalInfoFormLable,
  AdditionalInfoFormText,
  CheckListBox,
  CheckListBtn,
  CheckListBtnBox,
  CheckListText,
  CopyIcon,
  PatientBox,
  PatientBoxTitle,
  Table,
  Td,
  Tr,
  WordIcon,
} from './CheckListDetails.styled';

export const CheckListDetails = () => {
  return (
    <Container>
      <CheckListBox>
        <CheckListText>
          Чек-лист №5 <br />
          от 31/03/2023
          <br />
          Бригада №01/04
          <br />
          Предполагаемое время прибытия в больницу 17 : 35 <br />
          Номер телефона: 8 705 999 56 74
        </CheckListText>

        <CheckListBtnBox>
          <CheckListBtn type="button">
            <CopyIcon /> Скопировать данные
          </CheckListBtn>
          <CheckListBtn type="button">
            <WordIcon /> Скачать в word
          </CheckListBtn>
        </CheckListBtnBox>
      </CheckListBox>

      <PatientBox>
        <PatientBoxTitle>Личные данные пациента</PatientBoxTitle>
        <Table>
          <Tr>
            <Td>ФИО пациента</Td>
            <Td>Примеров Пример</Td>
          </Tr>
          <Tr>
            <Td>ИИН пациента</Td>
            <Td>123456789</Td>
          </Tr>
          <Tr>
            <Td>Визуальное описание - при отсутствии личных данных</Td>
            <Td>При відсутності особистих даних</Td>
          </Tr>
        </Table>

        <PatientBoxTitle>Методика F-A-S-T</PatientBoxTitle>
        <Table>
          <Tr>
            <Td>Провисание на лице</Td>
            <Td>Да</Td>
          </Tr>
          <Tr>
            <Td>Смещение рук</Td>
            <Td>Да</Td>
          </Tr>
          <Tr>
            <Td>Нарушения речи</Td>
            <Td>Да</Td>
          </Tr>
          <Tr>
            <Td>Время появления первых симптомов</Td>
            <Td>15:28 31.08.2023</Td>
          </Tr>
        </Table>

        <PatientBoxTitle>Физиологические параметры</PatientBoxTitle>
        <Table>
          <Tr>
            <Td>Содержание сахара в крови</Td>
            <Td>75</Td>
          </Tr>
          <Tr>
            <Td>Температура тела</Td>
            <Td>37,2</Td>
          </Tr>
          <Tr>
            <Td>Артериальное давление</Td>
            <Td>120/70</Td>
          </Tr>
          <Tr>
            <Td>Масса тела пациента</Td>
            <Td>84</Td>
          </Tr>
          <Tr>
            <Td>Возраст пациента</Td>
            <Td>85</Td>
          </Tr>
        </Table>

        <PatientBoxTitle>Анамнез</PatientBoxTitle>
        <Table>
          <Tr>
            <Td>Внутричерепные кровоизлияния</Td>
            <Td>Да</Td>
          </Tr>
          <Tr>
            <Td>Большие операции или тяжелые травмы за последние 14 суток</Td>
            <Td>Да</Td>
          </Tr>
          <Tr>
            <Td>
              Недавние внутричерепные или интраспинальные хирургические
              вмешательства
            </Td>
            <Td>Да</Td>
          </Tr>
          <Tr>
            <Td>Инфаркт миокарда в предшествующие инсульту 3 месяца</Td>
            <Td>Да</Td>
          </Tr>
          <Tr>
            <Td>Инсульт в предшествующие инсульту 3 месяца</Td>
            <Td>Да</Td>
          </Tr>
          <Tr>
            <Td>
              Проведена пункция артерии в сложной для компрессии области в
              предшествующие инсульту 7 дней.
            </Td>
            <Td>Да</Td>
          </Tr>
          <Tr>
            <Td>
              Малые операции или инвазивные вмешательства в последние 10 дней
            </Td>
            <Td>Да</Td>
          </Tr>
          <Tr>
            <Td>
              Сердечно-сосудистые заболевания (подострый бактериальный
              эндокардит, острый перикардит)
            </Td>
            <Td>Да</Td>
          </Tr>
          <Tr>
            <Td>Острое инфекционное заболевание</Td>
            <Td>Да</Td>
          </Tr>
          <Tr>
            <Td>
              Кровоизлияния в ЖКТ и мочевыводящих путях не позднее 21 дня до
              инсульта
            </Td>
            <Td>Да</Td>
          </Tr>
          <Tr>
            <Td>
              Судорожные приступы в дебюте заболевания (имеется связь с острой
              церебральной ишемией)
            </Td>
            <Td>Да</Td>
          </Tr>
          <Tr>
            <Td>ОНМК ранее</Td>
            <Td>Да</Td>
          </Tr>
          <Tr>
            <Td>Гемморагический</Td>
            <Td>Да</Td>
          </Tr>
          <Tr>
            <Td>САК</Td>
            <Td>Да</Td>
          </Tr>
          <Tr>
            <Td>Ишемический инсульт</Td>
            <Td>Да</Td>
          </Tr>
        </Table>

        <PatientBoxTitle>Данные по заполнителю</PatientBoxTitle>
        <Table style={{ marginBottom: 65 }}>
          <Tr>
            <Td>ФИО сотрудника</Td>
            <Td>Примеров Пример</Td>
          </Tr>
          <Tr>
            <Td>№ бригады СМП</Td>
            <Td>№01/04</Td>
          </Tr>
          <Tr>
            <Td>Заполнение чек-листа начато</Td>
            <Td>15:45 31.08.2023</Td>
          </Tr>

          <Tr>
            <Td>Заполнение чек-листа завершено</Td>
            <Td>16:05 31.08.2023</Td>
          </Tr>
        </Table>

        <AdditionalInfoBox>
          <PatientBoxTitle>
            Дополнительная информация от инсультного центра
          </PatientBoxTitle>

          <AdditionalInfoForm>
            <AdditionalInfoFormLable>
              <AdditionalInfoFormText>
                Поликлиника прикрепления пациента
              </AdditionalInfoFormText>
              <AdditionalInfoFormInput type="text" />
            </AdditionalInfoFormLable>

            <AdditionalInfoDataBox>
              <AdditionalInfoFormText>
                Дата и время госпитализации
              </AdditionalInfoFormText>

              <AdditionalInfoDataLable>
                <AdditionalInfoDataInput type="text" />
              </AdditionalInfoDataLable>

              <AdditionalInfoDataLable2>
                <AdditionalInfoDataInput2 type="text" />
              </AdditionalInfoDataLable2>
            </AdditionalInfoDataBox>

            <AdditionalInfoBtn type="submit">
              Сохранить чек-лист
            </AdditionalInfoBtn>
          </AdditionalInfoForm>
        </AdditionalInfoBox>
      </PatientBox>
    </Container>
  );
};
