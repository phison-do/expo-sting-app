import { gql } from "@apollo/client";

export const PRODUCT_QUERY = gql`
  query ProductQuery {
    product(id: "352901-COGNAC") {
      name,long_description,price,image_groups {
          images {
              link
          }
      }
    }
  }
`;