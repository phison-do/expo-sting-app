import { gql } from "@apollo/client";

export const CATEGORIES_QUERY = gql`
  query CategoriesQuery {
    categories(ids: "root", levels: "10") {
      total,data {id,name, categories{
          id,name
      }}
    }
  }
`;