import React, { useEffect } from 'react';
import { Container } from 'components/baseStyles/CommonStyle.styled';

import { ArchiveTable } from 'components/Archive/ArchiveTable';
import { Subtitle, Title } from 'components/Archive/Arhive.styled';

const ArchivePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <Container>
      <Title>Архив чек-листов</Title>
      <Subtitle>Фильтры и поиск</Subtitle>
      <ArchiveTable />
    </Container>
  );
};

export default ArchivePage;
