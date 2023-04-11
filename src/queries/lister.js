import { gql } from "@apollo/client";

export const LISTER_QUERY = gql`
  query ListerQuery {
    productSearch(query: "pants", filterParams: []){
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