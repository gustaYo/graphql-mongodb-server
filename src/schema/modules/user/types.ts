export default `
    type UserType {
        name: String
        id: ID!
        sex: String
        email: String
        matches: [UserType]
    }
       
    input UserInput {
        name: String
        sex: String
        email: String
    }

    type Mutation {
        addPerson(data: UserInput): UserType
        editPerson(id: ID!, data: UserInput): UserType
        deletePerson(id: ID!): Boolean
    }


    type Query {
        getPerson(id: ID!): UserType
        persons: [UserType]
    }
    
    type Subscription {
      clock(onlyMinutesChange: Boolean): String
    }
        
        
`;