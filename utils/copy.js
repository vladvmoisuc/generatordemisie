export const WORD_DOCUMENT = {
  RESIGNATION_LETTER: 'Demisie',
  SIGNATURE: 'Semnătură:',
  DATE: 'Data:',
  getDocumentName: (lastName, firstName) =>
    `Cerere demisie - ${lastName} ${firstName}.docx`,
  getHeader: (date) => `Numărul _____ din ${date}`,
  getTitle: (organization) => `Catre ${organization},`,
  getCopy: ({
    lastName,
    firstName,
    organization,
    seriesID,
    numberID,
    codeID,
    town,
    street,
    addresNumber,
    role,
    buildingNumber,
    apartmentNumber,
    county,
    lastDay,
  }) =>
    `Subsemnatul(a) ${lastName} ${firstName}, angajat/a al/a ${organization} în funcția de ${role}, posesor/oare al BI/CI seria ${seriesID}, nr. ${numberID}, CNP ${codeID} având domiciliul în loc. ${town}, str. ${street}, nr. ${addresNumber}, bl. ${buildingNumber}, ap. ${apartmentNumber}, jud. ${county}, vă înaintez prezenta cerere de demisie și vă solicit incetarea contractului individual de munca conform Art. 81, alin. (1) din Codul Muncii, ultima zi fiind în data de ${lastDay}.`,
  getName: (lastName, firstName) => `Nume și prenume: ${lastName} ${firstName}`,
};

export const PAGE = {
  TITLE: 'Generează-ți demisia online, completând formularul de mai jos',
  DESCRIPTION:
    'Completează formularul de mai jos cu datele din buletin și introdu numărul de zile de preaviz pe care le ai în contract. Ultima zi de lucru îți va fi calculată automat pe baza formulei: data de azi + numărul de zile de preaviz(avem noi grijă să eliminăm weekend-urile și zile libere naționale, ca să nu calculezi tu).',
  PRINT: 'Printează',
  DOWNLOAD_WORD: 'Descarcă Word',
  MADE_BY: 'Creat de către',
  AUTHOR: 'Vlad Moisuc',
  LINKEDIN_PROFILE: 'https://www.linkedin.com/in/vladmoisuc/',
};
