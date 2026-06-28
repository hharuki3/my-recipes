import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

type Recipe = {
    id: number
    name: string
    ingredients: string
    instructions: string
    url: string
    memo: string
    cooked_count: number
}

function RecipeDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [recipe, setRecipe] = useState<Recipe | null>(null)

    useEffect(() => {
        fetch(`http://localhost:8000/api/recipes/${id}`)
        .then(r => r.json())
        .then(data => setRecipe(data))
    }, [id])

    const handleCook = () => {
        fetch(`http://localhost:8000/api/recipes/${id}/cook`, { method: 'POST' })
        .then(r => r.json())
        .then(data => setRecipe(data))
    }

    if (!recipe) return <div>レシピを読み込み中…</div>

    return (
        <div>
            <h1>{recipe.name}</h1>
            <p>作った回数：{recipe.cooked_count}回</p>
            <button onClick={handleCook}>作った！</button>
            <button onClick={() => navigate(`/recipes/${id}/edit`)}>編集</button>
            <button onClick={() => navigate('/')}>一覧に戻る</button>
            <h2>材料</h2>
            <p>{recipe.ingredients}</p>
            <h2>作り方</h2>
            <p>{recipe.instructions}</p>
            <h2>メモ</h2>
            <p>{recipe.memo}</p>
            {recipe.url && <a href={recipe.url} target="_blank" rel="noreferrer">参考URL</a>}
        </div>
    )

}

export default RecipeDetail