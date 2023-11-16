import { Link } from 'react-router-dom';
import {
    ActiveListItemsSection, ActiveListItemsContainer, ControlContainer, TotalItems, ButtonToArhiveList, ButtonLogOut, BtnContainer, ItemsContainer, ControlPanelContainer, Title, ItemContainer, ItemInfo, ItemStatistic, ItemBtn, ItemCircle, ItemLine
  } from './ActiveListItems.styled';
import { removeItem } from 'services/localStorService';
import { theme } from 'components/baseStyles/Variables.styled';

  const data = [
    {info: "Чек-лист №5 от 31/03/2023 Бригада №01/04 Время прибытия в больницу -- : -- Номер телефона: 8 705 123 45 67", 
    status: 1,
    id: 1},
    {info: "Чек-лист №4 от 31/03/2023 Бригада №02/12 Время прибытия в больницу 16 : 35 Номер телефона: 8 705 123 45 67", 
    status: 3,
    id: 2},
    {info: "Чек-лист №3 от 31/03/2023 Бригада №03/15 Время прибытия в больницу 15 : 35 Номер телефона: 8 705 123 45 67", 
    status: 5,
    id: 3},
];
  
  export const ActiveListItems = () => {
    return (
      <ActiveListItemsSection>
        <ActiveListItemsContainer>
            <ControlContainer>
                <ControlPanelContainer>
                    <TotalItems>
                    <span style={{whiteSpace:"nowrap"}}>Текущих чек-листов:&nbsp;{data?.length}</span>
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
                {(data === undefined || data?.length === 0) && <Title>Ожидаем заполнения чек-листов</Title>}
                {data && data?.length > 0 && 
                data.map(item=><ItemContainer key={item.id}>
                    <ItemInfo>{item.info}
                    <ItemBtn type="button" aria-label="Подробнее" data-info={item.id}>Подробнее</ItemBtn></ItemInfo>
                    <ItemStatistic>
                        <ItemCircle $color={item.status >= 1 ? theme.colors.darkGreen : theme.colors.white}></ItemCircle>
                        <ItemLine $color={item.status >= 1 ? theme.colors.linesBlue : theme.colors.darkGrey}></ItemLine>
                        <ItemCircle $color={item.status >= 2 ? theme.colors.darkGreen : theme.colors.white}></ItemCircle>
                        <ItemLine $color={item.status >= 2 ? theme.colors.linesBlue : theme.colors.darkGrey}></ItemLine>
                        <ItemCircle $color={item.status >= 3 ? theme.colors.darkGreen : theme.colors.white}></ItemCircle>
                        <ItemLine $color={item.status >= 3 ? theme.colors.linesBlue : theme.colors.darkGrey}></ItemLine>
                        <ItemCircle $color={item.status >= 4 ? theme.colors.darkGreen : theme.colors.white}></ItemCircle>
                        <ItemLine $color={item.status >= 4 ? theme.colors.linesBlue : theme.colors.darkGrey}></ItemLine>
                        <ItemCircle $color={item.status >= 5 ? theme.colors.darkGreen : theme.colors.white}></ItemCircle>
                    </ItemStatistic>
                </ItemContainer>)}
            </ItemsContainer>
        </ActiveListItemsContainer>
      </ActiveListItemsSection>
    );
  };