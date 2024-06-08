import React, { useState, useEffect } from 'react';
import "./EssentialsModal.css";
import essential from "../../../essential.json";

function EssentialsModal({ closeModal, setArticles, articles }) {
  const [tempArticle, setTempArticle] = useState(articles);

  useEffect(() => {
    setTempArticle(articles);
  }, [articles]);

  const handleCheckboxChange = (article) => {
    const newArticles = articles.includes(article)
      ? articles.filter((item) => item !== article)
      : [...articles, article];

    setArticles(newArticles);
    setTempArticle(newArticles);
  };

  return (
    <div className='displayModal'>
      <div className='modalBg'>
        <button onClick={closeModal} className='buttonIcon closeButton'></button>
        <div className='modalBgEssential'>
          {essential.map((article, index) => (
            <div key={index} className={`checkBoxBtn ${articles.includes(article) ? 'checked' : ''}`}>
              <input
                type="checkbox"
                id={`checkbox-${index}`}
                className='customCheckbox visually-hidden'
                checked={articles.includes(article)}
                onChange={() => handleCheckboxChange(article)}
              />
              <label htmlFor={`checkbox-${index}`} className='customLabel'>{article.libelle}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EssentialsModal;

