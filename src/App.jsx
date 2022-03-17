import { useState } from 'react';
import { Packer } from 'docx';
import { saveAs } from 'file-saver';

import Input from './components/Input';
import Resignation from './components/Resignation';

import { getDate, generateWord } from '../utils/functions';

import { FIELDS_MAPPER } from '../utils/constants';

import { PAGE, WORD_DOCUMENT } from '../utils/copy';

import './style.scss';

const TODAY_DATE = getDate();

const onGenerateWord = (data) => async () => {
  const { firstName, lastName } = data;
  const document = generateWord({ ...data, date: TODAY_DATE });

  const blob = await Packer.toBlob(document);

  saveAs(blob, WORD_DOCUMENT.getDocumentName(firstName, lastName));
};

const onPrint = () => {
  window.print();
};

function App() {
  const [form, setForm] = useState({
    organization: '',
    lastName: '',
    firstName: '',
    role: '',
    seriesID: '',
    numberID: '',
    codeID: '',
    town: '',
    street: '',
    county: '',
    addresNumber: '',
    buildingNumber: '',
    apartmentNumber: '',
    noticeDays: 20,
  });

  const onChange = (name, value) => {
    setForm({ ...form, [name]: value.toUpperCase() });
  };

  return (
    <>
      <main className="container">
        <section className="section">
          <h1 className="heading">{PAGE.TITLE}</h1>
          <p className="paragraph">{PAGE.DESCRIPTION}</p>
          <form className="form">
            {Object.keys(form).map((key) => (
              <Input
                key={key}
                value={form[key]}
                name={`${key}`}
                label={FIELDS_MAPPER[key]}
                onChange={onChange}
              />
            ))}
          </form>
          <div className="buttons">
            <button className="button" type="button" onClick={onPrint}>
              {PAGE.PRINT}
            </button>
            <button
              type="button"
              className="button"
              onClick={onGenerateWord(form)}
            >
              {PAGE.DOWNLOAD_WORD}
            </button>
          </div>
        </section>
        <aside className="aside">
          <Resignation {...form} date={TODAY_DATE} />
        </aside>
      </main>
      <footer className="footer">
        {PAGE.MADE_BY}
        <a className="link" href={PAGE.LINKEDIN_PROFILE}>
          {PAGE.AUTHOR}
        </a>{' '}
        💪
      </footer>
    </>
  );
}

export default App;
