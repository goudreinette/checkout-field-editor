export function Category(name)
{
  this.name = ''
  this.extraFields = []
}

export function Field()
{
  this.name = ''
  this.type = 'text'
  this.required = false
  this.showOnEmails = false
}

export const initialCategories = [
  {
    name: 'tickets',
    extraFields: [
      {
        name: 'ticket_notes',
        required: false,
        type: 'text',
        showOnEmails: false
      }
    ]
  }
]
