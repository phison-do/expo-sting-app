import { gql } from "@apollo/client";

export const CATEGORIES_QUERY = gql`
  query CategoriesQuery($id: String!) {
    categories(ids: $id, levels: "10") {
      total,
      data {
        id,
        name,
        categories{
          id,
          name
      }}
    }
  }
`;