import { Container } from 'components/baseStyles/CommonStyle.styled';
import {
  AdditionalInfoBox,
  AdditionalInfoBtn,
  AdditionalInfoBtnBox,
  AdditionalInfoDataBox,
  AdditionalInfoDataInput,
  AdditionalInfoDataInput2,
  AdditionalInfoDataLable,
  AdditionalInfoDataLable2,
  AdditionalInfoDataLableBox,
  AdditionalInfoForm,
  AdditionalInfoFormInput,
  AdditionalInfoFormLable,
  AdditionalInfoFormText,
  BackContainer,
  BackLink,
  CheckListBox,
  CheckListBtn,
  CheckListBtnBox,
  CheckListText,
  CheckListTextBack,
  CopyIcon,
  PatientBox,
  PatientBoxTitle,
  Table,
  Td,
  TdSmall,
  Tr,
  TrRed,
  Triangle,
  WordIcon,
} from './CheckListDetails.styled';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const CheckListDetails = () => {
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState([
    {
      clinic: '',
      hospitalizationTime: '',
      hospitalizationDate: '',
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'http://185.116.194.159:34345/read?identifier=1696447916376'
        );
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(inputData);

    setInputData({
      clinic: '',
      hospitalizationTime: '',
      hospitalizationDate: '',
    });
  };

  return (
    <Container>
      {data && data.normal && (
        <>
          <CheckListBox>
            <div>
              <BackContainer>
                <BackLink to="/checklist">
                  <Triangle />
                  <CheckListTextBack>Назад</CheckListTextBack>
                </BackLink>
              </BackContainer>

              <CheckListText>
                Чек-лист №5 <br />
                от 31/03/2023
                <br />
                Бригада №01/04
                <br />
                <span style={{ marginRight: '10px' }}>
                  Предполагаемое время прибытия в больницу
                </span>
                {data.normal.deliveryTimeHh}:{data.normal.deliveryTimeMm} <br />
                Номер телефона: 8 705 999 56 74
              </CheckListText>
            </div>

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
                <Td>{data.normal.patientFullName}</Td>
              </Tr>
              <Tr>
                <Td>ИИН пациента</Td>
                <Td>{data.normal.patientINN}</Td>
              </Tr>
              <Tr>
                <Td>Визуальное описание - при отсутствии личных данных</Td>
                <Td>{data.normal.visualDescription}</Td>
              </Tr>
            </Table>

            <PatientBoxTitle>Методика F-A-S-T</PatientBoxTitle>
            <Table>
              <Tr>
                <Td>Провисание на лице</Td>
                <Td>
                  {data.normal.saggingFace.toString() === 'true' ? 'Да' : '-'}
                </Td>
              </Tr>
              <Tr>
                <Td>Смещение рук</Td>
                <Td>
                  {data.normal.handDisplacement.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </Td>
              </Tr>
              <Tr>
                <Td>Нарушения речи</Td>
                <Td>
                  {data.normal.speechDisorders.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </Td>
              </Tr>
              <Tr>
                <Td>Время появления первых симптомов</Td>
                <Td>
                  {data.normal.firstSymptomsTimeHh}:
                  {data.normal.firstSymptomsTimeMm} 31.08.2023
                </Td>
              </Tr>
            </Table>

            <PatientBoxTitle>Физиологические параметры</PatientBoxTitle>
            <Table>
              <Tr>
                <Td>Содержание сахара в крови</Td>
                <Td>{data.normal.bloodSugarLevel}</Td>
                <Td>ммоль/л</Td>
              </Tr>
              <Tr>
                <Td>Температура тела</Td>
                <Td>{data.normal.bodyTemperature}</Td>
                <Td>°C</Td>
              </Tr>
              <Tr>
                <Td>Артериальное давление</Td>

                {/* ТУТ ДВА arterialPressureS ЯКИЙ ТРЕБА ПОКАЗУВАТИ ??????? !!!!!!!!!!!!!111*/}

                <Td>
                  {data.normal.arterialPressureD}/
                  {data.normal.arterialPressureS}
                </Td>
                <Td>мм. рт. ст.</Td>
              </Tr>
              <Tr>
                <Td>Масса тела пациента</Td>
                <Td>{data.normal.patientBodyWeight}</Td>
                <Td>кг</Td>
              </Tr>
              <TrRed>
                <Td>Возраст пациента</Td>
                <Td>{data.normal.patientAge}</Td>
                <Td>лет</Td>
              </TrRed>
            </Table>

            <PatientBoxTitle>Анамнез</PatientBoxTitle>
            <Table>
              <Tr>
                <TdSmall>Внутричерепные кровоизлияния</TdSmall>
                <TdSmall style={{ width: 194 }}>
                  {data.normal.intracranialHemorrhages.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </Tr>
              <Tr>
                <TdSmall>
                  Большие операции или тяжелые травмы за последние 14 суток
                </TdSmall>
                <TdSmall>
                  {data.normal.majorSurgeriesOrSevereInjuries.toString() ===
                  'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </Tr>
              <Tr>
                <TdSmall>
                  Недавние внутричерепные или интраспинальные хирургические
                  вмешательства
                </TdSmall>
                <TdSmall>
                  {data.normal.surgicalInterventions.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </Tr>
              <TrRed>
                <TdSmall>
                  Инфаркт миокарда в предшествующие инсульту 3 месяца
                </TdSmall>
                <TdSmall>
                  {data.normal.myocardialInfarction.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </TrRed>
              <TrRed>
                <TdSmall>Инсульт в предшествующие инсульту 3 месяца</TdSmall>
                <TdSmall>
                  {data.normal.stroke.toString() === 'true' ? 'Да' : '-'}
                </TdSmall>
              </TrRed>
              <Tr>
                <TdSmall>
                  Проведена пункция артерии в сложной для компрессии области в
                  предшествующие инсульту 7 дней.
                </TdSmall>
                <TdSmall>
                  {data.normal.arterialPuncture.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </Tr>
              <Tr>
                <TdSmall>
                  Малые операции или инвазивные вмешательства в последние 10
                  дней
                </TdSmall>
                <TdSmall>
                  {data.normal.smallOperations.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </Tr>
              <Tr>
                <TdSmall>
                  Сердечно-сосудистые заболевания (подострый бактериальный
                  эндокардит, острый перикардит)
                </TdSmall>
                <TdSmall>
                  {data.normal.cardiovascularDiseases.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </Tr>
              <Tr>
                <TdSmall>Острое инфекционное заболевание</TdSmall>
                <TdSmall>
                  {data.normal.acuteInfectiousDisease.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </Tr>
              <Tr>
                <TdSmall>
                  Кровоизлияния в ЖКТ и мочевыводящих путях не позднее 21 дня до
                  инсульта
                </TdSmall>
                <TdSmall>
                  {data.normal.hemorrhagicStroke.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </Tr>
              <Tr>
                <TdSmall>
                  Судорожные приступы в дебюте заболевания (имеется связь с
                  острой церебральной ишемией)
                </TdSmall>
                <TdSmall>
                  {data.normal.convulsions.toString() === 'true' ? 'Да' : '-'}
                </TdSmall>
              </Tr>
              <Tr>
                <TdSmall>ОНМК ранее</TdSmall>

                {/* НЕ ЗНАЙШОВ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11 */}

                <TdSmall>
                  {data.normal.stroke.toString() === 'true' ? 'Да' : '-'}
                </TdSmall>
              </Tr>
              <Tr>
                <TdSmall>Гемморагический</TdSmall>
                <TdSmall>
                  {data.normal.hemorrhages.toString() === 'true' ? 'Да' : '-'}
                </TdSmall>
              </Tr>
              <Tr>
                <TdSmall>САК</TdSmall>
                <TdSmall>
                  {data.normal.SACStroke.toString() === 'true' ? 'Да' : '-'}
                </TdSmall>
              </Tr>
              <TrRed>
                <TdSmall>Ишемический инсульт</TdSmall>
                <TdSmall>
                  {data.normal.ischemicStroke.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </TrRed>
            </Table>

            <PatientBoxTitle>Данные по заполнителю</PatientBoxTitle>
            <Table style={{ marginBottom: 65 }}>
              <Tr>
                <Td>ФИО сотрудника</Td>
                <Td>{data.normal.medicalStaffFullName}</Td>
              </Tr>
              <Tr>
                <Td>№ бригады СМП</Td>
                {/* НЕ ЗНАЙШОВ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11 */}

                <Td>№01/04</Td>
              </Tr>
              <Tr>
                <Td>Заполнение чек-листа начато</Td>
                {/* НЕ ЗНАЙШОВ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11 */}

                <Td>15:45 31.08.2023</Td>
              </Tr>

              <Tr>
                <Td>Заполнение чек-листа завершено</Td>
                {/* НЕ ЗНАЙШОВ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11 */}

                <Td>16:05 31.08.2023</Td>
              </Tr>
            </Table>
          </PatientBox>

          <AdditionalInfoBox>
            <PatientBoxTitle>
              Дополнительная информация от инсультного центра
            </PatientBoxTitle>

            <AdditionalInfoForm>
              <AdditionalInfoFormLable>
                <AdditionalInfoFormText>
                  Поликлиника прикрепления пациента
                </AdditionalInfoFormText>
                <AdditionalInfoFormInput
                  type="text"
                  value={inputData.clinic}
                  onChange={e =>
                    setInputData({ ...inputData, clinic: e.target.value })
                  }
                />
              </AdditionalInfoFormLable>

              <AdditionalInfoDataBox>
                <AdditionalInfoFormText>
                  Дата и время госпитализации
                </AdditionalInfoFormText>

                <AdditionalInfoDataLableBox>
                  <AdditionalInfoDataLable>
                    <AdditionalInfoDataInput
                      type="time"
                      value={inputData.hospitalizationTime}
                      onChange={e =>
                        setInputData({
                          ...inputData,
                          hospitalizationTime: e.target.value,
                        })
                      }
                    />
                  </AdditionalInfoDataLable>

                  <AdditionalInfoDataLable2>
                    <AdditionalInfoDataInput2
                      type="date"
                      value={inputData.hospitalizationDate}
                      onChange={e =>
                        setInputData({
                          ...inputData,
                          hospitalizationDate: e.target.value,
                        })
                      }
                    />
                  </AdditionalInfoDataLable2>
                </AdditionalInfoDataLableBox>
              </AdditionalInfoDataBox>

              <AdditionalInfoBtnBox>
                <AdditionalInfoBtn type="submit" onClick={handleSubmit}>
                  Сохранить чек-лист
                </AdditionalInfoBtn>
              </AdditionalInfoBtnBox>
            </AdditionalInfoForm>
          </AdditionalInfoBox>
        </>
      )}
    </Container>
  );
};
