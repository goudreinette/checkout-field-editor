export function filterSuggestions (term, suggestions)
{
  return suggestions
    .filter(x => x.toLowerCase().includes(term.toLowerCase()))
}


export function includesLoose (term, suggestions)
{
  return suggestions.map(x => x.toLowerCase()).includes(term.toLowerCase())
}
