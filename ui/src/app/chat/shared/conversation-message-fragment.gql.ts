import gql from 'graphql-tag';

export default gql`fragment conversationMessage on Chat {
    id
    message
    name
}
`;
