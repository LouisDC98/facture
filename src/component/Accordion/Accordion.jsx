import React, {useState} from 'react'
import './Accordion.css'
import arrow from "../../assets/arrow_down.svg"

function Accordion({ title, articles, fields, handleCheckboxChange }) {
    const [open, setOpen] = useState(true);

    const toggleAccordion = () => {
        setOpen(!open);
    };
    return (
        <div className="accordionComponentChild">
            <div onClick={toggleAccordion} className="accordionHeader" aria-expanded={open}>
                <div>{title}</div>
                <img src={arrow} alt='openAccordion' className="accordionOpenBtn" />
            </div>
            <div className="accordionContent" aria-expanded={open}>
                {articles.filter(article => article.active).map((article, index) => (
                    <div key={index} className='checkBoxDiv'>
                        <input
                            type="checkbox"
                            checked={fields.findIndex(field => field.code === article.code) !== -1}
                            onChange={() => handleCheckboxChange(article)}
                        />
                        <p>{article.libelle}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Accordion