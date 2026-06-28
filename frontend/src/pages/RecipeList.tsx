import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Recipe = {
    id: number
    name: string
    cooked_count: number
}

function RecipeList() {
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:8000/api/recipes')
        .then(r => r.json())
        .then(data => setRecipes(data))
    }, [])
    return (
        <div>
            <h1>レシピ一覧</h1>
            <button onClick={() => navigate('recipes/new')}>登録する</button>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id} onClick={() => navigate(`recipes/${recipe.id}`)} style={{ cursor: 'pointer'}}>
                        {recipe.name} ({recipe.cooked_count}回)
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RecipeList