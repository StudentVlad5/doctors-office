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

  return (
    <ArchiveContainer>
      <Title>Архив чек-листов</Title>
      <Subtitle>Фильтры и поиск</Subtitle>
      <ArchiveTable />
    </ArchiveContainer>
  );
};

export default ArchivePage;
