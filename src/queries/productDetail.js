import { gql } from "@apollo/client";

export const PRODUCT_QUERY = gql`
  query ProductQuery($productId: String!) {
    product(id: $productId) {
      name,
      long_description,
      price,
      image_groups {
        images {
          link
        }
      }
    }
  }
`;