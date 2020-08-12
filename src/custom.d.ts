type RecordList = {

}
type RootState = {
  recordList: RecordItem[],
  tagList: Tag[],
  currentTag?: Tag
}
type RecordItem = {
  tags: string[],
  notes: string,
  type: string,
  amount: number
  saveAt?: string
}
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  create: (name: string) => 'success' | 'duplicated' //success 成功  duplicated 重复创建
  save: () => void
  update: (id: string, name: string) => 'success' | 'not_found' | 'duplicated'
  remove: (id: string) => boolean
}

interface Window {

}