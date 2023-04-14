import { gql } from "@apollo/client";

export const LISTER_QUERY = gql`
  query ListerQuery($id: String!) {
    productSearch(query: $id, filterParams: []){
      hits {
        product_name,
        product_id,
        price,
        image {
          alt,
          link
        }
      }
    }
  }
`;