import './SelectEssentials.css'

function SelectEssentials(props) {
    const { essentialsArticles, choosenEssentialsArticles, setChoosenEssentialsArticles } = props

    const handleCheckboxChangeEssentials = (item) => {
        setChoosenEssentialsArticles(prev => {
            const isAlreadySelected = prev.some(a => a.code === item.code);
            if (isAlreadySelected) {
                return prev.filter(a => a.code !== item.code);
            } else {
                return [...prev, item];
            }
        });
    };
    return (
        <table className='tableEssentials'>
            <thead>
                <tr>
                    <th></th>
                    <th>Libellé</th>
                    <th>EAN</th>
                    <th>Qty</th>
                    <th>Prix/Unit</th>
                </tr>
            </thead>
            <tbody>
                {essentialsArticles?.filter(item => item.active).map((item) => (
                    <tr key={item.code}>
                        <td>
                            <div className='switchFormat4'>
                                <input type="checkbox" id={`switch-${item.code}`} className='switch4' checked={choosenEssentialsArticles.some(a => a.code === item.code)} onChange={(e) => handleCheckboxChangeEssentials(item, e.target.checked)} />
                                <label htmlFor={`switch-${item.code}`}>Toggle</label>
                            </div>
                        </td>
                        <td className='positionRelative'>
                            <div>{item.libelle} </div>
                        </td>
                        <td className='positionRelative'>
                            <div>{item.code} </div>
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
    )
}

export default SelectEssentials