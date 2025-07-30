import "./SelectRandoms.css"

function SelectRandoms(props) {
    const { randomArticles, choosenRandomArticles, setChoosenRandomArticles } = props

    const handleAddRandomArticle = () => {
        const available = randomArticles.filter(
            item => !choosenRandomArticles.some(chosen => chosen.code === item.code)
        );

        if (available.length === 0) return;

        const randomIndex = Math.floor(Math.random() * available.length);
        const newItem = available[randomIndex];

        setChoosenRandomArticles(prev => [...prev, newItem]);
    };

    const handleRemoveLastArticle = () => {
        setChoosenRandomArticles(prev => prev.slice(0, -1));
    };

    return (
        <div className="selectRandoms">
            <div className='displayBtn'>
                <button onClick={handleAddRandomArticle} className='addBtn'>+</button>
                <button onClick={handleRemoveLastArticle} className='addBtn'>-</button>
                <div>({choosenRandomArticles.length})</div>
            </div>

            <table className='tableRandoms'>
                <thead>
                    <tr>
                        <th>Libellé</th>
                        <th>Qty</th>
                        <th>Prix/Unit</th>
                    </tr>
                </thead>
                <tbody>
                    {choosenRandomArticles?.map((item) => (
                        <tr key={item.code}>
                            <td className='positionRelative'>
                                <div>{item.libelle} </div>
                            </td>
                            <td className='positionRelative'>
                                <div>{item.qtyCmd} </div>
                            </td>
                            <td className='positionRelative'>
                                <div>{item.prixUnit} €</div>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SelectRandoms