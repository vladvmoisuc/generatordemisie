import { useMemo } from 'react';

import { getLastDay } from '../../../utils/functions';

import './style.scss';

export default ({
  date = '',
  organization = '',
  lastName = '',
  firstName = '',
  role = '',
  seriesID = '',
  numberID = '',
  codeID = '',
  town = '',
  street = '',
  county = '',
  addresNumber = '',
  buildingNumber = '',
  apartmentNumber = '',
  noticeDays = '',
}) => {
  const name = `${lastName} ${firstName}`;
  const lastDay = useMemo(() => getLastDay(noticeDays), [noticeDays]);

  return (
    <div className="resignation">
      <span className="resignation__number">
        Numărul <mark>{''}</mark> din {date}
      </span>
      <h4 className="resignation__title">Catre {organization},</h4>
      <h3 className="resignation__subtitle">Demisie</h3>
      <p className="resignation__paragraph">
        Subsemnatul(a) <mark>{name}</mark>, angajat/a al/a{' '}
        <mark>{organization}</mark> în funcția de <mark>{role}</mark>,
        posesor/oare al BI/CI seria <mark>{seriesID}</mark>, nr.{' '}
        <mark>{numberID}</mark>, CNP <mark>{codeID}</mark> având domiciliul în
        loc. <mark>{town}</mark>, str. <mark>{street}</mark>, nr.{' '}
        <mark>{addresNumber}</mark>, bl. <mark>{buildingNumber}</mark> , ap.{' '}
        <mark>{apartmentNumber}</mark>, jud. <mark>{county}</mark>, vă înaintez
        prezenta cerere de demisie și vă solicit incetarea contractului
        individual de munca conform Art. 81, alin. (1) din Codul Muncii, ultima
        zi fiind în data de {lastDay}.
      </p>
      <div className="resignation__footer">
        <span className="resignation__name">
          Nume și prenume:
          <br /> {name} <br /> Semnătură:
        </span>
        <span className="resignation__date">
          Data: <br /> {date}
        </span>
      </div>
    </div>
  );
};
