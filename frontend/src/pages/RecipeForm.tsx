import {useState} from 'react'
import { useNavigate } from "react-router-dom"


function RecipeForm(){
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [instructions, setInstructions] = useState('')
    const [url, setUrl] = useState('')
    const [memo, setMemo] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        fetch('http://localhost:8000/api/recipes' , {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name, ingredients, instructions, url, memo}),
        }).then(() => navigate('/'))
    }

    return (
        <div>
            <h1>レシピ登録</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>料理名</label>
                    <input value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div>
                    <label>材料</label>
                    <textarea value={ingredients} onChange={e => setIngredients(e.target.value)} />
                </div>
                <div>
                    <label>作り方</label>
                    <textarea value={instructions} onChange={e => setInstructions(e.target.value)} />
                </div>
                <div>
                    <label>URL</label>
                    <input value={url} onChange={e => setUrl(e.target.value)} />
                </div>
                <div>
                    <label>メモ</label>
                    <textarea value={memo} onChange={e => setMemo(e.target.value)} />
                </div>
                <button type="submit">登録する</button>
            </form>
        </div>
    )
}

export default RecipeForm