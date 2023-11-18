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
import { useParams } from 'react-router-dom';
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
  const routerParams = useParams();
  const id = routerParams.id;

  useEffect(() => {
    (async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData(`${id}`); //1696447704291
        console.log(data);
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
        setData(data.normal);
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
      hospitalizationTime: null,
      hospitalizationDate: null,
    });
  };

  const handleCopy = () => {
    const patientData = `
    Чек-лист №5
    от 31/03/2023
    Бригада №01/04
    Предполагаемое время прибытия в больницу: ${data?.deliveryTimeHh}:${
      data?.deliveryTimeMm
    }
    Номер телефона: 8 705 999 56 74

    Личные данные пациента:
      ФИО пациента: ${data?.patientFullName}
      ИИН пациента: ${data?.patientINN}
      Визуальное описание: ${data?.visualDescription}

    Методика F-A-S-T:
      Провисание на лице:
      ${
        data?.saggingFace && data.saggingFace.toString() === 'true' ? 'Да' : '-'
      }
      Смещение рук:
      ${
        data?.handDisplacement && data.handDisplacement.toString() === 'true'
          ? 'Да'
          : '-'
      }
      Нарушения речи: ${
        data?.speechDisorders && data.speechDisorders.toString() === 'true'
          ? 'Да'
          : '-'
      }
      Время появления первых симптомов: ${data?.firstSymptomsTimeHh}:${
      data?.firstSymptomsTimeMm
    } 31.08.2023

    Физиологические параметры:
      Содержание сахара в крови: ${data?.bloodSugarLevel} ммоль/л
      Температура тела: ${data?.bodyTemperature} °C
      Артериальное давление: ${data?.arterialPressureD}/${
      data?.arterialPressureS
    } мм. рт. ст.
      Масса тела пациента: ${data?.patientBodyWeight} кг
      Возраст пациента: ${data?.patientAge} лет

    Анамнез:
      Внутричерепные кровоизлияния: ${
        data?.intracranialHemorrhages &&
        data.intracranialHemorrhages.toString() === 'true'
          ? 'Да'
          : '-'
      }
      Большие операции или тяжелые травмы за последние 14 суток: ${
        data?.majorSurgeriesOrSevereInjuries &&
        data.majorSurgeriesOrSevereInjuries.toString() === 'true'
          ? 'Да'
          : '-'
      }
      Недавние внутричерепные или интраспинальные хирургические вмешательства: ${
        data?.surgicalInterventions &&
        data.surgicalInterventions.toString() === 'true'
          ? 'Да'
          : '-'
      }
      Инфаркт миокарда в предшествующие инсульту 3 месяца: ${
        data?.myocardialInfarction &&
        data.myocardialInfarction.toString() === 'true'
          ? 'Да'
          : '-'
      }
      Инсульт в предшествующие инсульту 3 месяца: ${
        data?.stroke && data.stroke.toString() === 'true' ? 'Да' : '-'
      }
      Проведена пункция артерии в сложной для компрессии области в предшествующие инсульту 7 дней: ${
        data?.arterialPuncture && data.arterialPuncture.toString() === 'true'
          ? 'Да'
          : '-'
      }
      Малые операции или инвазивные вмешательства в последние 10 дней: ${
        data?.smallOperations && data.smallOperations.toString() === 'true'
          ? 'Да'
          : '-'
      }
      Сердечно-сосудистые заболевания (подострый бактериальный эндокардит, острый перикардит): ${
        data?.cardiovascularDiseases &&
        data.cardiovascularDiseases.toString() === 'true'
          ? 'Да'
          : '-'
      }
      Острое инфекционное заболевание: ${
        data?.acuteInfectiousDisease &&
        data.acuteInfectiousDisease.toString() === 'true'
          ? 'Да'
          : '-'
      }
      Кровоизлияния в ЖКТ и мочевыводящих путях не позднее 21 дня до инсульта: ${
        data?.hemorrhagicStroke && data.hemorrhagicStroke.toString() === 'true'
          ? 'Да'
          : '-'
      }
      Судорожные приступы в дебюте заболевания (имеется связь с острой церебральной ишемией): ${
        data?.convulsions && data.convulsions.toString() === 'true' ? 'Да' : '-'
      }
      ОНМК ранее: ${
        data?.stroke && data.stroke.toString() === 'true' ? 'Да' : '-'
      }
      Гемморагический: ${
        data?.hemorrhages && data.hemorrhages.toString() === 'true' ? 'Да' : '-'
      }
      САК: ${
        data?.SACStroke && data.SACStroke.toString() === 'true' ? 'Да' : '-'
      }
      Ишемический инсульт: ${
        data?.ischemicStroke && data.ischemicStroke.toString() === 'true'
          ? 'Да'
          : '-'
      }

    Данные по заполнителю:
      ФИО сотрудника: ${data?.medicalStaffFullName}
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
      {setData && data && !error && (
        <div id="exportContent">
          <CheckListBox>
            <div>
              <BackContainer>
                <BackLink to="#" onClick={() => window.history.back()}>
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
                {data?.deliveryTimeHh}:{data?.deliveryTimeMm} <br />
                Номер телефона: 8 705 999 56 74
              </CheckListText>
            </div>

            <CheckListBtnBox>
              <CheckListBtn type="button" onClick={handleCopy}>
                <CopyIcon />
                {isCopied ? 'Скопировано!' : 'Скопировать данные'}
              </CheckListBtn>
              <CheckListBtn
                type="button"
                onClick={() => export2Doc('exportContent')}
              >
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
                  <Td>{data?.patientFullName}</Td>
                </Tr>
                <Tr>
                  <Td>ИИН пациента</Td>
                  <Td>{data?.patientINN}</Td>
                </Tr>
                <Tr>
                  <Td>Визуальное описание - при отсутствии личных данных</Td>
                  <Td>{data?.visualDescription}</Td>
                </Tr>
              </tbody>
            </Table>

            <PatientBoxTitle>Методика F-A-S-T</PatientBoxTitle>
            <Table>
              <tbody>
                <Tr>
                  <Td>Провисание на лице</Td>
                  <Td>
                    {data?.saggingFace && data.saggingFace.toString() === 'true'
                      ? 'Да'
                      : '-'}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Смещение рук</Td>
                  <Td>
                    {data?.handDisplacement &&
                    data.handDisplacement.toString() === 'true'
                      ? 'Да'
                      : '-'}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Нарушения речи</Td>
                  <Td>
                    {data?.speechDisorders &&
                    data.speechDisorders.toString() === 'true'
                      ? 'Да'
                      : '-'}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Время появления первых симптомов</Td>
                  <Td>
                    {data?.firstSymptomsTimeHh}:{data?.firstSymptomsTimeMm}{' '}
                    31.08.2023
                  </Td>
                </Tr>
              </tbody>
            </Table>

            <PatientBoxTitle>Физиологические параметры</PatientBoxTitle>
            <Table>
              <tbody>
                <TrRed
                  $props={
                    Number(data?.bloodSugarLevel) < 2.7 ||
                    Number(data?.bloodSugarLevel) > 22
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  <Td>Содержание сахара в крови</Td>
                  <Td>{data?.bloodSugarLevel}</Td>
                  <Td>ммоль/л</Td>
                </TrRed>
                <TrRed
                  $props={
                    Number(data?.bodyTemperature) < 37
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  <Td>Температура тела</Td>
                  <Td>{data?.bodyTemperature}</Td>
                  <Td>°C</Td>
                </TrRed>
                <TrRed
                  $props={
                    Number(data?.arterialPressureS) > 110 ||
                    Number(data?.arterialPressureD) > 180
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  <Td>Артериальное давление</Td>
                  <Td>
                    {data?.arterialPressureS}/{data?.arterialPressureD}
                  </Td>
                  <Td>мм. рт. ст.</Td>
                </TrRed>
                <Tr>
                  <Td>Масса тела пациента</Td>
                  <Td>{data?.patientBodyWeight}</Td>
                  <Td>кг</Td>
                </Tr>
                <TrRed
                  $props={
                    Number(data?.patientAge) < 18 ||
                    Number(data?.patientAge) > 80
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  <Td>Возраст пациента</Td>
                  <Td>{data?.patientAge}</Td>
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
                    {data?.intracranialHemorrhages &&
                    data.intracranialHemorrhages.toString() === 'true'
                      ? 'Да'
                      : '-'}
                  </TdSmall>
                </Tr>
                <Tr>
                  <TdSmall>
                    Большие операции или тяжелые травмы за последние 14 суток
                  </TdSmall>
                  <TdSmall>
                    {data?.majorSurgeriesOrSevereInjuries &&
                    data.majorSurgeriesOrSevereInjuries.toString() === 'true'
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
                    {data?.surgicalInterventions &&
                    data.surgicalInterventions.toString() === 'true'
                      ? 'Да'
                      : '-'}
                  </TdSmall>
                </Tr>
                <TrRed
                  $props={
                    data?.myocardialInfarction &&
                    data.myocardialInfarction.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  <TdSmall>
                    Инфаркт миокарда в предшествующие инсульту 3 месяца
                  </TdSmall>
                  <TdSmall>
                    {data?.myocardialInfarction &&
                    data.myocardialInfarction.toString() === 'true'
                      ? 'Да'
                      : '-'}
                  </TdSmall>
                </TrRed>
                <TrRed
                  $props={
                    data?.stroke && data.stroke.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  <TdSmall>Инсульт в предшествующие инсульту 3 месяца</TdSmall>
                  <TdSmall>
                    {data?.stroke && data.stroke.toString() === 'true'
                      ? 'Да'
                      : '-'}
                  </TdSmall>
                </TrRed>
                <Tr>
                  <TdSmall>
                    Проведена пункция артерии в сложной для компрессии области в
                    предшествующие инсульту 7 дней.
                  </TdSmall>
                  <TdSmall>
                    {data?.arterialPuncture &&
                    data.arterialPuncture.toString() === 'true'
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
                    {data?.smallOperations &&
                    data.smallOperations.toString() === 'true'
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
                    {data?.cardiovascularDiseases &&
                    data.cardiovascularDiseases.toString() === 'true'
                      ? 'Да'
                      : '-'}
                  </TdSmall>
                </Tr>
                <Tr>
                  <TdSmall>Острое инфекционное заболевание</TdSmall>
                  <TdSmall>
                    {data?.acuteInfectiousDisease &&
                    data.acuteInfectiousDisease.toString() === 'true'
                      ? 'Да'
                      : '-'}
                  </TdSmall>
                </Tr>
                <Tr>
                  <TdSmall>
                    Кровоизлияния в ЖКТ и мочевыводящих путях не позднее 21 дня
                    до инсульта
                  </TdSmall>
                  <TdSmall>
                    {data?.hemorrhagicStroke &&
                    data.hemorrhagicStroke.toString() === 'true'
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
                    {data?.convulsions && data.convulsions.toString() === 'true'
                      ? 'Да'
                      : '-'}
                  </TdSmall>
                </Tr>
                <Tr>
                  <TdSmall>ОНМК ранее</TdSmall>
                  {/* НЕ ЗНАЙШОВ stroke ПРОСТО ПОКЛАВ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11 */}
                  <TdSmall>
                    {data?.stroke && data.stroke.toString() === 'true'
                      ? 'Да'
                      : '-'}
                  </TdSmall>
                </Tr>
                <Tr>
                  <TdSmall>Гемморагический</TdSmall>
                  <TdSmall>
                    {data?.hemorrhages && data.hemorrhages.toString() === 'true'
                      ? 'Да'
                      : '-'}
                  </TdSmall>
                </Tr>
                <Tr>
                  <TdSmall>САК</TdSmall>
                  <TdSmall>
                    {data?.SACStroke && data.SACStroke.toString() === 'true'
                      ? 'Да'
                      : '-'}
                  </TdSmall>
                </Tr>
                <TrRed
                  $props={
                    data?.ischemicStroke &&
                    data.ischemicStroke.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  <TdSmall>Ишемический инсульт</TdSmall>
                  <TdSmall>
                    {data?.ischemicStroke &&
                    data.ischemicStroke.toString() === 'true'
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
                  <Td>{data?.medicalStaffFullName}</Td>
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
                  value={inputData.clinic || ''}
                  // value={inputData.clinic}
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
                      value={inputData.hospitalizationTime || ''}
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
                      value={inputData.hospitalizationDate || ''}
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
