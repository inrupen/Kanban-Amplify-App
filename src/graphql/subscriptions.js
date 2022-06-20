/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStatus = /* GraphQL */ `
  subscription OnCreateStatus {
    onCreateStatus {
      id
      name
      cards {
        items {
          id
          title
          status
          description
          comment
          image
          createdAt
          updatedAt
          statusCardsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateStatus = /* GraphQL */ `
  subscription OnUpdateStatus {
    onUpdateStatus {
      id
      name
      cards {
        items {
          id
          title
          status
          description
          comment
          image
          createdAt
          updatedAt
          statusCardsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteStatus = /* GraphQL */ `
  subscription OnDeleteStatus {
    onDeleteStatus {
      id
      name
      cards {
        items {
          id
          title
          status
          description
          comment
          image
          createdAt
          updatedAt
          statusCardsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCard = /* GraphQL */ `
  subscription OnCreateCard {
    onCreateCard {
      id
      title
      status
      description
      comment
      image
      createdAt
      updatedAt
      statusCardsId
    }
  }
`;
export const onUpdateCard = /* GraphQL */ `
  subscription OnUpdateCard {
    onUpdateCard {
      id
      title
      status
      description
      comment
      image
      createdAt
      updatedAt
      statusCardsId
    }
  }
`;
export const onDeleteCard = /* GraphQL */ `
  subscription OnDeleteCard {
    onDeleteCard {
      id
      title
      status
      description
      comment
      image
      createdAt
      updatedAt
      statusCardsId
    }
  }
`;
