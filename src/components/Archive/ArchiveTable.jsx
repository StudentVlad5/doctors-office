import React, { useState, useEffect } from 'react';
import { fetchData } from 'services/APIservice';
import { PaginationBlock } from 'helpers/Pagination/Pagination';
import {
  getFromStorage,
  removeItem,
  saveToStorage,
} from 'services/localStorService';
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

const initialState = {
  filterChecklist: '',
  filterBrigadeSMP: '',
  filterPatientINN: '',
  filterPatientFIO: '',
  filterHospital: '',
  filterEmployeeID: '',
  filterStatusChecklist: '',
  filterDateStartChecklist: '',
  filterDurationOfHospitalization: '',
};

export const ArchiveTable = () => {
  const [checklists, setChecklists] = useState([]);
  const [filterChecklists, setFilterChecklists] = useState([]);
  const [filters, setFilters] = useState(
    getFromStorage('filters') ? getFromStorage('filters') : initialState
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    (async function getData() {
      setIsLoading(true);
      try {
        // const { data } = await fetchData('*');
        // if (!data) {
        //   return onFetchError('Whoops, something went wrong');
        // }
        // setChecklists(data);
        // setFilterChecklists(data);
        const sortedChecklists = [...archive].sort(
          (a, b) => b.dateStartChecklist - a.dateStartChecklist
        );
        setChecklists(sortedChecklists);
        setFilterChecklists(sortedChecklists);
        saveToStorage('filters', filters);
        // getActiveInput();
      } catch (error) {
        setError(error);
        console.log('getData ~ error:', error);
      } finally {
        setIsLoading(false);
        setReload(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, filters]);

  // get selected filter elements after refresh
  const handleActiveInput = key => {
    const filtersFromLS = getFromStorage('filters');
    const selectedFilters = filtersFromLS[key];
    if (selectedFilters) {
      selectedFilters.forEach(item => {
        const inputs = document.querySelectorAll(`input[name="${item}"]`);
        inputs?.forEach(input => input.classList.add('active'));
      });
    }
  };

  const getActiveInput = () => {
    initialState.forEach(filter => handleActiveInput(filter));
  };

  //get archive checklists
  function getWeekNumber(date) {
    if (new Date(date).getDay() === 0) {
      const startOfYear = new Date(date.getFullYear(), 0, 1);
      const startOfWeek = new Date(
        startOfYear.setDate(startOfYear.getDate() - startOfYear.getDay())
      );

      const diffInTime = date.getTime() - startOfWeek.getTime();
      const diffInWeeks = Math.floor(diffInTime / (1000 * 3600 * 24 * 7));

      return diffInWeeks;
    }

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
            today.getDay() >= new Date(dateStartChecklist).getDay()
        );
        setChecklists(archiveChecklists);
        setFilterChecklists(archiveChecklists);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
        setReload(false);
        setTimeout(() => getData(), 60000);
      }
    })();
  }, [reload]);

  const handleChangeFilter = e => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    const selectedFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(selectedFilters);
    saveToStorage('filters', selectedFilters);
    document.querySelector(`button[id='${name}']`).classList.toggle('active');
    // startFilterChecklists(e);
  };

  const startFilterChecklists = e => {
    e.preventDefault();
    const peremOfFilter = [];
    checklists.map(item => {
      if (
        item.numberChecklist
          .toString()
          .toLowerCase()
          .includes(filters['filterChecklist']) &&
        // item.dateChecklist
        //   .toString()
        //   .toLowerCase()
        //   .includes(filters['filterChecklist']) &&
        item.brigadeSMP
          .toString()
          .toLowerCase()
          .includes(filters['filterBrigadeSMP']) &&
        item.patientINN
          .toString()
          .toLowerCase()
          .includes(filters['filterPatientINN']) &&
        item.patientFIO
          .toString()
          .toLowerCase()
          .includes(filters['filterPatientFIO']) &&
        item.hospital
          .toString()
          .toLowerCase()
          .includes(filters['filterHospital']) &&
        item.employeeID
          .toString()
          .toLowerCase()
          .includes(filters['filterEmployeeID']) &&
        item.statusChecklist
          .toString()
          .toLowerCase()
          .includes(filters['filterStatusChecklist']) &&
        item.dateStartChecklist
          .toString()
          .toLowerCase()
          .includes(filters['filterDateStartChecklist']) &&
        // item.timeStartChecklist
        //   .toString()
        //   .toLowerCase()
        //   .includes(filters['filterDateStartChecklist']) &&
        item.durationOfHospitalization
          .toString()
          .toLowerCase()
          .includes(filters['filterDurationOfHospitalization'])
      ) {
        peremOfFilter.push(item);
      }
    });

    setFilterChecklists(peremOfFilter);
  };

  const handleClearAllFilters = e => {
    setFilters(initialState);
    const listOfInput = document.querySelectorAll('.active');
    listOfInput.forEach(item => item.classList.remove('active'));
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
            handleClearAllFilters(e);
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
                value={filters['filterChecklist']}
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
                value={filters['filterBrigadeSMP']}
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
                value={filters['filterPatientINN']}
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
                value={filters['filterPatientFIO']}
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
                value={filters['filterHospital']}
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
                value={filters['filterEmployeeID']}
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
                value={filters['filterStatusChecklist']}
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
                value={filters['filterDateStartChecklist']}
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
                value={filters['filterDurationOfHospitalization']}
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
