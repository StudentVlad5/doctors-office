import { Link } from 'react-router-dom';
import moment from 'moment';
import {
    ActiveListItemsSection, ActiveListItemsContainer, ControlContainer, TotalItems, ButtonToArhiveList, ButtonLogOut, BtnContainer, ItemsContainer, ControlPanelContainer, Title, ItemContainer, ItemInfo, ItemStatistic, ItemBtn, ItemCircle, ItemLine
  } from './ActiveListItems.styled';
import { removeItem } from 'services/localStorService';
import { theme } from 'components/baseStyles/Variables.styled';
import { useEffect, useState } from 'react';
import { fetchData } from 'services/APIservice';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { onLoaded, onLoading } from 'helpers/Loader/Loader';

  export const ActiveListItems = () => {
    const [checklists, setChecklists] = useState([]);
    const [uniqueChecklists, setUniqueChecklists] = useState([]);
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
          const uniqueIdentifier = [];
          const uniqueChecklists = [];
          data.normal.forEach(element => {
            const isDuplicate = uniqueIdentifier.includes(element.identifier);
            if (!isDuplicate) {
              uniqueIdentifier.push(element.identifier);
            }
          });
          uniqueIdentifier.sort(function (a, b) {return b - a});
          uniqueIdentifier.map(it=> uniqueChecklists.push(data.normal.find(element=> element.identifier === it)));
          setUniqueChecklists(uniqueChecklists);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
          setTimeout(()=>getData(), 60000)
        }
      })();
    }, []);

    return (
      <ActiveListItemsSection>
        <ActiveListItemsContainer>
            <ControlContainer>
                <ControlPanelContainer>
                    <TotalItems>
                    <span style={{whiteSpace:"nowrap"}}>Текущих чек-листов:&nbsp;{uniqueChecklists?.length}</span>
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
                {uniqueChecklists && uniqueChecklists?.length > 0 && 
                uniqueChecklists.map((item)=>(item?.identifier !== undefined && item?.identifier !== '') && <ItemContainer key={item?.identifier} data-info={item?.identifier}>
                    <ItemInfo>
                      Чек-лист №{item?.identifier} от {moment(new Date(+item?.identifier)).format("DD/MM/YYYY")} Бригада №{item?.application_number} Время прибытия в больницу {item?.deliveryTimeHh} : {item?.deliveryTimeMm} Номер телефона: {item?.numberPhone}
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
                          item?.stroke !== '' 
                        ) ? theme.colors.darkGreen : theme.colors.white}></ItemCircle>
                        <ItemLine $color={(
                          item?.intracranialHemorrhages !== '' ||
                          item?.majorSurgeriesOrSevereInjuries !== '' ||
                          item?.surgicalInterventions !== '' ||
                          item?.myocardialInfarction !== '' ||
                          item?.stroke !== ''
                        ) ? theme.colors.linesBlue : theme.colors.darkGrey}></ItemLine>
                        <ItemCircle $color={(
                          item?.hemorrhages !== '' ||
                          item?.SACStroke !== '' ||
                          item?.ischemicStroke !== '' ||
                          item?.arterialPuncture !== '' ||
                          item?.smallOperations !== '' ||
                          item?.cardiovascularDiseases !== '' ||
                          item?.acuteInfectiousDisease !== '' ||
                          item?.hemorrhagicStroke !== '' ||
                          item?.convulsions !== ''                      
                        ) ? theme.colors.darkGreen : theme.colors.white}></ItemCircle>
                    </ItemStatistic>
                </ItemContainer>)}
            </ItemsContainer>
        </ActiveListItemsContainer>
      </ActiveListItemsSection>
    );
  };