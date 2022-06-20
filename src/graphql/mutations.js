/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createStatus = /* GraphQL */ `
  mutation CreateStatus(
    $input: CreateStatusInput!
    $condition: ModelStatusConditionInput
  ) {
    createStatus(input: $input, condition: $condition) {
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
export const updateStatus = /* GraphQL */ `
  mutation UpdateStatus(
    $input: UpdateStatusInput!
    $condition: ModelStatusConditionInput
  ) {
    updateStatus(input: $input, condition: $condition) {
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
export const deleteStatus = /* GraphQL */ `
  mutation DeleteStatus(
    $input: DeleteStatusInput!
    $condition: ModelStatusConditionInput
  ) {
    deleteStatus(input: $input, condition: $condition) {
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
export const createCard = /* GraphQL */ `
  mutation CreateCard(
    $input: CreateCardInput!
    $condition: ModelCardConditionInput
  ) {
    createCard(input: $input, condition: $condition) {
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
export const updateCard = /* GraphQL */ `
  mutation UpdateCard(
    $input: UpdateCardInput!
    $condition: ModelCardConditionInput
  ) {
    updateCard(input: $input, condition: $condition) {
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
export const deleteCard = /* GraphQL */ `
  mutation DeleteCard(
    $input: DeleteCardInput!
    $condition: ModelCardConditionInput
  ) {
    deleteCard(input: $input, condition: $condition) {
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
