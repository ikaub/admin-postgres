import { gql } from '@apollo/client';
import { ProfileInfo } from '../fragments/profile.fragments';

export const GetUser = gql`
    query GetUser($userId: Int!) {
        user(userId: $userId) {
            id
            role
            email
            profiles {
                ...profileInfo
            }
        }
    }
    ${ProfileInfo}
`;
