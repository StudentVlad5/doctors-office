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

// import { MdFilterList } from 'react-icons/md';
import { ReactComponent as Close } from 'images/svg/close.svg';
import { ReactComponent as Excel } from 'images/svg/excel.svg';
import { ReactComponent as Filter } from 'images/svg/filter.svg';

import archive from 'data/archive.json';

export const ArchiveTable = () => {
  const [checklists, setChecklists] = useState(archive);
  console.log('ArchiveTable ~ checklists:', checklists);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData('/checklists');
        setChecklists(data);
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const [filterChecklists, setFilterChecklists] = useState(archive);
  console.log('ArchiveTable ~ filterChecklists:', filterChecklists);
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
    // eslint-disable-next-line array-callback-return
    checklists.map(item => {
      if (
        item.numberChecklist
          .toString()
          .toLowerCase()
          .includes(filterChecklist) &&
        item.dateChecklist.toString().toLowerCase().includes(filterChecklist) &&
        item.brigadeSMP.toString().toLowerCase().includes(filterBrigadeSMP) &&
        item.patientINN.toString().toLowerCase().includes(filterPatientINN) &&
        item.patientFIO.toString().toLowerCase().includes(filterPatientFIO) &&
        item.hospital.toString().toLowerCase().includes(filterHospital) &&
        item.employeeID.toString().includes(filterEmployeeID) &&
        item.statusChecklist
          .toString()
          .toLowerCase()
          .includes(filterStatusChecklist) &&
        item.dateStartChecklist
          .toString()
          .toLowerCase()
          .includes(filterDateStartChecklist) &&
        item.timeStartChecklist
          .toString()
          .toLowerCase()
          .includes(filterDateStartChecklist) &&
        item.durationOfHospitalization
          .toString()
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
  //         item.numberChecklist?.toString().toLowerCase().includes(filterCl) &&
  //         item.dateChecklist?.toString().toLowerCase().includes(filterCl) &&
  //         item.brigadeSMP?.toString().toLowerCase().includes(filterBr) &&
  //         item.patientINN?.toString().toLowerCase().includes(filterPInn) &&
  //         item.patientFIO?.toString().toLowerCase().includes(filterPFio) &&
  //         item.hospital?.toString().toLowerCase().includes(filterH) &&
  //         item.employeeID?.toString().toLowerCase().includes(filterEm) &&
  //         item.statusChecklist?.toString().toLowerCase().includes(filterSC) &&
  //         item.dateStartChecklist?.toString().toLowerCase().includes(filterSDC) &&
  //         item.timeStartChecklist?.toString().toLowerCase().includes(filterSDC) &&
  //         item.durationOfHospitalization;
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
                // onSubmit={e => startFilterChecklists(e)}
                onKeyDown={e => handleSearchOnEnter(e)}
                onChange={e => {
                  handleChangeFilter(e);
                  startFilterChecklists(e);
                }}
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
                onSubmit={e => startFilterChecklists(e)}
                onKeyDown={e => handleSearchOnEnter(e)}
                onChange={e => handleChangeFilter(e)}
              />
              <BtnFilter
                type="button"
                id="filterBrigadeSMP"
                onClick={e => {
                  toggleFilterItem(e);
                }}
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
                onSubmit={e => startFilterChecklists(e)}
                onKeyDown={e => handleSearchOnEnter(e)}
                onChange={e => handleChangeFilter(e)}
              />
              <BtnFilter
                type="button"
                id="filterPatientINN"
                onClick={e => {
                  toggleFilterItem(e);
                }}
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
                onSubmit={e => startFilterChecklists(e)}
                onKeyDown={e => handleSearchOnEnter(e)}
                onChange={e => handleChangeFilter(e)}
              />
              <BtnFilter
                type="button"
                id="filterPatientFIO"
                onClick={e => {
                  toggleFilterItem(e);
                }}
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
                onSubmit={e => startFilterChecklists(e)}
                onKeyDown={e => handleSearchOnEnter(e)}
                onChange={e => handleChangeFilter(e)}
              />
              <BtnFilter
                type="button"
                id="filterHospital"
                onClick={e => {
                  toggleFilterItem(e);
                }}
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
                onSubmit={e => startFilterChecklists(e)}
                onKeyDown={e => handleSearchOnEnter(e)}
                onChange={e => handleChangeFilter(e)}
              />
              <BtnFilter
                type="button"
                id="filterEmployeeID"
                onClick={e => {
                  toggleFilterItem(e);
                }}
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
                onSubmit={e => startFilterChecklists(e)}
                onKeyDown={e => handleSearchOnEnter(e)}
                onChange={e => handleChangeFilter(e)}
              />
              <BtnFilter
                type="button"
                id="filterStatusChecklist"
                onClick={e => {
                  toggleFilterItem(e);
                }}
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
                onSubmit={e => startFilterChecklists(e)}
                onKeyDown={e => handleSearchOnEnter(e)}
                onChange={e => handleChangeFilter(e)}
              />
              <BtnFilter
                type="button"
                id="filterDateStartChecklist"
                onClick={e => {
                  toggleFilterItem(e);
                }}
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
                onSubmit={e => startFilterChecklists(e)}
                onKeyDown={e => handleSearchOnEnter(e)}
                onChange={e => handleChangeFilter(e)}
              />
              <BtnFilter
                type="button"
                id="filterDurationOfHospitalization"
                onClick={e => {
                  toggleFilterItem(e);
                }}
              >
                <Filter />
              </BtnFilter>
            </TableHead>
          </TableRow>
        </TableFilter>
        <tbody>
          {filterChecklists.length > 0 &&
            !error &&
            filterChecklists
              .slice((current - 1) * size, current * size)
              .map(checklist => (
                <TableRow key={checklist._id}>
                  <TableData>
                    <Link to={`/checklist/${checklist._id}`}>
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
