import { useQuery , gql} from '@apollo/client';

export const useList = () => {

    const GET_POST = gql`
    query GetPost {
        posts {
            id
            model
            manufacturer
            title
            description
            postid
        }
    }
    `
    const { loading, error, data } = useQuery(GET_POST);

    return [loading,error,data]
}

