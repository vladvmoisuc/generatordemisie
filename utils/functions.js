import moment from 'moment';
import {
  Document,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  Header,
  Footer,
  AlignmentType,
  TextRun,
  WidthType,
} from 'docx';

import { WEEK_DAYS, FONTS, BORDERS } from './constants';
import { WORD_DOCUMENT } from './copy';

export const getDate = (date = new Date()) => {
  return date.toLocaleString('ro').split(',')[0];
};

const getHolidays = (year = new Date().getFullYear()) => {
  const DATE_FORMAT_DASH = 'DD-MM-YYYY';
  const DATE_FORMAT_SLASH = 'DD/MM/YYYY';
  const getOrthodoxEasterDay = (year) => {
    const a = year % 4;
    const b = year % 7;
    const c = year % 19;
    const d = (19 * c + 15) % 30;
    const e = (2 * a + 4 * b - d + 34) % 7;
    const orthodoxEasterDay = moment(`04-04-${year}`, DATE_FORMAT_DASH)
      .add(d + e, 'days')
      .format(DATE_FORMAT_SLASH);
    return orthodoxEasterDay;
  };

  const easter = getOrthodoxEasterDay(year);
  const secondDayOfEaster = moment(easter, DATE_FORMAT_SLASH)
    .add(1, 'days')
    .format(DATE_FORMAT_SLASH);
  const theFriday = moment(easter, DATE_FORMAT_SLASH)
    .subtract(2, 'days')
    .format(DATE_FORMAT_SLASH);
  const secondWhitsuntide = moment(easter, DATE_FORMAT_SLASH)
    .add(50, 'days')
    .format(DATE_FORMAT_SLASH);
  const firstWhitsuntide = moment(secondWhitsuntide, DATE_FORMAT_SLASH)
    .subtract(1, 'days')
    .format(DATE_FORMAT_SLASH);

  const BANK_HOLIDAYS_JSON = [
    {
      name: 'Anul nou',
      date: `01/01/${year}`,
    },
    {
      name: 'Anul nou',
      date: `02/01/${year}`,
    },
    {
      name: 'Ziua Unirii Principatelor Române',
      date: `24/01/${year}`,
    },
    {
      name: 'Vinerea Mare',
      date: theFriday,
    },
    {
      name: 'Paște ortodox',
      date: easter,
    },
    {
      name: 'Paște ortodox',
      date: secondDayOfEaster,
    },
    {
      name: 'Ziua Muncii',
      date: `01/05/${year}`,
    },
    {
      name: 'Ziua Copilului',
      date: `01/06/${year}`,
    },
    {
      name: 'Rusalii',
      date: firstWhitsuntide,
    },
    {
      name: 'A doua zi de Rusalii',
      date: secondWhitsuntide,
    },
    {
      name: 'Adormirea Maicii Domnului',
      date: `15/08/${year}`,
    },
    {
      name: 'Sfântul Andrei',
      date: `30/11/${year}`,
    },
    {
      name: 'Ziua Națională a României',
      date: `01/12/${year}`,
    },
    {
      name: 'Crăciunul',
      date: `25/12/${year}`,
    },
    {
      name: 'Crăciunul',
      date: `26/12/${year}`,
    },
  ];

  return BANK_HOLIDAYS_JSON.map(({ date }) => {
    const [day, month, year] = date.split('/');

    return `${month}/${day}/${year}`;
  });
};

export const getLastDay = (noticeDays = 20) => {
  const holidays = getHolidays();
  let period = noticeDays;
  let lastDay = new Date();

  while (period > 0) {
    lastDay = new Date(lastDay.setDate(lastDay.getDate() + 1));

    const day = lastDay.getDay();

    if (
      day !== WEEK_DAYS.SUNDAY &&
      day !== WEEK_DAYS.SATURDAY &&
      !holidays.some((holiday) => {
        return getDate(new Date(holiday)) === getDate(lastDay);
      })
    ) {
      period--;
    }
  }

  return getDate(lastDay);
};

export const generateWord = ({
  organization,
  lastName,
  firstName,
  role,
  seriesID,
  numberID,
  codeID,
  town,
  street,
  county,
  addresNumber,
  buildingNumber,
  apartmentNumber,
  noticeDays,
  date,
}) =>
  new Document({
    sections: [
      {
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: WORD_DOCUMENT.getHeader(date),
                    font: FONTS.TIMES_NEW_ROMAN,
                    size: 24,
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: WORD_DOCUMENT.getTitle(organization),
                font: FONTS.TIMES_NEW_ROMAN,
                size: 32,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: {
              before: 4000,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: WORD_DOCUMENT.RESIGNATION_LETTER,
                font: FONTS.TIMES_NEW_ROMAN,
                size: 36,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: WORD_DOCUMENT.getCopy({
                  lastName,
                  firstName,
                  organization,
                  seriesID,
                  numberID,
                  codeID,
                  town,
                  role,
                  street,
                  addresNumber,
                  buildingNumber,
                  apartmentNumber,
                  county,
                  lastDay: getLastDay(noticeDays),
                }),
                font: FONTS.TIMES_NEW_ROMAN,
                size: 28,
              }),
            ],
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              before: 500,
            },
          }),
        ],
        footers: {
          default: new Footer({
            children: [
              new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        width: { size: 50, type: WidthType.PERCENTAGE },
                        borders: {
                          top: BORDERS.HIDDEN,
                          bottom: BORDERS.HIDDEN,
                          left: BORDERS.HIDDEN,
                          right: BORDERS.HIDDEN,
                        },
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: WORD_DOCUMENT.getName(
                                  lastName,
                                  firstName
                                ),
                                font: FONTS.TIMES_NEW_ROMAN,
                                size: 24,
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: WORD_DOCUMENT.SIGNATURE,
                                font: FONTS.TIMES_NEW_ROMAN,
                                size: 24,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: { size: 50, type: WidthType.PERCENTAGE },
                        borders: {
                          top: BORDERS.HIDDEN,
                          bottom: BORDERS.HIDDEN,
                          left: BORDERS.HIDDEN,
                          right: BORDERS.HIDDEN,
                        },
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.RIGHT,
                            children: [
                              new TextRun({
                                text: WORD_DOCUMENT.DATE,
                                font: FONTS.TIMES_NEW_ROMAN,
                                size: 24,
                              }),
                            ],
                          }),
                          new Paragraph({
                            alignment: AlignmentType.RIGHT,
                            children: [
                              new TextRun({
                                text: date,
                                font: FONTS.TIMES_NEW_ROMAN,
                                size: 24,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        },
      },
    ],
  });
