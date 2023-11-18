import React, { useEffect } from 'react';
import { ArchiveTable } from 'components/Archive/ArchiveTable';
import {
  ArchiveContainer,
  Subtitle,
  Title,
} from 'components/Archive/Archive.styled';

const ArchivePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  // const handleClick = e => {
  //   const listOfInput = document.querySelectorAll('.active');
  //   listOfInput.forEach(item => item.classList.remove('active'));
  // };

  return (
    <ArchiveContainer
    // onClick={e => {
    //   if (e.currentTarget === e.target) handleClick(e);
    // }}
    >
      <Title>Архив чек-листов</Title>
      <Subtitle>Фильтры и поиск</Subtitle>
      <ArchiveTable />
    </ArchiveContainer>
  );
};

export default ArchivePage;
