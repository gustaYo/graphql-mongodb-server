export const persons = [
  {
    id: "1",
    sex: 'male',
    name: 'miroooo'
  },
  {
    id: "2",
    sex: 'female',
    name: 'lala'
  },
  {
    id: "3",
    sex: 'male',
    name: 'joe'
  }
];

export const findPerson = (persons: Array<any>, id: string) => {
  return persons.find(person => person.id === id);
};

export const addPerson = (persons: Array<any>, person: any) => {
  persons.push(person);
  return person;
};

export const editPerson = (persons: Array<any>, person: any, id: string) => {
  let post=persons.findIndex(person => person.id === id);
  persons[post] = Object.assign(persons[post],person);
  return persons.find(person => person.id === id)
};

export const deletePerson = (persons: Array<any>, id: string) => {
  let post=persons.findIndex(person => person.id === id);
  return post!==-1? persons.splice(post,1) : false
};