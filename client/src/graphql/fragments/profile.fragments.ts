import { gql } from '@apollo/client';

export const ProfileInfo = gql`
    fragment profileInfo on Profile {
        username
        gender
        birthdate
        city
        id
    }
`;
