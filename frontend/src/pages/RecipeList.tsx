import { useEffect, useState } from "react"

type Recipe = {
    id: number
    name: string
    cooked_count: number
}

function RecipeList() {
    const [recipes, setRecipes] = useState<Recipe[]>([])

    useEffect(() => {
    fetch('http://localhost:8000/api/recipes')
      .then(r => r.json())
      .then(data => setRecipes(data))
  }, [])

    

    return (
        <div>
            <h1>レシピ一覧</h1>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        {recipe.name} {recipe.cooked_count}回作りました。
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RecipeList