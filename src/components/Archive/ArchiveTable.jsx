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
import { FaFilter } from 'react-icons/fa';

import archive from 'data/archive.json';

export const ArchiveTable = () => {
  const [checklists, setChecklists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);

  const [filterChecklists, setFilterChecklists] = useState([]);
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

  //get archive checklists
  function getWeekNumber(date) {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const startOfWeek = new Date(
      startOfYear.setDate(startOfYear.getDate() - startOfYear.getDay())
    );

    const diffInTime = date.getTime() - startOfWeek.getTime();
    const diffInWeeks = Math.floor(diffInTime / (1000 * 3600 * 24 * 7));

    return diffInWeeks + 1; // Add 1 to account for the first week
  }

  useEffect(() => {
    (async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData('*');
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
        const today = new Date();
        const currentWeekNumber = getWeekNumber(today);
        const archiveChecklists = archive.filter(
          //uses the archive.json until the fetch is working
          ({ dateStartChecklist }) =>
            currentWeekNumber === getWeekNumber(new Date(dateStartChecklist)) &&
            today.getDate() >= new Date(dateStartChecklist).getDate()
        );
        setChecklists(archiveChecklists);
        setFilterChecklists(archiveChecklists);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
        setReload(false);
      }
    })();
  }, [reload]);

  const handleChangeFilter = e => {
    e.preventDefault();
    switch (e.currentTarget.name) {
      case 'filterChecklist':
        setFilterChecklist(e.currentTarget.value);
        document
          .querySelector(`button[id='filterChecklist']`)
          .classList.toggle('active');
        break;
      case 'filterBrigadeSMP':
        setFilterBrigadeSMP(e.currentTarget.value);
        document
          .querySelector(`button[id='filterBrigadeSMP']`)
          .classList.toggle('active');
        break;
      case 'filterPatientINN':
        setFilterPatientINN(e.currentTarget.value);
        document
          .querySelector(`button[id='filterPatientINN']`)
          .classList.toggle('active');
        break;
      case 'filterPatientFIO':
        setFilterPatientFIO(e.currentTarget.value);
        document
          .querySelector(`button[id='filterPatientFIO']`)
          .classList.toggle('active');
        break;
      case 'filterHospital':
        setFilterHospital(e.currentTarget.value);
        document
          .querySelector(`button[id='filterHospital']`)
          .classList.toggle('active');
        break;
      case 'filterEmployeeID':
        setFilterEmployeeID(e.currentTarget.value);
        document
          .querySelector(`button[id='filterEmployeeID']`)
          .classList.toggle('active');
        break;
      case 'filterStatusChecklist':
        setFilterStatusChecklist(e.currentTarget.value);
        document
          .querySelector(`button[id='filterStatusChecklist']`)
          .classList.toggle('active');
        break;
      case 'filterDateStartChecklist':
        setFilterDateStartChecklist(e.currentTarget.value);
        document
          .querySelector(`button[id='filterDateStartChecklist']`)
          .classList.toggle('active');
        break;
      case 'filterDurationOfHospitalization':
        setFilterDurationOfHospitalization(e.currentTarget.value);
        document
          .querySelector(`button[id='filterDurationOfHospitalization']`)
          .classList.toggle('active');
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
        item.numberChecklist
          .toString()
          .toLowerCase()
          .includes(filterChecklist) &&
        // item.dateChecklist.toString().toLowerCase().includes(filterChecklist) &&
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
        // item.timeStartChecklist
        //   .toString()
        //   .toLowerCase()
        //   .includes(filterDateStartChecklist) &&
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

  const clearAllFilters = () => {
    setReload(true);
    setFilterChecklist('');
    setFilterBrigadeSMP('');
    setFilterPatientINN('');
    setFilterPatientFIO('');
    setFilterHospital('');
    setFilterEmployeeID('');
    setFilterStatusChecklist('');
    setFilterDateStartChecklist('');
    setFilterDurationOfHospitalization('');
    document
      .querySelector(`button[id='filterChecklist']`)
      .classList.remove('active');
    document
      .querySelector(`input[name='filterChecklist']`)
      .classList.remove('active');
    document
      .querySelector(`button[id='filterBrigadeSMP']`)
      .classList.remove('active');
    document
      .querySelector(`input[name='filterBrigadeSMP']`)
      .classList.remove('active');
    document
      .querySelector(`button[id='filterPatientINN']`)
      .classList.remove('active');
    document
      .querySelector(`input[name='filterPatientINN']`)
      .classList.remove('active');
    document
      .querySelector(`button[id='filterPatientFIO']`)
      .classList.remove('active');
    document
      .querySelector(`input[name='filterPatientFIO']`)
      .classList.remove('active');
    document
      .querySelector(`button[id='filterHospital']`)
      .classList.remove('active');
    document
      .querySelector(`input[name='filterHospital']`)
      .classList.remove('active');
    document
      .querySelector(`button[id='filterEmployeeID']`)
      .classList.remove('active');
    document
      .querySelector(`input[name='filterEmployeeID']`)
      .classList.remove('active');
    document
      .querySelector(`button[id='filterStatusChecklist']`)
      .classList.remove('active');
    document
      .querySelector(`input[name='filterStatusChecklist']`)
      .classList.remove('active');
    document
      .querySelector(`button[id='filterDateStartChecklist']`)
      .classList.remove('active');
    document
      .querySelector(`input[name='filterDateStartChecklist']`)
      .classList.remove('active');
    document
      .querySelector(`button[id='filterDurationOfHospitalization']`)
      .classList.remove('active');
    document
      .querySelector(`input[name='filterDurationOfHospitalization']`)
      .classList.remove('active');
  };

  const handleSearchOnEnter = e => {
    if (e.key === 'Enter') {
      startFilterChecklists(e);
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
                <FaFilter />
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
                onClick={e => {
                  toggleFilterItem(e);
                }}
              >
                <FaFilter />
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
                onClick={e => {
                  toggleFilterItem(e);
                }}
              >
                <FaFilter />
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
                onClick={e => {
                  toggleFilterItem(e);
                }}
              >
                <FaFilter />
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
                onClick={e => {
                  toggleFilterItem(e);
                }}
              >
                <FaFilter />
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
                onClick={e => {
                  toggleFilterItem(e);
                }}
              >
                <FaFilter />
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
                onClick={e => {
                  toggleFilterItem(e);
                }}
              >
                <FaFilter />
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
                onClick={e => {
                  toggleFilterItem(e);
                }}
              >
                <FaFilter />
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
                onClick={e => {
                  toggleFilterItem(e);
                }}
              >
                <FaFilter />
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
      {filterChecklists.length > 0 && !error && (
        <PaginationBlock
          items={filterChecklists}
          size={size}
          setSize={setSize}
          current={current}
          setCurrent={setCurrent}
        />
      )}
    </>
  );
};
