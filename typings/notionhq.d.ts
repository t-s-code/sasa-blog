declare module 'notionhq' {
  type StringRequest = string
  type SelectColor =
    | 'default'
    | 'gray'
    | 'brown'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'purple'
    | 'pink'
    | 'red'
  export type SelectPropertyResponse = {
    id: StringRequest
    name: StringRequest
    color: SelectColor
  }
}
