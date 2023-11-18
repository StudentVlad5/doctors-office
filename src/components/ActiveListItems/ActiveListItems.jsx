import { Link } from 'react-router-dom';
import {
    ActiveListItemsSection, ActiveListItemsContainer, ControlContainer, TotalItems, ButtonToArhiveList, ButtonLogOut, BtnContainer, ItemsContainer, ControlPanelContainer, Title, ItemContainer, ItemInfo, ItemStatistic, ItemBtn, ItemCircle, ItemLine
  } from './ActiveListItems.styled';
import { removeItem } from 'services/localStorService';
import { theme } from 'components/baseStyles/Variables.styled';
import { useEffect, useState } from 'react';
import { fetchData } from 'services/APIservice';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { onLoaded, onLoading } from 'helpers/Loader/Loader';

//   const data = [
//     {info: "Чек-лист №5 от 31/03/2023 Бригада №01/04 Время прибытия в больницу -- : -- Номер телефона: 8 705 123 45 67", 
//     status: 1,
//     id: 1},
//     {info: "Чек-лист №4 от 31/03/2023 Бригада №02/12 Время прибытия в больницу 16 : 35 Номер телефона: 8 705 123 45 67", 
//     status: 3,
//     id: 2},
//     {info: "Чек-лист №3 от 31/03/2023 Бригада №03/15 Время прибытия в больницу 15 : 35 Номер телефона: 8 705 123 45 67", 
//     status: 5,
//     id: 3},
// ];
  
  export const ActiveListItems = () => {
    const [checklists, setChecklists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
      (async function getData() {
        setIsLoading(true);
        try {
          const { data } = await fetchData('*');
          if (!data) {
            return onFetchError('Whoops, something went wrong');
          }
          setChecklists(data.normal);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
          // setTimeout(()=>getData(), 60000)
        }
      })();
    }, []);

    return (
      <ActiveListItemsSection>
        <ActiveListItemsContainer>
            <ControlContainer>
                <ControlPanelContainer>
                    <TotalItems>
                    <span style={{whiteSpace:"nowrap"}}>Текущих чек-листов:&nbsp;{checklists?.length}</span>
                    </TotalItems>
                    <BtnContainer>
                        <Link style={{textDecoration:"none"}} to="/archive">
                            <ButtonToArhiveList type="button" aria-label="Перейти к списку архива чек-листов">Архив чек-листов</ButtonToArhiveList>
                        </Link>
                        <Link style={{textDecoration:"none"}} to="/">
                        <ButtonLogOut type="button" aria-label="Выход" onClick={()=>removeItem("authorization_id")}>Выход</ButtonLogOut>
                        </Link>
                    </BtnContainer>
                </ControlPanelContainer>
            </ControlContainer>
            <ItemsContainer>
                {isLoading ? onLoading() : onLoaded()}
                {error && onFetchError('Whoops, something went wrong')}
                {(checklists === undefined || checklists?.length === 0) && <Title>Ожидаем заполнения чек-листов</Title>}
                {checklists && checklists?.length > 0 && 
                checklists.map(item=><ItemContainer key={item.identifier} data-info={item.identifier}>
                    <ItemInfo>
                      {/* {item.info} */}
                      Чек-лист №5 от 31/03/2023 Бригада №01/04 Время прибытия в больницу -- : -- Номер телефона: 8 705 123 45 67
                      <Link style={{textDecoration:"none"}} to={`/checklist/${item.identifier}`}>
                      <ItemBtn type="button" aria-label="Подробнее">Подробнее</ItemBtn>
                      </Link>
                    </ItemInfo>
                    <ItemStatistic>
                        <ItemCircle $color={(
                          item?.patientFullName !== '' || 
                          item?.patientINN !== '' || 
                          item?.visualDescription !== ''                  
                          ) ? theme.colors.darkGreen : theme.colors.white}></ItemCircle>
                        <ItemLine $color={(
                          item?.patientFullName !== '' || 
                          item?.patientINN !== '' || 
                          item?.visualDescription !== ''  
                        )  ? theme.colors.linesBlue : theme.colors.darkGrey}></ItemLine>
                        <ItemCircle $color={(
                          item?.saggingFace !== '' || 
                          item?.handDisplacement !== '' || 
                          item?.speechDisorders !== '' || 
                          item?.firstSymptomsTimeHh !== '' || 
                          item?.firstSymptomsTimeMm !== ''
                        ) ? theme.colors.darkGreen : theme.colors.white}></ItemCircle>
                        <ItemLine $color={(
                          item?.saggingFace !== '' || 
                          item?.handDisplacement !== '' || 
                          item?.speechDisorders !== '' || 
                          item?.firstSymptomsTimeHh !== '' || 
                          item?.firstSymptomsTimeMm !== ''
                        ) ? theme.colors.linesBlue : theme.colors.darkGrey}></ItemLine>
                        <ItemCircle $color={(
                          item?.bloodSugarLevel !== '' ||
                          item?.bodyTemperature !== '' ||
                          item?.arterialPressureD  !== '' ||
                          item?.arterialPressureS !== '' ||
                          item?.patientBodyWeight !== '' ||
                          item?.patientAge !== ''
                        ) ? theme.colors.darkGreen : theme.colors.white}></ItemCircle>
                        <ItemLine $color={(
                          item?.bloodSugarLevel !== '' ||
                          item?.bodyTemperature !== '' ||
                          item?.arterialPressureD  !== '' ||
                          item?.arterialPressureS !== '' ||
                          item?.patientBodyWeight !== '' ||
                          item?.patientAge !== ''
                        ) ? theme.colors.linesBlue : theme.colors.darkGrey}></ItemLine>
                        <ItemCircle $color={(
                          item?.intracranialHemorrhages !== '' ||
                          item?.majorSurgeriesOrSevereInjuries !== '' ||
                          item?.surgicalInterventions !== '' ||
                          item?.myocardialInfarction !== '' ||
                          item?.stroke !== '' ||
                          item?.arterialPuncture !== '' ||
                          item?.smallOperations !== '' ||
                          item?.cardiovascularDiseases !== '' ||
                          item?.acuteInfectiousDisease !== '' ||
                          item?.hemorrhagicStroke !== '' ||
                          item?.convulsions !== ''
                        ) ? theme.colors.darkGreen : theme.colors.white}></ItemCircle>
                        <ItemLine $color={(
                          item?.intracranialHemorrhages !== '' ||
                          item?.majorSurgeriesOrSevereInjuries !== '' ||
                          item?.surgicalInterventions !== '' ||
                          item?.myocardialInfarction !== '' ||
                          item?.stroke !== '' ||
                          item?.arterialPuncture !== '' ||
                          item?.smallOperations !== '' ||
                          item?.cardiovascularDiseases !== '' ||
                          item?.acuteInfectiousDisease !== '' ||
                          item?.hemorrhagicStroke !== '' ||
                          item?.convulsions !== ''
                        ) ? theme.colors.linesBlue : theme.colors.darkGrey}></ItemLine>
                        <ItemCircle $color={(
                          item?.hemorrhages !== '' ||
                          item?.SACStroke !== '' ||
                          item?.ischemicStroke !== ''                       
                        ) ? theme.colors.darkGreen : theme.colors.white}></ItemCircle>
                    </ItemStatistic>
                </ItemContainer>)}
            </ItemsContainer>
        </ActiveListItemsContainer>
      </ActiveListItemsSection>
    );
  };