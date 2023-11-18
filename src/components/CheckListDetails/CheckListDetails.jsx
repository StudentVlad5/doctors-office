import { useEffect, useState } from 'react';
import { fetchData } from 'services/APIservice';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { onLoaded, onLoading } from 'helpers/Loader/Loader';
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
import clipboardCopy from 'clipboard-copy';
import { export2Doc } from 'services/exportToWord';
import { theme } from 'components/baseStyles/Variables.styled';

export const CheckListDetails = () => {
  const [data, setData] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [inputData, setInputData] = useState([
    {
      clinic: '',
      hospitalizationTime: '',
      hospitalizationDate: '',
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData('1696447916376');
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
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

  const handleCopy = () => {
    const patientData = `
    Личные данные пациента:
      ФИО пациента: ${data.normal.patientFullName}
      ИИН пациента: ${data.normal.patientINN}
      Визуальное описание: ${data.normal.visualDescription}

    Методика F-A-S-T:
      Провисание на лице: ${
        data.normal.saggingFace.toString() === 'true' ? 'Да' : '-'
      }
      Смещение рук: ${
        data.normal.handDisplacement.toString() === 'true' ? 'Да' : '-'
      }
      Нарушения речи: ${
        data.normal.speechDisorders.toString() === 'true' ? 'Да' : '-'
      }
      Время появления первых симптомов: ${data.normal.firstSymptomsTimeHh}:${
      data.normal.firstSymptomsTimeMm
    } 31.08.2023

    Физиологические параметры:
      Содержание сахара в крови: ${data.normal.bloodSugarLevel} ммоль/л
      Температура тела: ${data.normal.bodyTemperature} °C
      Артериальное давление: ${data.normal.arterialPressureD}/${
      data.normal.arterialPressureS
    } мм. рт. ст.
      Масса тела пациента: ${data.normal.patientBodyWeight} кг
      Возраст пациента: ${data.normal.patientAge} лет

    Анамнез:
      Внутричерепные кровоизлияния: ${
        data.normal.intracranialHemorrhages.toString() === 'true' ? 'Да' : '-'
      }
      Большие операции или тяжелые травмы за последние 14 суток: ${
        data.normal.majorSurgeriesOrSevereInjuries.toString() === 'true'
          ? 'Да'
          : '-'
      }
      Недавние внутричерепные или интраспинальные хирургические вмешательства: ${
        data.normal.surgicalInterventions.toString() === 'true' ? 'Да' : '-'
      }
      Инфаркт миокарда в предшествующие инсульту 3 месяца: ${
        data.normal.myocardialInfarction.toString() === 'true' ? 'Да' : '-'
      }
      Инсульт в предшествующие инсульту 3 месяца: ${
        data.normal.stroke.toString() === 'true' ? 'Да' : '-'
      }
      Проведена пункция артерии в сложной для компрессии области в предшествующие инсульту 7 дней: ${
        data.normal.arterialPuncture.toString() === 'true' ? 'Да' : '-'
      }
      Малые операции или инвазивные вмешательства в последние 10 дней: ${
        data.normal.smallOperations.toString() === 'true' ? 'Да' : '-'
      }
      Сердечно-сосудистые заболевания (подострый бактериальный эндокардит, острый перикардит): ${
        data.normal.cardiovascularDiseases.toString() === 'true' ? 'Да' : '-'
      }
      Острое инфекционное заболевание: ${
        data.normal.acuteInfectiousDisease.toString() === 'true' ? 'Да' : '-'
      }
      Кровоизлияния в ЖКТ и мочевыводящих путях не позднее 21 дня до инсульта: ${
        data.normal.hemorrhagicStroke.toString() === 'true' ? 'Да' : '-'
      }
      Судорожные приступы в дебюте заболевания (имеется связь с острой церебральной ишемией): ${
        data.normal.convulsions.toString() === 'true' ? 'Да' : '-'
      }
      ОНМК ранее: ${data.normal.stroke.toString() === 'true' ? 'Да' : '-'}
      Гемморагический: ${
        data.normal.hemorrhages.toString() === 'true' ? 'Да' : '-'
      }
      САК: ${data.normal.SACStroke.toString() === 'true' ? 'Да' : '-'}
      Ишемический инсульт: ${
        data.normal.ischemicStroke.toString() === 'true' ? 'Да' : '-'
      }

    Данные по заполнителю:
      ФИО сотрудника: ${data.normal.medicalStaffFullName}
      № бригады СМП: №01/04
      Заполнение чек-листа начато: 15:45 31.08.2023
      Заполнение чек-листа завершено: 16:05 31.08.2023
  `;
    clipboardCopy(patientData);

    navigator.clipboard.writeText(patientData).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    });
  };

  return (
    <Container>
      {isLoading ? onLoading() : onLoaded()}
      {error && onFetchError('Whoops, something went wrong')}
      {setData && data.normal && !error && (
        <div id="exportContent">
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
              <CheckListBtn type="button" onClick={handleCopy}>
                <CopyIcon />
                {isCopied ? 'Скопировано!' : 'Скопировать данные'}
              </CheckListBtn>
              <CheckListBtn type="button" onClick={()=>export2Doc('exportContent')}>
                <WordIcon /> Скачать в word
              </CheckListBtn>
            </CheckListBtnBox>
          </CheckListBox>

          <PatientBox>
            <PatientBoxTitle>Личные данные пациента</PatientBoxTitle>
            <Table>
              <tbody>
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
              </tbody>
            </Table>

            <PatientBoxTitle>Методика F-A-S-T</PatientBoxTitle>
            <Table>
              <tbody>
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
              </tbody>
            </Table>

            <PatientBoxTitle>Физиологические параметры</PatientBoxTitle>
            <Table>
              <tbody>
              <TrRed $props={(Number(data.normal?.bloodSugarLevel) < 2.7 || Number(data.normal?.bloodSugarLevel) > 22) ? theme.colors.accentCoral : theme.colors.darkGrey}>
                <Td>Содержание сахара в крови</Td>
                <Td>{data.normal.bloodSugarLevel}</Td>
                <Td>ммоль/л</Td>
              </TrRed>
              <TrRed $props={(Number(data.normal?.bodyTemperature) < 37 ) ? theme.colors.accentCoral : theme.colors.darkGrey}>
                <Td>Температура тела</Td>
                <Td>{data.normal.bodyTemperature}</Td>
                <Td>°C</Td>
              </TrRed>
              <TrRed $props={(Number(data.normal?.arterialPressureS) > 110 ||  Number(data.normal?.arterialPressureD) > 180) ? theme.colors.accentCoral : theme.colors.darkGrey}>
                <Td>Артериальное давление</Td>
                <Td>
                  {data.normal.arterialPressureS}/
                  {data.normal.arterialPressureD}
                </Td>
                <Td>мм. рт. ст.</Td>
              </TrRed>
              <Tr>
                <Td>Масса тела пациента</Td>
                <Td>{data.normal.patientBodyWeight}</Td>
                <Td>кг</Td>
              </Tr>
              <TrRed $props={(Number(data.normal?.patientAge) < 18 || Number(data.normal?.patientAge) > 80) ? theme.colors.accentCoral : theme.colors.darkGrey}>
                <Td>Возраст пациента</Td>
                <Td>{data.normal.patientAge}</Td>
                <Td>лет</Td>
              </TrRed>
              </tbody>
            </Table>

            <PatientBoxTitle>Анамнез</PatientBoxTitle>
            <Table>
              <tbody>
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
              <TrRed $props={(data.normal?.myocardialInfarction.toString() === 'true' ) ? theme.colors.accentCoral : theme.colors.darkGrey}>
                <TdSmall>
                  Инфаркт миокарда в предшествующие инсульту 3 месяца
                </TdSmall>
                <TdSmall>
                  {data.normal.myocardialInfarction.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </TrRed>
              <TrRed $props={(data.normal?.stroke.toString() === 'true' ) ? theme.colors.accentCoral : theme.colors.darkGrey}>
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
              <TrRed $props={(data.normal?.ischemicStroke.toString() === 'true' ) ? theme.colors.accentCoral : theme.colors.darkGrey}>
                <TdSmall>Ишемический инсульт</TdSmall>
                <TdSmall>
                  {data.normal.ischemicStroke.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </TrRed>
              </tbody>
            </Table>

            <PatientBoxTitle>Данные по заполнителю</PatientBoxTitle>
            <Table style={{ marginBottom: 65 }}>
              <tbody>
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
              </tbody>
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
        </div>
      )}
    </Container>
  );
};
