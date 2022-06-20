/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStatus = /* GraphQL */ `
  query GetStatus($id: ID!) {
    getStatus(id: $id) {
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
export const listStatuses = /* GraphQL */ `
  query ListStatuses(
    $filter: ModelStatusFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStatuses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        cards {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCard = /* GraphQL */ `
  query GetCard($id: ID!) {
    getCard(id: $id) {
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
export const listCards = /* GraphQL */ `
  query ListCards(
    $filter: ModelCardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
