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
import { useEffect, useState } from 'react';
import axios from 'axios';

export const CheckListDetails = () => {
  const [data, setData] = useState([]);

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

  return (
    <Container>
      {data && data.normal && (
        <>
          <CheckListBox>
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
              </Tr>
              <Tr>
                <Td>Температура тела</Td>
                <Td>{data.normal.bodyTemperature}</Td>
              </Tr>
              <Tr>
                <Td>Артериальное давление</Td>

                {/* ТУТ ДВА arterialPressureS ЯКИЙ ТРЕБА ПОКАЗУВАТИ ??????? !!!!!!!!!!!!!111*/}

                <Td>
                  {data.normal.arterialPressureD}{' '}
                  {data.normal.arterialPressureS}
                </Td>
              </Tr>
              <Tr>
                <Td>Масса тела пациента</Td>
                <Td>{data.normal.patientBodyWeight}</Td>
              </Tr>
              <Tr>
                <Td>Возраст пациента</Td>
                <Td>{data.normal.patientAge}</Td>
              </Tr>
            </Table>

            <PatientBoxTitle>Анамнез</PatientBoxTitle>
            <Table>
              <Tr>
                <Td>Внутричерепные кровоизлияния</Td>
                <Td>
                  {data.normal.intracranialHemorrhages.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  Большие операции или тяжелые травмы за последние 14 суток
                </Td>
                <Td>
                  {data.normal.majorSurgeriesOrSevereInjuries.toString() ===
                  'true'
                    ? 'Да'
                    : '-'}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  Недавние внутричерепные или интраспинальные хирургические
                  вмешательства
                </Td>
                <Td>
                  {data.normal.surgicalInterventions.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </Td>
              </Tr>
              <Tr>
                <Td>Инфаркт миокарда в предшествующие инсульту 3 месяца</Td>
                <Td>
                  {data.normal.myocardialInfarction.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </Td>
              </Tr>
              <Tr>
                <Td>Инсульт в предшествующие инсульту 3 месяца</Td>
                <Td>{data.normal.stroke.toString() === 'true' ? 'Да' : '-'}</Td>
              </Tr>
              <Tr>
                <Td>
                  Проведена пункция артерии в сложной для компрессии области в
                  предшествующие инсульту 7 дней.
                </Td>
                <Td>
                  {data.normal.arterialPuncture.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  Малые операции или инвазивные вмешательства в последние 10
                  дней
                </Td>
                <Td>
                  {data.normal.smallOperations.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  Сердечно-сосудистые заболевания (подострый бактериальный
                  эндокардит, острый перикардит)
                </Td>
                <Td>
                  {data.normal.cardiovascularDiseases.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </Td>
              </Tr>
              <Tr>
                <Td>Острое инфекционное заболевание</Td>
                <Td>
                  {data.normal.acuteInfectiousDisease.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  Кровоизлияния в ЖКТ и мочевыводящих путях не позднее 21 дня до
                  инсульта
                </Td>
                <Td>
                  {data.normal.hemorrhagicStroke.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  Судорожные приступы в дебюте заболевания (имеется связь с
                  острой церебральной ишемией)
                </Td>
                <Td>
                  {data.normal.convulsions.toString() === 'true' ? 'Да' : '-'}
                </Td>
              </Tr>
              <Tr>
                <Td>ОНМК ранее</Td>

                {/* НЕ ЗНАЙШОВ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11 */}

                <Td>{data.normal.stroke.toString() === 'true' ? 'Да' : '-'}</Td>
              </Tr>
              <Tr>
                <Td>Гемморагический</Td>
                <Td>
                  {data.normal.hemorrhages.toString() === 'true' ? 'Да' : '-'}
                </Td>
              </Tr>
              <Tr>
                <Td>САК</Td>
                <Td>
                  {data.normal.SACStroke.toString() === 'true' ? 'Да' : '-'}
                </Td>
              </Tr>
              <Tr>
                <Td>Ишемический инсульт</Td>
                <Td>
                  {data.normal.ischemicStroke.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </Td>
              </Tr>
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
        </>
      )}
    </Container>
  );
};
