import React, { useState, useEffect } from 'react';
import { fetchData } from 'services/APIservice';
import { PaginationBlock } from 'helpers/Pagination/Pagination';
import { getFromStorage } from 'services/localStorService';
import { onLoading, onLoaded } from 'helpers/Loader/Loader';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import {
  BtnFilter,
  BtnWrapper,
  ClearFiltersBtn,
  DownloadExcel,
  Link,
  Table,
  TableData,
  TableFilter,
  TableHead,
  TableRow,
} from './ArchiveTable.styled';

import { ReactComponent as Close } from 'images/svg/close.svg';
import { ReactComponent as Excel } from 'images/svg/excel.svg';
import { ReactComponent as Filter } from 'images/svg/filter.svg';

import archive from 'data/archive.json';

export const ArchiveTable = () => {
  const [checklists, setChecklists] = useState(archive);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //   useEffect(() => {
  //     (async function getData() {
  //       setIsLoading(true);
  //       try {
  //         const { data } = await fetchData('/checklists');
  //         setChecklists(data);
  //         if (!data) {
  //           return onFetchError('Whoops, something went wrong');
  //         }
  //       } catch (error) {
  //         setError(error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     })();
  //   }, []);

  const [filterChecklists, setFilterChecklists] = useState(archive);
  const [filterChecklist, setFilterChecklist] = useState('');
  const [filterBrigadeSMP, setFilterBrigadeSMP] = useState('');
  const [filterPatientINN, setFilterPatientINN] = useState('');
  const [filterPatientFIO, setFilterPatientFIO] = useState('');
  const [filterHospital, setFilterHospital] = useState('');
  const [filterEmployeeID, setFilterEmployeeID] = useState('');
  const [filterStatusChecklist, setFilterStatusChecklist] = useState('');
  const [filterDateStartChecklist, setFilterDateStartChecklist] = useState('');
  const [filterDurationOfHospitalization, setFilterDurationOfHospitalization] =
    useState('');

  const handleChangeFilter = e => {
    e.preventDefault();
    switch (e.currentTarget.name) {
      case 'filterChecklist':
        setFilterChecklist(e.currentTarget.value);
        break;
      case 'filterBrigadeSMP':
        setFilterBrigadeSMP(e.currentTarget.value);
        break;
      case 'filterPatientINN':
        setFilterPatientINN(e.currentTarget.value);
        break;
      case 'filterPatientFIO':
        setFilterPatientFIO(e.currentTarget.value);
        break;
      case 'filterHospital':
        setFilterHospital(e.currentTarget.value);
        break;
      case 'filterEmployeeID':
        setFilterEmployeeID(e.currentTarget.value);
        break;
      case 'filterStatusChecklist':
        setFilterStatusChecklist(e.currentTarget.value);
        break;
      case 'filterDateStartChecklist':
        setFilterDateStartChecklist(e.currentTarget.value);
        break;
      case 'filterDurationOfHospitalization':
        setFilterDurationOfHospitalization(e.currentTarget.value);
        break;
      default:
        break;
    }
  };

  const startFilterChecklists = e => {
    e.preventDefault();
    const peremOfFilter = [];
    checklists.map(item => {
      if (
        item.Checklist.toString().toLowerCase().includes(filterChecklist) &&
        item.BrigadeSMP.toString().toLowerCase().includes(filterBrigadeSMP) &&
        item.PatientINN.toString().toLowerCase().includes(filterPatientINN) &&
        item.PatientFIO.toString().toLowerCase().includes(filterPatientFIO) &&
        item.Hospital.toString().toLowerCase().includes(filterHospital) &&
        item.EmployeeID.toString().includes(filterEmployeeID) &&
        item.StatusChecklist.join(',')
          .toString()
          .toLowerCase()
          .includes(filterStatusChecklist) &&
        item.DateStartChecklist.join(',')
          .toString()
          .toLowerCase()
          .includes(filterDateStartChecklist) &&
        item.DurationOfHospitalization.toString()
          .toLowerCase()
          .includes(filterDurationOfHospitalization)
      ) {
        peremOfFilter.push(item);
      }
    });

    setFilterChecklists(peremOfFilter);
  };

  //   const cleanFilterChecklists = e => {
  //     e.preventDefault();
  //     let filterCl = '';
  //     let filterBr = '';
  //     let filterPInn = '';
  //     let filterPFio = '';
  //     let filterH = '';
  //     let filterEm = '';
  //     let filterSC = '';
  //     let filterSDC = '';
  //     let filterDu = '';

  //     e.currentTarget.name === 'clearFilterChecklist'
  //       ? setFilterChecklist(filterCl)
  //       : (filterCl = filterChecklist);
  //     e.currentTarget.name === 'clearFilterBrigadeSMP'
  //       ? setFilterBrigadeSMP(filterBr)
  //       : (filterBr = filterBrigadeSMP);
  //     e.currentTarget.name === 'clearFilterPatientINN'
  //       ? setFilterPatientINN(filterPInn)
  //       : (filterPInn = filterPatientINN);
  //     e.currentTarget.name === 'clearFilterPatientFIO'
  //       ? setFilterPatientFIO(filterPFio)
  //       : (filterPFio = filterPatientFIO);
  //     e.currentTarget.name === 'clearFilterHospital'
  //       ? setFilterHospital(filterH)
  //       : (filterH = filterHospital);
  //     e.currentTarget.name === 'clearFilterEmployeeID'
  //       ? setFilterEmployeeID(filterEm)
  //       : (filterEm = filterEmployeeID);
  //     e.currentTarget.name === 'clearFilterStatusChecklist'
  //       ? setFilterStatusChecklist(filterSC)
  //       : (filterSC = filterStatusChecklist);
  //     e.currentTarget.name === 'clearFilterDateStartChecklist'
  //       ? setFilterDateStartChecklist(filterSDC)
  //       : (filterSDC = filterDateStartChecklist);
  //     e.currentTarget.name === 'clearFilterDurationOfHospitalization'
  //       ? setFilterDurationOfHospitalization(filterDu)
  //       : (filterDu = filterDurationOfHospitalization);

  //     const peremOfFilter = [];
  //     checklists.map(item => {
  //       if (
  //         item.checklist?.toString().toLowerCase().includes(filterCl) &&
  //         item.brigadeSMP?.toString().toLowerCase().includes(filterBr) &&
  //         item.patientINN?.toString().toLowerCase().includes(filterPInn) &&
  //         item.patientFIO?.toString().toLowerCase().includes(filterPFio) &&
  //         item.hospital?.toString().toLowerCase().includes(filterH) &&
  //         item.employeeID?.toString().toLowerCase().includes(filterEm) &&
  //         item.statusChecklist?.toString().toLowerCase().includes(filterSC) &&
  //         item.dateStartChecklist?.toString().toLowerCase().includes(filterSDC) &&
  //         item.durationOfHospitalization
  //           ?.toString()
  //           .toLowerCase()
  //           .includes(filterDu)
  //       ) {
  //         peremOfFilter.push(item);
  //       }
  //       return peremOfFilter;
  //     });

  //     setFilterChecklists(peremOfFilter);
  //   };

  const clearAllFilters = () => {
    // reload === true ? dispatch(addReload(false)) : dispatch(addReload(true));
    setFilterChecklist('');
    setFilterBrigadeSMP('');
    setFilterPatientINN('');
    setFilterPatientFIO('');
    setFilterHospital('');
    setFilterEmployeeID('');
    setFilterStatusChecklist('');
    setFilterDateStartChecklist('');
    setFilterDurationOfHospitalization('');
  };

  const handleSearchOnEnter = e => {
    if (e.key === 'Enter') {
      setChecklists(e);
    }
  };

  const toggleFilterItem = e => {
    e.stopPropagation();
    document
      .querySelector(`input[name='${e.currentTarget.id}']`)
      .classList.toggle('active');
    console.log(
      'e.currentTarget.id:',
      document.querySelector(`input[name='${e.currentTarget.id}']`).classList
    );
  };

  // table pagination
  const [perPage] = useState(20);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(
    getFromStorage('page') ? getFromStorage('page') : 1
  );

  return (
    <>
      <BtnWrapper>
        <ClearFiltersBtn
          type="button"
          id="filters"
          name="clearFilters"
          aria-label="Сбросить фильтры"
          onClick={e => {
            clearAllFilters(e);
          }}
        >
          <Close /> <span>Сбросить фильтры</span>
        </ClearFiltersBtn>
        <DownloadExcel type="button" aria-label="Скачать в excel">
          <Excel /> <span>Скачать в excel</span>
        </DownloadExcel>
      </BtnWrapper>
      {isLoading ? onLoading() : onLoaded()}
      {error && onFetchError('Whoops, something went wrong')}
      {checklists.length > 0 && !error && (
        <Table>
          <TableFilter>
            <TableRow>
              <TableHead>
                <span>Чек-лист</span>
                <input
                  type="text"
                  name="filterChecklist"
                  placeholder=""
                  value={filterChecklist}
                  onClick={e => startFilterChecklists(e)}
                  onKeyDown={e => handleSearchOnEnter(e)}
                  onChange={e => handleChangeFilter(e)}
                />
                <BtnFilter
                  type="button"
                  id="filterChecklist"
                  onClick={e => {
                    toggleFilterItem(e);
                  }}
                >
                  <Filter />
                </BtnFilter>
              </TableHead>
              <TableHead>
                <span>
                  № Бригады <br />
                  СМП
                </span>
                <input
                  type="text"
                  name="filterBrigadeSMP"
                  placeholder=""
                  value={filterBrigadeSMP}
                  onKeyDown={e => handleSearchOnEnter(e)}
                  onChange={e => handleChangeFilter(e)}
                />
                <BtnFilter
                  type="button"
                  id="filterBrigadeSMP"
                  onClick={e => startFilterChecklists(e)}
                >
                  <Filter />
                </BtnFilter>
              </TableHead>
              <TableHead>
                <span>
                  ИИН <br />
                  пациента
                </span>
                <input
                  type="number"
                  name="filterPatientINN"
                  placeholder=""
                  value={filterPatientINN}
                  onKeyDown={e => handleSearchOnEnter(e)}
                  onChange={e => handleChangeFilter(e)}
                />
                <BtnFilter
                  type="button"
                  id="filterPatientINN"
                  onClick={e => startFilterChecklists(e)}
                >
                  <Filter />
                </BtnFilter>
              </TableHead>
              <TableHead>
                <span>
                  ФИО <br />
                  пациента
                </span>
                <input
                  type="text"
                  name="filterPatientFIO"
                  placeholder=""
                  value={filterPatientFIO}
                  onKeyDown={e => handleSearchOnEnter(e)}
                  onChange={e => handleChangeFilter(e)}
                />
                <BtnFilter
                  type="button"
                  id="filterPatientFIO"
                  onClick={e => startFilterChecklists(e)}
                >
                  <Filter />
                </BtnFilter>
              </TableHead>
              <TableHead>
                <span>
                  Поликлиника <br />
                  прикрепления
                </span>
                <input
                  type="text"
                  name="filterHospital"
                  placeholder=""
                  value={filterHospital}
                  onKeyDown={e => handleSearchOnEnter(e)}
                  onChange={e => handleChangeFilter(e)}
                />
                <BtnFilter
                  type="button"
                  id="filterHospital"
                  onClick={e => startFilterChecklists(e)}
                >
                  <Filter />
                </BtnFilter>
              </TableHead>
              <TableHead>
                <span>
                  Идентификатор <br />
                  сотрудника
                </span>
                <input
                  type="number"
                  name="filterEmployeeID"
                  placeholder=""
                  value={filterEmployeeID}
                  onKeyDown={e => handleSearchOnEnter(e)}
                  onChange={e => handleChangeFilter(e)}
                />
                <BtnFilter
                  type="button"
                  id="filterEmployeeID"
                  onClick={e => startFilterChecklists(e)}
                >
                  <Filter />
                </BtnFilter>
              </TableHead>
              <TableHead>
                <span>
                  Статус <br />
                  чек-листа
                </span>
                <input
                  type="text"
                  name="filterStatusChecklist"
                  placeholder=""
                  value={filterStatusChecklist}
                  onKeyDown={e => handleSearchOnEnter(e)}
                  onChange={e => handleChangeFilter(e)}
                />
                <BtnFilter
                  type="button"
                  id="filterStatusChecklist"
                  onClick={e => startFilterChecklists(e)}
                >
                  <Filter />
                </BtnFilter>
              </TableHead>
              <TableHead>
                <span>
                  Дата и время начала <br />
                  чек-листа
                </span>
                <input
                  type="text"
                  name="filterDateStartChecklist"
                  placeholder=""
                  value={filterDateStartChecklist}
                  onKeyDown={e => handleSearchOnEnter(e)}
                  onChange={e => handleChangeFilter(e)}
                />
                <BtnFilter
                  type="button"
                  id="filterDateStartChecklist"
                  onClick={e => startFilterChecklists(e)}
                >
                  <Filter />
                </BtnFilter>
              </TableHead>
              <TableHead>
                <span>
                  Время от времени до <br />
                  госпитализации <br />
                  (от двери до иглы)
                </span>
                <input
                  type="text"
                  name="filterDurationOfHospitalization"
                  placeholder=""
                  value={filterDurationOfHospitalization}
                  onKeyDown={e => handleSearchOnEnter(e)}
                  onChange={e => handleChangeFilter(e)}
                />
                <BtnFilter
                  type="button"
                  id="filterDurationOfHospitalization"
                  onClick={e => startFilterChecklists(e)}
                >
                  <Filter />
                </BtnFilter>
              </TableHead>
            </TableRow>
          </TableFilter>
          <tbody>
            {/* <TableRow>
              <TableHead>Чек-лист</TableHead>
              <TableHead>
                № Бригады <br />
                СМП
              </TableHead>
              <TableHead>
                ИИН <br />
                пациента
              </TableHead>
              <TableHead>
                ФИО <br />
                пациента
              </TableHead>
              <TableHead>
                Поликлиника <br />
                прикрепления
              </TableHead>
              <TableHead>
                Идентификатор <br />
                сотрудника
              </TableHead>
              <TableHead>
                Статус <br />
                чек-листа
              </TableHead>
              <TableHead>
                Дата и время начала <br />
                чек-листа
              </TableHead>
              <TableHead>
                Время от времени до <br />
                госпитализации <br />
                (от двери до иглы)
              </TableHead>
            </TableRow> */}
            {filterChecklists.length > 0 &&
              !error &&
              filterChecklists
                .slice((current - 1) * size, current * size)
                .map(checklist => (
                  <TableRow key={checklist._id}>
                    <TableData>
                      <Link to={`/archive/${checklist._id}`}>
                        № {checklist.numberChecklist} от{' '}
                        {new Date(checklist.dateChecklist).toLocaleDateString()}
                      </Link>
                    </TableData>
                    <TableData>№ {checklist.brigadeSMP}</TableData>
                    <TableData>{checklist.patientINN}</TableData>
                    <TableData>{checklist.patientFIO}</TableData>
                    <TableData>{checklist.hospital}</TableData>
                    <TableData>{checklist.employeeID}</TableData>
                    <TableData>{checklist.statusChecklist}</TableData>
                    <TableData>
                      {new Date(
                        checklist.dateStartChecklist
                      ).toLocaleDateString()}
                      <br />
                      {checklist.timeStartChecklist}
                    </TableData>
                    <TableData>{checklist.durationOfHospitalization}</TableData>
                  </TableRow>
                ))}
          </tbody>
        </Table>
      )}
      <PaginationBlock
        items={filterChecklists}
        size={size}
        setSize={setSize}
        current={current}
        setCurrent={setCurrent}
      />
    </>
  );
};
