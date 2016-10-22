export function Category ()
{
    this.name        = ''
    this.extraFields = []
}

export function Field ()
{
    this.name         = ''
    this.type         = 'text'
    this.required     = false
    this.showOnEmails = false
    this.options      = [] // of strings
}

export const initialCategories = [
    {
        name: 'tickets',
        extraFields: [
            {
                name: 'ticket_notes',
                required: false,
                type: 'text',
                showOnEmails: false,
                options: []
            }
        ]
    }
]

export const categoryNames = [
    'T-shirts',
    'Tickets',
    'Women'
]
